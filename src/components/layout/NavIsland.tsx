'use client';

import { MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import GradientButton from '@/components/ui/GradientButton';

const WA_URL = 'https://wa.me/5493624703040';

const navLinks = [
  { label: 'Destinos', href: '#destinos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Sobre Diego', href: '#sobre-diego' },
];

export default function NavIsland() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl">
        <div className="flex items-center justify-between bg-[#0C1521]/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'var(--grad-ddt)' }}
            >
              D
            </span>
            <span className="hidden sm:block text-[#F0EDE8] font-semibold text-sm whitespace-nowrap">
              Diego Dream Travel
            </span>
          </a>

          {/* Links — desktop */}
          <ul className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[#F0EDE8]/70 hover:text-[#F0EDE8] text-sm transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <GradientButton href={WA_URL} className="text-xs px-4 py-2">
              <MessageCircle size={14} />
              <span className="hidden sm:inline">WhatsApp</span>
            </GradientButton>
            <button
              className="md:hidden text-[#F0EDE8]/70 hover:text-[#F0EDE8] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="mt-2 bg-[#0C1521]/95 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 md:hidden">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[#F0EDE8]/80 hover:text-[#F0EDE8] text-sm transition-colors block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
