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

/* ─── Nav links — items with hasMega get a dropdown ─────────────────────── */
const navLinks = [
  { label: 'Women',     path: '/shop',       hasMega: true  },
  { label: 'Men',       path: '/shop',       hasMega: true  },
  { label: 'Kids',      path: '/shop',       hasMega: true  },
  { label: 'Shop all',  path: '/shop',       hasMega: true  },
  { label: 'Our story', path: '/our-story',  hasMega: false },
  { label: 'Contact',   path: '/testimonials', hasMega: false },
];

/* ─── Dot separator ──────────────────────────────────────────────────────── */
function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{ color: 'var(--color-announcement-text)', opacity: 0.35 }}
      className="mx-6 select-none"
    >
      •
    </span>
  );
}

/* ─── Scrolling announcement strip ──────────────────────────────────────── */
function AnnouncementStrip() {
  return (
    <span className="flex items-center whitespace-nowrap">
      {announcements.map((msg, i) => (
        <span key={i} className="flex items-center">
          <span
            style={{
              fontSize: 'var(--announcement-font-size)',
              color: 'var(--color-announcement-text)',
              fontWeight: 500,
            }}
          >
            {msg}
          </span>
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
  /* ── State ── */
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeMenu,  setActiveMenu]  = useState(null); // which mega-menu is open (label string | null)
  const [signInOpen,  setSignInOpen]  = useState(false);

  /* ── Refs ── */
  const timeoutRef  = useRef(null);
  const headerRef   = useRef(null);

  /* ── Hooks ── */
  const navigate              = useNavigate();
  const { totalItems, cartIconRef } = useCart();

  /* ── Helpers: open / close mega-menu with a small leave-delay ────────── */
  const openMenu  = useCallback((label) => {
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

  /* ── Close mega-menu on Escape ───────────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [closeMenu]);

  /* ── Close mega-menu on click outside header ─────────────────────────── */
  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeMenu]);

  /* ── Link style helper ───────────────────────────────────────────────── */
  const linkStyle = ({ isActive }) => ({
    fontSize: 'var(--nav-link-font-size)',
    color: isActive ? 'var(--color-nav-link-hover)' : 'var(--color-nav-link)',
    fontWeight: isActive ? 700 : 'var(--nav-link-font-weight)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s',
  });

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          Header — sticky, sits above all page content
      ════════════════════════════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50"
        style={{ background: 'var(--color-navbar-bg)' }}
      >
        {/* ── 1. Announcement bar ── */}
        <div
          className="marquee-wrapper"
          style={{
            background: 'var(--color-announcement-bg)',
            height: 'var(--announcement-height)',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Announcements"
        >
          <div className="marquee-track" aria-hidden="false">
            <AnnouncementStrip />
            <AnnouncementStrip />
          </div>
        </div>

        {/* ── 2. Main navbar ── */}
        <nav
          style={{
            background: 'var(--color-navbar-bg)',
            borderBottom: '1px solid var(--color-navbar-border)',
            height: 'var(--navbar-height-desktop)',
            paddingLeft: 'var(--navbar-padding-x)',
            paddingRight: 'var(--navbar-padding-x)',
          }}
          className="flex items-center relative"
          aria-label="Main navigation"
        >
          {/* ── Left: desktop nav links ── */}
          <div
            className="hidden md:flex items-center flex-1"
            style={{ gap: 'var(--nav-link-gap)' }}
          >
            {navLinks.map((link) =>
              link.hasMega ? (
                /* Wrapper handles hover intent */
                <div
                  key={link.label}
                  style={{ position: 'static' }}
                  onMouseEnter={() => openMenu(link.label)}
                  onMouseLeave={scheduleClose}
                >
                  <NavLink
                    to={link.path}
                    style={linkStyle}
                    className="hover:underline hover:underline-offset-2"
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
                  style={linkStyle}
                  className="hover:underline hover:underline-offset-2"
                  onClick={() => closeMenu()}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <div className="flex md:hidden flex-1 items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              style={{ color: 'var(--color-icon)' }}
              className="p-1"
            >
              {menuOpen
                ? <X size={20} strokeWidth={1.5} />
                : <Menu size={20} strokeWidth={1.5} />
              }
            </button>
          </div>

          {/* ── Center: Logo ── */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <NavLink
              to="/"
              aria-label="Go to homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'var(--logo-width)',
                height: 'var(--logo-height)',
                background: 'var(--color-logo-bg)',
                border: '1px solid var(--color-logo-border)',
                borderRadius: 'var(--logo-radius)',
                color: 'var(--color-logo-text)',
                fontSize: 'var(--logo-font-size)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              LOGO
            </NavLink>
          </div>

          {/* ── Right: icon buttons ── */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            {/* Search */}
            <button
              aria-label="Search"
              style={{ color: 'var(--color-icon)' }}
              className="p-1 transition-colors hover:opacity-60"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* Account — opens Sign-in modal */}
            <button
              aria-label="Sign in to your account"
              onClick={() => setSignInOpen(true)}
              style={{ color: 'var(--color-icon)' }}
              className="p-1 transition-colors hover:opacity-60"
            >
              <User size={19} strokeWidth={1.5} />
            </button>

            {/* Cart */}
            <button
              ref={cartIconRef}
              aria-label={`Shopping bag${totalItems > 0 ? `, ${totalItems} item${totalItems !== 1 ? 's' : ''}` : ''}`}
              onClick={() => navigate('/cart')}
              className="p-1 transition-colors hover:opacity-60 relative"
              style={{ color: 'var(--color-icon)' }}
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

        {/* ── 3. Mega-dropdown panel ── */}
        {activeMenu && (() => {
          const link = navLinks.find(l => l.label === activeMenu);
          if (!link?.hasMega) return null;
          return (
            <div
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              /* Sits just below the nav bar, full-width */
              style={{ position: 'relative', zIndex: 100 }}
            >
              <NavigationDropdown
                menuKey={activeMenu}
                onClose={closeMenu}
              />
            </div>
          );
        })()}

        {/* ── 4. Mobile menu ── */}
        {menuOpen && (
          <div
            style={{
              background: 'var(--color-mobile-menu-bg)',
              borderBottom: '1px solid var(--color-mobile-menu-border)',
            }}
            className="md:hidden px-5 pt-3 pb-5 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  fontSize: 13,
                  color: isActive ? 'var(--color-nav-link-hover)' : 'var(--color-nav-link)',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-mobile-menu-border)',
                })}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Sign in row */}
            <button
              onClick={() => { setMenuOpen(false); setSignInOpen(true); }}
              style={{
                fontSize: 13,
                color: 'var(--color-nav-link)',
                fontWeight: 400,
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid var(--color-mobile-menu-border)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--color-mobile-menu-border)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Sign in
            </button>

            {/* Cart row */}
            <button
              onClick={() => { setMenuOpen(false); navigate('/cart'); }}
              style={{
                fontSize: 13,
                color: 'var(--color-nav-link)',
                fontWeight: 400,
                padding: '8px 0',
                borderBottom: '1px solid var(--color-mobile-menu-border)',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Your bag
              {totalItems > 0 && (
                <span
                  style={{
                    background: '#C8502A',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: '999px',
                    padding: '1px 6px',
                    lineHeight: 1.5,
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        )}
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          Sign-in modal — rendered outside the header so it can be
          full-screen and stack above everything (z-index 1000).
      ════════════════════════════════════════════════════════════════════ */}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        /* Wire up real handlers when auth backend is ready:
           onSendCode={async (email) => { ... }}
           onGoogleAuth={() => { ... }}
           onAppleAuth={() => { ... }}
        */
      />
    </>
  );
}
