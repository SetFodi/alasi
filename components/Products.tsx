import Link from 'next/link';
import defaultContent, { type SiteContent } from '@/lib/site-content';

const PRODUCT_LINKS = [
  '/services/markizebi-batumshi',
  '/services/aivnis-markizebi',
  '/services/terasisa-da-kafes-tentebi',
  '/services/pergolebi-batumshi',
];

export default function Products({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.home.products;
  return (
    <section id="products" className="site-section products-section" style={{ background: 'var(--c-dark-brown)', padding: '120px 64px' }}>
      <div className="reveal section-shell" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 14 }}>{copy.eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 54, fontWeight: 300, color: 'var(--c-cream)', lineHeight: 1.1 }}>
              {copy.title}<br /><em style={{ fontStyle: 'italic' }}>{copy.titleAccent}</em>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--c-sand)', maxWidth: 320, textAlign: 'right', lineHeight: 1.8, opacity: 0.75 }}>
            {copy.body}
          </p>
        </div>
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
          {copy.list.map((p, i) => (
            <Link key={i} href={PRODUCT_LINKS[i] ?? '/services'} className="photo-card product-card" style={{ position: 'relative', aspectRatio: '3/4', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'block', color: 'inherit', textDecoration: 'none' }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,13,0.75) 0%, rgba(26,14,13,0.1) 60%, transparent 100%)', transition: 'background 0.5s ease' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 8, fontWeight: 500 }}>{p.geo}</p>
                <h3 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 22, fontWeight: 400, color: 'var(--c-cream)', lineHeight: 1.2 }}>{p.name}</h3>
                <p className="card-desc" style={{ fontSize: 12, color: 'var(--c-sand)', lineHeight: 1.65, opacity: 0.9, maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.45s ease' }}>{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
