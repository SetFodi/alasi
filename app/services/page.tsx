import type { Metadata } from 'next';
import Link from 'next/link';
import BodyClass from '@/components/BodyClass';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { getSiteContent } from '@/lib/content-store';
import { absoluteUrl, SITE_URL } from '@/lib/seo';
import { getServicePath, serviceHub, servicePages } from '@/lib/service-pages';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: serviceHub.metaTitle,
  description: serviceHub.metaDescription,
  alternates: {
    canonical: serviceHub.path,
  },
  openGraph: {
    title: serviceHub.metaTitle,
    description: serviceHub.metaDescription,
    url: absoluteUrl(serviceHub.path),
    siteName: 'Alasi',
    locale: 'ka_GE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ServicesPage() {
  const content = await getSiteContent();

  return (
    <>
      <BodyClass className="service-page" />
      <Navbar fabricPage content={content} />
      <main className="service-main">
        <section className="service-hub-hero">
          <div className="service-shell">
            <p className="service-eyebrow">Alasi · ბათუმი · დაჩრდილვის სისტემები</p>
            <h1>{serviceHub.title}</h1>
            <p className="service-lead">
              მარკიზები, პერგოლები, აივნის ჩარდახები და კომერციული ტენტები ერთ სივრცეში: დაგეგმვა, ქსოვილის არჩევა, აზომვა და მონტაჟი ბათუმში.
            </p>
            <div className="service-hero-actions">
              <Link className="service-primary" href="/#contact">უფასო კონსულტაცია</Link>
              <Link className="service-secondary" href="/fabrics">ქსოვილების ნახვა</Link>
            </div>
          </div>
        </section>

        <section className="service-list-section">
          <div className="service-shell">
            <div className="service-grid">
              {servicePages.map(page => (
                <Link className="service-card-link reveal" href={getServicePath(page.slug)} key={page.slug}>
                  <span className="service-card-image">
                    <img src={page.image} alt={page.imageAlt} />
                  </span>
                  <span className="service-card-copy">
                    <span className="service-kicker">{page.eyebrow}</span>
                    <strong>{page.title}</strong>
                    <span>{page.metaDescription}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer content={content} />
      <RevealObserver />
    </>
  );
}
