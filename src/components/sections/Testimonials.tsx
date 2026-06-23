'use client';

import { useLang } from '@/lib/language';

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section
      id="testimonios"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1521] leading-tight">
            {t.testimonials.titleA}
            <span className="text-grad-ddt">{t.testimonials.titleHighlight}</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.testimonials.items.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl border p-6 flex flex-col gap-5"
              style={{
                borderColor: 'rgba(5,14,31,.07)',
                boxShadow: '0 2px 16px rgba(5,14,31,.06)',
              }}
            >
              <div className="flex gap-0.5 text-[#FF5B00] text-sm">★★★★★</div>
              <p className="text-[#475066] text-sm leading-relaxed flex-1">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'rgba(5,14,31,.06)' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: 'var(--grad-ddt)' }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-[#0C1521] font-semibold text-xs">{item.name}</p>
                  <p className="text-[#475066]/60 text-[10px]">{t.testimonials.reviewTag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot footer */}
        <div className="text-center flex flex-col gap-2">
          <p className="text-sm text-[#475066]">{t.testimonials.trustLine}</p>
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#475066]/60 underline underline-offset-2 hover:text-[#0C1521] transition-colors"
          >
            {t.testimonials.seeAll}
          </a>
        </div>
      </div>
    </section>
  );
}
