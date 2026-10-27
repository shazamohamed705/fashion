import { NavLink } from 'react-router-dom';

/* ─── Dropdown data ──────────────────────────────────────────────────────── */
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
          { label: 'Cotton', path: '/shop' },
          { label: 'Linen',  path: '/shop' },
          { label: 'Merino', path: '/shop' },
        ],
      },
      {
        heading: 'FEATURED',
        links: [
          { label: 'New arrivals',       path: '/new-arrivals', highlight: true },
          { label: 'The linen edit',     path: '/shop' },
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
          { label: 'All kids',  path: '/shop?cat=Kids' },
          { label: 'Tops',      path: '/shop?cat=Kids' },
          { label: 'Bottoms',   path: '/shop?cat=Kids' },
          { label: 'Outerwear', path: '/shop?cat=Kids' },
        ],
      },
      {
        heading: 'BY AGE',
        links: [
          { label: '0–2 years',  path: '/shop?cat=Kids' },
          { label: '3–8 years',  path: '/shop?cat=Kids' },
          { label: '9–14 years', path: '/shop?cat=Kids' },
        ],
      },
      {
        heading: 'FEATURED',
        links: [
          { label: 'New arrivals',   path: '/new-arrivals', highlight: true },
          { label: 'Back to school', path: '/shop' },
        ],
      },
    ],
  },

  'shop all': {
    columns: [
      {
        heading: 'CLOTHING',
        links: [
          { label: 'All women', path: '/shop?cat=Women' },
          { label: 'All men',   path: '/shop?cat=Men'   },
          { label: 'All kids',  path: '/shop?cat=Kids'  },
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

/* ═══════════════════════════════════════════════════════════════════════════
   NavigationDropdown — pure Tailwind
═══════════════════════════════════════════════════════════════════════════ */
export default function NavigationDropdown({ menuKey, onClose }) {
  const data = dropdownData[menuKey?.toLowerCase()];
  if (!data) return null;

  const colCount = data.columns.length;

  return (
    <>
      {/* Entrance keyframe — tiny, injected once */}
      <style>{`
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-dropdown { animation: dropdown-in 0.18s ease both; }
      `}</style>

      <div
        role="region"
        aria-label={`${menuKey} navigation`}
        className="nav-dropdown absolute top-full left-0 right-0 z-[100] bg-white border-b border-[#e5e5e5] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        style={{
          padding: 'clamp(24px,3vw,40px) clamp(16px,6%,88px)',
          display: 'grid',
          gridTemplateColumns: colCount === 3 ? '2fr 1fr 1fr' : `repeat(${colCount}, 1fr)`,
          gap: '40px',
        }}
      >
        {data.columns.map((col) => (
          <div key={col.heading}>
            {/* Column heading */}
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa] mb-3.5 m-0">
              {col.heading}
            </p>

            {/* Links */}
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={`text-[14px] no-underline transition-colors hover:text-[#1a1a1a] ${
                      link.highlight
                        ? 'text-[#C9573A] hover:text-[#a83d1e]'
                        : 'text-[#3a3a3a]'
                    }`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
