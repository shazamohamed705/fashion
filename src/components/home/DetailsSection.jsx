const DETAILS = [
  {
    label: 'THE WEAVE',
    caption: 'The foundation of every piece.',
    img: '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
  },
  {
    label: 'THE STITCHING',
    caption: 'Strong, visible, and intentional.',
    img: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
  },
  {
    label: 'THE BUTTONS',
    caption: 'Small touches that make a garment stay.',
    img: '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
  },
];

export default function DetailsSection() {
  return (
    <section
      style={{
        background: '#FAF6EF',
        padding: 'clamp(40px,5vw,80px) clamp(32px,6%,96px)',
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-story)',
          fontSize: 'clamp(28px,4.5vw,60px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#1a1a1a',
          textAlign: 'center',
          margin: '0 0 clamp(28px,3.5vw,52px)',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}
      >
        Details are the luxury.
      </h2>

      {/* Three cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px,2vw,28px)',
        }}
      >
        {DETAILS.map((d) => (
          <div key={d.label} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Image — fixed ratio 538.67:320 ≈ 538/320, responsive border-radius */}
            <div
              style={{
                width: '100%',
                aspectRatio: '538 / 320',
                borderRadius: 'clamp(10px,2vw,22px)',
                overflow: 'hidden',
                background: '#e8e0d5',
              }}
            >
              <img
                src={d.img}
                alt={d.caption}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                loading="lazy"
              />
            </div>

            {/* Label + caption */}
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color: '#C8502A',
                margin: 0,
                lineHeight: 1,
              }}
            >
              {d.label}
            </p>
            <p
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 'clamp(12px,1vw,15px)',
                color: '#333',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {d.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
