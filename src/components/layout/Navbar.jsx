import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import NavigationDropdown from './NavigationDropdown';
import SignInModal from '../auth/SignInModal';

/* ─── Announcement messages ──────────────────────────────────────────────── */
const announcements = [
  'Free delivery over EGP 2,000',
  'Easy 14-day returns',
  'Easy 14-day returns',
  'Cash on delivery available',
];

/* ─── Nav links ──────────────────────────────────────────────────────────── */
const navLinks = [
  { label: 'Women',     path: '/shop',         hasMega: true  },
  { label: 'Men',       path: '/shop',         hasMega: true  },
  { label: 'Kids',      path: '/shop',         hasMega: true  },
  { label: 'Shop all',  path: '/shop',         hasMega: true  },
  { label: 'Our story', path: '/our-story',    hasMega: false },
  { label: 'Contact',   path: '/help',         hasMega: false },
];

/* ─── Dot separator ──────────────────────────────────────────────────────── */
function Dot() {
  return (
    <span aria-hidden="true" className="mx-6 select-none text-white/35">•</span>
  );
}

/* ─── Scrolling announcement strip ──────────────────────────────────────── */
function AnnouncementStrip() {
  return (
    <span className="flex items-center whitespace-nowrap">
      {announcements.map((msg, i) => (
        <span key={i} className="flex items-center">
          <span className="text-[10px] font-medium text-white">{msg}</span>
          {i < announcements.length - 1 && <Dot />}
        </span>
      ))}
      <Dot />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Navbar
═══════════════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);

  const timeoutRef = useRef(null);
  const headerRef  = useRef(null);

  const navigate              = useNavigate();
  const { totalItems, cartIconRef } = useCart();

  /* ── Mega-menu hover helpers ── */
  const openMenu = useCallback((label) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  }, []);

  const scheduleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top      = `-${scrollY}px`;
      document.body.style.width    = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* ── Keyboard escape ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { closeMenu(); setMenuOpen(false); }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeMenu]);

  /* ── Close mega on outside click ── */
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeMenu]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          Header
      ════════════════════════════════════════════════════════════════════ */}
      <header ref={headerRef} className="sticky top-0 z-50 bg-white">

        {/* ── 1. Announcement bar ── */}
        <div
          className="marquee-wrapper flex items-center overflow-hidden w-full bg-[#1c1b19]"
          style={{ height: '25px' }}
          aria-label="Announcements"
        >
          <div className="marquee-track flex w-max" aria-hidden="false">
            <AnnouncementStrip />
            <AnnouncementStrip />
          </div>
        </div>

        {/* ── 2. Main navbar ── */}
        <nav
          className="relative flex items-center border-b border-[#e5e5e5] bg-white"
          style={{ height: '66px', paddingLeft: 'clamp(12px,3.5%,88px)', paddingRight: 'clamp(12px,3.5%,88px)' }}
          aria-label="Main navigation"
        >
          {/* Left: desktop nav links */}
          <div className="hidden md:flex items-center flex-1 gap-4 lg:gap-7">
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.label}
                  onMouseEnter={() => openMenu(link.label)}
                  onMouseLeave={scheduleClose}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-[12px] lg:text-[14px] font-[600] no-underline whitespace-nowrap transition-colors hover:underline hover:underline-offset-2 ${
                        isActive ? 'text-[#000]' : 'text-[#5C574F]'
                      }`
                    }
                    aria-haspopup="true"
                    aria-expanded={activeMenu === link.label}
                    onClick={() => closeMenu()}
                  >
                    {link.label}
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[12px] lg:text-[14px] font-[600] no-underline whitespace-nowrap transition-colors hover:underline hover:underline-offset-2 ${
                      isActive ? 'text-[#000]' : 'text-[#5C574F]'
                    }`
                  }
                  onClick={() => closeMenu()}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden flex-1 items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="p-1 text-[#111] transition-opacity hover:opacity-60"
            >
              {menuOpen
                ? <X size={20} strokeWidth={1.5} />
                : <Menu size={20} strokeWidth={1.5} />
              }
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <NavLink
              to="/"
              aria-label="Go to homepage"
              className="flex items-center justify-center no-underline rounded-[10px] border border-[#111] bg-white text-[#111] text-[11px] font-semibold tracking-[0.12em] uppercase"
              style={{ width: '74px', height: '33px' }}
            >
              LOGO
            </NavLink>
          </div>

          {/* Right: icon buttons */}
          <div className="flex items-center gap-1.5 lg:gap-3 flex-1 justify-end">
            <button
              aria-label="Search"
              className="p-1 text-[#111] transition-opacity hover:opacity-60"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Sign in to your account"
              onClick={() => setSignInOpen(true)}
              className="p-1 text-[#111] transition-opacity hover:opacity-60"
            >
              <User size={19} strokeWidth={1.5} />
            </button>

            <button
              ref={cartIconRef}
              aria-label={`Shopping bag${totalItems > 0 ? `, ${totalItems} item${totalItems !== 1 ? 's' : ''}` : ''}`}
              onClick={() => navigate('/cart')}
              className="relative p-1 text-[#111] transition-opacity hover:opacity-60"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="cart-badge" aria-hidden="true">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* ── 3. Mega-dropdown ── */}
        {activeMenu && (() => {
          const link = navLinks.find(l => l.label === activeMenu);
          if (!link?.hasMega) return null;
          return (
            <div
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="relative z-[100]"
            >
              <NavigationDropdown menuKey={activeMenu} onClose={closeMenu} />
            </div>
          );
        })()}

        {/* ── 4. Mobile drawer ── */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[91px] z-40 bg-white overflow-y-auto border-t border-[#e5e5e5] flex flex-col">
            <p className="px-5 pt-6 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa]">
              Shop
            </p>
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-5 py-3.5 text-[15px] font-medium no-underline border-b border-[#f0ece6] transition-colors ${
                    isActive ? 'text-[#1a1a1a] font-bold' : 'text-[#3a3a3a]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <p className="px-5 pt-6 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[#aaa]">
              Account
            </p>

            <button
              className="px-5 py-3.5 text-left text-[15px] font-medium text-[#3a3a3a] border-b border-[#f0ece6] transition-colors hover:text-[#1a1a1a]"
              onClick={() => { setMenuOpen(false); setSignInOpen(true); }}
            >
              Sign in
            </button>

            <button
              className="px-5 py-3.5 text-left text-[15px] font-medium text-[#3a3a3a] border-b border-[#f0ece6] transition-colors hover:text-[#1a1a1a] flex items-center gap-2"
              onClick={() => { setMenuOpen(false); navigate('/cart'); }}
            >
              Your bag
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#C95738] text-white text-[10px] font-bold px-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          Sign-in modal
      ════════════════════════════════════════════════════════════════════ */}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
      />
    </>
  );
}
