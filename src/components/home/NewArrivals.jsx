import { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../../data/products';

/* ─── Filter tabs ─────────────────────────────────────── */
const tabs = ['All', 'Women', 'Men', 'Kids', 'Organic Cotton', 'New'];

/* ─── Filtering logic ─────────────────────────────────── */
function filterProducts(tab, products) {
  if (tab === 'All') return products;
  if (tab === 'New') return products.filter((p) => p.isNew);
  if (tab === 'Organic Cotton') return products.filter((p) => p.tags?.includes('Organic Cotton') || p.fabric === 'Organic Cotton');
  return products.filter((p) => p.category === tab);
}

/* ─── Product Card ────────────────────────────────────── */
function ProductCard({ product }) {
  const sizesStr = product.sizes.join(' · ');
  const priceStr = typeof product.price === 'number' ? `EGP ${product.price.toLocaleString()}` : product.price;

  return (
    <Link to={`/product/${product.id}`} className="na-card" aria-label={product.name} style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Image */}
      <div className="na-img-wrap">
        <img
          src={product.img}
          alt={product.name}
          className="na-img"
          loading="lazy"
        />
        {product.isNew && (
          <span className="na-badge" aria-label="New product">New</span>
        )}
      </div>

      {/* Info */}
      <div className="na-info">
        <p className="na-name">{product.name}</p>
        <p className="na-meta">
          {product.color} · {sizesStr}
        </p>
        <p className="na-price">{priceStr}</p>
      </div>
    </Link>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = filterProducts(activeTab, allProducts);

  return (
    <section className="na-section" aria-labelledby="na-heading">
      {/* ── Header row ── */}
      <div className="na-header">
        <h2 id="na-heading" className="na-title">New, but made to last</h2>
        <Link to="/new-arrivals" className="na-shop-link">
          Shop all new arrivals
          <svg
            width="15" height="15"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* ── Filter tabs ── */}
      <div className="na-tabs" role="group" aria-label="Filter by category">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
            className={`na-tab${activeTab === tab ? ' na-tab-active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="na-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
