import NavIsland from '@/components/layout/NavIsland';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import AboutDiego from '@/components/sections/AboutDiego';
import CTAClose from '@/components/sections/CTAClose';

export default function Home() {
  return (
    <>
      <NavIsland />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Testimonials />
        <AboutDiego />
        <CTAClose />
      </main>
      <Footer />
    </>
  );
}
