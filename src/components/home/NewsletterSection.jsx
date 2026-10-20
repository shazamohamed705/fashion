export default function NewsletterSection() {
  return (
    <div style={{
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: 'clamp(28px,4vw,52px) clamp(16px,6%,88px)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: 'clamp(24px,4vw,64px)',
      background: '#1a1a18',
    }}>
      {/* Left: headline + sub */}
      <div style={{ flex: '1 1 280px' }}>
        <h2 style={{
          fontFamily: 'var(--font-story)',
          fontSize: 'clamp(26px, 3.4vw, 46px)',
          fontWeight: 400,
          lineHeight: 1.15,
          color: '#fff',
          margin: '0 0 10px',
        }}>
          Good clothes, good company.
        </h2>
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.85)',
          margin: 0,
          maxWidth: '340px',
        }}>
          New pieces, fabric stories and practical care notes. Sent occasionally.
        </p>
      </div>

      {/* Right: email form */}
      <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.04em',
        }}>
          Email address
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="email"
            placeholder="Your email address"
            style={{
              flex: 1,
              maxWidth: '480px',
              background: '#ffffff',
              border: '1.29px solid rgba(255,255,255,0.25)',
              borderRadius: '999px',
              padding: '10px 18px',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '13px',
              color: '#1a1a1a',
              outline: 'none',
              minWidth: 0,
            }}
          />
          <button
            style={{
              background: '#C8502A',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 24px',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.18s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b3421f'}
            onMouseLeave={e => e.currentTarget.style.background = '#C8502A'}
          >
            Join us
          </button>
        </div>
      </div>
    </div>
  );
}
