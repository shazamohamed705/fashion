import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, ArrowRight, X, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

/* ─── Currency formatter ─────────────────────────────────────────────────── */
function fmt(amount) {
  // Use a universally-supported locale to avoid RangeError on some runtimes
  return `EGP ${Math.round(amount).toLocaleString('en-US')}`;
}

/* ─── Demo promo codes ───────────────────────────────────────────────────── */
const PROMO_CODES = {
  WELCOME10: { type: 'percent', value: 10, label: '10% off' },
  SAVE200:   { type: 'fixed',   value: 200, label: 'EGP 200 off' },
};

const FREE_DELIVERY_THRESHOLD = 2000;
const DELIVERY_FEE            = 80; // shown when below threshold

/* ═══════════════════════════════════════════════════════════════
   Breadcrumbs
═══════════════════════════════════════════════════════════════ */
function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#aaa] mb-3">
      <Link to="/" className="text-[#aaa] no-underline hover:text-[#1a1a1a] transition-colors">Home</Link>
      <span className="text-[#d0ccc7]">/</span>
      <span className="text-[#555]">Your bag</span>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   QuantitySelector
═══════════════════════════════════════════════════════════════ */
function QuantitySelector({ qty, onDecrement, onIncrement }) {
  return (
    <div
      role="group"
      aria-label="Quantity"
      className="flex items-center border border-[#e0dbd4] rounded-full overflow-hidden"
      style={{ height: 34, width: 100 }}
    >
      <button
        aria-label="Decrease quantity"
        onClick={onDecrement}
        disabled={qty <= 1}
        className="flex-1 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1a1a1a] disabled:text-[#ccc] disabled:cursor-default hover:bg-[#f5f3f0] transition-colors h-full"
      >
        <Minus size={12} strokeWidth={1.8} />
      </button>
      <span
        aria-live="polite"
        className="w-8 text-center text-[13px] font-medium text-[#1a1a1a] select-none shrink-0"
      >
        {qty}
      </span>
      <button
        aria-label="Increase quantity"
        onClick={onIncrement}
        className="flex-1 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1a1a1a] hover:bg-[#f5f3f0] transition-colors h-full"
      >
        <Plus size={12} strokeWidth={1.8} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CartItem
═══════════════════════════════════════════════════════════════ */
function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="flex gap-4 py-5">
      {/* Thumbnail */}
      <Link to={`/product/${item.id}`} className="shrink-0" aria-label={`View ${item.name}`}>
        <div
          className="rounded-xl overflow-hidden bg-[#f2eeea]"
          style={{ width: 110, height: 110, flexShrink: 0 }}
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover object-center block"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 gap-1.5 justify-between">
        {/* Top row: name + price */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/product/${item.id}`}
              className="no-underline"
            >
              <p
                style={{ fontFamily: 'var(--font-heading)' }}
                className="text-[17px] font-semibold text-[#1a1a1a] m-0 leading-snug hover:underline hover:underline-offset-2 transition-all"
              >
                {item.name}
              </p>
            </Link>
            <p className="text-[12px] text-[#999] m-0 mt-0.5 leading-relaxed">
              {item.color} · Size {item.size} · Qty {item.qty}
            </p>
          </div>
          <p className="text-[15px] font-semibold text-[#1a1a1a] m-0 shrink-0 whitespace-nowrap">
            {fmt(item.price * item.qty)}
          </p>
        </div>

        {/* Bottom row: qty selector + remove */}
        <div className="flex items-center justify-between gap-3">
          <QuantitySelector
            qty={item.qty}
            onDecrement={() => onUpdateQty(item.key, item.qty - 1)}
            onIncrement={() => onUpdateQty(item.key, item.qty + 1)}
          />
          <button
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => onRemove(item.key)}
            className="flex items-center gap-1 text-[12px] text-[#aaa] bg-transparent border-none cursor-pointer p-0 hover:text-[#C8502A] transition-colors"
          >
            <X size={11} strokeWidth={1.8} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FreeDeliveryProgress
═══════════════════════════════════════════════════════════════ */
function FreeDeliveryProgress({ subtotal }) {
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress  = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const unlocked  = remaining === 0;

  return (
    <div
      className="rounded-xl px-5 py-4 mt-3"
      style={{ background: '#F5F3EF', border: '1px solid #EAE6E0' }}
    >
      {/* Label */}
      <p
        className="m-0 mb-3 leading-snug"
        style={{ fontSize: 13, fontWeight: 500, color: unlocked ? '#3D7A52' : '#444' }}
      >
        {unlocked
          ? "You've unlocked free delivery."
          : <>
              You're{' '}
              <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{fmt(remaining)}</span>
              {' '}away from free delivery.
            </>
        }
      </p>

      {/* Progress bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Free delivery progress"
        className="w-full rounded-full overflow-hidden"
        style={{ height: 6, background: '#DDD9D3' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: unlocked ? '#3D7A52' : '#6FAA82',
          }}
        />
      </div>

      {/* Caption */}
      <p
        className="m-0 mt-2"
        style={{ fontSize: 11, color: '#B0AAA2' }}
      >
        {fmt(subtotal)} of {fmt(FREE_DELIVERY_THRESHOLD)} · Based on merchandise subtotal.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PromoCodeForm
═══════════════════════════════════════════════════════════════ */
function PromoCodeForm({ onApply, appliedCode }) {
  const [input,  setInput]  = useState('');
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [msg,    setMsg]    = useState('');

  function handleApply(e) {
    e.preventDefault();
    const code = input.trim().toUpperCase();
    if (!code) {
      setStatus('error');
      setMsg('Please enter a promo code.');
      return;
    }
    if (appliedCode) {
      setStatus('error');
      setMsg('A promo code is already applied. Remove it first.');
      return;
    }
    if (PROMO_CODES[code]) {
      setStatus('success');
      setMsg(`Code applied: ${PROMO_CODES[code].label}`);
      onApply(code, PROMO_CODES[code]);
      setInput('');
    } else {
      setStatus('error');
      setMsg("That code isn\u2019t valid. Try WELCOME10 for 10% off.");
    }
  }

  return (
    <div>
      <p className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wider m-0 mb-2" style={{ letterSpacing: '0.08em' }}>
        Promo code
      </p>
      <form onSubmit={handleApply} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setStatus(null); setMsg(''); }}
          placeholder="Enter code"
          aria-label="Promo code"
          className="flex-1 min-w-0 h-9 px-3 text-[12px] text-[#1a1a1a] border border-[#ddd8d2] rounded-lg bg-white outline-none focus:border-[#C8502A] transition-colors placeholder:text-[#bbb]"
        />
        <button
          type="submit"
          className="h-9 px-4 text-[12px] font-medium text-white bg-[#1a1a1a] border-none rounded-lg cursor-pointer hover:bg-[#333] transition-colors shrink-0"
        >
          Apply
        </button>
      </form>

      {/* Applied code tag */}
      {appliedCode && (
        <div className="flex items-center gap-1.5 mt-2">
          <Tag size={10} color="#5C8A6A" />
          <span className="text-[11px] text-[#5C8A6A] font-medium">
            {appliedCode} — {PROMO_CODES[appliedCode]?.label}
          </span>
          <button
            aria-label="Remove promo code"
            onClick={() => { onApply(null, null); setStatus(null); setMsg(''); }}
            className="ml-auto flex items-center text-[10px] text-[#aaa] bg-transparent border-none cursor-pointer p-0 hover:text-[#C8502A] transition-colors gap-0.5"
          >
            <X size={10} /> Remove
          </button>
        </div>
      )}

      {/* Status message */}
      {!appliedCode && status && (
        <p className={`text-[11px] mt-1.5 m-0 ${status === 'success' ? 'text-[#5C8A6A]' : 'text-[#C8502A]'}`}>
          {msg}
        </p>
      )}
      {!appliedCode && !status && (
        <p className="text-[10px] text-[#bbb] mt-1 m-0">No promo code applied.</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OrderSummary
═══════════════════════════════════════════════════════════════ */
function OrderSummary({ subtotal, appliedCode, promoDetails, onApplyPromo, cartIsEmpty, onCheckout }) {

  /* Discount calculation */
  let discount = 0;
  if (promoDetails) {
    if (promoDetails.type === 'percent') discount = subtotal * (promoDetails.value / 100);
    if (promoDetails.type === 'fixed')   discount = Math.min(promoDetails.value, subtotal);
  }

  const discountedSubtotal = subtotal - discount;
  const deliveryFree = discountedSubtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery     = deliveryFree ? 0 : (subtotal > 0 ? DELIVERY_FEE : 0);
  const total        = discountedSubtotal + delivery;

  function handleCheckout() {
    if (cartIsEmpty) return;
    onCheckout();
  }

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: '#FAF9F6', border: '1px solid #EDE9E3' }}
    >
      <h2
        style={{ fontFamily: 'var(--font-heading)' }}
        className="text-[22px] font-semibold text-[#1a1a1a] m-0 tracking-tight"
      >
        Order summary
      </h2>

      {/* Price lines */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#777]">Subtotal</span>
          <span className="text-[14px] font-medium text-[#1a1a1a]">{fmt(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-[#5C8A6A]">Discount ({appliedCode})</span>
            <span className="text-[14px] font-medium text-[#5C8A6A]">−{fmt(discount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-[13px] text-[#777]">Delivery</span>
          <span className="text-[14px] font-medium text-[#1a1a1a]">
            {subtotal === 0
              ? '—'
              : deliveryFree
                ? <span className="text-[#5C8A6A]">Free</span>
                : fmt(DELIVERY_FEE)
            }
          </span>
        </div>

        <div className="h-px bg-[#EDE9E3] my-1" />

        <div className="flex justify-between items-center">
          <span className="text-[14px] font-semibold text-[#1a1a1a]">Sub Total</span>
          <span className="text-[18px] font-bold text-[#1a1a1a]">{fmt(total)}</span>
        </div>
      </div>

      {/* Promo */}
      <div className="h-px bg-[#EDE9E3]" />
      <PromoCodeForm onApply={onApplyPromo} appliedCode={appliedCode} />

      {/* Checkout */}
      <button
        aria-label="Continue to checkout"
        disabled={cartIsEmpty}
        onClick={handleCheckout}
        className="w-full h-12 rounded-full text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer border-none disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: cartIsEmpty ? '#C8502A' : '#C95738' }}
        onMouseEnter={e => { if (!cartIsEmpty) e.currentTarget.style.background = '#b54524'; }}
        onMouseLeave={e => { if (!cartIsEmpty) e.currentTarget.style.background = '#C95738'; }}
      >
        Continue to checkout
        <ArrowRight size={14} strokeWidth={2} />
      </button>

      {/* Delivery info */}
      <div className="text-center">
        <p className="text-[11px] text-[#aaa] m-0 leading-relaxed">
          Cash on delivery available. Easy 14-day returns.
        </p>
        <button
          className="text-[11px] text-[#777] bg-transparent border-none cursor-pointer p-0 underline underline-offset-2 hover:text-[#1a1a1a] transition-colors mt-0.5"
          onClick={() => alert('Delivery & returns info: Free delivery on orders over EGP 2,000. Standard delivery EGP 80. Easy 14-day returns on all unworn items.')}
        >
          Delivery &amp; returns
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EmptyCart
═══════════════════════════════════════════════════════════════ */
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: '#F5F3EF' }}
      >
        <ShoppingBag size={28} strokeWidth={1.2} color="#C8C4BE" />
      </div>
      <div>
        <p
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-[22px] font-semibold text-[#1a1a1a] m-0 mb-1"
        >
          Your bag is empty
        </p>
        <p className="text-[13px] text-[#999] m-0">
          Add something beautiful to get started.
        </p>
      </div>
      <Link
        to="/shop"
        className="h-11 px-8 rounded-full border border-[#1a1a1a] bg-white text-[13px] font-medium text-[#1a1a1a] no-underline flex items-center gap-2 hover:bg-[#1a1a1a] hover:text-white transition-colors"
      >
        Continue shopping <ArrowRight size={13} />
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CartPage — main page
═══════════════════════════════════════════════════════════════ */
export default function CartPage() {
  const { items, totalItems, merchandiseTotal, removeItem, updateQty } = useCart();
  const navigate = useNavigate();

  const [appliedCode,   setAppliedCode]   = useState(null);
  const [promoDetails,  setPromoDetails]  = useState(null);

  const handleApplyPromo = useCallback((code, details) => {
    setAppliedCode(code);
    setPromoDetails(details);
  }, []);

  const cartIsEmpty = items.length === 0;

  /* Page subtitle */
  const subtitles = [
    'Your bag is empty.',
    'One everyday piece, ready to become your own.',
    'Two everyday pieces, ready to become your own.',
    'A few great pieces, ready to become your own.',
  ];
  const subtitle = subtitles[Math.min(totalItems, 3)] ?? 'Your bag, curated just for you.';

  return (
    <div className="bg-white min-h-screen pb-10">
      <div className="mx-auto px-[clamp(12px,3%,48px)] pt-3" style={{ maxWidth: 1400 }}>

        <Breadcrumbs />

        {/* Page heading */}
        <div className="mb-4">
          <h1
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[clamp(32px,4vw,48px)] font-normal text-[#1a1a1a] m-0 mb-1 leading-tight tracking-tight"
          >
            Your bag
          </h1>
          <p className="text-[14px] text-[#999] m-0">
            {cartIsEmpty ? 'Your bag is empty.' : subtitle}
          </p>
        </div>

        {cartIsEmpty ? (
          <EmptyCart />
        ) : (
          /* ── Two-column layout ── */
          <div className="flex gap-8 max-[768px]:flex-col items-start">

            {/* ── LEFT: cart items (65%) ── */}
            <div className="flex-1 min-w-0" style={{ flexBasis: '63%' }}>

              {/* Header row */}
              <div className="flex items-center justify-between mb-1 pb-2 border-b border-[#EDE9E3]">
                <p className="text-[12px] text-[#999] m-0">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
                <Link
                  to="/shop"
                  className="text-[12px] text-[#555] no-underline hover:text-[#1a1a1a] transition-colors flex items-center gap-1"
                  style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}
                >
                  Continue shopping →
                </Link>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#EDE9E3]">
                {items.map(item => (
                  <CartItem
                    key={item.key}
                    item={item}
                    onUpdateQty={updateQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Free delivery progress */}
              <FreeDeliveryProgress subtotal={merchandiseTotal} />
            </div>

            {/* ── RIGHT: order summary (32%) ── */}
            <div className="shrink-0 max-[768px]:w-full" style={{ width: 'min(380px, 38%)' }}>
              <OrderSummary
                subtotal={merchandiseTotal}
                appliedCode={appliedCode}
                promoDetails={promoDetails}
                onApplyPromo={handleApplyPromo}
                cartIsEmpty={cartIsEmpty}
                onCheckout={() => navigate('/checkout')}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
