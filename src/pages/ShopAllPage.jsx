import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, SlidersHorizontal, X } from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Women', 'Men', 'Kids'];
const SIZES      = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLOURS    = [
  { label: 'All',   hex: null },
  { label: 'Oat',   hex: '#d4c9b0' },
  { label: 'Sky',   hex: '#a8c4d4' },
  { label: 'Clay',  hex: '#b07a5a' },
  { label: 'Moss',  hex: '#8a9e7a' },
  { label: 'Ink',   hex: '#3a3a5c' },
  { label: 'Cream', hex: '#e8e0d0' },
];
const MAX_PRICE = 2000;

/* ─── Product card ─────────────────────────────────────────────── */
function ProductCard({ p }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const addBtnRef = useRef(null);
  const { addToCart } = useCart();

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const fromRect = addBtnRef.current?.getBoundingClientRect() ?? null;
    const color = p.colors?.[0]?.label ?? p.color;
    const size  = p.sizes[Math.floor(p.sizes.length / 2)] ?? p.sizes[0];
    addToCart(p, color, size, 1, fromRect);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Link
      to={`/product/${p.id}`}
      className="group flex flex-col gap-2"
      style={{ textDecoration: 'none', color: 'inherit' }}
      aria-label={p.name}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[#f2eeea]" style={{ aspectRatio: '398/413', borderRadius: 16 }}>
        <img
          src={p.img} alt={p.name} loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-400 group-hover:scale-[1.03]"
        />
        {p.isNew && (
          <span className="absolute top-2.5 left-2.5 bg-[#FAF6EF] text-[#C8502A] border border-[#C8502A] text-[10px] font-semibold rounded-full px-2.5 py-0.5">New</span>
        )}
        <button
          aria-label="Wishlist"
          onClick={e => { e.preventDefault(); setLiked(l => !l); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart size={13} strokeWidth={1.5} fill={liked ? '#C8502A' : 'none'} color={liked ? '#C8502A' : '#666'} />
        </button>
        {/* Quick add — hover on desktop, always visible on mobile */}
        <button
          ref={addBtnRef}
          onClick={handleQuickAdd}
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold whitespace-nowrap shadow-md transition-all duration-200
            md:opacity-0 md:group-hover:opacity-100
            ${added ? 'bg-[#1a1a1a] text-white' : 'bg-white/95 text-[#1a1a1a]'}`}
        >
          {added
            ? <><Check size={11} strokeWidth={2.5} />Added</>
            : <><ShoppingBag size={11} strokeWidth={1.5} />Quick add</>
          }
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="text-[13px] font-semibold text-[#1a1a1a] m-0 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</p>
        <p className="text-[11px] text-[#aaa] m-0">{p.color} · {p.sizes.join(' · ')}</p>
        <p className="text-[13px] font-bold text-[#1a1a1a] m-0">EGP {p.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

/* ─── Filter select ─────────────────────────────────────────────── */
function FilterSelect({ value, onChange, options }) {
  return (
    <div className="relative w-full">
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="w-full h-11 border border-[#d0ccc7] rounded-full pl-4 pr-10 text-[13px] text-[#1a1a1a] bg-white cursor-pointer outline-none appearance-none"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

/* ─── Filter panel content (shared between sidebar & drawer) ─── */
function FilterPanel({ category, setCategory, size, setSize, colour, setColour, maxPrice, setMaxPrice, onClear }) {
  const pct = ((maxPrice - 200) / (MAX_PRICE - 200)) * 100;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a] mb-2">Category</p>
        <FilterSelect value={category} onChange={setCategory} options={CATEGORIES} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a] mb-2">Size</p>
        <FilterSelect value={size} onChange={setSize} options={SIZES} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a] mb-2">Colour</p>
        <div className="flex flex-wrap gap-2 items-center">
          <button onClick={() => setColour('All')}
            className={`text-[12px] bg-none border-none cursor-pointer px-0.5 ${colour === 'All' ? 'text-[#1a1a1a] font-semibold underline underline-offset-2' : 'text-[#aaa]'}`}>
            All
          </button>
          {COLOURS.filter(c => c.hex).map(c => (
            <button key={c.label} title={c.label} onClick={() => setColour(c.label)} aria-label={c.label}
              className="w-6 h-6 rounded-full cursor-pointer outline-none transition-transform"
              style={{ background: c.hex, border: colour === c.label ? '2.5px solid #1a1a1a' : '1.5px solid rgba(0,0,0,0.12)', transform: colour === c.label ? 'scale(1.15)' : 'scale(1)' }} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[13px] font-bold text-[#1a1a1a] mb-2">Up to EGP {maxPrice.toLocaleString()}</p>
        <div className="border border-[#d0ccc7] rounded-full px-3.5 py-2.5 bg-white flex items-center gap-2">
          <span className="text-[10px] text-[#aaa] whitespace-nowrap shrink-0">EGP 0</span>
          <input type="range" min={200} max={MAX_PRICE} step={100} value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
            className="price-range flex-1 min-w-0 block"
            style={{ background: `linear-gradient(to right, #C8502A 0%, #C8502A ${pct}%, #e0ddd9 ${pct}%, #e0ddd9 100%)` }} />
          <span className="text-[10px] text-[#aaa] whitespace-nowrap shrink-0">EGP {MAX_PRICE.toLocaleString()}</span>
        </div>
      </div>
      <button onClick={onClear} className="text-[12px] font-medium text-[#C8502A] bg-transparent border-none cursor-pointer text-left p-0">
        Clear filters
      </button>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ShopAllPage() {
  const [category, setCategory] = useState('All');
  const [size,     setSize]     = useState('All');
  const [colour,   setColour]   = useState('All');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy,   setSortBy]   = useState('Featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = allProducts.filter(p => {
      if (category !== 'All' && p.category !== category) return false;
      if (size !== 'All' && !p.sizes.includes(size)) return false;
      if (colour !== 'All' && p.color !== colour) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    if (sortBy === 'Price: Low to High') list = [...list].sort((a,b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') list = [...list].sort((a,b) => b.price - a.price);
    if (sortBy === 'Newest')             list = [...list].sort((a,b) => b.isNew - a.isNew);
    return list;
  }, [category, size, colour, maxPrice, sortBy]);

  const clearFilters = () => { setCategory('All'); setSize('All'); setColour('All'); setMaxPrice(MAX_PRICE); };

  const activeCount = [category !== 'All', size !== 'All', colour !== 'All', maxPrice < MAX_PRICE].filter(Boolean).length;

  return (
    <div className="bg-white min-h-screen">

      <style>{`
        .price-range { -webkit-appearance:none; appearance:none; height:3px; border-radius:999px; outline:none; cursor:pointer; }
        .price-range::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:#C8502A; border:2px solid #fff; box-shadow:0 0 0 1px #C8502A; cursor:pointer; }
        .price-range::-moz-range-thumb { width:14px; height:14px; border-radius:50%; background:#C8502A; border:2px solid #fff; cursor:pointer; }
      `}</style>

      {/* Breadcrumb */}
      <div className="px-4 md:px-[clamp(16px,6%,88px)] pt-5 pb-0 text-[12px] text-[#aaa]" style={{ fontFamily: 'system-ui' }}>
        Home / Shop all / New arrivals
      </div>

      {/* Heading */}
      <div className="px-4 md:px-[clamp(16px,6%,88px)] pt-3 pb-4">
        <h1 className="font-normal text-[#1a1a1a] m-0 mb-2 leading-[1.1]" style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(28px,3.8vw,48px)' }}>
          shop all
        </h1>
        <p className="text-[13px] text-[#555] m-0 leading-relaxed">
          Well-made everyday pieces in soft fabrics and easy shapes, ready to become your own.
        </p>
      </div>

      {/* ══ MOBILE toolbar ══ */}
      <div className="flex md:hidden items-center justify-between px-4 py-2.5 border-t border-b border-[#ece8e2] bg-white sticky top-[91px] z-20">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 text-[13px] font-medium text-[#1a1a1a]"
        >
          <SlidersHorizontal size={15} strokeWidth={1.8} />
          Filter
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#C8502A] text-white text-[9px] font-bold">{activeCount}</span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[#aaa]">Sort</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="border border-[#d0ccc7] rounded-full px-3 py-1 text-[12px] text-[#1a1a1a] bg-white cursor-pointer outline-none">
            {['Featured','Newest','Price: Low to High','Price: High to Low'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* ══ MOBILE filter drawer ══ */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          {/* Sheet */}
          <div className="relative bg-white rounded-t-2xl px-5 pt-5 pb-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-bold text-[#1a1a1a] m-0">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} className="p-1 text-[#666]">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <FilterPanel
              category={category} setCategory={setCategory}
              size={size} setSize={setSize}
              colour={colour} setColour={setColour}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              onClear={clearFilters}
            />
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full bg-[#1a1a1a] text-white rounded-full py-3 text-[14px] font-semibold"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}

      {/* ══ Body ══ */}
      <div className="flex gap-8 px-4 md:px-[clamp(16px,6%,88px)] pb-16 pt-4 items-start">

        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex shrink-0 flex-col gap-5 pt-1" style={{ width: 'clamp(160px,16%,210px)' }}>
          <h2 className="text-[16px] font-bold text-[#1a1a1a] m-0">Filter</h2>
          <FilterPanel
            category={category} setCategory={setCategory}
            size={size} setSize={setSize}
            colour={colour} setColour={setColour}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            onClear={clearFilters}
          />
        </aside>

        {/* Grid area */}
        <div className="flex-1 min-w-0">
          {/* Sort bar — desktop */}
          <div className="hidden md:flex justify-between items-center mb-5">
            <p className="text-[12px] text-[#aaa] m-0">{filtered.length} items</p>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#aaa]">Sort by</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border border-[#d0ccc7] rounded-full px-4 py-1.5 text-[12px] text-[#1a1a1a] bg-white cursor-pointer outline-none">
                {['Featured','Newest','Price: Low to High','Price: High to Low'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Count — mobile */}
          <p className="md:hidden text-[12px] text-[#aaa] mb-3">{filtered.length} items</p>

          {filtered.length === 0
            ? <p className="text-[14px] text-[#999]">No products match your filters.</p>
            : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {filtered.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
