import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Products from '@/components/Products';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Process from '@/components/Process';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <Features />
      <Gallery />
      <Process />
      <About />
      <Contact />
      <Footer />
      <RevealObserver />
    </>
  );
}
