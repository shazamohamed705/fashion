import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const INITIAL_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    isDefault: true,
    name: 'Salma Hassan',
    line1: '18 El Nozha Street, Apartment 4, Floor 2',
    line2: 'Heliopolis, Cairo, Egypt',
    phone: '+20 100 123 4567',
  },
  {
    id: 2,
    label: 'Work',
    isDefault: false,
    name: 'Salma Hassan',
    line1: '12 Example Avenue, Office 6',
    line2: 'Maadi, Cairo, Egypt',
    phone: '+20 100 123 4567',
  },
];

const EMPTY_FORM = { label: '', name: '', line1: '', line2: '', phone: '' };

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
        <button
          type="button" onClick={onSignOut}
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
      </div>
    </aside>
  );
}

/* ── Address form modal ───────────────────────────────────────────────── */
function AddressFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const change = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.label.trim()) errs.label = 'Required';
    if (!form.name.trim())  errs.name  = 'Required';
    if (!form.line1.trim()) errs.line1 = 'Required';
    if (!form.line2.trim()) errs.line2 = 'Required';
    if (!form.phone.trim()) errs.phone = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  const inputStyle = (err) => ({
    fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#1a1a1a',
    background: '#fff', border: `1px solid ${err ? '#dc2626' : '#ddd8d0'}`,
    borderRadius: 10, padding: '10px 14px', outline: 'none',
    width: '100%', boxSizing: 'border-box',
  });

  const fields = [
    { id: 'label', label: 'Address label (e.g. Home, Work)', field: 'label' },
    { id: 'name',  label: 'Full name',   field: 'name' },
    { id: 'line1', label: 'Address line 1', field: 'line1' },
    { id: 'line2', label: 'City, Country', field: 'line2' },
    { id: 'phone', label: 'Phone number',  field: 'phone' },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', zIndex: 1000 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 14, padding: 32, width: '100%', maxWidth: 460, boxShadow: '0 16px 60px rgba(0,0,0,0.14)' }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 400, color: '#1a1a1a', margin: '0 0 20px' }}>
          {initial ? 'Edit address' : 'Add an address'}
        </h2>
        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {fields.map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#3a3a3a', display: 'block', marginBottom: 5 }}>
                {f.label}
              </label>
              <input
                id={f.id} value={form[f.field]} onChange={change(f.field)}
                style={inputStyle(errors[f.field])}
                onFocus={e => { e.target.style.borderColor = ORANGE; e.target.style.boxShadow = '0 0 0 2px rgba(201,87,58,0.12)'; }}
                onBlur={e  => { e.target.style.borderColor = errors[f.field] ? '#dc2626' : '#ddd8d0'; e.target.style.boxShadow = 'none'; }}
              />
              {errors[f.field] && <p style={{ fontSize: 11, color: '#dc2626', margin: '3px 0 0', fontFamily: 'system-ui,sans-serif' }}>{errors[f.field]}</p>}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <button
              type="submit"
              style={{ flex: 1, background: ORANGE, color: '#fff', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 999, padding: '11px 16px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#b84d32'}
              onMouseLeave={e => e.currentTarget.style.background = ORANGE}
            >
              Save address
            </button>
            <button
              type="button" onClick={onClose}
              style={{ background: 'none', border: '1px solid #ddd8d0', borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', padding: '11px 20px', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#aaa'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd8d0'}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Address card ─────────────────────────────────────────────────────── */
function AddressCard({ address, onEdit, onRemove, onMakeDefault }) {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#FCFBF8', border: '1px solid #ece8e2', borderRadius: 12, padding: '28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxSizing: 'border-box' }}>
      {/* Label + Default badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 500, color: '#1a1a1a', margin: 0 }}>
          {address.label}
        </h3>
        {address.isDefault && (
          <span style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#888', fontWeight: 400 }}>
            ( Default )
          </span>
        )}
      </div>

      {/* Address lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 14 }}>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{address.name}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{address.line1}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{address.line2}</p>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#3a3a3a', margin: 0 }}>{address.phone}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 14, marginBottom: address.isDefault ? 10 : 0 }}>
        <button
          type="button" onClick={() => navigate(`/account/addresses/${address.id}/edit`)}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#3a3a3a', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.color = '#3a3a3a'}
        >
          Edit address
        </button>
        <button
          type="button" onClick={onRemove}
          style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Remove
        </button>
      </div>

      {/* Default note or Make default button */}
      {address.isDefault ? (
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: 0 }}>
          Default address · Used as your first delivery choice.
        </p>
      ) : (
        <button
          type="button" onClick={onMakeDefault}
          style={{
            alignSelf: 'flex-start', background: '#fff', border: '1px solid #ddd8d0',
            borderRadius: 999, fontFamily: 'system-ui,sans-serif', fontSize: 12,
            color: '#1a1a1a', padding: '7px 16px', cursor: 'pointer', marginTop: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#aaa'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd8d0'}
        >
          Make default
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   AddressBookPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function AddressBookPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);

  const handleSave = (form) => {
    if (modal.mode === 'add') {
      setAddresses(prev => [...prev, { ...form, id: Date.now(), isDefault: prev.length === 0 }]);
    } else {
      setAddresses(prev => prev.map(a => a.id === modal.address.id ? { ...a, ...form } : a));
    }
    setModal(null);
  };

  const handleRemove = (id) => {
    setAddresses(prev => {
      const next = prev.filter(a => a.id !== id);
      // if we removed the default, make first one default
      if (next.length && !next.some(a => a.isDefault)) next[0].isDefault = true;
      return next;
    });
  };

  const handleMakeDefault = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'My account', path: '/account' }, { label: 'Address book', path: '/account/addresses' }].map((c, i, arr) => (
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
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px', lineHeight: 1.1 }}>
          Address book
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
          The places your everyday can find you.
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: '#ece8e2', margin: '16px 0 28px' }} />

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <Sidebar onSignOut={() => navigate('/')} />

          {/* Right content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Top row: count + Add button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#888', margin: 0 }}>
                {addresses.length} saved address{addresses.length !== 1 ? 'es' : ''}
              </p>
              <button
                type="button"
                onClick={() => navigate('/account/addresses/new')}
                style={{
                  background: ORANGE, color: '#fff',
                  fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600,
                  border: 'none', borderRadius: 999, padding: '10px 22px', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#b84d32'}
                onMouseLeave={e => e.currentTarget.style.background = ORANGE}
              >
                Add an address
              </button>
            </div>

            {/* Address cards grid */}
            {addresses.length === 0 ? (
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#aaa', padding: '24px 0' }}>
                No saved addresses yet.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20, alignItems: 'stretch' }}>
                {addresses.map(addr => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={() => setModal({ mode: 'edit', address: addr })}
                    onRemove={() => handleRemove(addr.id)}
                    onMakeDefault={() => handleMakeDefault(addr.id)}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
