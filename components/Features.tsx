import defaultContent, { type SiteContent } from '@/lib/site-content';

const features = [
  { icon: '☀', title: 'UV Protection', text: 'Blocks up to 95% of UV rays. Certified outdoor fabrics protect people and furnishings from direct sunlight.' },
  { icon: '🌧', title: 'Weather Resistant', text: "Acrylic-woven textiles rated for coastal humidity, heavy rain, and coastal wind. Colorfastness for 5+ years." },
  { icon: '⚙', title: 'Motorized or Manual', text: 'Smooth electric motors with remote and wind sensor, or classic hand-crank — both built to last decades.' },
  { icon: '📐', title: 'Custom Sizing', text: 'Every system is measured, fabricated, and installed on-site by our certified team. No standard sizes — only yours.', last: true },
];

export default function Features({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.home.features;
  return (
    <section className="site-section features-section" style={{ background: '#3A1E1C', padding: '110px 64px' }}>
      <div className="reveal section-shell" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-heading section-heading-center" style={{ textAlign: 'center', marginBottom: 80 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 16 }}>{copy.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 52, fontWeight: 300, color: 'var(--c-cream)', lineHeight: 1.1 }}>
            {copy.title}<br /><em style={{ fontStyle: 'italic' }}>{copy.titleAccent}</em>
          </h2>
        </div>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(216,196,168,0.1)' }}>
          {features.map((f, i) => (
            <div key={i} className="feat-col" style={{ padding: '52px 40px', borderRight: f.last ? 'none' : '1px solid rgba(216,196,168,0.1)', borderBottom: '1px solid rgba(216,196,168,0.1)', transition: 'background 0.3s' }}>
              <div className="feat-icon" style={{ fontSize: 28, marginBottom: 28, opacity: 0.6, transition: 'opacity 0.3s' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 22, fontWeight: 400, color: 'var(--c-cream)', marginBottom: 14, lineHeight: 1.3 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--c-sand)', lineHeight: 1.8, opacity: 0.8 }}>{f.text}</p>
              <div className="feat-line" style={{ marginTop: 32, width: 24, height: 1, background: 'var(--tweak-accent)', transition: 'width 0.4s ease' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
