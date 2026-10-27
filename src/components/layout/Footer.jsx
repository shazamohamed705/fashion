import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ── Nav columns data ── */
const columns = [
  {
    heading: 'Shop',
    links: [
      { label: 'Women',        path: '/categories' },
      { label: 'Men',          path: '/categories' },
      { label: 'Kids',         path: '/categories' },
      { label: 'New arrivals', path: '/new-arrivals' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Your bag',          path: '/cart' },
      { label: 'Delivery & returns', path: '/help' },
      { label: 'Size guide',         path: '/help' },
    ],
  },
  {
    heading: 'Brand',
    links: [
      { label: 'Our story', path: '/our-story' },
      { label: 'Materials', path: '/our-story' },
      { label: 'Contact',   path: '/help' },
    ],
  },
];

/* ── Mobile accordion column ── */
function AccordionCol({ col }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      {/* Header row — tappable */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
          {col.heading}
        </span>
        {/* Chevron */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`text-white/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Links — collapse/expand */}
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-4' : 'max-h-0'}`}>
        <ul className="flex flex-col gap-3">
          {col.links.map(l => (
            <li key={l.label}>
              <Link
                to={l.path}
                className="text-[15px] text-white no-underline hover:text-white/70 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Footer ── */
export default function Footer() {
  return (
    <footer className="bg-[#1a1a18] text-white">

      {/* ══════════════════════════════════════════
          MOBILE layout
      ══════════════════════════════════════════ */}
      <div className="md:hidden px-5 pt-8 pb-4">
        {/* Brand */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center border border-white/35 rounded-[6px] px-4 py-1.5 text-[11px] font-bold tracking-[0.08em] text-white mb-4">
            LOGO
          </div>
          <h3
            className="text-white font-normal leading-[1.2] mb-2"
            style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(20px,5vw,26px)' }}
          >
            Woven for everyone.
          </h3>
          <p className="text-[13px] text-white/75 leading-relaxed">
            Everyday clothes, thoughtfully made for every body.
          </p>
        </div>

        {/* Accordion columns */}
        {columns.map(col => (
          <AccordionCol key={col.heading} col={col} />
        ))}

        {/* Copyright */}
        <p className="text-[11px] text-white/30 mt-6 pb-6">
          © {new Date().getFullYear()} nesj. Made with care in Egypt.
        </p>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP layout
      ══════════════════════════════════════════ */}
      <div
        className="hidden md:grid items-start"
        style={{
          padding: 'clamp(32px,4vw,56px) clamp(16px,6%,88px)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(28px,3vw,48px)',
        }}
      >
        {/* Brand col */}
        <div className="flex flex-col gap-3.5">
          <div className="inline-flex items-center justify-center border border-white/35 rounded-[6px] px-4 py-1.5 w-fit text-[11px] font-bold tracking-[0.08em] text-white">
            LOGO
          </div>
          <h3
            className="text-white font-normal leading-[1.2] m-0"
            style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(20px,2vw,28px)' }}
          >
            Woven for everyone.
          </h3>
          <p className="text-[14px] text-white/85 leading-[1.65] m-0">
            Everyday clothes, thoughtfully made for every body.
          </p>
        </div>

        {/* Nav columns */}
        {columns.map(col => (
          <div key={col.heading}>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/40 m-0 mb-3.5">
              {col.heading}
            </p>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="text-[15px] text-white/55 no-underline transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop bottom bar */}
      <div
        className="hidden md:block border-t border-white/10"
        style={{ padding: 'clamp(14px,1.8vw,20px) clamp(16px,6%,88px)' }}
      >
        <p className="text-[11px] text-white/30 m-0">
          © {new Date().getFullYear()} nesj. Made with care in Egypt.
        </p>
      </div>

    </footer>
  );
}
