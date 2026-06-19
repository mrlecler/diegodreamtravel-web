import React from 'react';

interface SectionDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionDivider({ className = '', style }: SectionDividerProps) {
  return (
    <div
      className={`h-px w-full opacity-40 ${className}`}
      style={{ background: 'var(--grad-ddt)', ...style }}
    />
  );
}
