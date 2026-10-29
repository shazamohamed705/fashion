import { NavLink } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════════════
   NavigationDropdown
   Props:
     menuKey  — the nav label being hovered (e.g. "Women", "men", "Kids")
     megaData — map built by Navbar: { [labelLower]: { columns: [...] } }
     onClose  — callback to close the dropdown
═══════════════════════════════════════════════════════════════════════════ */
export default function NavigationDropdown({ menuKey, megaData = {}, onClose }) {
  const data = megaData[menuKey?.toLowerCase()];
  if (!data) return null;

  const colCount = data.columns.length;

  return (
    <>
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
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa] mb-3.5 m-0">
              {col.heading}
            </p>
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
