const SWATCHES = [
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180568-Palermo.jpg.webp', name: 'Palermo' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180573-Mediterraneo.jpg.webp', name: 'Mediterráneo' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180547-Marino.jpg.webp', name: 'Marino' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180551-Verde.jpg.webp', name: 'Verde' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180572-Garden.jpg.webp', name: 'Garden' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180576-Capuccino.jpg.webp', name: 'Capuccino' },
];

const SEP = <div style={{ width: 1, height: 48, background: 'rgba(216,196,168,0.12)', flexShrink: 0 }} />;

function Badge({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <span style={{ fontSize: 22, opacity: 0.45 }}>{icon}</span>
      <div>
        <p style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-sea)', marginBottom: 3 }}>{label}</p>
        <p style={{ fontSize: 11, color: 'var(--c-sand)', opacity: 0.72, letterSpacing: '0.04em' }}>{sub}</p>
      </div>
    </div>
  );
}

function Track() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexShrink: 0 }}>

      {/* OEKO-TEX cert */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <img src="/uploads/certs/oekotex.png" alt="OEKO-TEX Standard 100"
          style={{ height: 50, width: 'auto', filter: 'grayscale(1) brightness(1.4)', opacity: 0.55 }} />
        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-sea)', marginBottom: 3 }}>Certified</p>
          <p style={{ fontSize: 11, color: 'var(--c-sand)', opacity: 0.72, letterSpacing: '0.04em' }}>OEKO-TEX® Standard 100</p>
        </div>
      </div>

      {SEP}

      {/* Copentek partner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <img src="/uploads/certs/copentek-logo.svg" alt="Copentek"
          style={{ height: 20, width: 'auto', filter: 'brightness(0) invert(0.6)', opacity: 0.6 }} />
        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-sea)', marginBottom: 3 }}>Official Partner</p>
          <p style={{ fontSize: 11, color: 'var(--c-sand)', opacity: 0.72, letterSpacing: '0.04em' }}>Advance Collection</p>
        </div>
      </div>

      {SEP}

      <Badge icon="☀" label="UV Fastness" sub="Class 7–8 / EN ISO 105-B02" />

      {SEP}

      {/* Fabric swatch strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
        {SWATCHES.map(s => (
          <div key={s.name} title={s.name} style={{ width: 26, height: 48, overflow: 'hidden', flexShrink: 0 }}>
            <img src={s.src} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.6 }} />
          </div>
        ))}
        <div style={{ marginLeft: 12 }}>
          <p style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--c-sea)', marginBottom: 3 }}>89 Colours</p>
          <p style={{ fontSize: 11, color: 'var(--c-sand)', opacity: 0.72, letterSpacing: '0.04em' }}>Advance Fabrics</p>
        </div>
      </div>

      {SEP}

      <Badge icon="💧" label="Water Repellent" sub="> 35 cm/H₂O · UNE-EN 20811" />

      {SEP}

      <Badge icon="🌊" label="Acrylic Woven" sub="295 g/m² · Solution-Dyed" />

      {SEP}

    </div>
  );
}

export default function LogoMarquee() {
  return (
    <div style={{
      background: 'var(--c-very-dark)',
      borderTop: '1px solid rgba(216,196,168,0.07)',
      borderBottom: '1px solid rgba(216,196,168,0.07)',
      padding: '22px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--c-very-dark), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--c-very-dark), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', animation: 'logoMarquee 42s linear infinite', width: 'max-content' }}>
        <Track />
        <Track />
        <Track />
      </div>

      <style>{`@keyframes logoMarquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}
