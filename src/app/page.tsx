import NavIsland from '@/components/layout/NavIsland';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import AboutDiego from '@/components/sections/AboutDiego';
import Services from '@/components/sections/Services';
import WhyMe from '@/components/sections/WhyMe';
import Testimonials from '@/components/sections/Testimonials';
import CTAClose from '@/components/sections/CTAClose';

export default function Home() {
  return (
    <>
      <NavIsland />
      <main>
        <Hero />
        <TrustBar />
        <AboutDiego />
        <Services />
        <WhyMe />
        <Testimonials />
        <CTAClose />
      </main>
      <Footer />
    </>
  );
}
