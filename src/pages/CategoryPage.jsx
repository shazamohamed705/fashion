import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, ShoppingBag, Check, ChevronRight } from 'lucide-react';
import { fetchCategoryById } from '../api/categories';
import { useCart } from '../context/CartContext';

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
    addToCart(
      { ...p, img: p.thumbnail, name: p.name, price: parseFloat(p.price) },
      null, null, 1, fromRect
    );
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
      <div
        className="relative w-full overflow-hidden bg-[#f2eeea]"
        style={{ aspectRatio: '398/413', borderRadius: 16 }}
      >
        {p.thumbnail ? (
          <img
            src={p.thumbnail}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-400 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#ccc] text-[12px]">
            No image
          </div>
        )}

        {p.new && (
          <span className="absolute top-2.5 left-2.5 bg-[#FAF6EF] text-[#C8502A] border border-[#C8502A] text-[10px] font-semibold rounded-full px-2.5 py-0.5">
            New
          </span>
        )}

        <button
          aria-label="Wishlist"
          onClick={e => { e.preventDefault(); setLiked(l => !l); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart size={13} strokeWidth={1.5} fill={liked ? '#C8502A' : 'none'} color={liked ? '#C8502A' : '#666'} />
        </button>

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
        <p className="text-[13px] font-semibold text-[#1a1a1a] m-0 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
          {p.name}
        </p>
        <p className="text-[13px] font-bold text-[#1a1a1a] m-0">
          {p.currency_code ?? 'EGP'} {parseFloat(p.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [category,    setCategory]    = useState(null);
  const [allProducts, setAllProducts] = useState([]); // parent products
  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [activeChild, setActiveChild] = useState(null); // null = show all

  /* ── Fetch parent category once ── */
  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setError(null);

    fetchCategoryById(id)
      .then((data) => {
        if (!active) return;
        const cat   = data?.category ?? data;
        const prods = data?.products?.items ?? [];
        setCategory(cat);
        setAllProducts(prods);

        // If URL has ?child=X, activate that tab immediately
        const childParam = searchParams.get('child');
        if (childParam) {
          setActiveChild(Number(childParam));
        } else {
          setProducts(prods);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setLoading(false);
      });

    return () => { active = false; };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Fetch child products whenever activeChild changes ── */
  useEffect(() => {
    if (activeChild === null) return;
    let active = true;
    setLoading(true);

    fetchCategoryById(activeChild)
      .then((data) => {
        if (!active) return;
        setProducts(data?.products?.items ?? []);
      })
      .catch(() => { if (active) setProducts([]); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [activeChild]);

  function selectAll() {
    setActiveChild(null);
    setProducts(allProducts);
  }

  function selectChild(childId) {
    setActiveChild(childId);
  }

  /* ── Loading skeleton ── */
  if (loading && !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#C8502A] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-[#666]">
        <p className="text-[15px]">Something went wrong loading this category.</p>
        <button onClick={() => navigate(-1)} className="text-[13px] underline text-[#C8502A]">Go back</button>
      </div>
    );
  }

  const children = category?.children ?? [];
  const catName  = category?.name ?? '';

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ── */}
      <div
        className="px-4 md:px-[clamp(16px,6%,88px)] pt-5 pb-0 flex items-center gap-1.5 text-[12px] text-[#aaa]"
        style={{ fontFamily: 'system-ui' }}
      >
        <Link to="/" className="hover:text-[#1a1a1a] no-underline text-[#aaa] transition-colors">Home</Link>
        <ChevronRight size={12} strokeWidth={1.5} />
        <Link to="/shop" className="hover:text-[#1a1a1a] no-underline text-[#aaa] transition-colors">Shop</Link>
        <ChevronRight size={12} strokeWidth={1.5} />
        <span className="text-[#1a1a1a]">{catName}</span>
      </div>

      {/* ── Header ── */}
      <div className="px-4 md:px-[clamp(16px,6%,88px)] pt-3 pb-4">
        <h1
          className="font-normal text-[#1a1a1a] m-0 mb-1 leading-[1.1]"
          style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(28px,3.8vw,48px)' }}
        >
          {catName.toLowerCase()}
        </h1>
        <p className="text-[13px] text-[#555] m-0">
          {products.length > 0 ? `${products.length} item${products.length !== 1 ? 's' : ''}` : ''}
        </p>
      </div>

      {/* ── Children filter tabs (if parent has subcategories) ── */}
      {children.length > 0 && (
        <div
          className="px-4 md:px-[clamp(16px,6%,88px)] pb-4 flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* "All" tab */}
          <button
            onClick={selectAll}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
              activeChild === null
                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                : 'bg-white text-[#555] border-[#d0ccc7] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
            }`}
          >
            All
          </button>

          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => selectChild(child.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors ${
                activeChild === child.id
                  ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                  : 'bg-white text-[#555] border-[#d0ccc7] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
              }`}
            >
              {child.name}
            </button>
          ))}
        </div>
      )}

      {/* ── Products grid ── */}
      <div className="px-4 md:px-[clamp(16px,6%,88px)] pb-16">
        {loading ? (
          /* skeleton while switching child */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 animate-pulse">
                <div className="w-full bg-[#f0ece7] rounded-2xl" style={{ aspectRatio: '398/413' }} />
                <div className="h-3.5 bg-[#f0ece7] rounded w-3/4" />
                <div className="h-3 bg-[#f0ece7] rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-[#aaa]">
            <ShoppingBag size={36} strokeWidth={1} />
            <p className="text-[15px]">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
