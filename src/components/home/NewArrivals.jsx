import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

/* ─── Filter tabs ─────────────────────────────────────── */
const tabs = ['All', 'Women', 'Men', 'Kids', 'Organic Cotton', 'New'];

function filterProducts(tab, products) {
  if (tab === 'All') return products;
  if (tab === 'New') return products.filter((p) => p.isNew);
  if (tab === 'Organic Cotton') return products.filter((p) => p.tags?.includes('Organic Cotton') || p.fabric === 'Organic Cotton');
  return products.filter((p) => p.category === tab);
}

/* ─── Product Card ────────────────────────────────────── */
function ProductCard({ product, mobile = false }) {
  const sizesStr = product.sizes.join(' · ');
  const priceStr = typeof product.price === 'number' ? `EGP ${product.price.toLocaleString()}` : product.price;
  const { addToCart } = useCart();
  const btnRef = useRef(null);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    const fromRect = btnRef.current?.getBoundingClientRect() ?? null;
    const defaultColor = product.colors?.[0]?.label ?? product.color ?? '';
    const defaultSize  = product.sizes?.[0] ?? '';
    addToCart(product, defaultColor, defaultSize, 1, fromRect);
  }

  return (
    <Link
      to={`/product/${product.id}`}
      aria-label={product.name}
      className={`flex flex-col gap-2 ${mobile ? '' : 'na-card'}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className={`relative overflow-hidden rounded-xl bg-[#f2eeea] ${mobile ? 'aspect-[3/4]' : 'na-img-wrap'} group`}>
        <img
          src={product.img}
          alt={product.name}
          className={mobile
            ? 'w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]'
            : 'na-img'}
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-2.5 right-2.5 bg-white border border-[#C8502A] text-[#C8502A] text-[10px] font-medium rounded-full px-2.5 py-0.5">New</span>
        )}
        <button
          ref={btnRef}
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to bag`}
          className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-md text-[#1a1a1a] text-[12px] font-medium whitespace-nowrap transition-transform duration-300 ease-out
            ${mobile ? 'bottom-2 translate-y-0' : 'bottom-2 translate-y-[calc(100%+8px)] group-hover:translate-y-0'}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Quick add
        </button>
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <p className={`font-bold text-[#1a1a1a] leading-snug m-0 ${mobile ? 'text-[14px]' : 'na-name'}`}>{product.name}</p>
        <p className={`text-[#909090] m-0 ${mobile ? 'text-[11px]' : 'na-meta'}`}>{product.color} · {sizesStr}</p>
        <p className={`font-bold text-[#1a1a1a] m-0 ${mobile ? 'text-[13px]' : 'na-price'}`}>{priceStr}</p>
      </div>
    </Link>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = filterProducts(activeTab, allProducts);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: false, containScroll: false },
    [Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // sync selected dot
  useState(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  });

  return (
    <section aria-labelledby="na-heading">

      {/* ══ MOBILE — Embla carousel ══ */}
      <div className="block md:hidden pt-8 pb-6">
        {/* Header */}
        <div className="flex items-baseline justify-between px-4 mb-4">
          <h2 id="na-heading-m" className="font-[family-name:var(--font-heading)] text-[22px] font-normal text-[#1a1a1a] tracking-[-0.02em]">
            New, but made to last
          </h2>
          <Link to="/new-arrivals" className="text-[12px] text-[#1a1a1a] font-medium no-underline shrink-0 ml-3 underline underline-offset-2">
            See all
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 px-4 mb-5 overflow-x-auto" style={{ scrollbarWidth: 'none' }} role="group" aria-label="Filter by category">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[11px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-[#3a3a3a] border-[#c8c4be]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Embla viewport */}
        <div className="overflow-hidden px-4" ref={emblaRef}>
          <div className="flex gap-3">
            {filtered.map((p) => (
              <div key={p.id} className="shrink-0" style={{ width: '62vw', maxWidth: 220 }}>
                <ProductCard product={p} mobile={true} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ DESKTOP — grid ══ */}
      <section className="na-section hidden md:block" aria-labelledby="na-heading-d">
        <div className="na-header">
          <h2 id="na-heading-d" className="na-title">New, but made to last</h2>
          <Link to="/new-arrivals" className="na-shop-link">
            Shop all new arrivals
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="na-tabs" role="group" aria-label="Filter by category">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab} className={`na-tab${activeTab === tab ? ' na-tab-active' : ''}`}>{tab}</button>
          ))}
        </div>
        <div className="na-grid">
          {filtered.map((p) => <ProductCard key={p.id} product={p} mobile={false} />)}
        </div>
      </section>

    </section>
  );
}
