import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import BodyClass from '@/components/BodyClass';
import TechHero from '@/components/TechHero';
import TechCatalog from '@/components/TechCatalog';
import Footer from '@/components/Footer';
import content from '@/lib/site-content';
import { getSiteContent } from '@/lib/content-store';

export const metadata: Metadata = {
  title: content.seo.techTitle,
  description: content.seo.techDescription,
};

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
