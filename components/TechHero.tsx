import Link from 'next/link';
import defaultContent, { type SiteContent } from '@/lib/site-content';

const HERO_IMAGES = [
  { src: '/uploads/image1.jpg', label: 'Pergola terrace', className: 'wide' },
  { src: '/uploads/image2.jpg', label: 'Screen detail', className: 'tall' },
  { src: '/uploads/image3.jpg', label: 'Evening shade', className: 'base' },
];

export default function TechHero({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.tech.hero;

  return (
    <section className="tech-hero">
      <div className="tech-hero-copy">
        <p className="fabric-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>

        <div className="fabric-hero-actions">
          <Link href="#tech-collection" className="fabric-primary-action">{copy.cta}</Link>
          <Link href="/fabrics" className="tech-secondary-action">{copy.secondaryCta}</Link>
        </div>

        <div className="fabric-hero-meta" aria-label="Technical fabric library details">
          <span><strong>68</strong> {copy.colours}</span>
          <span><strong>4</strong> {copy.categories}</span>
          <span><strong>3</strong> {copy.systems}</span>
        </div>
      </div>

      <div className="tech-visual" aria-hidden="true">
        <div className="tech-visual-header">
          <span>{copy.boardTitle}</span>
          <span>{copy.boardMeta}</span>
        </div>
        <div className="tech-image-grid">
          {HERO_IMAGES.map((image) => (
            <div className={`tech-image-tile ${image.className}`} key={image.src}>
              <img src={image.src} alt="" />
              <span>{image.label}</span>
            </div>
          ))}
          <div className="tech-colour-card">
            <span>Technical palette</span>
            <div>
              <i style={{ background: '#f4f2ed' }} />
              <i style={{ background: '#d09a49' }} />
              <i style={{ background: '#bb0f0b' }} />
              <i style={{ background: '#0b5aa7' }} />
              <i style={{ background: '#004d44' }} />
              <i style={{ background: '#10120c' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
