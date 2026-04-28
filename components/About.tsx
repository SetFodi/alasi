export default function About() {
  return (
    <section id="about" className="site-section about-section" style={{ background: 'var(--c-brown)', padding: '120px 64px' }}>
      <div className="reveal section-shell about-layout" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 22 }}>Our Story</p>
          <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 50, fontWeight: 300, color: 'var(--c-cream)', lineHeight: 1.12, marginBottom: 28 }}>
            Built for Georgia&apos;s<br /><em style={{ fontStyle: 'italic' }}>light and life</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--c-sand)', lineHeight: 1.85, marginBottom: 20, opacity: 0.88 }}>
            Alasi creates custom awning solutions for Georgian homes, cafés, and outdoor spaces — combining durable European-inspired shading systems with refined local installation.
          </p>
          <p style={{ fontSize: 15, color: 'var(--c-sand)', lineHeight: 1.85, opacity: 0.88 }}>
            Born in Batumi, shaped by the Black Sea&apos;s generous sun and unpredictable winds, we understand that shade is architecture. Our systems are chosen for Georgia&apos;s climate: Tbilisi summer heat, Adjara coastal humidity, and the long terrace evenings that make Georgian life what it is.
          </p>
          <div className="about-stats" style={{ marginTop: 52, display: 'flex', gap: 56 }}>
            {[['8+', 'Years'], ['340+', 'Projects'], ['5★', 'Rated']].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 40, fontWeight: 300, color: 'var(--c-cream)' }}>{val}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-sand)', opacity: 0.55, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-media" style={{ position: 'relative' }}>
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 1 }} className="photo-card">
            <img src="/uploads/Setting_The_elegant_soft-frame_Nano_Banana_Pro_73429.jpg" alt="Batumi terrace" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
