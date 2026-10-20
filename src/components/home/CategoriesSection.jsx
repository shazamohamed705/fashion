import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Women',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop&crop=top',
    bg: '#F0EAE0',
  },
  {
    name: 'Men',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=500&fit=crop&crop=top',
    bg: '#E8E4DC',
  },
  {
    name: 'Kids',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=500&fit=crop&crop=top',
    bg: '#F5EDDF',
  },
  {
    name: 'New in',
    path: '/new-arrivals',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop&crop=top',
    bg: '#E5E8E0',
  },
  {
    name: 'Everyday basics',
    path: '/featured-products',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop&crop=top',
    bg: '#E2E5EC',
  },
  {
    name: 'Accessories',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=400&h=500&fit=crop&crop=top',
    bg: '#EDE6DF',
  },
  {
    name: 'Outerwear',
    path: '/categories',
    img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop&crop=top',
    bg: '#E0E5EC',
  },
];

export default function CategoriesSection() {
  /* duplicate list for seamless infinite loop */
  const items = [...categories, ...categories];

  return (
    <section style={{ background: '#ffffff', padding: '56px 0 64px', overflow: 'hidden' }}>

      {/* ── Track wrapper — clips overflow, pauses on hover ── */}
      <div
        className="cat-carousel-wrapper"
        style={{ overflow: 'hidden', width: '100%' }}
      >
        <div
          className="cat-carousel-track"
          style={{
            display: 'flex',
            gap: '36px',
            width: 'max-content',
            /* animation drives via CSS class below */
          }}
        >
          {items.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                textDecoration: 'none',
                flexShrink: 0,
              }}
              className="cat-item"
            >
              {/* Card — rounded rectangle */}
              <div
                className="cat-circle"
                style={{
                  width: 'clamp(110px, 11vw, 180px)',
                  height: 'clamp(122px, 12.2vw, 200px)',
                  borderRadius: 'clamp(45px, 4.5vw, 75px)',
                  overflow: 'hidden',
                  background: cat.bg,
                  flexShrink: 0,
                  transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s',
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="cat-photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Label */}
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#1a1a1a',
              }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Scroll animation ── */
        @keyframes cat-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .cat-carousel-track {
          animation: cat-scroll 22s linear infinite;
        }

        /* pause on hover */
        @media (hover: hover) {
          .cat-carousel-wrapper:hover .cat-carousel-track {
            animation-play-state: paused;
          }
        }

        /* respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .cat-carousel-track {
            animation: none;
          }
        }

        /* hover lift on each item */
        .cat-item:hover .cat-circle {
          transform: translateY(-6px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.13);
        }
        .cat-item:hover .cat-photo {
          transform: scale(1.07);
        }
      `}</style>
    </section>
  );
}
