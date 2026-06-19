import SectionDivider from '@/components/ui/SectionDivider';

const items = [
  'Agente certificado Disney',
  'Agente certificado Universal',
  '+500 viajes organizados',
  '★★★★★ Trustpilot',
  'Atención personalizada',
];

export default function D15TrustBar() {
  return (
    <section id="trust" className="py-6 px-6">
      <SectionDivider className="mb-6" style={{ background: 'var(--grad-quince)' }} />
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-4xl mx-auto">
        {items.map((item) => (
          <li key={item} className="text-sm text-[#F0EDE8]/50 font-medium tracking-wide">
            {item}
          </li>
        ))}
      </ul>
      <SectionDivider className="mt-6" style={{ background: 'var(--grad-quince)' }} />
    </section>
  );
}
