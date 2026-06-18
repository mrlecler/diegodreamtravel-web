import SectionDivider from '@/components/ui/SectionDivider';

const items = [
  { label: 'Agente certificado Disney' },
  { label: 'Agente certificado Universal' },
  { label: '+500 viajes organizados' },
  { label: 'Atención 100% personalizada' },
  { label: '★★★★★ Trustpilot' },
];

export default function TrustBar() {
  return (
    <section className="py-6 px-6">
      <SectionDivider className="mb-6" />
      <div className="max-w-5xl mx-auto overflow-hidden">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <li
              key={item.label}
              className="text-sm text-[#F0EDE8]/50 font-medium tracking-wide"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <SectionDivider className="mt-6" />
    </section>
  );
}
