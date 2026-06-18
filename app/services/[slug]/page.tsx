import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BodyClass from '@/components/BodyClass';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import { getSiteContent } from '@/lib/content-store';
import {
  createServiceMetadata,
  getServiceJsonLd,
  getServicePage,
  getServicePath,
  servicePages,
} from '@/lib/service-pages';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return servicePages.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return createServiceMetadata(page);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const content = await getSiteContent();
  const jsonLd = JSON.stringify(getServiceJsonLd(page)).replace(/</g, '\\u003c');
  const relatedPages = page.related
    .map(relatedSlug => getServicePage(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <BodyClass className="service-page" />
      <Navbar fabricPage content={content} />
      <main className="service-main">
        <script
          id={`service-schema-${page.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <section className="service-detail-hero">
          <div className="service-detail-copy">
            <p className="service-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="service-lead">{page.summary}</p>
            <div className="service-hero-actions">
              <Link className="service-primary" href="/#contact">უფასო აზომვა</Link>
              <Link className="service-secondary" href="/fabrics">ქსოვილის არჩევა</Link>
            </div>
          </div>
          <div className="service-detail-image">
            <img src={page.image} alt={page.imageAlt} />
          </div>
        </section>

        <section className="service-proof-band">
          {page.proof.map(item => (
            <span key={item}>{item}</span>
          ))}
        </section>

        <section className="service-content-section">
          <div className="service-shell service-two-column">
            <div className="service-intro reveal">
              <p className="service-eyebrow">რატომ Alasi</p>
              <h2>{page.lead}</h2>
            </div>
            <div className="service-benefits">
              {page.benefits.map(item => (
                <article className="service-benefit reveal" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-process-section">
          <div className="service-shell">
            <div className="service-section-head reveal">
              <p className="service-eyebrow">პროცესი</p>
              <h2>როგორ მივდივართ იდეიდან მონტაჟამდე</h2>
            </div>
            <div className="service-process-grid">
              {page.process.map((item, index) => (
                <article className="service-process-item reveal" key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-faq-section">
          <div className="service-shell service-two-column">
            <div className="service-section-head reveal">
              <p className="service-eyebrow">ხშირი კითხვები</p>
              <h2>რაც გადაწყვეტილებამდე უნდა იცოდეთ</h2>
            </div>
            <div className="service-faq-list">
              {page.faq.map(item => (
                <article className="service-faq-item reveal" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-related-section">
          <div className="service-shell">
            <div className="service-section-head reveal">
              <p className="service-eyebrow">დაკავშირებული სერვისები</p>
              <h2>ნახეთ სხვა ვარიანტებიც</h2>
            </div>
            <div className="service-related-grid">
              {relatedPages.map(item => (
                <Link className="service-related-link reveal" href={getServicePath(item.slug)} key={item.slug}>
                  <span>{item.eyebrow}</span>
                  <strong>{item.title}</strong>
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
