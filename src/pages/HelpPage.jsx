import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ORANGE = '#C9573A';

const TOPICS = [
  'Delivery & returns',
  'Size & fit',
  'Product care',
  'Account',
  'Payment',
  'Other',
];

const QUICK_LINKS = [
  { label: 'Help & size guide →', path: '#' },
  { label: 'Delivery & returns →', path: '#' },
  { label: 'Materials & care →', path: '#' },
  { label: 'My orders →', path: '/account/orders' },
];

/* ── Input ────────────────────────────────────────────────────────────── */
function Field({ id, label, required, value, onChange, error, type = 'text', half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 0' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id} type={type} value={value} onChange={onChange}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#1a1a1a',
          background: '#fff', border: `1px solid ${error ? '#dc2626' : focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 8, padding: '11px 14px', outline: 'none',
          width: '100%', boxSizing: 'border-box',
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

/* ── Select ───────────────────────────────────────────────────────────── */
function SelectField({ id, label, required, value, onChange, options, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 0' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#1a1a1a',
          background: '#fff', border: `1px solid ${focused ? ORANGE : '#ddd8d0'}`,
          borderRadius: 8, padding: '11px 14px', outline: 'none',
          width: '100%', boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 2px rgba(201,87,58,0.12)' : 'none',
          transition: 'border-color 0.15s', cursor: 'pointer', appearance: 'auto',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   HelpPage
   ═══════════════════════════════════════════════════════════════════════ */
export default function HelpPage() {
  const navigate = useNavigate();

  const [form, setForm]       = useState({ name: 'Salma Hassan', email: 'salma.hassan@example.com', topic: 'Delivery & returns', orderRef: 'NESEJ-DEMO-2030', message: "I'd like some guidance on returning the Relaxed linen shirt from my sample order. The fit feels larger than expected." });
  const [errors, setErrors]   = useState({});
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);

  const ch = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
    setSent(false);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Required';
    if (!form.email.trim())   errs.email   = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 800));
    setSending(false);
    setSent(true);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: 0, padding: 'clamp(20px,3vw,36px) clamp(40px,6%,88px)' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {[{ label: 'Home', path: '/' }, { label: 'Help', path: '#' }, { label: 'Contact', path: '/help' }].map((c, i, arr) => (
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

        {/* Page heading */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.1 }}>
          Need a hand?
        </h1>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#888', margin: 0 }}>
          Ask about fit, a piece, your delivery or a return. Tell us a little more.
        </p>
        <div style={{ height: 1, background: '#ece8e2', margin: '20px 0 32px' }} />

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 'clamp(40px,6vw,80px)', alignItems: 'flex-start' }}>

          {/* ── LEFT: sidebar info ── */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 400, color: '#1a1a1a', margin: '0 0 10px', lineHeight: 1.2 }}>
              A little help, thoughtfully.
            </h2>
            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#666', lineHeight: 1.6, margin: '0 0 20px' }}>
              Include your order reference if your question is about a purchase. For a question about a piece, share its name and size.
            </p>

            {/* Quick links card */}
            <div style={{ background: '#FCFBF8', border: '1px solid #ece8e2', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 500, color: '#1a1a1a', margin: '0 0 12px' }}>
                You might find it here.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {QUICK_LINKS.map(link => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => navigate(link.path)}
                    style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, color: ORANGE, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 2 }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 11, color: '#bbb', lineHeight: 1.5, margin: 0 }}>
              Illustrative contact form. Submission routing and response times are not established here.
            </p>
          </div>

          {/* ── RIGHT: contact form ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '0 0 16px' }}>
              * Required fields
            </p>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Name + Email */}
              <div style={{ display: 'flex', gap: 16 }}>
                <Field id="help-name"  label="Your name"      required value={form.name}  onChange={ch('name')}  error={errors.name}  half />
                <Field id="help-email" label="Email address"  required value={form.email} onChange={ch('email')} error={errors.email} type="email" half />
              </div>

              {/* Topic + Order ref */}
              <div style={{ display: 'flex', gap: 16 }}>
                <SelectField id="help-topic" label="What can we help with?" required value={form.topic} onChange={ch('topic')} options={TOPICS} half />
                <Field id="help-ref" label="Order reference (optional)" value={form.orderRef} onChange={ch('orderRef')} half />
              </div>

              {/* Topics hint */}
              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: '-8px 0 0' }}>
                Topics: Size &amp; fit · Delivery &amp; returns · Product care · Account · Other
              </p>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label htmlFor="help-msg" style={{ fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 500, color: '#3a3a3a' }}>
                  Your message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="help-msg"
                  value={form.message}
                  onChange={ch('message')}
                  rows={5}
                  style={{
                    fontFamily: 'system-ui,sans-serif', fontSize: 14, color: '#1a1a1a',
                    background: '#fff', border: `1px solid ${errors.message ? '#dc2626' : '#ddd8d0'}`,
                    borderRadius: 8, padding: '12px 14px', outline: 'none',
                    width: '100%', boxSizing: 'border-box', resize: 'vertical',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => { e.target.style.borderColor = ORANGE; e.target.style.boxShadow = '0 0 0 2px rgba(201,87,58,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = errors.message ? '#dc2626' : '#ddd8d0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.message && <p role="alert" style={{ fontSize: 11, color: '#dc2626', margin: 0, fontFamily: 'system-ui,sans-serif' }}>{errors.message}</p>}
                <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: 0 }}>
                  Please do not include payment card details or verification codes.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={sending}
                style={{ background: sending ? '#d4856e' : ORANGE, color: '#fff', fontFamily: 'system-ui,sans-serif', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 999, padding: '14px 28px', cursor: sending ? 'not-allowed' : 'pointer', width: '100%', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#b84d32'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = ORANGE; }}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>

              {/* Success */}
              {sent && (
                <div role="status" aria-live="polite" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', fontFamily: 'system-ui,sans-serif', fontSize: 13, color: '#166534' }}>
                  <span style={{ fontSize: 16 }}>✓</span>
                  <span>Message received — Illustrative submitted-message feedback. Nothing has been sent from this static form.</span>
                </div>
              )}

              <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, color: '#aaa', margin: 0 }}>
                Your supplied email is the contact detail for this question. No brand email address or phone number is assumed.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
