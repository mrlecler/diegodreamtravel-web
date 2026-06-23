'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { List, X, WhatsappLogo, Sparkle } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

const navLinks = [
  { key: 'about', href: '#quien-soy', id: 'quien-soy' },
  { key: 'services', href: '#servicios', id: 'servicios' },
  { key: 'why', href: '#por-que', id: 'por-que' },
  { key: 'testimonials', href: '#testimonios', id: 'testimonios' },
] as const;

export default function NavIsland() {
  const { t, lang, setLang } = useLang();

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeId, setActiveId] = useState('');
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [blob, setBlob] = useState({ left: 0, width: 0, opacity: 0 });

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // nav sobre hero (oscuro) vs cuerpo (claro)
  useEffect(() => {
    const hero = document.querySelector('main > *:first-child') as HTMLElement | null;
    const calc = () => {
      const threshold = hero ? hero.offsetHeight - 90 : window.innerHeight - 90;
      setDark(window.scrollY < threshold);
    };
    calc();
    window.addEventListener('scroll', calc, { passive: true });
    window.addEventListener('resize', calc);
    return () => {
      window.removeEventListener('scroll', calc);
      window.removeEventListener('resize', calc);
    };
  }, []);

  // scroll spy
  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // posicionar la gota
  const moveBlob = useCallback(
    (id: string | null) => {
      const targetId = id ?? activeId;
      const el = targetId ? itemRefs.current[targetId] : null;
      if (el && listRef.current) {
        setBlob({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
      } else {
        setBlob((b) => ({ ...b, opacity: 0 }));
      }
    },
    [activeId]
  );
  useEffect(() => {
    moveBlob(hoverId);
  }, [hoverId, activeId, dark, lang, moveBlob]);

  // smooth scroll + cerrar mobile
  const onNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    setOpen(false);
  };

  // lock scroll cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const txt = dark ? '#F0EDE8' : '#0C1521';
  const litId = hoverId ?? activeId;

  // estilos del toggle de idioma (desktop)
  const langInactive = dark ? 'rgba(240,237,232,0.45)' : 'rgba(12,21,33,0.45)';
  const langActiveBg = dark ? 'rgba(255,255,255,0.10)' : 'rgba(12,21,33,0.08)';

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div
          className="flex items-center justify-between rounded-full px-5 py-3 transition-colors duration-300"
          style={
            dark
              ? {
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                }
              : {
                  background: 'rgba(240,237,232,0.80)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(12,21,33,0.10)',
                  boxShadow: '0 10px 30px rgba(12,21,33,0.12)',
                }
          }
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0"
              style={{ background: 'var(--grad-ddt)' }}
            >
              <Sparkle size={14} weight="fill" />
            </span>
            <span
              className="hidden sm:block font-bold text-sm whitespace-nowrap transition-colors duration-300"
              style={{ color: txt }}
            >
              Diego Dream Travel
            </span>
          </a>

          {/* Links desktop con la gota */}
          <ul
            ref={listRef}
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => setHoverId(null)}
          >
            <span
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                left: blob.left,
                width: blob.width,
                top: 2,
                bottom: 2,
                opacity: blob.opacity,
                background: 'var(--grad-ddt)',
                transition: reduce
                  ? 'opacity .2s ease'
                  : 'left .35s cubic-bezier(.34,1.56,.64,1), width .35s cubic-bezier(.34,1.56,.64,1), opacity .25s ease',
              }}
            />
            {navLinks.map((link) => {
              const lit = litId === link.id && blob.opacity === 1;
              return (
                <li
                  key={link.id}
                  ref={(el) => {
                    itemRefs.current[link.id] = el;
                  }}
                  onMouseEnter={() => setHoverId(link.id)}
                >
                  <a
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    className="relative z-10 block px-3.5 py-1.5 text-sm font-medium transition-colors duration-200"
                    style={{ color: lit ? '#fff' : dark ? 'rgba(240,237,232,0.75)' : 'rgba(12,21,33,0.75)' }}
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Derecha */}
          <div className="flex items-center gap-2">
            <Link
              href="/dream15"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-transform hover:scale-[1.03]"
              style={{ background: 'var(--grad-ddt)' }}
            >
              <Sparkle size={12} weight="fill" />
              {t.nav.dream15}
            </Link>

            <div className="hidden sm:flex items-center gap-0.5 text-xs font-medium">
              <button
                onClick={() => setLang('es')}
                className="px-2 py-1 rounded-md transition-colors"
                style={{
                  color: lang === 'es' ? txt : langInactive,
                  background: lang === 'es' ? langActiveBg : 'transparent',
                }}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className="px-2 py-1 rounded-md transition-colors"
                style={{
                  color: lang === 'en' ? txt : langInactive,
                  background: lang === 'en' ? langActiveBg : 'transparent',
                }}
              >
                EN
              </button>
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF5B00', boxShadow: '0 6px 18px rgba(255,91,0,0.35)' }}
            >
              <WhatsappLogo size={14} weight="fill" />
              <span className="hidden sm:inline">{t.nav.whatsapp}</span>
            </a>

            <button
              className="md:hidden p-1 transition-colors"
              style={{ color: txt }}
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
            >
              <List size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menú mobile — panel sólido */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute top-0 left-0 right-0 rounded-b-[32px] px-6 pt-5 pb-8 overflow-hidden"
            style={{ background: '#0C1521' }}
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(196,78,146,0.30), transparent 65%)' }}
            />
            <div
              aria-hidden
              className="absolute -bottom-28 -left-16 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(66,194,194,0.22), transparent 65%)' }}
            />

            <div className="relative flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'var(--grad-ddt)' }}
                >
                  <Sparkle size={16} weight="fill" />
                </span>
                <span className="font-bold text-[#F0EDE8]">Diego</span>
              </div>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#F0EDE8]"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                onClick={() => setOpen(false)}
                aria-label={t.nav.closeMenu}
              >
                <X size={20} />
              </button>
            </div>

            <ul className="relative flex flex-col">
              {navLinks.map((link) => {
                const active = activeId === link.id;
                return (
                  <li key={link.id} className="relative">
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-full"
                        style={{ background: 'var(--grad-ddt)' }}
                      />
                    )}
                    <a
                      href={link.href}
                      onClick={(e) => onNavClick(e, link.href)}
                      className="block py-3 pl-4 text-2xl font-bold transition-colors"
                      style={{ color: active ? '#F0EDE8' : 'rgba(240,237,232,0.55)' }}
                    >
                      {t.nav[link.key]}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="relative mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              <Link
                href="/dream15"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 justify-center w-full rounded-2xl py-3.5 text-base font-bold text-white"
                style={{ background: 'var(--grad-ddt)' }}
              >
                <Sparkle size={18} weight="fill" />
                {t.nav.dream15Full}
              </Link>

              <div className="flex items-center gap-3 mt-3">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 justify-center flex-1 rounded-2xl py-3.5 text-base font-bold text-white"
                  style={{ backgroundColor: '#FF5B00', boxShadow: '0 6px 18px rgba(255,91,0,0.35)' }}
                >
                  <WhatsappLogo size={18} weight="fill" />
                  {t.nav.whatsapp}
                </a>
                <div className="flex items-center gap-1 text-sm font-semibold px-2">
                  <button
                    onClick={() => setLang('es')}
                    style={{ color: lang === 'es' ? '#F0EDE8' : 'rgba(240,237,232,0.30)' }}
                  >
                    ES
                  </button>
                  <span className="text-[#F0EDE8]/30">/</span>
                  <button
                    onClick={() => setLang('en')}
                    style={{ color: lang === 'en' ? '#F0EDE8' : 'rgba(240,237,232,0.30)' }}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
