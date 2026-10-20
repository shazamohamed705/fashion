import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════════════
   Mock user — replace with real auth context when backend is ready
   ═══════════════════════════════════════════════════════════════════════ */
const INITIAL_USER = {
  firstName: 'Salma',
  lastName:  'Hassan',
  phone:     '+20 100 123 4567',
  email:     'salma.hassan@example.com',
};

/* ─── Sidebar nav items ──────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved pieces',     path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

/* ─── Accent color ───────────────────────────────────────────────────── */
const ORANGE = '#C9573A';

/* ═══════════════════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════════════════ */

/* Labelled text input */
function FormInput({ id, label, type = 'text', value, onChange, required, autoComplete, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}
      >
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        style={{
          fontFamily: 'system-ui,sans-serif',
          fontSize: 14,
          color: '#1a1a1a',
          background: '#fff',
          border: `1px solid ${error ? '#dc2626' : focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 14,
          padding: '11px 16px',
          outline: 'none',
          boxShadow: focused ? `0 0 0 2px rgba(201,87,58,0.12)` : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <p id={`${id}-err`} role="alert" style={{ fontSize: 12, color: '#dc2626', margin: 0, fontFamily: 'system-ui,sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* Email field with inline Edit toggle */
function EmailField({ value, onChange, editing, onEdit, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="account-email"
        style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}
      >
        Email address <span aria-hidden="true">*</span>
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${error ? '#dc2626' : focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 14,
          background: '#fff',
          boxShadow: focused ? `0 0 0 2px rgba(201,87,58,0.12)` : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          overflow: 'hidden',
        }}
      >
        <input
          id="account-email"
          type="email"
          value={value}
          onChange={onChange}
          readOnly={!editing}
          aria-invalid={!!error}
          aria-describedby={error ? 'account-email-err' : 'account-email-hint'}
          style={{
            flex: 1,
            fontFamily: 'system-ui,sans-serif',
            fontSize: 14,
            color: '#1a1a1a',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '11px 16px',
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button
          type="button"
          onClick={onEdit}
          style={{
            fontFamily: 'system-ui,sans-serif',
            fontSize: 13,
            fontWeight: 600,
            color: ORANGE,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            paddingRight: 16,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>
      {error && (
        <p id="account-email-err" role="alert" style={{ fontSize: 12, color: '#dc2626', margin: 0, fontFamily: 'system-ui,sans-serif' }}>
          {error}
        </p>
      )}
      {!error && (
        <p id="account-email-hint" style={{ fontSize: 12, color: '#888', margin: 0, fontFamily: 'system-ui,sans-serif', lineHeight: 1.5 }}>
          This is the email you use to sign in. Changing it requires a one-time verification code.
        </p>
      )}
    </div>
  );
}

/* Section heading (serif) */
function SectionHeading({ children }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 400, color: '#1a1a1a', margin: '0 0 18px', lineHeight: 1.2 }}>
      {children}
    </h2>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SidebarNavigation
   ═══════════════════════════════════════════════════════════════════════ */
function SidebarNavigation({ user, activeItem, onNavClick, onSignOut }) {
  const navigate = useNavigate();
  return (
    <aside style={{ width: 155, flexShrink: 0 }}>
      {/* User info */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#1a1a1a', margin: '0 0 3px' }}>
          {user.firstName} {user.lastName}
        </p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', margin: 0, wordBreak: 'break-all' }}>
          {user.email}
        </p>
      </div>

      {/* Nav items */}
      <nav aria-label="Account navigation">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.label === activeItem;
            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'system-ui,sans-serif',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? ORANGE : '#3a3a3a',
                    background: isActive ? '#FDF5F0' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? `3px solid ${ORANGE}` : '3px solid transparent',
                    padding: '8px 10px',
                    cursor: 'pointer',
                    borderRadius: '0 6px 6px 0',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#fafaf8'; e.currentTarget.style.color = '#1a1a1a'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3a3a3a'; } }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: '#ece8e2', margin: '16px 0' }} aria-hidden="true" />

      {/* Footer links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          type="button"
          onClick={onSignOut}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Sign out
        </button>
        <button type="button" onClick={() => navigate('/help')}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#555'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >Need a hand?</button>
        <button type="button" onClick={() => navigate('/help')}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Visit help →</button>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PersonalDetailsPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function PersonalDetailsPage() {
  const navigate = useNavigate();

  /* ── Form state ── */
  const [form, setForm]         = useState({ ...INITIAL_USER });
  const [saved, setSaved]       = useState({ ...INITIAL_USER });
  const [errors, setErrors]     = useState({});
  const [emailEditing, setEmailEditing] = useState(false);
  const [saveStatus, setSaveStatus]     = useState('idle'); // idle | saving | success | error

  /* ── Field change handler ── */
  const handleChange = useCallback((field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setSaveStatus('idle');
  }, []);

  /* ── Validate ── */
  const validate = useCallback(() => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required.';
    if (!form.lastName.trim())  errs.lastName  = 'Last name is required.';
    if (!form.phone.trim())     errs.phone     = 'Phone number is required.';
    if (!form.email.trim())     errs.email     = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = 'Please enter a valid email.';
    return errs;
  }, [form]);

  /* ── Save ── */
  const handleSave = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaveStatus('saving');
    // Simulate async save (replace with real API call)
    await new Promise(r => setTimeout(r, 700));
    setSaved({ ...form });
    setEmailEditing(false);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  }, [form, validate]);

  /* ── Cancel ── */
  const handleCancel = useCallback(() => {
    setForm({ ...saved });
    setErrors({});
    setEmailEditing(false);
    setSaveStatus('idle');
  }, [saved]);

  /* ── Sign out ── */
  const handleSignOut = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const isSaving = saveStatus === 'saving';

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: 1400,
          margin: '0',
          padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)',
        }}
      >
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'My account', path: '/account' },
              { label: 'Personal details', path: '/account' },
            ].map((crumb, i, arr) => (
              <li key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      to={crumb.path}
                      style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                      onMouseLeave={e => e.currentTarget.style.color = '#888'}
                    >
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true" style={{ color: '#ccc', fontSize: 12 }}>/</span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a' }} aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Page heading ── */}
        <div style={{ marginBottom: 6 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.1 }}>
            Personal details
          </h1>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
            A few familiar details, so everything feels like you.
          </p>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: '#ece8e2', margin: '16px 0 28px' }} aria-hidden="true" />

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px,5vw,64px)',
            alignItems: 'flex-start',
          }}
          className="account-layout"
        >
          {/* ── LEFT: Sidebar ── */}
          <SidebarNavigation
            user={saved}
            activeItem="Personal details"
            onNavClick={() => {}}
            onSignOut={handleSignOut}
          />

          {/* ── RIGHT: Form ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <form onSubmit={handleSave} noValidate>

              {/* About you */}
              <SectionHeading>About you</SectionHeading>

              {/* First + Last name row */}
              <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}
                className="name-grid"
              >
                <FormInput
                  id="account-firstName"
                  label="First name"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  required
                  autoComplete="given-name"
                  error={errors.firstName}
                />
                <FormInput
                  id="account-lastName"
                  label="Last name"
                  value={form.lastName}
                  onChange={handleChange('lastName')}
                  required
                  autoComplete="family-name"
                  error={errors.lastName}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 24 }}>
                <FormInput
                  id="account-phone"
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  required
                  autoComplete="tel"
                  error={errors.phone}
                />
              </div>

              {/* Email address */}
              <SectionHeading>Email address</SectionHeading>
              <div style={{ marginBottom: 24 }}>
                <EmailField
                  value={form.email}
                  onChange={handleChange('email')}
                  editing={emailEditing}
                  onEdit={() => setEmailEditing(prev => !prev)}
                  error={errors.email}
                />
              </div>

              {/* Save status message */}
              {saveStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{ marginBottom: 16, padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#166534' }}
                >
                  ✓ Your details have been saved.
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    background: isSaving ? '#d4856e' : ORANGE,
                    color: '#fff',
                    fontFamily: 'system-ui,sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    padding: '12px 28px',
                    borderRadius: 999,
                    border: 'none',
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSaving) e.currentTarget.style.background = '#b84d32'; }}
                  onMouseLeave={e => { if (!isSaving) e.currentTarget.style.background = ORANGE; }}
                >
                  {isSaving ? 'Saving…' : 'Save details'}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'system-ui,sans-serif',
                    fontSize: 14,
                    color: ORANGE,
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: 500,
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* ── Responsive tweaks ── */}
      <style>{`
        @media (max-width: 640px) {
          .account-layout {
            flex-direction: column !important;
          }
          .account-layout aside {
            width: 100% !important;
          }
          /* Horizontal scroll sidebar nav on mobile */
          .account-layout nav ul {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto;
            gap: 4px;
            padding-bottom: 4px;
            scrollbar-width: none;
          }
          .account-layout nav ul::-webkit-scrollbar { display: none; }
          .account-layout nav ul li button {
            white-space: nowrap;
            border-left: none !important;
            border-bottom: 3px solid transparent;
            border-radius: 4px !important;
          }
        }
        @media (max-width: 480px) {
          .name-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
