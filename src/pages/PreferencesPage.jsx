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

const EMAIL_PREFS = [
  { id: 'arrivals', label: 'New arrivals & collection edits',  desc: 'Discover the latest pieces for women, men and kids.',          default: true  },
  { id: 'fabric',   label: 'Fabric stories & care notes',      desc: 'Thoughtful reads and practical ways to care for your clothes.', default: true  },
  { id: 'offers',   label: 'Offers & shop updates',            desc: 'Occasional news from nesej.',                                   default: false },
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
            const isActive = item.label === 'Preferences';
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

/* ═══════════════════════════════════════════════════════════════════════
   PreferencesPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function PreferencesPage() {
  const navigate = useNavigate();

  const [prefs, setPrefs]     = useState(() => Object.fromEntries(EMAIL_PREFS.map(p => [p.id, p.default])));
  const [saving, setSaving]   = useState(false);
  const [saved,  setSaved_]   = useState(false);

  const toggle = (id) => { setPrefs(p => ({ ...p, [id]: !p[id] })); setSaved_(false); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    setSaved_(true);
    setTimeout(() => setSaved_(false), 3000);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'Your account, your way.', path: '/account/preferences' }].map((c, i, arr) => (
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
          Your account, your way.
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
          Choose what reaches your inbox and keep your account in your hands.
        </p>
        <div style={{ height: 1, background: '#ece8e2', margin: '16px 0 28px' }} />

        {/* Layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>
          <Sidebar onSignOut={() => navigate('/')} />

          {/* Form */}
          <div style={{ flex: 1, minWidth: 0, maxWidth: 560 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 400, color: '#1a1a1a', margin: '0 0 8px' }}>
              Email preferences
            </h2>
            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 15, color: '#666', margin: '0 0 24px', lineHeight: 1.55 }}>
              New pieces, fabric stories and practical care notes. Only the things you want to hear about.
            </p>

            <form onSubmit={handleSave} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {EMAIL_PREFS.map((pref, i) => (
                  <label
                    key={pref.id}
                    htmlFor={`pref-${pref.id}`}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      padding: '18px 0',
                      borderBottom: i < EMAIL_PREFS.length - 1 ? '1px solid #f0ece6' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Custom checkbox */}
                    <div style={{ position: 'relative', flexShrink: 0, marginTop: 2 }}>
                      <input
                        id={`pref-${pref.id}`}
                        type="checkbox"
                        checked={prefs[pref.id]}
                        onChange={() => toggle(pref.id)}
                        style={{ position: 'absolute', opacity: 0, width: 18, height: 18, cursor: 'pointer', margin: 0 }}
                      />
                      <div style={{
                        width: 18, height: 18, borderRadius: 4,
                        background: prefs[pref.id] ? ORANGE : '#fff',
                        border: `1.5px solid ${prefs[pref.id] ? ORANGE : '#ccc'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}>
                        {prefs[pref.id] && (
                          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                            <polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 15, fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>
                        {pref.label}
                      </p>
                      <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#888', margin: 0, lineHeight: 1.55 }}>
                        {pref.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Success */}
              {saved && (
                <div role="status" aria-live="polite" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#166534', margin: '16px 0' }}>
                  ✓ Preferences saved.
                </div>
              )}

              <button
                type="submit" disabled={saving}
                style={{ marginTop: 24, background: saving ? '#d4856e' : ORANGE, color: '#fff', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 999, padding: '12px 28px', cursor: saving ? 'not-allowed' : 'pointer' }}
                onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#b84d32'; }}
                onMouseLeave={e => { if (!saving) e.currentTarget.style.background = ORANGE; }}
              >
                {saving ? 'Saving…' : 'Save preferences'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
