import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
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

/* ─── Product card ──────────────────────────────────────────────────── */
function ProductCard({ p }) {
  const [liked,  setLiked]  = useState(false);
  const [added,  setAdded]  = useState(false);
  const addBtnRef = useRef(null);
  const { addToCart } = useCart();

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const fromRect = addBtnRef.current?.getBoundingClientRect() ?? null;
    // Default to first color + middle size
    const color = p.colors?.[0]?.label ?? p.color;
    const size  = p.sizes[Math.floor(p.sizes.length / 2)] ?? p.sizes[0];
    addToCart(p, color, size, 1, fromRect);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Link
      to={`/product/${p.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '10px', cursor: 'pointer' }}
      aria-label={p.name}
      className="group"
    >
      {/* Image container */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '398 / 413',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#f2eeea',
      }}>
        <img
          src={p.img} alt={p.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {p.isNew && (
          <span style={{ position: 'absolute', top: 12, left: 12, background: '#FAF6EF', color: '#C8502A', border: '1px solid #C8502A', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '3px 10px' }}>New</span>
        )}
        {/* Wishlist */}
        <button aria-label="Add to wishlist" onClick={e => { e.preventDefault(); setLiked(l => !l); }}
          style={{ position: 'absolute', top: 10, right: 10, background: '#fff', border: 'none', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
          <Heart size={14} strokeWidth={1.5} fill={liked ? '#C8502A' : 'none'} color={liked ? '#C8502A' : '#666'} />
        </button>

        {/* Quick-add to cart — appears on hover */}
        <button
          ref={addBtnRef}
          aria-label={`Quick add ${p.name} to cart`}
          onClick={handleQuickAdd}
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            background: added ? '#1a1a1a' : 'rgba(255,255,255,0.95)',
            border: 'none',
            borderRadius: '999px',
            padding: '7px 16px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
            color: added ? '#fff' : '#1a1a1a',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'opacity 0.2s, background 0.2s, color 0.2s',
            opacity: 0,
          }}
          className="card-quick-add"
        >
          {added
            ? <><Check size={12} strokeWidth={2.5} /> Added</>
            : <><ShoppingBag size={12} strokeWidth={1.5} /> Quick add</>
          }
        </button>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(13px,1.05vw,15px)', fontWeight: 600, color: '#1a1a1a', margin: 0, lineHeight: 1.25 }}>{p.name}</p>
        <p style={{ fontFamily: 'system-ui', fontSize: '11px', color: '#aaa', margin: 0 }}>{p.color} · {p.sizes.join(' · ')}</p>
        <p style={{ fontFamily: 'system-ui', fontSize: '13px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>EGP {p.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

/* ─── Custom dropdown ──────────────────────────────────────────────── */
function FilterSelect({ value, onChange, options }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', height: '44px', border: '1px solid #d0ccc7', borderRadius: '22px',
          padding: '0 44px 0 18px', fontSize: '13px', color: '#1a1a1a', background: '#fff',
          cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', outline: 'none',
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function ShopAllPage() {
  const [category, setCategory] = useState('All');
  const [size,     setSize]     = useState('All');
  const [colour,   setColour]   = useState('All');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy,   setSortBy]   = useState('Featured');

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

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>

      {/* Quick-add hover style — injected once */}
      <style>{`
        .group:hover .card-quick-add { opacity: 1 !important; }
        .price-range {
          -webkit-appearance: none; appearance: none;
          height: 3px;
          border-radius: 999px; outline: none; cursor: pointer;
        }
        .price-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px; border-radius: 50%;
          background: #C8502A; border: 2px solid #fff;
          box-shadow: 0 0 0 1px #C8502A; cursor: pointer;
        }
        .price-range::-moz-range-thumb {
          width: 14px; height: 14px; border-radius: 50%;
          background: #C8502A; border: 2px solid #fff;
          box-shadow: 0 0 0 1px #C8502A; cursor: pointer;
        }
      `}</style>

      {/* ── Breadcrumb ── */}
      <div style={{ padding: 'clamp(16px,2vw,28px) clamp(16px,6%,88px) 0', fontFamily: 'system-ui', fontSize: '12px', color: '#aaa' }}>
        Home&nbsp;/&nbsp;Shop all&nbsp;/&nbsp;New arrivals
      </div>

      {/* ── Page heading ── */}
      <div style={{ padding: 'clamp(10px,1.2vw,16px) clamp(16px,6%,88px) clamp(16px,2vw,24px)' }}>
        <h1 style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.1 }}>
          shop all
        </h1>
        <p style={{ fontFamily: 'system-ui', fontSize: 'clamp(13px,1vw,15px)', color: '#555', margin: 0, lineHeight: 1.5 }}>
          Well-made everyday pieces in soft fabrics and easy shapes, ready to become your own.
        </p>
      </div>

      {/* ── Body: sidebar + grid ── */}
      <div style={{ display: 'flex', gap: 'clamp(20px,2.5vw,40px)', padding: '0 clamp(16px,6%,88px) clamp(40px,5vw,72px)', alignItems: 'flex-start' }}>

        {/* ── Filter sidebar ── */}
        <aside style={{ flexShrink: 0, width: 'clamp(160px,16%,210px)', display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '4px' }}>
          <h2 style={{ fontFamily: 'system-ui', fontSize: '16px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Filter</h2>

          <div>
            <p style={labelStyle}>Category</p>
            <FilterSelect value={category} onChange={setCategory} options={CATEGORIES} />
          </div>

          <div>
            <p style={labelStyle}>Size</p>
            <FilterSelect value={size} onChange={setSize} options={SIZES} />
          </div>

          <div>
            <p style={labelStyle}>Colour</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', alignItems: 'center' }}>
              <button onClick={() => setColour('All')}
                style={{ fontFamily: 'system-ui', fontSize: '12px', color: colour === 'All' ? '#1a1a1a' : '#aaa', fontWeight: colour === 'All' ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', textDecoration: colour === 'All' ? 'underline' : 'none', textUnderlineOffset: '2px' }}>
                All
              </button>
              {COLOURS.filter(c => c.hex).map(c => (
                <button key={c.label} title={c.label} onClick={() => setColour(c.label)} aria-label={c.label}
                  style={{ width: 26, height: 26, borderRadius: '50%', background: c.hex, border: colour === c.label ? '2.5px solid #1a1a1a' : '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', outline: 'none', transition: 'border 0.15s, transform 0.15s', transform: colour === c.label ? 'scale(1.15)' : 'scale(1)', flexShrink: 0 }} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ ...labelStyle, color: '#1a1a1a', fontWeight: 700, fontSize: '13px', textTransform: 'none', letterSpacing: 0 }}>
              Up to EGP {maxPrice.toLocaleString()}
            </p>
            <div style={{ border: '1px solid #d0ccc7', borderRadius: '22px', padding: '10px 14px', background: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'system-ui', fontSize: '10px', color: '#aaa', whiteSpace: 'nowrap', flexShrink: 0 }}>EGP 0</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <input type="range" min={200} max={MAX_PRICE} step={100} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="price-range"
                  style={{ width: '100%', display: 'block', background: `linear-gradient(to right, #C8502A 0%, #C8502A ${((maxPrice - 200) / (MAX_PRICE - 200)) * 100}%, #e0ddd9 ${((maxPrice - 200) / (MAX_PRICE - 200)) * 100}%, #e0ddd9 100%)` }} />
              </div>
              <span style={{ fontFamily: 'system-ui', fontSize: '10px', color: '#aaa', whiteSpace: 'nowrap', flexShrink: 0 }}>EGP {MAX_PRICE.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={clearFilters} style={{ fontFamily: 'system-ui', fontSize: '12px', fontWeight: 500, color: '#C8502A', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
            Clear filters
          </button>
        </aside>

        {/* ── Grid area ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'system-ui', fontSize: '12px', color: '#aaa', margin: 0 }}>{filtered.length} items</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'system-ui', fontSize: '12px', color: '#aaa' }}>Sort by</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ border: '1px solid #d0ccc7', borderRadius: '999px', padding: '6px 16px', fontSize: '12px', color: '#1a1a1a', background: '#fff', cursor: 'pointer' }}>
                {['Featured','Newest','Price: Low to High','Price: High to Low'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {filtered.length === 0
            ? <p style={{ fontFamily: 'system-ui', fontSize: '14px', color: '#999' }}>No products match your filters.</p>
            : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(12px,1.6vw,20px)' }}>
                {filtered.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontFamily: 'system-ui', fontSize: '11px', fontWeight: 700, color: '#1a1a1a',
  textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px',
};
