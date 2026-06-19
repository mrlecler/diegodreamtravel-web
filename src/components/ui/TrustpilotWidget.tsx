'use client';

import { useEffect } from 'react';

interface TrustpilotWidgetProps {
  templateId: string;
  businessunitId: string;
  height?: string;
  theme?: 'dark' | 'light';
  locale?: string;
  className?: string;
}

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: Element, force?: boolean) => void };
  }
}

export default function TrustpilotWidget({
  templateId,
  businessunitId,
  height = '130px',
  theme = 'dark',
  locale = 'es-AR',
  className = '',
}: TrustpilotWidgetProps) {
  useEffect(() => {
    // Carga el script de TrustBox una sola vez
    const SCRIPT_ID = 'trustpilot-widget-script';
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      script.onload = () => {
        const box = document.querySelector('.trustpilot-widget');
        if (box && window.Trustpilot) {
          window.Trustpilot.loadFromElement(box, true);
        }
      };
      document.head.appendChild(script);
    } else if (window.Trustpilot) {
      const box = document.querySelector('.trustpilot-widget');
      if (box) window.Trustpilot.loadFromElement(box, true);
    }
  }, []);

  if (!templateId || !businessunitId) {
    return (
      <div className={`flex items-center justify-center rounded-2xl border border-white/10 bg-white/3 px-6 py-8 text-sm text-[#F0EDE8]/40 ${className}`}>
        Widget Trustpilot — completar data-template-id y data-businessunit-id
      </div>
    );
  }

  return (
    <div
      className={`trustpilot-widget ${className}`}
      data-locale={locale}
      data-template-id={templateId}
      data-businessunit-id={businessunitId}
      data-style-height={height}
      data-style-width="100%"
      data-theme={theme}
    >
      <a
        href="https://www.trustpilot.com/review/diegodreamtravel.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#F0EDE8]/40 hover:text-[#F0EDE8]/70"
      >
        Ver reseñas en Trustpilot
      </a>
    </div>
  );
}
