import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ORANGE = '#C9573A';

const MOCK_USER = {
  firstName: 'Salma', lastName: 'Hassan', email: 'salma.hassan@example.com',
};

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved pieces',     path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

const INITIAL_SAVED = [
  { id: 1, name: 'Cotton pull-on skirt',  variant: 'Sky · XS S M L',       price: 'EGP 1,100', isNew: false, image: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg' },
  { id: 2, name: 'Brushed cotton shirt',  variant: 'Moss · S M L XL XXL',  price: 'EGP 1,320', isNew: false, image: '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg' },
  { id: 3, name: 'Loopback sweatshirt',   variant: 'Ink · S M L XL',       price: 'EGP 1,380', isNew: true,  image: '/ce36b5575235158056ba681b0c25c7743486fe47.jpg' },
  { id: 4, name: 'Cotton pull-on skirt',  variant: 'Sky · XS S M L',       price: 'EGP 1,100', isNew: false, image: '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg' },
  { id: 5, name: 'Brushed cotton shirt',  variant: 'Moss · S M L XL XXL',  price: 'EGP 1,320', isNew: false, image: '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg' },
  { id: 6, name: 'Loopback sweatshirt',   variant: 'Ink · S M L XL',       price: 'EGP 1,380', isNew: true,  image: '/ce36b5575235158056ba681b0c25c7743486fe47.jpg' },
];

/* ── Sidebar ──────────────────────────────────────────────────────────── */
function Sidebar({ onSignOut }) {
  const navigate = useNavigate();
  return (
    <aside style={{ width: 155, flexShrink: 0 }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '0 0 3px' }}>
          {MOCK_USER.firstName} {MOCK_USER.lastName}
        </p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', margin: 0, wordBreak: 'break-all' }}>
          {MOCK_USER.email}
        </p>
      </div>
      <nav aria-label="Account navigation">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.label === 'Saved pieces';
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    fontFamily: 'system-ui,sans-serif', fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? ORANGE : '#3a3a3a',
                    background: isActive ? '#FDF5F0' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${ORANGE}` : '3px solid transparent',
                    padding: '8px 10px', cursor: 'pointer',
                    borderRadius: '0 6px 6px 0', transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#fafaf8'; e.currentTarget.style.color = '#1a1a1a'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3a3a3a'; }}}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div style={{ height: 1, background: '#ece8e2', margin: '16px 0' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button type="button" onClick={() => navigate('/help')}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#555'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >Need a hand?</button>
        <button type="button" onClick={onSignOut}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Sign out</button>
      </div>
    </aside>
  );
}

/* ── Product card ─────────────────────────────────────────────────────── */
function SavedCard({ item, onUnsave }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: 10, overflow: 'hidden', background: '#f2eeea' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          onError={e => { e.target.style.display = 'none'; }}
        />

        {/* New badge */}
        {item.isNew && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#fff', border: '1px solid #C9573A', borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 10, fontWeight: 500, color: '#C9573A', padding: '2px 9px' }}>
            New
          </span>
        )}

        {/* Heart / unsave button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onUnsave(item.id); }}
          aria-label={`Remove ${item.name} from saved pieces`}
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 32, height: 32, borderRadius: '50%',
            background: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Filled heart */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill={ORANGE} stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>{item.name}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#aaa', margin: 0 }}>{item.variant}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: '2px 0 0' }}>{item.price}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SavedPiecesPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function SavedPiecesPage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(INITIAL_SAVED);

  const handleUnsave = (id) => setSaved(prev => prev.filter(p => p.id !== id));

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'Saved for another day.', path: '/account/saved' }].map((c, i, arr) => (
              <li key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i < arr.length - 1 ? (
                  <><button onClick={() => navigate(c.path)} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
                  >{c.label}</button><span style={{ color: '#ccc', fontSize: 12 }}>/</span></>
                ) : (
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a' }} aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.1 }}>
          Saved for another day.
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
          A little collection of pieces that feel like you.
        </p>
        <div style={{ height: 1, background: '#ece8e2', margin: '16px 0 28px' }} />

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <Sidebar onSignOut={() => navigate('/')} />

          {/* Right content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#888', margin: 0 }}>
                {saved.length} saved piece{saved.length !== 1 ? 's' : ''}
              </p>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                Continue shopping →
              </button>
            </div>

            {/* Empty state */}
            {saved.length === 0 ? (
              <div style={{ padding: '48px 0', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#aaa', margin: '0 0 12px' }}>Nothing saved yet.</p>
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#bbb', margin: '0 0 20px' }}>
                  Hit the heart on any piece to save it here.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  style={{ background: ORANGE, color: '#fff', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 999, padding: '11px 26px', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#b84d32'}
                  onMouseLeave={e => e.currentTarget.style.background = ORANGE}
                >
                  Shop all pieces
                </button>
              </div>
            ) : (
              /* Product grid — 3 columns */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(12px,2vw,20px)' }} className="saved-grid">
                {saved.map(item => (
                  <SavedCard key={item.id} item={item} onUnsave={handleUnsave} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .saved-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px) { .saved-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </div>
  );
}
