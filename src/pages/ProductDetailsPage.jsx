import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Share2, ChevronDown, ChevronUp, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';

/* ─── WishlistButton ─────────────────────────────────────────────────── */
function WishlistButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={e => { e.preventDefault(); setLiked(l => !l); }}
      className="absolute top-3 right-3 bg-white rounded-full flex items-center justify-center cursor-pointer border-none transition-transform hover:scale-105"
      style={{ width: 48, height: 48, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
      <Heart
        size={18} strokeWidth={1.4}
        fill={liked ? '#C8502A' : 'none'}
        color={liked ? '#C8502A' : '#bbb'}
      />
    </button>
  );
}

/* ─── Related Products Card ─────────────────────────────────────────── */
function RelatedCard({ product }) {
  const sizesLabel = product.sizes.join(' · ');
  return (
    <Link
      to={`/product/${product.id}`}
      aria-label={product.name}
      className="flex flex-col gap-3 no-underline text-inherit group">

      <div
        className="relative w-full overflow-hidden bg-[#f0ece8]"
        style={{ borderRadius: 15, aspectRatio: '4/3' }}>
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.isNew && (
          <span
            className="absolute top-3 left-3 bg-white text-[#C8502A] text-[11px] font-medium leading-none px-3 py-[5px] rounded-full"
            style={{ border: '1px solid #C8502A' }}>
            New
          </span>
        )}
        <WishlistButton />
      </div>

      <div className="flex flex-col gap-[3px] pt-0.5">
        <p
          style={{ fontFamily: 'var(--font-heading)' }}
          className="text-[18px] font-bold text-[#222] m-0 leading-snug">
          {product.name}
        </p>
        <p className="text-[13px] text-[#777] m-0 leading-normal">
          {product.color} · {sizesLabel}
        </p>
        <p className="text-[15px] font-semibold text-[#222] m-0 mt-1">
          EGP {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

/* ─── Accordion ─────────────────────────────────────────────────────── */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#e0dbd4]">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
        className="w-full flex items-center justify-between bg-transparent border-none py-4 cursor-pointer text-left gap-2">
        <span style={{ fontFamily: 'var(--font-heading)' }} className="text-[17px] font-semibold text-[#1a1a1a] italic">
          {title}
        </span>
        {open
          ? <ChevronUp size={15} strokeWidth={1.5} color="#888" className="shrink-0" />
          : <ChevronDown size={15} strokeWidth={1.5} color="#888" className="shrink-0" />}
      </button>
      {open && <div className="pb-5 flex flex-col gap-2">{children}</div>}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product  = allProducts.find(p => p.id === Number(id));
  const { addToCart } = useCart();

  /* Ref on the "Add to cart" button — used for the fly animation */
  const addBtnRef = useRef(null);

  /* Feedback state — shows ✓ briefly after adding */
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-[#555] text-lg">Product not found.</p>
        <button onClick={() => navigate('/shop')}
          className="h-12 px-8 rounded-full border border-[#1a1a1a] bg-white text-sm font-medium text-[#1a1a1a] cursor-pointer hover:bg-[#1a1a1a] hover:text-white transition-colors">
          Back to Shop
        </button>
      </div>
    );
  }

  const images = product.images ?? [product.img];
  const [activeImg,     setActiveImg]  = useState(0);
  const [selectedColor, setColor]      = useState(product.colors?.[0]?.label ?? product.color);
  const [selectedSize,  setSize]       = useState(product.sizes[2] ?? product.sizes[0]);
  const [qty,           setQty]        = useState(1);
  const [wished,        setWished]     = useState(false);

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  function handleAddToCart() {
    const fromRect = addBtnRef.current?.getBoundingClientRect() ?? null;
    addToCart(product, selectedColor, selectedSize, qty, fromRect);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="bg-white min-h-screen pb-16">

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap px-[clamp(16px,6%,88px)] pt-5 text-[11px] text-[#aaa]">
        <Link to="/" className="text-[#aaa] no-underline hover:text-[#1a1a1a] transition-colors">Home</Link>
        <span className="text-[#ccc]">/</span>
        <Link to="/shop" className="text-[#aaa] no-underline hover:text-[#1a1a1a] transition-colors">women</Link>
        <span className="text-[#ccc]">/</span>
        <span className="text-[#555]">{product.name}</span>
      </nav>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-2 max-[820px]:grid-cols-1 gap-10 px-[clamp(16px,6%,88px)] pt-5 items-start">

        {/* LEFT — Gallery */}
        <div className="flex flex-col gap-3 self-start sticky top-20">
          <div className="w-full overflow-hidden rounded-[20px]" style={{ aspectRatio: '920/780' }}>
            <img key={activeImg} src={images[activeImg]} alt={product.name}
              className="w-full h-full object-cover object-center transition-opacity duration-300" />
          </div>

          <div className="flex gap-2 w-full" role="list" aria-label="Product images">
            {images.map((src, i) => (
              <button key={i} role="listitem" aria-label={`View image ${i + 1}`} aria-pressed={activeImg === i}
                onClick={() => setActiveImg(i)}
                className="w-[calc(25%-6px)] flex flex-col gap-1 p-0 cursor-pointer bg-transparent border-none">
                <div className={`w-full aspect-square rounded-lg overflow-hidden border-[1.5px] transition-all ${
                  activeImg === i ? 'border-[#1a1a1a]' : 'border-transparent hover:border-[#ccc]'
                }`}>
                  <img src={src} alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover object-top block" />
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#aaa] m-0">Fabric study · Illustrative</p>
        </div>

        {/* RIGHT — Info */}
        <div className="flex flex-col pt-2">

          <h1 style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[clamp(28px,3.5vw,46px)] font-normal text-[#1a1a1a] m-0 mb-2 leading-[1.1] tracking-tight">
            {product.name}
          </h1>

          <p className="text-[16px] font-bold text-[#1a1a1a] m-0 mb-4">
            EGP {product.price.toLocaleString()}
          </p>

          <p className="text-[14px] text-[#444] leading-[1.7] m-0 mb-5">
            {product.description}
          </p>

          <div className="h-px bg-[#e8e3dc] mb-5" />

          {/* Colour */}
          <div className="mb-5">
            <p className="text-[13px] text-[#555] m-0 mb-2.5">
              Colour: <span className="text-[#1a1a1a] font-medium">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Select colour">
              {(product.colors ?? [{ label: product.color, hex: product.colorHex }]).map(c => (
                <button key={c.label} role="radio" aria-checked={selectedColor === c.label}
                  aria-label={c.label} title={c.label}
                  onClick={() => setColor(c.label)}
                  style={{ background: c.hex }}
                  className={`w-6 h-6 rounded-full p-0 cursor-pointer transition-all ${
                    selectedColor === c.label
                      ? 'ring-2 ring-offset-1 ring-[#1a1a1a] border-2 border-white'
                      : 'border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)] hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[13px] text-[#555] m-0">
                Size: <span className="text-[#1a1a1a] font-medium">{selectedSize}</span>
              </p>
              <button className="inline-flex items-center gap-1 text-[12px] text-[#555] bg-transparent border-none cursor-pointer p-0 hover:text-[#1a1a1a] transition-colors">
                Size guide
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Select size">
              {product.sizes.map(s => (
                <button key={s} role="radio" aria-checked={selectedSize === s}
                  onClick={() => setSize(s)}
                  style={{ borderRadius: '10px' }}
                  className={`min-w-[52px] h-[38px] px-3 text-[13px] font-medium cursor-pointer transition-all border ${
                    selectedSize === s
                      ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                      : 'bg-white border-[#c8c4be] text-[#1a1a1a] hover:border-[#888]'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#e8e3dc] mb-4" />

          {/* Qty + wishlist + share */}
          <div className="flex items-center gap-5 mb-5">
            <div role="group" aria-label="Quantity" className="flex items-center gap-4">
              <button aria-label="Decrease quantity"
                onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}
                className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1a1a1a] disabled:text-[#ccc] disabled:cursor-default">
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span aria-live="polite" className="text-[15px] text-[#1a1a1a] min-w-[20px] text-center select-none">
                {qty}
              </span>
              <button aria-label="Increase quantity" onClick={() => setQty(q => q + 1)}
                className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer text-[#1a1a1a]">
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={() => setWished(w => !w)}
                className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer">
                <Heart size={17} strokeWidth={1.5} fill={wished ? '#C8502A' : 'none'} color={wished ? '#C8502A' : '#555'} />
              </button>
              <button aria-label="Share product"
                className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer">
                <Share2 size={17} strokeWidth={1.5} color="#555" />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5 mb-7">
            {/* Add to cart — wired */}
            <button
              ref={addBtnRef}
              aria-label={`Add ${product.name} to cart`}
              onClick={handleAddToCart}
              className={`w-full h-[48px] rounded-full border text-[14px] font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
                added
                  ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                  : 'border-[#1a1a1a] bg-white text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              {added ? (
                <>
                  <Check size={15} strokeWidth={2} />
                  Added to bag
                </>
              ) : (
                <>
                  <ShoppingBag size={15} strokeWidth={1.5} />
                  Add to cart
                </>
              )}
            </button>

            <button aria-label={`Buy ${product.name} now`}
              className="w-full h-[48px] rounded-full border-none bg-[#C8502A] text-[14px] font-medium text-white cursor-pointer hover:bg-[#b54524] transition-colors">
              Buy Now
            </button>
          </div>

          {/* Accordions */}
          <Accordion title="Fabric & care" defaultOpen>
            <p className="text-[13px] text-[#333] leading-[1.7] m-0">{product.fabricCare}</p>
            <p className="text-[12px] text-[#999] leading-[1.7] m-0">
              Illustrative care guidance: gentle cool wash, air dry and iron on a suitable setting for the fibre label.
            </p>
          </Accordion>

          <Accordion title="Delivery & returns">
            <p className="text-[13px] text-[#333] leading-[1.7] m-0">
              Free delivery over EGP 2,000. Easy 14-day returns. Delivery charges are shown in your bag before checkout.
            </p>
            <button className="text-[13px] text-[#1a1a1a] bg-transparent border-none cursor-pointer p-0 underline underline-offset-2 hover:opacity-70 transition-opacity text-left mt-1">
              Read delivery &amp; returns
            </button>
          </Accordion>

          <div className="border-t border-[#e0dbd4]" />

        </div>
      </div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section aria-labelledby="pd-related-heading" className="bg-white px-[clamp(16px,6%,88px)] pt-14 pb-12">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2
              id="pd-related-heading"
              style={{ fontFamily: 'var(--font-heading)' }}
              className="text-[clamp(26px,2.4vw,34px)] font-normal text-[#222] m-0 leading-tight tracking-tight">
              Make it your everyday.
            </h2>
            <Link
              to="/new-arrivals"
              className="shrink-0 text-[13px] text-[#222] underline underline-offset-[3px] decoration-[#222] no-underline hover:opacity-60 transition-opacity whitespace-nowrap"
              style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Shop all new arrivals →
            </Link>
          </div>
          <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 gap-6">
            {related.map(p => <RelatedCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

    </div>
  );
}
