import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Honest fabrics',
    body: 'Natural cotton and linen that feel good on your skin and get softer with every wash.',
  },
  {
    title: 'Simple shapes',
    body: 'Clean cuts that fit real bodies, of every size, and work with what you already own.',
  },
  {
    title: 'Colours that last',
    body: 'A palette you can mix and wear for years, never tied to one season.',
  },
];

const featClasses = ['story-feat-1', 'story-feat-2', 'story-feat-3'];

export default function OurStorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add('story-animate-paused');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('story-animate-paused');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="story-section">

      {/* ══════════════════════════════════════════
          MOBILE layout — full-bleed image + text overlay
      ══════════════════════════════════════════ */}
      <div className="story-mobile">
        <div className="story-mobile-hero">
          {/* Background image */}
          <img
            src="/c4f29f3419e87fa67bfb19e59f372cb4aa61c5e6.png"
            alt="Three people seated on a plaid sofa"
            className="story-mobile-bg"
          />
          {/* Gradient overlay — dark at bottom */}
          <div className="story-mobile-grad" />

          {/* Text overlay */}
          <div className="story-mobile-content">
            <h2 className="story-title-1 story-h2-dark">
              Clothes are made of threads.
            </h2>
            <h2 className="story-title-2 story-h2-red">
              So are people.
            </h2>
            <p className="story-body story-body-text story-hide-mobile">
              Every garment is threads crossing over and under each other.
              That is our idea of community too: different people, held together.
            </p>
            <Link to="/hero" className="story-link story-read-link story-hide-mobile">
              Read our story
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>


      </div>

      {/* ══════════════════════════════════════════
          DESKTOP layout — image with overlays
      ══════════════════════════════════════════ */}
      <div className="story-desktop">
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          <img
            src="/c4f29f3419e87fa67bfb19e59f372cb4aa61c5e6.png"
            alt="Three people seated on a plaid sofa"
            style={{
              width: '100%',
              display: 'block',
              minHeight: 'clamp(320px, 38vw, 520px)',
              objectFit: 'cover',
              objectPosition: 'center 10%',
            }}
          />

          {/* Text overlay — upper left */}
          <div style={{
            position: 'absolute', top: '10%', left: '6%',
            maxWidth: 'min(55%, 540px)', zIndex: 3, lineHeight: 'normal',
          }}>
            <h2
              className="story-title-1"
              style={{
                fontFamily: 'var(--font-story)',
                fontSize: 'clamp(20px, 3.2vw, 46px)',
                fontWeight: 400, lineHeight: 1.12, color: '#2b2b2b', margin: 0,
              }}
            >
              Clothes are made of threads.
            </h2>
            <h2
              className="story-title-2"
              style={{
                fontFamily: 'var(--font-story)',
                fontSize: 'clamp(20px, 3.2vw, 46px)',
                fontWeight: 400, lineHeight: 1.12, color: '#C8502A',
                margin: '0 0 clamp(10px, 1.4vw, 20px)',
              }}
            >
              So are people.
            </h2>
            <p
              className="story-body"
              style={{
                fontSize: 'clamp(13px, 1.3vw, 16px)', lineHeight: 1.7,
                color: '#333', margin: '0 0 clamp(8px, 1.2vw, 16px)',
              }}
            >
              Every garment is threads crossing over and under each other.
              That is our idea of community too: different people, held together.
            </p>
            <Link
              to="/hero"
              className="story-link"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 'clamp(10px, 0.95vw, 13px)', fontWeight: 500,
                color: '#1a1a1a', textDecoration: 'underline', textUnderlineOffset: 3,
                lineHeight: 'normal',
              }}
            >
              Read our story
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Feature row overlay — bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            padding: 'clamp(14px, 2vw, 28px) clamp(20px, 6%, 80px)',
            borderTop: '1px solid rgba(180,170,160,0.45)',
          }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className={featClasses[i]}
                style={{
                  paddingRight: i < features.length - 1 ? 'clamp(12px, 2vw, 28px)' : 0,
                  paddingLeft: i > 0 ? 'clamp(12px, 2vw, 28px)' : 0,
                  borderRight: i < features.length - 1
                    ? '1px solid rgba(180,170,160,0.45)' : 'none',
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(11px, 1.1vw, 15px)',
                  fontWeight: 700, color: '#1a1a1a', margin: '0 0 5px',
                  letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(9px, 0.85vw, 12px)',
                  lineHeight: 1.6, color: '#444', margin: 0,
                }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
