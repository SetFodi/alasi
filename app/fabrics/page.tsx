import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FabricHero from '@/components/FabricHero';
import AdvanceCatalog from '@/components/AdvanceCatalog';
import BodyClass from '@/components/BodyClass';
import content from '@/lib/site-content';
import { getSiteContent } from '@/lib/content-store';

export const metadata: Metadata = {
  title: content.seo.fabricsTitle,
  description: content.seo.fabricsDescription,
};

export const dynamic = 'force-dynamic';

export default async function FabricsPage() {
  const siteContent = await getSiteContent();

  return (
    <>
      <BodyClass className="fabric-page" />
      <Navbar fabricPage content={siteContent} />
      <main className="fabric-main">
        <FabricHero content={siteContent} />
        <AdvanceCatalog content={siteContent} />
      </main>
    </>
  );
}
