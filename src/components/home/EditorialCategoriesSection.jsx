import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../api/categories';

/* ─── Slug → editorial copy ─────────────────────────────────────────────── */
const EDITORIAL_BY_SLUG = {
  'everyday-basics': {
    eyebrow: 'EFFORTLESS EVERYDAY',
    heading: 'The basics, perfected.',
    linkLabel: 'Shop everyday basics',
  },
  'new-in': {
    eyebrow: 'FRESH DROPS',
    heading: 'New season, new finds.',
    linkLabel: 'Shop new in',
  },
};

/* ─── Fallback (used until API responds) ────────────────────────────────── */
const FALLBACK = [
  {
    eyebrow: 'EFFORTLESS EVERYDAY',
    heading: 'The basics, perfected.',
    linkLabel: 'Shop everyday basics',
    path: '/featured-products',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=780&fit=crop&crop=top',
  },
  {
    eyebrow: 'FRESH DROPS',
    heading: 'New season, new finds.',
    linkLabel: 'Shop new in',
    path: '/new-arrivals',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=780&fit=crop&crop=top',
  },
];

/* ─── Slug → dedicated route ─────────────────────────────────────────────── */
const SLUG_TO_PATH = {
  'new-in': '/new-arrivals',
  'everyday-basics': '/featured-products',
};

/* ─── Build path from a category object ─── */
function catPath(cat) {
  return SLUG_TO_PATH[cat.slug] ?? `/categories/${cat.id}`;
}

// The Navbar always shows the first 3 top-level categories — exclude them here
const NAVBAR_COUNT = 3;

export default function EditorialCategoriesSection() {
  const [cards, setCards] = useState(FALLBACK);

  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((cats) => {
        if (!active) return;

        const topLevel = cats.filter((c) => c.parent_id === null);

        // Everything AFTER the first 3 (i.e. not in the Navbar)
        const rest = topLevel.slice(NAVBAR_COUNT);

        if (!rest.length) return;

        const built = rest.map((cat) => {
          const editorial = EDITORIAL_BY_SLUG[cat.slug] ?? {
            eyebrow: cat.name.toUpperCase(),
            heading: cat.name,
            linkLabel: `Shop ${cat.name.toLowerCase()}`,
          };
          return {
            ...editorial,
            path: catPath(cat),
            img: cat.image,
          };
        });

        setCards(built);
      })
      .catch(() => {/* keep fallback */});

    return () => { active = false; };
  }, []);

  return (
    <section
      className="w-full bg-[#F8F4EF]"
      style={{ padding: 'clamp(30px,4vw,70px) clamp(16px,4%,80px)' }}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-3 justify-items-center"
        style={{ gap: '16px' }}
      >
        {cards.map((cat) => (
          <div key={cat.eyebrow} className="flex flex-col w-full" style={{ maxWidth: '463px', gap: '16px' }}>

            {/* Portrait image — 463×608 ratio */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '463 / 608',
                borderRadius: '6px',
                background: '#E8E4DC',
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
