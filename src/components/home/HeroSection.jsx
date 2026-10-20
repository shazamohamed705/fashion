import { Link } from 'react-router-dom';

/* ─── Bottom info bar items ─────────────────────────────────────────────── */
const infoItems = [
  'FREE DELIVERY OVER EGP 2,000',
  'FREE DELIVERY OVER EGP 2,000',
  'DESIGNED FOR EVERY BODY',
  'EASY 14-DAY RETURNS',
  'MADE FOR REAL LIFE',
];

export default function HeroSection() {
  return (
    <section className="hero-section">

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on lg+)
          Full-screen photo + text overlay
      ═══════════════════════════════════════════════ */}
      <div className="hero-mobile">
        {/* Background photo */}
        <div
          className="hero-ken-burns hero-mobile-img"
          role="img"
          aria-label="Woman wearing orange knitwear from the new collection"
          style={{ backgroundImage: 'url("/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg")' }}
        />

        {/* Dark gradient overlay */}
        <div className="hero-mobile-overlay" />

        {/* Text content */}
        <div className="hero-mobile-content">
          <p className="hero-text-enter hero-text-d1 hero-eyebrow">
            The New Cotton Edit
          </p>

          <h1 className="hero-text-enter hero-text-d2 hero-mobile-h1">
            Made to<br />feel<br />like you.
          </h1>

          <p className="hero-text-enter hero-text-d3 hero-mobile-body">
            Soft structure, honest fabric and room to move.
            Everyday clothing, woven for everyone.
          </p>

          <div className="hero-text-enter hero-text-d4 hero-mobile-btns">
            <Link to="/new-arrivals" className="hero-btn-primary">
              Shop new arrivals
            </Link>
            <Link to="/shop" className="hero-btn-secondary-light">
              Explore the edit
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden on mobile)
          Left text panel + two photos
      ═══════════════════════════════════════════════ */}
      <div className="hero-desktop">
        {/* ── LEFT: Text panel ── */}
        <div className="hero-desktop-panel">
          <p
            className="hero-text-enter hero-text-d1"
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: '#5C574F',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            The New Cotton Edit
          </p>

          <h1
            className="hero-text-enter hero-text-d2"
            style={{
              fontFamily: 'var(--font-story)',
              fontSize: 'clamp(52px, 6.5vw, 92px)',
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: '#1a1a1a',
              marginBottom: 24,
            }}
          >
            Made to<br />feel<br />like you.
          </h1>

          <p
            className="hero-text-enter hero-text-d3"
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: '#5C574F',
              maxWidth: 360,
              marginBottom: 32,
            }}
          >
            Soft structure, honest fabric and room to move.
            Everyday clothing, woven for everyone.
          </p>

          <div className="hero-text-enter hero-text-d4 hero-desktop-btns">
            <Link
              to="/new-arrivals"
              className="hero-btn-primary"
            >
              Shop new arrivals
            </Link>
            <Link
              to="/shop"
              className="hero-btn-secondary"
            >
              Explore the edit
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Two photos ── */}
        <div className="hero-desktop-photos">
          {/* Photo 1 — woman */}
          <div className="hero-photo-l hero-photo-wrap">
            <div
              className="hero-ken-burns hero-photo-inner"
              style={{ backgroundImage: 'url("/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg")' }}
              role="img"
              aria-label="Woman wearing orange knitwear from the new collection"
            />
            <div className="hero-photo-shadow-r" />
          </div>

          <div className="hero-divider" />

          {/* Photo 2 — men */}
          <div className="hero-photo-r hero-photo-wrap" style={{ flex: '0 0 38%' }}>
            <div
              className="hero-ken-burns hero-photo-inner"
              style={{
                backgroundImage: 'url("/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg")',
                animationDirection: 'alternate-reverse',
              }}
              role="img"
              aria-label="Two men wearing the new cotton edit collection"
            />
            <div className="hero-photo-shadow-l" />
          </div>
        </div>
      </div>

      {/* ── Bottom info bar — infinite marquee (shared) ── */}
      <div className="marquee-wrapper hero-marquee-bar">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {infoItems.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="hero-marquee-item">{item}</span>
                  <span className="hero-marquee-sep" aria-hidden="true">|</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
