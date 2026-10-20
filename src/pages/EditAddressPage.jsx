import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ORANGE = '#C9573A';

const MOCK_USER = {
  firstName: 'Salma',
  lastName: 'Hassan',
  email: 'salma.hassan@example.com',
};

const NAV_ITEMS = [
  { label: 'Personal details', path: '/account' },
  { label: 'My orders',        path: '/account/orders' },
  { label: 'Address book',     path: '/account/addresses' },
  { label: 'Saved pieces',     path: '/account/saved' },
  { label: 'Preferences',      path: '/account/preferences' },
];

const MOCK_ADDRESSES = {
  1: {
    firstName: 'Salma', lastName: 'Hassan',
    phone: '+20 100 123 4567',
    street: '18 El Nozha Street',
    apartment: 'Apartment 4, Floor 2',
    district: 'Heliopolis',
    city: 'Cairo', country: 'Egypt',
    label: 'Home',
    note: 'Building entrance beside the pharmacy.',
    isDefault: true,
  },
  2: {
    firstName: 'Salma', lastName: 'Hassan',
    phone: '+20 100 123 4567',
    street: '12 Example Avenue',
    apartment: 'Office 6',
    district: 'Maadi',
    city: 'Cairo', country: 'Egypt',
    label: 'Work',
    note: '',
    isDefault: false,
  },
};

const CITIES    = ['Cairo', 'Alexandria', 'Giza', 'Sharm El-Sheikh', 'Luxor', 'Aswan'];
const COUNTRIES = ['Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Jordan', 'Lebanon'];

