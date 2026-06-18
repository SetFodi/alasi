import defaultContent, { type SiteContent } from '@/lib/site-content';
import LeadLink from './LeadLink';

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export default function Contact({ content = defaultContent }: { content?: SiteContent }) {
  const copy = content.home.contact;
  return (
    <section id="contact" className="site-section contact-section" style={{ background: 'var(--c-very-dark)', padding: '140px 64px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(47,93,58,0.1) 0%, transparent 70%)' }} />
      <div className="reveal" style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tweak-accent)', marginBottom: 24 }}>{copy.eyebrow}</p>
        <h2 style={{ fontFamily: 'var(--tweak-font-heading)', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 300, color: 'var(--c-cream)', lineHeight: 1.1, marginBottom: 24 }}>
          {copy.title}<br /><em style={{ fontStyle: 'italic' }}>{copy.titleAccent}</em>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--c-sand)', maxWidth: 460, margin: '0 auto 52px', lineHeight: 1.75, opacity: 0.82 }}>
          {copy.body}
        </p>
        <div className="contact-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <LeadLink leadType="email" href={`mailto:${copy.email}`} className="btn-outline" style={{ background: 'var(--tweak-accent)', borderColor: 'var(--tweak-accent)', padding: '18px 42px' }}>{copy.emailCta}</LeadLink>
          <LeadLink leadType="phone" href={phoneHref(copy.phone1)} className="btn-outline" style={{ borderColor: 'rgba(216,196,168,0.4)', padding: '18px 42px' }}>{copy.phoneCta || copy.phone1}</LeadLink>
          <LeadLink leadType="whatsapp" href={copy.whatsappUrl} className="btn-outline" style={{ borderColor: 'rgba(216,196,168,0.4)', display: 'flex', alignItems: 'center', gap: 10, padding: '18px 42px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--c-cream)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            {copy.whatsappCta}
          </LeadLink>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 34, color: 'var(--c-sand)', opacity: 0.76 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {copy.messengerLabel}:{' '}
            <LeadLink leadType="phone" href={phoneHref(copy.messengerPhone)} style={{ color: 'inherit', textDecoration: 'none' }}>
              {copy.messengerPhone}
            </LeadLink>
          </p>
        </div>
      </div>
    </section>
  );
}
