'use client';

import { useState } from 'react';
import Link from 'next/link';
import { List, X, WhatsappLogo, Sparkle } from '@phosphor-icons/react';

const WA_URL = 'https://wa.me/5493624703040';

const navLinks = [
  { label: 'Quién soy', href: '#quien-soy' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Por qué conmigo', href: '#por-que' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function NavIsland() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-3 shadow-lg">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
            style={{ background: 'var(--grad-ddt)' }}
          >
            <Sparkle size={14} weight="fill" />
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Dream 15 */}
          <Link
            href="/dream15"
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 text-[#F0EDE8]/80 hover:border-white/40 hover:text-[#F0EDE8] transition-all"
            style={{ background: 'rgba(124,58,237,0.15)' }}
          >
            Dream 15
          </Link>

          {/* ES / EN toggle */}
          <div className="hidden sm:flex items-center gap-0.5 text-xs font-medium">
            <button className="px-2 py-1 rounded-md text-[#F0EDE8] bg-white/10">
              ES
            </button>
            <div className="relative">
              <button
                disabled
                className="px-2 py-1 rounded-md text-[#F0EDE8]/30 cursor-not-allowed select-none"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                EN
              </button>
              {showTooltip && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#0C1521] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#F0EDE8]/70 whitespace-nowrap shadow-xl z-50">
                  Versión en inglés · Próximamente
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#FF5B00' }}
          >
            <WhatsappLogo size={14} weight="fill" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden text-[#F0EDE8]/70 hover:text-[#F0EDE8] transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mt-2 bg-[#0C1521]/97 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 md:hidden">
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
            <li className="pt-2 border-t border-white/10">
              <Link
                href="/dream15"
                onClick={() => setOpen(false)}
                className="text-[#F0EDE8]/80 hover:text-[#F0EDE8] text-sm block py-1"
              >
                Dream 15 · Viaje de 15
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
