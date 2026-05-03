import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calculator, { type CalculatorCopy } from '@/components/Calculator';
import BodyClass from '@/components/BodyClass';
import { getSiteContent } from '@/lib/content-store';
import { getPricing } from '@/lib/pricing-store';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alasi — Awning Calculator',
  description: 'Configure your awning, see the price instantly, and request your order.',
};

export default async function CalculatorPage() {
  const [content, pricing] = await Promise.all([getSiteContent(), getPricing()]);
  const copy = (content as unknown as { calculator?: CalculatorCopy }).calculator!;

  return (
    <>
      <BodyClass className="fabric-page" />
      <Navbar fabricPage content={content} />
      <main className="calc-page">
        <Calculator pricing={pricing} copy={copy} />
      </main>
      <Footer content={content} />
    </>
  );
}
