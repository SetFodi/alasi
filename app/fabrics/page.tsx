import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FabricHero from '@/components/FabricHero';
import AdvanceCatalog from '@/components/AdvanceCatalog';
import BodyClass from '@/components/BodyClass';
import { getSiteContent } from '@/lib/content-store';
import { getPricing } from '@/lib/pricing-store';
import type { CalculatorCopy } from '@/components/Calculator';
import { createSeoMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();
  return createSeoMetadata(siteContent, 'fabrics');
}

export const dynamic = 'force-dynamic';

export default async function FabricsPage() {
  const [siteContent, pricing] = await Promise.all([getSiteContent(), getPricing()]);
  const calculatorCopy = (siteContent as unknown as { calculator?: CalculatorCopy }).calculator!;

  return (
    <>
      <BodyClass className="fabric-page" />
      <Navbar fabricPage content={siteContent} />
      <main className="fabric-main">
        <FabricHero content={siteContent} />
        <AdvanceCatalog content={siteContent} pricing={pricing} calculatorCopy={calculatorCopy} />
      </main>
    </>
  );
}
