import { NavLink } from 'react-router-dom';

/* ─── Dropdown data ──────────────────────────────────────────────────────
   Each top-level key maps to a nav item label (lowercase).
   Add / remove items here without touching Navbar.jsx.
────────────────────────────────────────────────────────────────────────── */
export const dropdownData = {
  women: {
    columns: [
      {
        heading: 'CLOTHING',
        links: [
          { label: 'All women',         path: '/shop?cat=Women' },
          { label: 'Tops & T-shirts',   path: '/shop?cat=Women' },
          { label: 'Shirts & Blouses',  path: '/shop?cat=Women' },
          { label: 'Dresses',           path: '/shop?cat=Women' },
          { label: 'Skirts',            path: '/shop?cat=Women' },
          { label: 'Trousers & Shorts', path: '/shop?cat=Women' },
          { label: 'Knitwear',          path: '/shop?cat=Women' },
          { label: 'Outerwear',         path: '/shop?cat=Women' },
        ],
      },
      {
        heading: 'BY FABRIC',
        links: [
          { label: 'Cotton',         path: '/shop' },
          { label: 'Linen',          path: '/shop' },
          { label: 'Organic cotton', path: '/shop' },
          { label: 'Knit',           path: '/shop' },
        ],
      },
      {
        heading: 'FEATURED',
        links: [
          { label: 'New arrivals',            path: '/new-arrivals', highlight: true },
          { label: 'Everyday basics',         path: '/shop' },
          { label: 'The soft structure edit', path: '/shop' },
          { label: 'The linen edit',          path: '/shop' },
        ],
      },
    ],
  },

  men: {
    columns: [
      {
        heading: 'CLOTHING',
        links: [
          { label: 'All men',          path: '/shop?cat=Men' },
          { label: 'T-shirts & Polos', path: '/shop?cat=Men' },
          { label: 'Shirts',           path: '/shop?cat=Men' },
          { label: 'Trousers',         path: '/shop?cat=Men' },
          { label: 'Knitwear',         path: '/shop?cat=Men' },
          { label: 'Outerwear',        path: '/shop?cat=Men' },
        ],
      },
      {
        heading: 'BY FABRIC',
        links: [
          { label: 'Cotton',   path: '/shop' },
          { label: 'Linen',    path: '/shop' },
          { label: 'Merino',   path: '/shop' },
        ],
      },
      {
        heading: 'FEATURED',
        links: [
          { label: 'New arrivals',     path: '/new-arrivals', highlight: true },
          { label: 'The linen edit',   path: '/shop' },
          { label: 'Weekend essentials', path: '/shop' },
        ],
      },
    ],
  },

  kids: {
    columns: [
      {
        heading: 'CLOTHING',
        links: [
          { label: 'All kids',   path: '/shop?cat=Kids' },
          { label: 'Tops',       path: '/shop?cat=Kids' },
          { label: 'Bottoms',    path: '/shop?cat=Kids' },
          { label: 'Outerwear',  path: '/shop?cat=Kids' },
        ],
      },
      {
        heading: 'BY AGE',
        links: [
          { label: '0–2 years',   path: '/shop?cat=Kids' },
          { label: '3–8 years',   path: '/shop?cat=Kids' },
          { label: '9–14 years',  path: '/shop?cat=Kids' },
        ],
      },
      {
        heading: 'FEATURED',
        links: [
          { label: 'New arrivals',    path: '/new-arrivals', highlight: true },
          { label: 'Back to school',  path: '/shop' },
        ],
      },
    ],
  },

  'shop all': {
    columns: [
      {
        heading: 'CLOTHING',
        links: [
          { label: 'All women',  path: '/shop?cat=Women' },
          { label: 'All men',    path: '/shop?cat=Men' },
          { label: 'All kids',   path: '/shop?cat=Kids' },
        ],
      },
      {
        heading: 'BY FABRIC',
        links: [
          { label: 'Cotton',         path: '/shop' },
          { label: 'Linen',          path: '/shop' },
          { label: 'Organic cotton', path: '/shop' },
          { label: 'Knit',           path: '/shop' },
        ],
      },
      {
        heading: 'FEATURED',
        links: [
          { label: 'New arrivals',            path: '/new-arrivals', highlight: true },
          { label: 'Everyday basics',         path: '/shop' },
          { label: 'The soft structure edit', path: '/shop' },
          { label: 'The linen edit',          path: '/shop' },
        ],
      },
    ],
  },
};

/* ─── Shared styles ──────────────────────────────────────────────────────── */
const colHead = {
  fontFamily: 'system-ui, sans-serif',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#aaa',
  margin: '0 0 14px',
};
const ulStyle = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

/* ═══════════════════════════════════════════════════════════════════════════
   NavigationDropdown
   Props:
     menuKey   {string}  — lowercase nav label, e.g. 'women'
     onClose   {() => void}
   ═══════════════════════════════════════════════════════════════════════════ */
export default function NavigationDropdown({ menuKey, onClose }) {
  const data = dropdownData[menuKey?.toLowerCase()];
  if (!data) return null;

  return (
    <div
      role="region"
      aria-label={`${menuKey} navigation`}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#fff',
        borderBottom: '1px solid #e5e5e5',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        zIndex: 100,
        padding: 'clamp(24px,3vw,40px) clamp(16px,6%,88px)',
        display: 'grid',
        gridTemplateColumns: data.columns.length === 3 ? '2fr 1fr 1fr' : `repeat(${data.columns.length}, 1fr)`,
        gap: '40px',
        /* Entrance animation */
        animation: 'dropdown-in 0.18s ease both',
      }}
    >
      {data.columns.map((col) => (
        <div key={col.heading}>
          <p style={colHead}>{col.heading}</p>
          <ul style={ulStyle}>
            {col.links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.path}
                  onClick={onClose}
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '14px',
                    color: link.highlight ? '#C9573A' : '#3a3a3a',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = link.highlight ? '#a83d1e' : '#1a1a1a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = link.highlight ? '#C9573A' : '#3a3a3a';
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Dropdown entrance keyframe — injected once */}
      <style>{`
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
