import { Link } from 'react-router-dom';

const categories = [
  {
    eyebrow: 'THE SOFT STRUCTURE EDIT',
    heading: 'For her, for every day.',
    linkLabel: 'Shop women',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=780&fit=crop&crop=top',
    bg: '#F8F4EF',
  },
  {
    eyebrow: 'QUIETLY CONSIDERED',
    heading: 'Ease, in every layer.',
    linkLabel: 'Shop men',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&h=780&fit=crop&crop=top',
    bg: '#F8F4EF',
  },
  {
    eyebrow: 'MADE TO MOVE',
    heading: 'Small clothes. Big days.',
    linkLabel: 'Shop kids',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&h=780&fit=crop&crop=top',
    bg: '#F8F4EF',
  },
];

export default function EditorialCategoriesSection() {
  return (
    <section
      className="w-full bg-[#F8F4EF]"
      style={{ padding: 'clamp(30px,4vw,70px) clamp(16px,4%,80px)' }}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-3 justify-items-center"
        style={{ gap: '16px' }}
      >
        {categories.map((cat) => (
          <div key={cat.eyebrow} className="flex flex-col w-full" style={{ maxWidth: '463px', gap: '16px' }}>

            {/* Portrait image — 463×608 ratio */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '463 / 608',
                borderRadius: '6px',
                background: cat.bg,
              }}
            >
              <img
                src={cat.img}
                alt={cat.heading}
                className="w-full h-full object-cover object-top"
                style={{ transition: 'transform 0.5s ease', display: 'block' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col" style={{ gap: '5px' }}>
              <p style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#999',
                lineHeight: 1,
                margin: 0,
              }}>
                {cat.eyebrow}
              </p>

              <h3 style={{
                fontFamily: 'var(--font-story)',
                fontSize: 'clamp(16px, 1.6vw, 22px)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#1a1a1a',
                margin: 0,
              }}>
                {cat.heading}
              </h3>

              <Link
                to={cat.path}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  width: 'fit-content',
                }}
              >
                {cat.linkLabel}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