/* ── Input field ─────────────────────────────────────────────────────── */
function Field({ id, label, required, value, onChange, error, type = 'text', half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 0' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id} type={type} value={value} onChange={onChange} required={required}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a',
          background: '#fff', border: `1px solid ${error ? '#dc2626' : focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 8, padding: '11px 14px', outline: 'none', width: '100%', boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 2px rgba(201,87,58,0.12)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <p role="alert" style={{ fontSize: 11, color: '#dc2626', margin: 0, fontFamily: 'system-ui,sans-serif' }}>{error}</p>}
    </div>
  );
}

/* ── Select field ─────────────────────────────────────────────────────── */
function SelectField({ id, label, required, value, onChange, options, error, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 0' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange} required={required}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a',
          background: '#fff', border: `1px solid ${error ? '#dc2626' : focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 8, padding: '11px 14px', outline: 'none', width: '100%', boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 2px rgba(201,87,58,0.12)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s', appearance: 'auto', cursor: 'pointer',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p role="alert" style={{ fontSize: 11, color: '#dc2626', margin: 0, fontFamily: 'system-ui,sans-serif' }}>{error}</p>}
    </div>
  );
}

/* ── Textarea field ───────────────────────────────────────────────────── */
function TextareaField({ id, label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}>{label}</label>
      <textarea
        id={id} value={value} onChange={onChange} rows={3}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a',
          background: '#fff', border: `1px solid ${focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 8, padding: '11px 14px', outline: 'none', width: '100%', boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 2px rgba(201,87,58,0.12)' : 'none',
          resize: 'vertical', transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

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
            const isActive = item.label === 'Address book';
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
   EditAddressPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function EditAddressPage() {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const existing  = MOCK_ADDRESSES[id] || MOCK_ADDRESSES[1];

  const [form, setForm]       = useState({ ...existing });
  const [errors, setErrors]   = useState({});
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState(false);

  const ch = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(p => ({ ...p, [field]: val }));
    setErrors(p => ({ ...p, [field]: '' }));
    setSuccess(false);
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim())  errs.lastName  = 'Required';
    if (!form.phone.trim())     errs.phone     = 'Required';
    if (!form.street.trim())    errs.street    = 'Required';
    if (!form.district.trim())  errs.district  = 'Required';
    if (!form.city.trim())      errs.city      = 'Required';
    if (!form.country.trim())   errs.country   = 'Required';
    return errs;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    setSuccess(true);
    setTimeout(() => navigate('/account/addresses'), 1000);
  };

  const previewAddress = [
    `${form.firstName} ${form.lastName}`,
    `${form.street}${form.apartment ? ', ' + form.apartment : ''}`,
    `${form.district ? form.district + ', ' : ''}${form.city}, ${form.country}`,
    form.phone,
  ].filter(Boolean);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[
              { label: 'Home', path: '/' },
              { label: 'My account', path: '/account' },
              { label: 'Edit delivery address', path: '#' },
            ].map((c, i, arr) => (
              <li key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i < arr.length - 1 ? (
                  <>
                    <button onClick={() => navigate(c.path)} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.color = '#888'}
                    >{c.label}</button>
                    <span style={{ color: '#ccc', fontSize: 12 }}>/</span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a' }} aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Page heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.1 }}>
          Edit delivery address
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
          A few details, so your pieces can find their way to you.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: '#ece8e2', margin: '16px 0 28px' }} />

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <Sidebar onSignOut={() => navigate('/')} />

          {/* Main: form + preview side by side */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 32, alignItems: 'flex-start' }}>

            {/* ── FORM ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '0 0 18px' }}>
                * Required fields · Sample address
              </p>

              <form onSubmit={handleSave} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* First + Last name */}
                <div style={{ display: 'flex', gap: 14 }}>
                  <Field id="ea-first" label="First name" required value={form.firstName} onChange={ch('firstName')} error={errors.firstName} half />
                  <Field id="ea-last"  label="Last name"  required value={form.lastName}  onChange={ch('lastName')}  error={errors.lastName}  half />
                </div>

                {/* Phone */}
                <Field id="ea-phone" label="Phone number" required value={form.phone} onChange={ch('phone')} error={errors.phone} type="tel" />

                {/* Street */}
                <Field id="ea-street" label="Street address" required value={form.street} onChange={ch('street')} error={errors.street} />

                {/* Apartment + District */}
                <div style={{ display: 'flex', gap: 14 }}>
                  <Field id="ea-apt"      label="Apartment / Floor" value={form.apartment} onChange={ch('apartment')} half />
                  <Field id="ea-district" label="Area / District"   required value={form.district} onChange={ch('district')} error={errors.district} half />
                </div>

                {/* City + Country */}
                <div style={{ display: 'flex', gap: 14 }}>
                  <SelectField id="ea-city"    label="City / Governorate" required value={form.city}    onChange={ch('city')}    options={CITIES}    error={errors.city}    half />
                  <SelectField id="ea-country" label="Country"            required value={form.country} onChange={ch('country')} options={COUNTRIES} error={errors.country} half />
                </div>

                {/* Label */}
                <Field id="ea-label" label="Address label (optional)" value={form.label} onChange={ch('label')} />

                {/* Delivery note */}
                <TextareaField id="ea-note" label="Delivery note (optional)" value={form.note} onChange={ch('note')} />

                {/* Default checkbox */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={ch('isDefault')}
                    style={{ width: 16, height: 16, marginTop: 2, accentColor: ORANGE, cursor: 'pointer', flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a' }}>
                    Use as my default delivery address
                    <span style={{ display: 'block', fontSize: 12, color: '#aaa', marginTop: 2 }}>
                      You can still choose a different address at checkout.
                    </span>
                  </span>
                </label>

                {/* Success message */}
                {success && (
                  <div role="status" aria-live="polite" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#166534' }}>
                    ✓ Address saved successfully!
                  </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
                  <button
                    type="submit" disabled={saving}
                    style={{ background: saving ? '#d4856e' : ORANGE, color: '#fff', fontFamily: 'system-ui,sans-serif', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 999, padding: '12px 28px', cursor: saving ? 'not-allowed' : 'pointer' }}
                    onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#b84d32'; }}
                    onMouseLeave={e => { if (!saving) e.currentTarget.style.background = ORANGE; }}
                  >
                    {saving ? 'Saving…' : 'Save address'}
                  </button>
                  <button
                    type="button" onClick={() => navigate('/account/addresses')}
                    style={{ background: '#fff', border: '1px solid #ddd8d0', borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#3a3a3a', padding: '12px 24px', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#aaa'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd8d0'}
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>

            {/* ── PREVIEW CARD ── */}
            <div style={{ width: 240, flexShrink: 0 }}>
              <div style={{ background: '#FCFBF8', border: '1px solid #ece8e2', borderRadius: 12, padding: '22px 22px 20px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 400, color: '#1a1a1a', margin: '0 0 10px' }}>
                  Your address at a glance
                </h3>
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, color: '#3a3a3a', margin: '0 0 8px' }}>
                  {form.label || 'Address'} · Default delivery address
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 12 }}>
                  {previewAddress.map((line, i) => (
                    <p key={i} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#555', margin: 0 }}>{line}</p>
                  ))}
                </div>
                {form.note && (
                  <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '0 0 12px' }}>
                    {form.note}
                  </p>
                )}
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '0 0 14px', lineHeight: 1.5 }}>
                  This form also supports adding a new address. Save only once all required details are complete.
                </p>
                <button
                  type="button"
                  style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Need delivery help?
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
