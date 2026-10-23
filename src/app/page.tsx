import type { Metadata } from 'next';
import NavIsland from '@/components/layout/NavIsland';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import AboutDiego from '@/components/sections/AboutDiego';
import Services from '@/components/sections/Services';
import WhyMe from '@/components/sections/WhyMe';
import Testimonials from '@/components/sections/Testimonials';
import CTAClose from '@/components/sections/CTAClose';
import ContactSection from '@/components/sections/ContactSection';
import SectionDivider from '@/components/SectionDivider';
import SparkleTrail from '@/components/SparkleTrail';

// El resto de la metadata viene del layout. El canónico va acá y no en el
// layout: ahí lo heredarían todas las páginas apuntando a la home.
// dev.diegodreamtravel.com sirve el mismo deployment; el canónico es www.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

// Divisor sobre fondo crema (entre secciones claras)
function Divider() {
  return (
    <div style={{ backgroundColor: 'var(--warm)' }}>
      <SectionDivider />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <NavIsland />
      <main>
        <Hero />
        <TrustBar />
        <AboutDiego />
        <Divider />
        <Services />
        <Divider />
        <WhyMe />
        <Divider />
        <Testimonials />
        <CTAClose />
        <ContactSection />
      </main>
      <Footer />
      {/* Estela de estrellitas del mouse (solo escritorio) */}
      <SparkleTrail />
    </>
  );
}
