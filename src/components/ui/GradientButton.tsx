'use client';

import Link from 'next/link';

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GradientButton({
  children,
  href,
  onClick,
  className = '',
}: GradientButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(244,123,69,0.3)]';
  const style = { background: 'var(--grad-ddt)' };

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${className}`} style={style}>
      {children}
    </button>
  );
}
