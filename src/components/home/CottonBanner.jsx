import { Link } from 'react-router-dom';

export default function CottonBanner() {
  return (
    <section
      aria-label="Shop new arrivals banner"
      style={{
        width: '100%',
        padding: 'clamp(48px, 7vw, 96px) clamp(20px, 6%, 80px)',
        background: 'linear-gradient(135deg, #7a3520 0%, #3d1c10 40%, #1a0d08 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(18px, 2.5vw, 32px)',
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-story)',
          fontSize: 'clamp(22px, 3.4vw, 48px)',
          fontWeight: 400,
          color: '#e8ddd6',
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}
      >
        Soft cotton, cut for real life.
      </h2>

      {/* CTA button */}
      <Link
        to="/new-arrivals"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: '999px',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 'clamp(12px, 1vw, 14px)',
          fontWeight: 600,
          letterSpacing: '0.02em',
          padding: '10px 28px',
          textDecoration: 'none',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#333')}
        onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
      >
        Shop new arrivals
      </Link>
    </section>
  );
}
