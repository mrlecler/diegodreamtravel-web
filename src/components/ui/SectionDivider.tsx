interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div
      className={`h-px w-full opacity-40 ${className}`}
      style={{ background: 'var(--grad-ddt)' }}
    />
  );
}
