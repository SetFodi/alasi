import Link from 'next/link';
import defaultContent, { type SiteContent } from '@/lib/site-content';

const FEATURED_SWATCHES = [
  { src: '/uploads/copentek/textures/80180551-Verde.jpg.webp', name: 'Verde', code: '80180551', size: 'large' },
  { src: '/uploads/copentek/textures/80180547-Marino.jpg.webp', name: 'Marino', code: '80180547', size: 'wide' },
  { src: '/uploads/copentek/textures/80180580-fantasy-Red-e1657706298710.jpg.webp', name: 'Fantasy red', code: '80180580', size: 'tall' },
  { src: '/uploads/copentek/textures/80180533-Palm.jpg.webp', name: 'Palm', code: '80180533', size: 'small' },
  { src: '/uploads/copentek/textures/80180568-Palermo.jpg.webp', name: 'Palermo', code: '80180568', size: 'wide' },
  { src: '/uploads/copentek/textures/80180543-Turquesa.jpg.webp', name: 'Turquesa', code: '80180543', size: 'tall' },
  { src: '/uploads/copentek/textures/80180532-Mostaza.jpg.webp', name: 'Mostaza', code: '80180532', size: 'small' },
  { src: '/uploads/copentek/textures/80180564-Gris-Claro-Esp.jpg.webp', name: 'Gris claro', code: '80180564', size: 'large' },
];

export default function FabricHero({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.fabrics.hero;

  return (
    <section className="fabric-hero">
      <div className="fabric-hero-copy">
        <p className="fabric-eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.title}
        </h1>
        <p>
          {copy.body}
        </p>

        <div className="fabric-hero-actions">
          <Link href="#collection" className="fabric-primary-action">{copy.cta}</Link>
          <span>{copy.note}</span>
        </div>

        <div className="fabric-hero-meta" aria-label="Fabric library details">
          <span><strong>89</strong> {copy.colours}</span>
          <span><strong>3</strong> {copy.collections}</span>
          <span><strong>2</strong> {copy.models}</span>
        </div>
      </div>

      <div className="fabric-showcase" aria-hidden="true">
        <div className="fabric-showcase-panel">
          <div className="fabric-showcase-top">
            <span>{copy.boardTitle}</span>
            <span>{copy.boardMeta}</span>
          </div>

          <div className="fabric-swatch-board">
            {FEATURED_SWATCHES.map((swatch) => (
              <div className={`fabric-board-tile ${swatch.size}`} key={swatch.code}>
                <img src={swatch.src} alt="" />
                <span>{swatch.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
