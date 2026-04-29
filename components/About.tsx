import defaultContent, { type SiteContent } from '@/lib/site-content';

export default function About({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.home.about;
  const stats = [
    [copy.stat1Value, copy.stat1Label],
    [copy.stat2Value, copy.stat2Label],
    [copy.stat3Value, copy.stat3Label],
  ];

  return (
    <section id="about" className="site-section about-section" style={{ background: 'var(--c-brown)', padding: '120px 64px' }}>
      <div className="reveal section-shell about-layout" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 22 }}>{copy.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 50, fontWeight: 300, color: 'var(--c-cream)', lineHeight: 1.12, marginBottom: 28 }}>
            {copy.title}<br /><em style={{ fontStyle: 'italic' }}>{copy.titleAccent}</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--c-sand)', lineHeight: 1.85, marginBottom: 20, opacity: 0.88 }}>
            {copy.body1}
          </p>
          <p style={{ fontSize: 15, color: 'var(--c-sand)', lineHeight: 1.85, opacity: 0.88 }}>
            {copy.body2}
          </p>
          <div className="about-stats" style={{ marginTop: 52, display: 'flex', gap: 56 }}>
            {stats.map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 40, fontWeight: 300, color: 'var(--c-cream)' }}>{val}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-sand)', opacity: 0.55, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-media" style={{ position: 'relative' }}>
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 1 }} className="photo-card">
            <img src="/uploads/awning-chatgpt.jpg" alt="Batumi terrace" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
