const items = [
  'Walt Disney World',
  'Universal Studios',
  'Dream 15',
  'Viaje de 15',
  'Caribe',
  'Cancún',
  'Europa',
  'Grupos',
  'Conciertos',
];

export default function TrustBar() {
  const doubled = [...items, ...items];

  return (
    <section style={{ backgroundColor: 'var(--warm)' }} className="py-5 overflow-hidden">
      <style>{`
        @keyframes trustMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-trust-marquee {
          animation: trustMarquee 28s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="flex">
        <div className="animate-trust-marquee flex shrink-0 items-center gap-0">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 whitespace-nowrap px-6 text-sm font-semibold tracking-wide text-[#0C1521]/50"
            >
              {item}
              <span className="text-[#0C1521]/20 text-base">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
