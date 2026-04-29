const Diamond = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" style={{ flexShrink: 0, opacity: 0.3 }}>
    <rect x="3" y="0" width="4.24" height="4.24" transform="rotate(45 3 3)" fill="var(--c-sand)" />
  </svg>
);

const SWATCHES = [
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180568-Palermo.jpg.webp', name: 'Palermo' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180573-Mediterraneo.jpg.webp', name: 'Mediterráneo' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180547-Marino.jpg.webp', name: 'Marino' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180551-Verde.jpg.webp', name: 'Verde' },
  { src: 'https://copentek.com/wp-content/uploads/2022/07/80180572-Garden.jpg.webp', name: 'Garden' },
];

function TextLabel({ text }: { text: string }) {
  return (
    <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-sand)', opacity: 0.55, whiteSpace: 'nowrap', flexShrink: 0 }}>
      {text}
    </span>
  );
}

function LogoBadge({ src, alt, height = 18 }: { src: string; alt: string; height?: number }) {
  return (
    <img src={src} alt={alt} style={{ height, width: 'auto', flexShrink: 0, filter: 'grayscale(1) brightness(1.5)', opacity: 0.45, display: 'block' }} />
  );
}

function SwatchRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
      {SWATCHES.map(s => (
        <div key={s.name} title={s.name} style={{ width: 20, height: 32, overflow: 'hidden', flexShrink: 0 }}>
          <img src={s.src} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.5 }} />
        </div>
      ))}
    </div>
  );
}

function Track() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexShrink: 0 }}>
      <TextLabel text="Retractable Awnings" />
      <Diamond />
      <LogoBadge src="/uploads/certs/oekotex.png" alt="OEKO-TEX" height={30} />
      <Diamond />
      <TextLabel text="Balcony Systems" />
      <Diamond />
      <SwatchRow />
      <Diamond />
      <TextLabel text="CAFÉ Terraces" />
      <Diamond />
      <TextLabel text="Pergola Shading" />
      <Diamond />
      <TextLabel text="UV Protection" />
      <Diamond />
      <SwatchRow />
      <Diamond />
      <TextLabel text="Motorized Control" />
      <Diamond />
      <LogoBadge src="/uploads/certs/oekotex.png" alt="OEKO-TEX" height={30} />
      <Diamond />
      <TextLabel text="Custom Fabrication" />
      <Diamond />
      <TextLabel text="Georgian-Made" />
      <Diamond />
    </div>
  );
}

export default function Marquee() {
  return (
    <div style={{
      background: 'var(--c-very-dark)',
      borderTop: '1px solid rgba(216,196,168,0.08)',
      borderBottom: '1px solid rgba(216,196,168,0.08)',
      padding: '20px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to right, var(--c-very-dark), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(to left, var(--c-very-dark), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', gap: 28, animation: 'marquee 38s linear infinite', width: 'max-content' }}>
        <Track />
        <Track />
        <Track />
      </div>
    </div>
  );
}
