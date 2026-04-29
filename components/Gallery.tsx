import defaultContent, { type SiteContent } from '@/lib/site-content';

export default function Gallery({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.home.projects;
  return (
    <section id="projects" className="site-section projects-section" style={{ background: 'var(--c-brown)', padding: '120px 64px' }}>
      <div className="reveal section-shell" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 14 }}>{copy.eyebrow}</p>
            <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 52, fontWeight: 300, color: 'var(--c-cream)', lineHeight: 1.1 }}>{copy.title}</h2>
          </div>
          <a href="#contact" style={{ fontSize: 12, color: 'var(--c-sand)', textDecoration: 'none', letterSpacing: '0.08em', borderBottom: '1px solid rgba(216,196,168,0.35)', paddingBottom: 2 }}>{copy.link}</a>
        </div>

        <div className="gallery-grid-main" style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gridTemplateRows: '240px 240px', gap: 6 }}>
          <div className="photo-card gallery-card" style={{ gridRow: '1 / 3', position: 'relative', overflow: 'hidden', cursor: 'pointer', background: 'var(--c-very-dark)', borderRadius: 3 }}>
            <img src="/uploads/The_scene_features_an_awning_w_Nano_Banana_Pro_77361.jpg" alt="Villa Terrace · Kobuleti" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,13,0.12)', transition: 'background 0.45s ease' }} />
            <div className="gallery-label" style={{ position: 'absolute', bottom: 24, left: 24 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 5 }}>Residential</p>
              <p style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 18, color: 'var(--c-cream)', fontWeight: 400 }}>Villa Terrace · Kobuleti</p>
            </div>
          </div>
          <div className="photo-card gallery-card" style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: 'var(--c-very-dark)', borderRadius: 3 }}>
            <img src="/uploads/Setting_The_elegant_soft-frame_Nano_Banana_Pro_73429.jpg" alt="Coastal Balcony · Batumi Boulevard" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
            <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,13,0.12)', transition: 'background 0.45s ease' }} />
            <div className="gallery-label" style={{ position: 'absolute', bottom: 20, left: 20 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 5 }}>Balcony</p>
              <p style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 15, color: 'var(--c-cream)', fontWeight: 400 }}>Coastal Balcony · Batumi Boulevard</p>
            </div>
          </div>
          <div className="photo-card gallery-card" style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: 'var(--c-very-dark)', borderRadius: 3 }}>
            <img src="/uploads/Capture_an_architectural_shot__Nano_Banana_Pro_18949.jpg" alt="Seaside CAFE · Batumi Seafront" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,13,0.12)', transition: 'background 0.45s ease' }} />
            <div className="gallery-label" style={{ position: 'absolute', bottom: 20, left: 20 }}>
              <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 5 }}>Commercial</p>
              <p style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 15, color: 'var(--c-cream)', fontWeight: 400 }}>Seaside CAFE · Batumi Seafront</p>
            </div>
          </div>
        </div>

        <div className="gallery-grid-secondary" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 6 }}>
          {[
            { img: '/uploads/awning-chatgpt.jpg', cat: 'Hospitality', title: 'Rooftop Lounge · Tbilisi' },
            { img: '/uploads/Capture_an_architectural_shot__Nano_Banana_Pro_18949.jpg', cat: 'Residential', title: 'Sunset Terrace · Adjara', pos: 'center 60%' },
            { img: '/uploads/Setting_The_elegant_soft-frame_Nano_Banana_Pro_73429.jpg', cat: 'Residential', title: 'Mountain Villa · Mestia', pos: 'center 80%' },
          ].map((c, i) => (
            <div key={i} className="photo-card gallery-card" style={{ height: 320, position: 'relative', overflow: 'hidden', cursor: 'pointer', background: 'var(--c-very-dark)', borderRadius: 3 }}>
              <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos, display: 'block' }} />
              <div className="card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,13,0.12)', transition: 'background 0.45s ease' }} />
              <div className="gallery-label" style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 5 }}>{c.cat}</p>
                <p style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 15, color: 'var(--c-cream)', fontWeight: 400 }}>{c.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
