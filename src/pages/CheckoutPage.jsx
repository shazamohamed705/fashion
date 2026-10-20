import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ORANGE = '#C9573A';

function fmt(n) {
  return `EGP ${Math.round(n).toLocaleString('en-US')}`;
}

const FREE_DELIVERY = 2000;
const DELIVERY_FEE  = 60;

/* ─── Payment methods ───────────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  { id: 'instapay',      label: 'InstaPay',      logo: null },
  { id: 'vodafone',      label: 'Vodafone Cash', logo: null },
  { id: 'orange',        label: 'Orange Cash',   logo: null },
  { id: 'etisalat',      label: 'Etisalat Cash', logo: null },
];

/* ─── Stepper ───────────────────────────────────────────────────────────── */
const STEPS = ['Contact & delivery', 'Payment & review', 'Confirmation'];

function Stepper({ current }) {
  return (
    <nav aria-label="Checkout steps" className="co-stepper">
      {STEPS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={label} className="co-stepper-step">
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              <span className="co-stepper-num" style={{
                background: active ? ORANGE : done ? '#1a1a1a' : '#e5e0da',
                color: active || done ? '#fff' : '#aaa',
              }}>
                {done ? '✓' : i + 1}
              </span>
              <span className="co-stepper-label" style={{
                fontWeight: active ? 700 : 400,
                color: active ? ORANGE : done ? '#1a1a1a' : '#aaa',
              }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="co-stepper-line" style={{ background: done ? '#1a1a1a' : '#e5e0da' }} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

/* ─── Deliver-to card ───────────────────────────────────────────────────── */
function DeliverToCard({ form, onEdit }) {
  return (
    <div className="co-card" style={{ marginBottom: 20 }}>
      <div className="co-card-header">
        <span className="co-card-title">Deliver to</span>
        <button type="button" className="co-edit-btn" onClick={onEdit}>Edit</button>
      </div>
      <p className="co-addr-name">{form.firstName} {form.lastName}</p>
      <p className="co-addr-line">{form.address}{form.apartment ? `, ${form.apartment}` : ''}</p>
      <p className="co-addr-line">{form.area ? `${form.area}, ` : ''}{form.city}, Egypt</p>
      {form.phone && <p className="co-addr-line" style={{ marginTop: 6 }}>{form.phone} · <span style={{ color: '#aaa' }}>Sample delivery address</span></p>}
      {form.email && <p className="co-addr-line" style={{ marginTop: 4 }}>Contact: {form.email}</p>}
      <p className="co-addr-line" style={{ marginTop: 6 }}>
        Standard delivery · {fmt(DELIVERY_FEE)} · <span style={{ color: '#aaa' }}>Sample customer details</span>
      </p>
    </div>
  );
}

/* ─── Payment option row ────────────────────────────────────────────────── */
function PaymentRow({ id, label, selected, onSelect }) {
  return (
    <label
      className="co-pay-row"
      style={{
        border: `1.5px solid ${selected ? ORANGE : '#d4d0cb'}`,
      }}
    >
      {/* Logo placeholder */}
      <span className="co-pay-logo" />
      <span className="co-pay-label">{label}</span>
      <input
        type="radio" name="payment" value={id}
        checked={selected} onChange={() => onSelect(id)}
        style={{ marginLeft: 'auto', accentColor: ORANGE, cursor: 'pointer' }}
      />
    </label>
  );
}

/* ─── Order summary ─────────────────────────────────────────────────────── */
function OrderSummary({ items, merchandiseTotal }) {
  const deliveryFree = merchandiseTotal >= FREE_DELIVERY;
  const delivery     = deliveryFree ? 0 : DELIVERY_FEE;
  const total        = merchandiseTotal + delivery;

  return (
    <aside className="co-summary">
      <h2 className="co-summary-title">Order summary</h2>
      <p className="co-summary-meta">{items.length} items · All prices in EGP</p>

      <div className="co-summary-items">
        {items.map(item => (
          <div key={item.key} className="co-summary-item">
            <div className="co-summary-img-wrap">
              <img
                src={item.img} alt={item.name}
                className="co-summary-img"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="co-summary-item-name">{item.name}</p>
              <p className="co-summary-item-meta">{item.color} · Size {item.size} · Qty {item.qty}</p>
              <p className="co-summary-item-price">{fmt(item.price * item.qty)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="co-summary-divider" />

      <div className="co-summary-totals">
        <div className="co-summary-row">
          <span>Subtotal</span>
          <span>{fmt(merchandiseTotal)}</span>
        </div>
        <div className="co-summary-row">
          <span>Delivery</span>
          <span style={{ color: deliveryFree ? '#3D7A52' : undefined }}>
            {deliveryFree ? 'Free' : fmt(DELIVERY_FEE)}
          </span>
        </div>
        <div className="co-summary-divider" style={{ margin: '4px 0' }} />
        <div className="co-summary-row co-summary-total">
          <span>Total</span>
          <span>{fmt(total)}</span>
        </div>
      </div>

      <p className="co-summary-note">Easy 14-day returns.</p>
    </aside>
  );
}

/* ─── Field ─────────────────────────────────────────────────────────────── */
function Field({ label, id, type = 'text', value, onChange, placeholder, required, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#3a3a3a' }}>
        {label}{required && <span style={{ color: ORANGE }}> *</span>}
      </label>
      <input
        id={id} type={type} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={id}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, padding: '10px 13px',
          border: `1px solid ${focused ? ORANGE : '#d4d0cb'}`,
          boxShadow: focused ? `0 0 0 2px rgba(201,87,58,0.12)` : 'none',
          borderRadius: 7, outline: 'none', color: '#1a1a1a', background: '#fff',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function SelectField({ label, id, value, onChange, options, half }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: half ? '1 1 calc(50% - 8px)' : '1 1 100%', minWidth: 0 }}>
      <label htmlFor={id} style={{ fontFamily: 'system-ui,sans-serif', fontSize: 12, fontWeight: 500, color: '#3a3a3a' }}>
        {label}
      </label>
      <select
        id={id} value={value} onChange={onChange}
        style={{
          fontFamily: 'system-ui,sans-serif', fontSize: 13, padding: '10px 13px',
          border: `1px solid ${focused ? ORANGE : '#d4d0cb'}`,
          boxShadow: focused ? `0 0 0 2px rgba(201,87,58,0.12)` : 'none',
          borderRadius: 7, outline: 'none', color: value ? '#1a1a1a' : '#aaa',
          background: '#fff', cursor: 'pointer', appearance: 'auto',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CheckoutPage — two steps: 0 = contact/delivery, 1 = payment/review
═══════════════════════════════════════════════════════════════════════════ */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, merchandiseTotal } = useCart();

  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState('instapay');

  const [form, setForm] = useState({
    firstName: 'Salma', lastName: 'Hassan',
    email: 'salma.hassan@example.com',
    phone: '+20 100 123 4567',
    address: '18 El Nozha Street', apartment: 'Apartment 4, Floor 2',
    area: 'Heliopolis', city: 'Cairo', country: 'Egypt',
    deliveryNote: '',
  });

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const deliveryFee = merchandiseTotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;
  const total       = merchandiseTotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 15, color: '#888' }}>Your bag is empty.</p>
        <button
          onClick={() => navigate('/shop')}
          style={{ background: ORANGE, color: '#fff', border: 'none', borderRadius: 999, padding: '11px 28px', fontFamily: 'system-ui,sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Continue shopping
        </button>
      </div>
    );
  }

  /* ── Step 0: Contact & delivery ── */
  function renderStep0() {
    return (
      <form onSubmit={e => { e.preventDefault(); setStep(1); }} style={{ flex: 1, minWidth: 0 }}>
        <h1 className="co-page-title">Contact &amp; delivery</h1>
        <p className="co-page-subtitle">A few details, so your pieces can find their way to you.</p>

        {/* Contact */}
        <section style={{ marginBottom: 28 }}>
          <h2 className="co-section-title">Contact details</h2>
          <div className="co-fields">
            <Field label="Email address" id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
            <Field label="Phone number"  id="phone" type="tel"  value={form.phone} onChange={set('phone')} placeholder="+20 100 123 4567" half />
          </div>
        </section>

        {/* Address */}
        <section style={{ marginBottom: 28 }}>
          <h2 className="co-section-title">Delivery address</h2>
          <div className="co-fields">
            <Field label="First name"    id="firstName"     value={form.firstName}  onChange={set('firstName')}  placeholder="Salma"   required half />
            <Field label="Last name"     id="lastName"      value={form.lastName}   onChange={set('lastName')}   placeholder="Hassan"  required half />
            <Field label="Street address" id="address"      value={form.address}    onChange={set('address')}    placeholder="18 El Nozha Street" required />
            <Field label="Apartment / Floor" id="apartment" value={form.apartment}  onChange={set('apartment')}  placeholder="Apartment 4, Floor 2" half />
            <Field label="Area / District"   id="area"      value={form.area}       onChange={set('area')}       placeholder="Heliopolis" half />
            <SelectField
              label="City" id="city" value={form.city} onChange={set('city')} half
              options={[
                { value: 'Cairo',       label: 'Cairo' },
                { value: 'Giza',        label: 'Giza' },
                { value: 'Alexandria',  label: 'Alexandria' },
                { value: 'Qalyubia',    label: 'Qalyubia' },
                { value: 'Other',       label: 'Other' },
              ]}
            />
            <SelectField
              label="Country" id="country" value={form.country} onChange={set('country')} half
              options={[{ value: 'Egypt', label: 'Egypt' }]}
            />
            <Field label="Delivery instructions (optional)" id="deliveryNote" value={form.deliveryNote} onChange={set('deliveryNote')} placeholder="Building entrance details for the driver" />
          </div>
        </section>

        {/* Actions */}
        <div className="co-actions">
          <button type="submit" className="co-btn-primary">
            Continue to payment →
          </button>
          <Link to="/cart" className="co-back-link">← Back to bag</Link>
        </div>
      </form>
    );
  }

  /* ── Step 1: Payment & review ── */
  function renderStep1() {
    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Deliver to card */}
        <DeliverToCard form={form} onEdit={() => setStep(0)} />

        {/* Choose how to pay */}
        <div className="co-card">
          <p className="co-card-title" style={{ marginBottom: 14 }}>Choose how to pay</p>
          <div className="co-pay-list">
            {PAYMENT_METHODS.map(m => (
              <PaymentRow
                key={m.id} id={m.id} label={m.label}
                selected={payMethod === m.id}
                onSelect={setPayMethod}
              />
            ))}
          </div>

          {/* Info text */}
          <div className="co-pay-info">
            <p className="co-pay-info-title">Payment gateway handoff</p>
            <p className="co-pay-info-body">
              You will be redirected to a secure external payment gateway to complete your order. No card details are entered on this site.
            </p>
            <p className="co-pay-info-body" style={{ marginTop: 8 }}>
              Once you continue, you will choose your preferred payment method and authorize the payment on the gateway page.
            </p>
            <p className="co-pay-info-body" style={{ marginTop: 8 }}>
              Your order will not be placed until payment is confirmed on the gateway.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="co-actions" style={{ marginTop: 28 }}>
          <button
            type="button"
            className="co-btn-primary co-btn-full"
            onClick={() => alert('Redirecting to payment gateway…')}
          >
            Continue to payment gateway — {fmt(total)}
          </button>
          <button type="button" className="co-back-link" onClick={() => setStep(0)}>
            ← Back to delivery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="co-root">
      <div className="co-inner">

        {/* Breadcrumb — step 0 only */}
        {step === 0 && (
          <nav aria-label="Breadcrumb" className="co-nav-breadcrumb">
            <Link to="/" className="co-nav-link">Home</Link>
            <span>/</span>
            <Link to="/cart" className="co-nav-link">Bag</Link>
            <span>/</span>
            <span style={{ color: '#555' }}>Checkout</span>
          </nav>
        )}

        {/* Stepper */}
        <Stepper current={step} />

        {/* Page header — shown above the two-column grid */}
        {step === 0 ? (
          /* Step 0 header is inside the form (keeps it above summary on mobile too) */
          null
        ) : (
          <div style={{ marginBottom: 24 }}>
            <p className="co-breadcrumb">Your bag / Checkout</p>
            <h1 className="co-page-title" style={{ marginTop: 4 }}>Payment &amp; review</h1>
            <p className="co-page-subtitle">One last look. Make sure everything feels right.</p>
          </div>
        )}

        {/* Main grid: form left + summary right */}
        <div className="co-layout">
          {step === 0 ? renderStep0() : renderStep1()}

          {/* Order summary — always visible */}
          <OrderSummary items={items} merchandiseTotal={merchandiseTotal} />
        </div>
      </div>
    </div>
  );
}
