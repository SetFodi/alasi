import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BodyClass from '@/components/BodyClass';
import TechHero from '@/components/TechHero';
import TechCatalog from '@/components/TechCatalog';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/lib/content-store';
import { createSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();
  return createSeoMetadata(siteContent, 'tech');
}

export const dynamic = 'force-dynamic';

export default async function TechPage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <BodyClass className="tech-page" />
      <Navbar fabricPage content={siteContent} />
      <main className="tech-main">
        <TechHero content={siteContent} />
        <TechCatalog content={siteContent} />
      </main>
      <Footer content={siteContent} />
    </>
  );
}
