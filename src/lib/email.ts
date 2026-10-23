/**
 * Validación de email compartida por los formularios (cliente) y las
 * rutas /api (servidor). Sin dependencias de servidor: se puede importar
 * desde un componente 'use client'.
 *
 * Acepta sólo una dirección simple (local@dominio.tld): sin nombre
 * visible ni '<>', comillas, corchetes, comas, paréntesis, espacios ni
 * punto final. Las formas raras que el RFC permite ('Nombre <x@y.com>',
 * '"x"@y.com', 'x@[1.2.3.4]', 'x@y.com.') son la misma casilla escrita
 * de otra manera, y dejarlas pasar rompe el límite por buzón de
 * /api/guia-mail (cada variante es una clave nueva) y deja que el que
 * llena el form elija el nombre que aparece en el "Para:" del mail.
 */
export const EMAIL_OK = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export function emailValido(valor: string): boolean {
  return EMAIL_OK.test(valor);
}
