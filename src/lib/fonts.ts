import { Plus_Jakarta_Sans } from 'next/font/google';

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

// SkatynGator: agregar SkatynGator.woff2 en /public/fonts/ y descomentar esto.
// import localFont from 'next/font/local';
// export const skatynGator = localFont({
//   src: '../../public/fonts/SkatynGator.woff2',
//   variable: '--font-skatyn',
//   display: 'swap',
// });
