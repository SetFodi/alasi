import defaultContent, { type SiteContent } from '@/lib/site-content';

export default function Footer({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.footer;

  return (
    <footer className="site-footer" style={{ background: '#120A09', padding: '64px 64px 36px', borderTop: '1px solid rgba(216,196,168,0.08)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="footer-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 56 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-site)', fontSize: 30, fontWeight: 400, fontStyle: 'italic', color: 'var(--c-cream)', letterSpacing: '0.03em' }}>{copy.brand}</span>
            <p style={{ fontSize: 12, color: 'var(--c-sand)', marginTop: 16, lineHeight: 1.75, opacity: 0.6, maxWidth: 260 }}>
              {copy.description}
            </p>
            <p style={{ fontSize: 11, color: 'var(--c-sand)', marginTop: 14, opacity: 0.4, letterSpacing: '0.06em' }}>{copy.location}</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 12 }}>
              <a href={copy.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Alasi Instagram" style={{ width: 34, height: 34, border: '1px solid rgba(216,196,168,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--c-sand)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-sand)', marginBottom: 18, opacity: 0.5 }}>{copy.productsTitle}</p>
            {['Retractable Awnings','Balcony Systems','CAFE Terraces','Pergola Shading','Fabrics'].map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: 12, color: 'var(--c-sand)', textDecoration: 'none', marginBottom: 9, opacity: 0.6 }}>{item}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-sand)', marginBottom: 18, opacity: 0.5 }}>{copy.companyTitle}</p>
            {['About Alasi','Projects','Installation','FAQ','Contact'].map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: 12, color: 'var(--c-sand)', textDecoration: 'none', marginBottom: 9, opacity: 0.6 }}>{item}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-sand)', marginBottom: 18, opacity: 0.5 }}>{copy.contactTitle}</p>
            {[copy.phone2, copy.phone3, copy.email, copy.addressLine1, copy.addressLine2, copy.country].map(item => (
              <a
                key={item}
                href={item.includes('@') ? `mailto:${item}` : '#'}
                style={{
                  display: 'block',
                  fontFamily: item.includes('@') ? 'Georgia, serif' : undefined,
                  fontSize: 12,
                  color: 'var(--c-sand)',
                  textDecoration: 'none',
                  marginBottom: 9,
                  opacity: 0.6,
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(216,196,168,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 11, color: 'var(--c-sand)', opacity: 0.35 }}>{copy.copyright}</p>
          <p style={{ fontSize: 10, color: 'var(--c-sand)', opacity: 0.25, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{copy.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
