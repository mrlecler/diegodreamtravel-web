/**
 * Freno de abuso para las rutas públicas de la landing que mandan mail
 * o escriben en la base (/api/guia-mail, /api/lead-dream15 y la red de
 * contención de /api/lead).
 *
 * SOLO SERVIDOR: usa la service role key. No importar desde un
 * componente 'use client'.
 *
 * Dos capas, de la más barata a la más fuerte:
 *
 *   1. Un Map en memoria del proceso. Siempre está, no depende de nada,
 *      y corta la ráfaga típica (un loop de curl contra la misma lambda
 *      caliente). Sola no alcanza: en Vercel se pierde cuando la lambda
 *      se enfría y no se comparte entre instancias.
 *
 *   2. La tabla `intentos_publicos` (la misma que usa el SGI en
 *      `src/lib/rate-limit.js`, migración 20260830320000), con el
 *      cliente Supabase que la landing ya tiene configurado. Vale para
 *      todas las instancias. Si falta la env, la tabla no existe en este
 *      proyecto o la base no contesta, falla ABIERTO (mismo criterio que
 *      el SGI: un formulario que rechaza a todo el mundo es peor) y queda
 *      sólo la capa 1.
 *
 * Las claves llevan prefijo `web-` para no mezclarse con las del SGI si
 * las dos apps comparten proyecto.
 */

import { isIP } from 'node:net';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const RETENCION_MS = 60 * 60 * 1000; // filas de más de 1 hora se barren
const BARRIDO_CADA = 20;             // 1 de cada 20 inserts barre
const MAX_CLAVES_MEMORIA = 5000;

const memoria = new Map<string, number[]>();

let cliente: SupabaseClient | null | undefined;
// Si la tabla no existe en este proyecto no tiene sentido preguntar en
// cada request: se apaga la capa 2 por un rato y después se reintenta.
const REINTENTO_TABLA_MS = 10 * 60 * 1000;
let sinTablaHasta = 0;

function db(): SupabaseClient | null {
  if (cliente !== undefined) return cliente;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  cliente = url && key
    ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;
  return cliente;
}

function permitirEnMemoria(clave: string, max: number, ventanaMs: number): boolean {
  const ahora = Date.now();
  const recientes = (memoria.get(clave) || []).filter((t) => t > ahora - ventanaMs);

  if (recientes.length >= max) {
    memoria.set(clave, recientes);
    return false;
  }

  recientes.push(ahora);
  memoria.set(clave, recientes);

  // Que el Map no crezca sin techo si alguien rota IPs.
  if (memoria.size > MAX_CLAVES_MEMORIA) {
    for (const [k, tiempos] of memoria) {
      if (!tiempos.some((t) => t > ahora - RETENCION_MS)) memoria.delete(k);
    }
    if (memoria.size > MAX_CLAVES_MEMORIA) memoria.clear();
  }
  return true;
}

function esTablaInexistente(err: unknown): boolean {
  const code = (err as { code?: string } | null)?.code;
  return code === 'PGRST205' || code === '42P01';
}

/**
 * ¿Puede pasar este intento? true = dejalo pasar.
 *
 * @param clave     identidad de quien intenta ('web-guia-mail:ip:1.2.3.4')
 * @param max       intentos permitidos dentro de la ventana
 * @param ventanaMs largo de la ventana
 */
export async function permitir(clave: string | null, max: number, ventanaMs: number): Promise<boolean> {
  if (!clave) return true; // sin identidad no hay a quién limitar

  if (!permitirEnMemoria(clave, max, ventanaMs)) return false;

  const supa = db();
  if (!supa || Date.now() < sinTablaHasta) return true;

  try {
    // Primero se REGISTRA el intento y después se cuenta, incluida la fila
    // propia. Al revés (contar y después insertar) dos requests que caen
    // en lambdas distintas leen el mismo count y pasan los dos. Así cada
    // uno ve al otro: en el peor caso se rechazan los dos, nunca pasan de
    // más.
    const { data: fila, error: insError } = await supa
      .from('intentos_publicos')
      .insert({ clave })
      .select('id')
      .single();
    if (insError) throw insError;

    const desde = new Date(Date.now() - ventanaMs).toISOString();
    const { count, error } = await supa
      .from('intentos_publicos')
      .select('id', { count: 'exact', head: true })
      .eq('clave', clave)
      .gte('creado_at', desde);
    if (error) throw error;

    if ((count || 0) > max) {
      // El intento rechazado no suma: se borra la fila recién insertada.
      // Si el borrado falla, esa fila cuenta hasta que venza la ventana
      // (falla cerrado para esa clave, aceptable acá).
      const id = (fila as { id?: number | string } | null)?.id;
      if (id != null) {
        await supa.from('intentos_publicos').delete().eq('id', id).then(() => {}, () => {});
      }
      return false;
    }

    if (Math.random() < 1 / BARRIDO_CADA) {
      supa
        .from('intentos_publicos')
        .delete()
        .lt('creado_at', new Date(Date.now() - RETENCION_MS).toISOString())
        .then(() => {}, () => {});
    }
    return true;
  } catch (err) {
    if (esTablaInexistente(err)) sinTablaHasta = Date.now() + REINTENTO_TABLA_MS;
    console.error('[rate-limit] falla abierto (queda el límite en memoria):', (err as Error)?.message || err);
    return true;
  }
}

/**
 * Prefijo /64 de una IPv6 ('2001:db8:0:1::/64'). Una conexión IPv6
 * normal recibe un /64 entero, así que limitar por la dirección completa
 * no frena a nadie: cambiando el sufijo cada request caería en un balde
 * nuevo. Una IPv4 mapeada (::ffff:1.2.3.4) cuenta como la IPv4.
 */
function prefijoIpv6(ip: string): string {
  const sinZona = ip.split('%')[0].toLowerCase();
  const mapeada = sinZona.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapeada && isIP(mapeada[1]) === 4) return mapeada[1];

  // Si termina en IPv4 embebida, esos 32 bits son los últimos 2 grupos:
  // no tocan el /64, alcanza con reemplazarlos por dos grupos cualquiera.
  const base = sinZona.replace(/\d+\.\d+\.\d+\.\d+$/, '0:0');
  const [izq, der] = base.split('::');
  const gruposIzq = izq ? izq.split(':') : [];
  const gruposDer = der !== undefined && der !== '' ? der.split(':') : [];
  const faltan = base.includes('::') ? 8 - gruposIzq.length - gruposDer.length : 0;
  const grupos = [...gruposIzq, ...Array(Math.max(faltan, 0)).fill('0'), ...gruposDer];
  return grupos.slice(0, 4).map((g) => (parseInt(g, 16) || 0).toString(16)).join(':') + '::/64';
}

/**
 * Identidad del visitante para el rate limit. En Vercel
 * `x-forwarded-for` lo arma la plataforma ("cliente, proxy1, ..."); se
 * toma el primero y sólo si es una IP. IPv4 va entera; IPv6 se agrupa
 * por su /64 (ver prefijoIpv6).
 */
export function ipCliente(headers: Headers): string | null {
  const raw = headers.get('x-forwarded-for') || headers.get('x-real-ip');
  if (!raw) return null;
  const primero = raw.split(',')[0].trim();
  const version = isIP(primero);
  if (version === 4) return primero;
  if (version === 6) return prefijoIpv6(primero);
  return null;
}
