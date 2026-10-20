import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a18', color: '#fff' }}>

      {/* ── Middle: logo + nav columns ── */}
      <div style={{
        padding: 'clamp(32px,4vw,56px) clamp(16px,6%,88px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 'clamp(28px,3vw,48px)',
        alignItems: 'start',
      }}>

        {/* Brand col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Logo box */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '6px',
            padding: '6px 16px',
            width: 'fit-content',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#fff',
          }}>
            LOGO
          </div>

          <h3 style={{
            fontFamily: 'var(--font-story)',
            fontSize: 'clamp(20px, 2vw, 28px)',
            fontWeight: 400,
            color: '#fff',
            margin: 0,
            lineHeight: 1.2,
          }}>
            Woven for everyone.
          </h3>
          <p style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.85)',
            margin: 0,
          }}>
            Everyday clothes, thoughtfully made for every body.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <p style={colHeadStyle}>SHOP</p>
          <ul style={colListStyle}>
            {[
              { label: 'Women', path: '/categories' },
              { label: 'Men', path: '/categories' },
              { label: 'Kids', path: '/categories' },
              { label: 'New arrivals', path: '/new-arrivals' },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.path} style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* HELP */}
        <div>
          <p style={colHeadStyle}>HELP</p>
          <ul style={colListStyle}>
            {['Your bag', 'Delivery & returns', 'Size guide'].map(l => (
              <li key={l}>
                <a href="#" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* BRAND */}
        <div>
          <p style={colHeadStyle}>BRAND</p>
          <ul style={colListStyle}>
            {['Our story', 'Materials', 'Contact'].map(l => (
              <li key={l}>
                <a href="#" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Bottom: copyright ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: 'clamp(14px,1.8vw,20px) clamp(16px,6%,88px)',
      }}>
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
        }}>
          © {new Date().getFullYear()} nesj. Made with care in Egypt.
        </p>
      </div>

    </footer>
  );
}

/* ── Shared micro-styles ── */
const colHeadStyle = {
  fontFamily: 'system-ui, sans-serif',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  margin: '0 0 14px',
};

const colListStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const linkStyle = {
  fontFamily: 'system-ui, sans-serif',
  fontSize: '15px',
  color: '#ffffff',
  textDecoration: 'none',
  transition: 'color 0.15s',
};
