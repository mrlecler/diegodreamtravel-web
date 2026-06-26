import NavIsland from '@/components/layout/NavIsland';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import AboutDiego from '@/components/sections/AboutDiego';
import Services from '@/components/sections/Services';
import WhyMe from '@/components/sections/WhyMe';
import Testimonials from '@/components/sections/Testimonials';
import CTAClose from '@/components/sections/CTAClose';
import SectionDivider from '@/components/SectionDivider';

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
      </main>
      <Footer />
    </>
  );
}
