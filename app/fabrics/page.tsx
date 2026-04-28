import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FabricHero from '@/components/FabricHero';
import AdvanceCatalog from '@/components/AdvanceCatalog';
import BodyClass from '@/components/BodyClass';

export const metadata: Metadata = {
  title: 'Alasi — Fabric Library',
  description: '89 outdoor colours from the Advance collection — preview every one live on a 3D awning model.',
};

export default function FabricsPage() {
  return (
    <>
      <BodyClass className="fabric-page" />
      <Navbar fabricPage />
      <main className="fabric-main">
        <FabricHero />
        <AdvanceCatalog />
      </main>
    </>
  );
}
