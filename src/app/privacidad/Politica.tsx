'use client';

import type { ReactNode } from 'react';
import { useLang } from '@/lib/language';
import { hayQuePedirPermiso } from '@/lib/consentimiento';

/**
 * Texto de la política de privacidad, en español e inglés.
 *
 * Tiene que decir lo que la web HACE, ni más ni menos. Si cambia algo de
 * lo que se guarda o de los proveedores (un formulario nuevo, una
 * herramienta en src/lib/consentimiento.ts), se actualiza acá y la fecha.
 * Revisado por un abogado antes de publicar: [pendiente].
 */
const ACTUALIZADA = { es: '27 de octubre de 2026', en: 'October 27, 2026' };
const EMAIL = 'info@diegodreamtravel.com';

const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2 id={id} className="scroll-mt-6 mt-10 mb-3 text-[20px] font-bold text-[#F0EDE8]">{children}</h2>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-[16px] leading-relaxed text-[#F0EDE8]/75">{children}</p>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="mb-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-[#F0EDE8]/75 marker:text-[#F47B45]">{children}</ul>
);
const B = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-[#F0EDE8]">{children}</strong>;
const Mail = () => (
  <a href={`mailto:${EMAIL}`} className="text-[#F0EDE8] underline underline-offset-[3px]">{EMAIL}</a>
);

function Espanol() {
  return (
    <>
      <P>En diegodreamtravel.com te pedimos datos solo cuando nos escribes por un formulario. Aquí te contamos cuáles, para qué los usamos y quién nos ayuda a guardarlos.</P>

      <H2>Quién es el responsable</H2>
      <UL>
        <li><B>Nombre:</B> Diego Alejandro Fernandez Lecler</li>
        <li><B>CUIT:</B> 23-32065834-9</li>
        <li><B>Domicilio:</B> Cangallo 318, Resistencia, Chaco, Argentina</li>
        <li><B>Email de contacto:</B> <Mail /></li>
      </UL>

      <H2>Qué datos te pedimos y para qué</H2>
      <UL>
        <li><B>Formulario de contacto:</B> nombre y apellido, WhatsApp, email (si quieres darlo), qué viaje imaginas y cuándo viajarías.</li>
        <li><B>Guía de Orlando:</B> nombre y apellido, WhatsApp y email (si quieres darlo).</li>
        <li><B>Dream 15:</B> quién completa el formulario, nombre y apellido, WhatsApp, edad, ciudad y fecha tentativa del viaje.</li>
      </UL>
      <P>Los usamos para responder tu consulta, armar tu cotización y mandarte la guía que pediste. Si te escribimos, es por el WhatsApp o el email que nos diste.</P>

      <H2>Menores de edad</H2>
      <P>El formulario de Dream 15 pide la edad de la quinceañera o del quinceañero. Esos datos los tiene que cargar su madre, padre o un adulto responsable. Los usamos solo para cotizar ese viaje.</P>

      <H2>Dónde se guardan y quién nos ayuda</H2>
      <UL>
        <li><B>Supabase:</B> nuestra base de datos, alojada en San Pablo, Brasil.</li>
        <li><B>Resend:</B> envía los emails (el aviso de tu consulta y la guía).</li>
        <li><B>Google Workspace:</B> nuestras casillas de email, donde recibimos tu consulta.</li>
        <li><B>Vercel:</B> aloja la web y cuenta las visitas de forma agregada, sin cookies.</li>
      </UL>
      <P>Algunos de estos servicios pueden procesar datos fuera de Argentina. Solo los usan para prestarnos su servicio.</P>
      <P>En la web hay botones y links a WhatsApp, Instagram y otros sitios. La web no les manda tus datos: si los tocas, pasas a ese sitio, que tiene su propia política.</P>

      <H2>Seguridad y abusos</H2>
      <P>Para frenar envíos masivos y abusos, guardamos durante un tiempo breve la dirección IP desde la que se envía un formulario. Si pides la guía, también guardamos el email al que la mandamos. Ese registro se borra automáticamente pasada aproximadamente una hora.</P>
      <P>Como cualquier sitio, nuestro proveedor de alojamiento (Vercel) registra datos técnicos de cada visita, como la IP, por un tiempo limitado.</P>

      <H2>Lo que no hacemos</H2>
      <P>No vendemos tus datos, no los compartimos para publicidad y no los usamos para nada distinto de lo que dice esta política.</P>

      <H2>Cuánto tiempo los guardamos</H2>
      <P>Guardamos tus datos mientras sigamos en contacto por tu viaje y, después, hasta 10 años, para cumplir obligaciones legales y poder atender reclamos. Si nos pides que los borremos antes, lo hacemos, salvo lo que la ley nos obligue a conservar.</P>

      <H2>Tus derechos</H2>
      <P>Puedes pedirnos acceso a tus datos, corregirlos o borrarlos escribiendo a <Mail />. Te respondemos en los plazos que fija la ley.</P>
      <P>En Argentina rige la Ley 25.326 de Protección de Datos Personales. El organismo de control es la Agencia de Acceso a la Información Pública, ante la que puedes presentar un reclamo.</P>

      <H2 id="cookies">Cookies y almacenamiento del navegador</H2>
      {hayQuePedirPermiso ? (
        <P>Usamos herramientas de terceros que guardan cookies solo si las aceptas en el aviso. Puedes cambiar tu elección cuando quieras desde el link «Cookies» del pie.</P>
      ) : (
        <P>Hoy la web no usa cookies.</P>
      )}
      <UL>
        <li><B>Idioma:</B> si eliges español o inglés, lo guardamos en tu navegador (localStorage) para mostrarte la web en ese idioma la próxima vez. No sale de tu dispositivo.</li>
        <li><B>Visitas:</B> usamos Vercel Web Analytics, que cuenta visitas sin cookies y sin identificarte.</li>
      </UL>
      {!hayQuePedirPermiso && (
        <P>Si algún día sumamos herramientas que usen cookies (por ejemplo, de publicidad), te vamos a pedir permiso antes de activarlas, y vas a poder cambiar tu elección desde el link «Cookies» del pie.</P>
      )}

      <H2>Cambios en esta política</H2>
      <P>Si cambiamos algo importante, actualizamos esta página y la fecha de arriba.</P>
    </>
  );
}

function English() {
  return (
    <>
      <P>On diegodreamtravel.com we only ask for your data when you write to us through a form. Here we explain what we ask for, why, and who helps us store it.</P>

      <H2>Who is responsible</H2>
      <UL>
        <li><B>Name:</B> Diego Alejandro Fernandez Lecler</li>
        <li><B>Tax ID (CUIT):</B> 23-32065834-9</li>
        <li><B>Address:</B> Cangallo 318, Resistencia, Chaco, Argentina</li>
        <li><B>Contact email:</B> <Mail /></li>
      </UL>

      <H2>What we ask for and why</H2>
      <UL>
        <li><B>Contact form:</B> first and last name, WhatsApp, email (optional), the trip you have in mind and when you would travel.</li>
        <li><B>Orlando guide:</B> first and last name, WhatsApp and email (optional).</li>
        <li><B>Dream 15:</B> who is filling in the form, first and last name, WhatsApp, age, city and tentative travel date.</li>
      </UL>
      <P>We use them to answer your request, prepare your quote and send you the guide you asked for. If we contact you, it is through the WhatsApp or email you gave us.</P>

      <H2>Minors</H2>
      <P>The Dream 15 form asks for the age of the girl or boy turning fifteen. A parent or responsible adult must fill it in. We use that data only to quote that trip.</P>

      <H2>Where it is stored and who helps us</H2>
      <UL>
        <li><B>Supabase:</B> our database, hosted in São Paulo, Brazil.</li>
        <li><B>Resend:</B> sends our emails (the notice of your request and the guide).</li>
        <li><B>Google Workspace:</B> our email inboxes, where we receive your request.</li>
        <li><B>Vercel:</B> hosts the site and counts visits in aggregate, without cookies.</li>
      </UL>
      <P>Some of these services may process data outside Argentina. They only use it to provide their service to us.</P>
      <P>The site has buttons and links to WhatsApp, Instagram and other sites. The site does not send them your data: if you tap them, you go to that site, which has its own policy.</P>

      <H2>Security and abuse</H2>
      <P>To stop mass submissions and abuse, we briefly keep the IP address a form is sent from. If you ask for the guide, we also keep the email we send it to. That record is deleted automatically after about one hour.</P>
      <P>Like any website, our hosting provider (Vercel) logs technical data about each visit, such as the IP address, for a limited time.</P>

      <H2>What we do not do</H2>
      <P>We do not sell your data, share it for advertising, or use it for anything other than what this policy says.</P>

      <H2>How long we keep it</H2>
      <P>We keep your data while we are in touch about your trip and, after that, for up to 10 years to meet legal obligations and handle claims. If you ask us to delete it sooner, we will, except for what the law requires us to keep.</P>

      <H2>Your rights</H2>
      <P>You can ask us to access, correct or delete your data by writing to <Mail />. We will answer within the time limits set by law.</P>
      <P>In Argentina, Law 25,326 on Personal Data Protection applies. The supervisory authority is the Agencia de Acceso a la Información Pública (Agency for Access to Public Information), where you can file a complaint.</P>

      <H2 id="cookies">Cookies and browser storage</H2>
      {hayQuePedirPermiso ? (
        <P>We use third-party tools that set cookies only if you accept them in the notice. You can change your choice at any time from the “Cookies” link in the footer.</P>
      ) : (
        <P>The site does not use cookies today.</P>
      )}
      <UL>
        <li><B>Language:</B> if you choose Spanish or English, we save it in your browser (localStorage) to show you the site in that language next time. It never leaves your device.</li>
        <li><B>Visits:</B> we use Vercel Web Analytics, which counts visits without cookies and without identifying you.</li>
      </UL>
      {!hayQuePedirPermiso && (
        <P>If we ever add tools that use cookies (for example, advertising), we will ask for your permission before turning them on, and you will be able to change your choice from the “Cookies” link in the footer.</P>
      )}

      <H2>Changes to this policy</H2>
      <P>If we change something important, we will update this page and the date at the top.</P>
    </>
  );
}

export default function Politica() {
  const { lang, setLang } = useLang();
  const en = lang === 'en';
  const boton = (activo: boolean) =>
    `min-h-[44px] min-w-[44px] rounded-full px-3 text-[16px] sm:text-[14px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47B45] ${
      activo ? 'bg-white/10 text-[#F0EDE8]' : 'text-[#F0EDE8]/50 hover:text-[#F0EDE8]'
    }`;
  return (
    <article lang={en ? 'en' : 'es'}>
      <div className="mb-6 flex justify-end gap-1" role="group" aria-label={en ? 'Language' : 'Idioma'}>
        <button type="button" className={boton(!en)} aria-pressed={!en} onClick={() => setLang('es')}>ES</button>
        <button type="button" className={boton(en)} aria-pressed={en} onClick={() => setLang('en')}>EN</button>
      </div>
      <h1 className="font-display mb-3 text-[36px] leading-tight text-[#F0EDE8] sm:text-[48px]">
        {en ? 'Privacy policy' : 'Política de privacidad'}
      </h1>
      <p className="mb-8 text-[16px] sm:text-[14px] text-[#F0EDE8]/50">
        {en ? `Last updated: ${ACTUALIZADA.en}` : `Última actualización: ${ACTUALIZADA.es}`}
      </p>
      {en ? <English /> : <Espanol />}
    </article>
  );
}
