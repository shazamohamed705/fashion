const testimonials = [
  {
    id: 1,
    text: '"The shirt feels considered without feeling precious. I wear it to work and on weekends."',
    name: 'MARIAM, 34 · SIZE M',
    rating: 5,
  },
  {
    id: 2,
    text: '"The shirt feels considered without feeling precious. I wear it to work and on weekends."',
    name: 'MARIAM, 34 · SIZE M',
    rating: 5,
  },
  {
    id: 3,
    text: '"The shirt feels considered without feeling precious. I wear it to work and on weekends."',
    name: 'MARIAM, 34 · SIZE M',
    rating: 5,
  },
];

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C8922A" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/*
  Dashed border with exact dasharray (12 12) using SVG background-image.
  stroke-width matches Figma spec: 1.29px.
  Color: #c8c4be. No border-radius on the SVG rect to keep sharp corners.
*/
const dashedBorderStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='%23c8c4be' stroke-width='1.29' stroke-dasharray='12%2C12' stroke-dashoffset='0'/%3E%3C/svg%3E")`,
};

export default function RealLifeTestimonials() {
  return (
    <section
      className="w-full bg-white"
      style={{ padding: 'clamp(48px,6vw,88px) clamp(16px,6%,88px)' }}
    >
      {/* Heading */}
      <h2 style={{
        fontFamily: 'var(--font-story)',
        fontSize: 'clamp(28px, 3.2vw, 44px)',
        fontWeight: 400,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: '#1a1a1a',
        margin: '0 0 clamp(28px,3.2vw,48px)',
      }}>
        Made for real life
      </h2>

      {/* Cards grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ gap: 'clamp(12px,1.8vw,20px)' }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              ...dashedBorderStyle,
              /* padding from Figma: T=51.46 R=51.46 B=40 L=51.46 — scaled down to feel right responsively */
              padding: 'clamp(24px, 3.8vw, 51px) clamp(20px, 3.8vw, 51px) clamp(20px, 3vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stars count={t.rating} />

            <p style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 'clamp(13px, 1.1vw, 18px)',
              fontWeight: 400,
              lineHeight: '1.4',
              color: '#1a1a1a',
              margin: '0 0 20px',
              flex: 1,
            }}>
              {t.text}
            </p>

            <p style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: '#999',
              margin: 0,
            }}>
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
