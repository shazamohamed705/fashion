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

/* ── Input ─────────────────────────────────────────────── */
function Field({ id, label, required, value, onChange, error, type = 'text', half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`flex flex-col gap-1 min-w-0 ${half ? 'flex-1' : 'w-full'}`}>
      <label htmlFor={id} className="text-[13px] font-medium text-[#3a3a3a]" style={{ fontFamily: 'system-ui' }}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id} type={type} value={value} onChange={onChange}
        className="w-full rounded-lg px-3.5 py-[11px] text-[14px] text-[#1a1a1a] bg-white outline-none transition-all"
        style={{
          border: `1px solid ${error ? '#dc2626' : focused ? ORANGE : '#ddd8d0'}`,
          boxShadow: focused ? '0 0 0 2px rgba(201,87,58,0.12)' : 'none',
          fontFamily: 'system-ui',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <p role="alert" className="text-[11px] text-red-600 m-0" style={{ fontFamily: 'system-ui' }}>{error}</p>}
    </div>
  );
}

/* ── Select ─────────────────────────────────────────────── */
function SelectField({ id, label, required, value, onChange, options, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={`flex flex-col gap-1 min-w-0 ${half ? 'flex-1' : 'w-full'}`}>
      <label htmlFor={id} className="text-[13px] font-medium text-[#3a3a3a]" style={{ fontFamily: 'system-ui' }}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={id} value={value} onChange={onChange}
        className="w-full rounded-lg px-3.5 py-[11px] text-[14px] text-[#1a1a1a] bg-white outline-none cursor-pointer transition-all"
        style={{
          border: `1px solid ${focused ? ORANGE : '#ddd8d0'}`,
          boxShadow: focused ? '0 0 0 2px rgba(201,87,58,0.12)' : 'none',
          fontFamily: 'system-ui',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HelpPage
═══════════════════════════════════════════════════════ */
export default function HelpPage() {
  const navigate = useNavigate();

  const [form, setForm]     = useState({ name: 'Salma Hassan', email: 'salma.hassan@example.com', topic: 'Delivery & returns', orderRef: 'NESEJ-DEMO-2030', message: "I'd like some guidance on returning the Relaxed linen shirt from my sample order. The fit feels larger than expected." });
  const [errors, setErrors] = useState({});
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
    <div className="bg-white min-h-full">
      <div className="max-w-[1400px] mx-0 px-4 md:px-[clamp(40px,6%,88px)] py-5 md:py-[clamp(20px,3vw,36px)] pb-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="list-none m-0 p-0 flex items-center gap-1.5">
            {[{ label: 'Home', path: '/' }, { label: 'Help', path: '#' }, { label: 'Contact', path: '/help' }].map((c, i, arr) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <><button onClick={() => navigate(c.path)} className="text-[12px] text-[#888] bg-transparent border-none cursor-pointer p-0 hover:text-[#1a1a1a] transition-colors" style={{ fontFamily: 'system-ui' }}>{c.label}</button><span className="text-[#ccc] text-[12px]">/</span></>
                ) : (
                  <span className="text-[12px] text-[#3a3a3a]" style={{ fontFamily: 'system-ui' }} aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Heading */}
        <h1 className="font-normal text-[#1a1a1a] m-0 mb-2 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,48px)' }}>
          Need a hand?
        </h1>
        <p className="text-[14px] text-[#888] m-0" style={{ fontFamily: 'system-ui' }}>
          Ask about fit, a piece, your delivery or a return. Tell us a little more.
        </p>
        <div className="h-px bg-[#ece8e2] my-5" />

        {/* ── Layout: stacked on mobile, side-by-side on md+ ── */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-[clamp(40px,6vw,80px)] items-start">

          {/* ── Sidebar ── */}
          <div className="w-full md:w-[220px] md:shrink-0">
            <h2 className="font-normal text-[#1a1a1a] m-0 mb-2.5 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)', fontSize: 22 }}>
              A little help, thoughtfully.
            </h2>
            <p className="text-[13px] text-[#666] leading-relaxed m-0 mb-5" style={{ fontFamily: 'system-ui' }}>
              Include your order reference if your question is about a purchase. For a question about a piece, share its name and size.
            </p>

            {/* Quick links */}
            <div className="bg-[#FCFBF8] border border-[#ece8e2] rounded-xl p-4 mb-5">
              <p className="font-medium text-[#1a1a1a] m-0 mb-3 text-[16px]" style={{ fontFamily: 'var(--font-heading)' }}>
                You might find it here.
              </p>
              <div className="flex flex-col gap-2">
                {QUICK_LINKS.map(link => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => navigate(link.path)}
                    className="text-[13px] text-left bg-transparent border-none cursor-pointer p-0 underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ fontFamily: 'system-ui', color: ORANGE }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#bbb] leading-relaxed m-0" style={{ fontFamily: 'system-ui' }}>
              Illustrative contact form. Submission routing and response times are not established here.
            </p>
          </div>

          {/* ── Form ── */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-[12px] text-[#aaa] m-0 mb-4" style={{ fontFamily: 'system-ui' }}>* Required fields</p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

              {/* Name + Email — stacked on mobile, side by side on sm+ */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Field id="help-name"  label="Your name"     required value={form.name}  onChange={ch('name')}  error={errors.name}  half />
                <Field id="help-email" label="Email address" required value={form.email} onChange={ch('email')} error={errors.email} type="email" half />
              </div>

              {/* Topic + Order ref */}
              <div className="flex flex-col sm:flex-row gap-4">
                <SelectField id="help-topic" label="What can we help with?" required value={form.topic} onChange={ch('topic')} options={TOPICS} half />
                <Field id="help-ref" label="Order reference (optional)" value={form.orderRef} onChange={ch('orderRef')} half />
              </div>

              <p className="text-[12px] text-[#aaa] m-0 -mt-2" style={{ fontFamily: 'system-ui' }}>
                Topics: Size &amp; fit · Delivery &amp; returns · Product care · Account · Other
              </p>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label htmlFor="help-msg" className="text-[13px] font-medium text-[#3a3a3a]" style={{ fontFamily: 'system-ui' }}>
                  Your message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="help-msg" value={form.message} onChange={ch('message')} rows={5}
                  className="w-full rounded-lg px-3.5 py-3 text-[14px] text-[#1a1a1a] bg-white outline-none resize-y transition-all"
                  style={{
                    fontFamily: 'system-ui',
                    border: `1px solid ${errors.message ? '#dc2626' : '#ddd8d0'}`,
                  }}
                  onFocus={e => { e.target.style.borderColor = ORANGE; e.target.style.boxShadow = '0 0 0 2px rgba(201,87,58,0.12)'; }}
                  onBlur={e  => { e.target.style.borderColor = errors.message ? '#dc2626' : '#ddd8d0'; e.target.style.boxShadow = 'none'; }}
                />
                {errors.message && <p role="alert" className="text-[11px] text-red-600 m-0" style={{ fontFamily: 'system-ui' }}>{errors.message}</p>}
                <p className="text-[12px] text-[#aaa] m-0" style={{ fontFamily: 'system-ui' }}>
                  Please do not include payment card details or verification codes.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={sending}
                className="w-full rounded-full py-3.5 text-[14px] font-semibold text-white border-none cursor-pointer transition-colors"
                style={{ fontFamily: 'system-ui', background: sending ? '#d4856e' : ORANGE }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = '#b84d32'; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = sending ? '#d4856e' : ORANGE; }}
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>

              {sent && (
                <div role="status" aria-live="polite" className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-[13px] text-green-800" style={{ fontFamily: 'system-ui' }}>
                  <span>✓</span>
                  <span>Message received — Illustrative submitted-message feedback.</span>
                </div>
              )}

              <p className="text-[12px] text-[#aaa] m-0" style={{ fontFamily: 'system-ui' }}>
                Your supplied email is the contact detail for this question.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
