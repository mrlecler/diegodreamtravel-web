import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const skatynGator = localFont({
  src: '../../public/fonts/Skatyn-Gator-BF68ee10754a67a.otf',
  variable: '--font-skatyn',
  display: 'swap',
});
