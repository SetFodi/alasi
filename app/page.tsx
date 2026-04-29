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
import { getSiteContent } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Navbar content={content} />
      <Hero content={content} />
      <Marquee />
      <Products content={content} />
      <Features content={content} />
      <Gallery content={content} />
      <Process content={content} />
      <About content={content} />
      <Contact content={content} />
      <Footer content={content} />
      <RevealObserver />
    </>
  );
}
