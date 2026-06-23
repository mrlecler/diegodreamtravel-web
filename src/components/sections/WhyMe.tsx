'use client';

import {
  SealCheck,
  UserCircle,
  DeviceMobile,
  CreditCard,
  Headset,
} from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const icons = [SealCheck, UserCircle, DeviceMobile, CreditCard, Headset];

export default function WhyMe() {
  const { t } = useLang();

  return (
    <section
      id="por-que"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            {t.why.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1521] leading-tight">
            {t.why.titleA}
            <span className="text-grad-ddt">{t.why.titleHighlight}</span>
            {t.why.titleB}
          </h2>
          <p className="text-[#475066] max-w-lg mx-auto leading-relaxed">{t.why.sub}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.why.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl border p-6 flex flex-col gap-4 relative"
                style={{
                  borderColor: 'rgba(5,14,31,.07)',
                  boxShadow: '0 2px 16px rgba(5,14,31,.06)',
                }}
              >
                {card.badge && (
                  <span
                    className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--grad-ddt)' }}
                  >
                    {card.badge}
                  </span>
                )}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--grad-ddt)' }}
                >
                  <Icon size={20} weight="duotone" color="white" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-[#0C1521] text-sm leading-snug">{card.title}</h3>
                  <p className="text-xs text-[#475066] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
