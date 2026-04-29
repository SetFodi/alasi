import defaultContent, { type SiteContent } from '@/lib/site-content';

const steps = [
  { n: '01', title: 'Consultation', text: 'We visit your space, listen to your needs, and discuss tailored solutions.' },
  { n: '02', title: 'Measurement', text: 'Precise on-site measurements — no guesswork, no adjustments after installation.' },
  { n: '03', title: 'Selection', text: 'Choose your fabric, mechanism, and colour from our full collection.' },
  { n: '04', title: 'Installation', text: 'Our certified team installs with care. Clean, fast, guaranteed.' },
];

export default function Process({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.home.process;
  return (
    <section className="site-section process-section" style={{ background: 'var(--c-very-dark)', padding: '120px 64px' }}>
      <div className="reveal section-shell" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-heading section-heading-center" style={{ textAlign: 'center', marginBottom: 80 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 16 }}>{copy.eyebrow}</p>
          <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 52, fontWeight: 300, color: 'var(--c-cream)' }}>
            {copy.title}<br /><em style={{ fontStyle: 'italic' }}>{copy.titleAccent}</em>
          </h2>
        </div>
        <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 27, left: '12%', right: '12%', height: 1, background: 'linear-gradient(to right, transparent, rgba(216,196,168,0.25), rgba(216,196,168,0.25), transparent)' }} />
          {steps.map((s, i) => (
            <div key={i} style={{ padding: '0 36px', textAlign: 'center' }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', border: '1px solid rgba(216,196,168,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', background: 'var(--c-very-dark)', position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 18, color: 'var(--c-sand)', fontWeight: 300 }}>{s.n}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 22, fontWeight: 400, color: 'var(--c-cream)', marginBottom: 14 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--c-sand)', lineHeight: 1.8, opacity: 0.8 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
