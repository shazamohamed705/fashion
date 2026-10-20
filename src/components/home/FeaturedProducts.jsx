import { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Floral Summer Dress', price: 89.99, oldPrice: 120.00, category: "Women's", rating: 4.8, reviews: 124, badge: 'Best Seller', emoji: '👗' },
  { id: 2, name: 'Classic Slim Fit Shirt', price: 59.99, oldPrice: null, category: "Men's", rating: 4.6, reviews: 89, badge: null, emoji: '👔' },
  { id: 3, name: 'Leather Tote Bag', price: 129.99, oldPrice: 160.00, category: 'Accessories', rating: 4.9, reviews: 203, badge: 'Top Rated', emoji: '👜' },
  { id: 4, name: 'Strappy Heels', price: 74.99, oldPrice: 95.00, category: 'Footwear', rating: 4.5, reviews: 67, badge: 'Sale', emoji: '👠' },
  { id: 5, name: 'Casual Denim Jacket', price: 99.99, oldPrice: null, category: "Men's", rating: 4.7, reviews: 156, badge: null, emoji: '🧥' },
  { id: 6, name: 'Silk Blouse', price: 69.99, oldPrice: 85.00, category: "Women's", rating: 4.8, reviews: 92, badge: 'New', emoji: '👚' },
  { id: 7, name: 'Running Sneakers', price: 109.99, oldPrice: 140.00, category: 'Sportswear', rating: 4.6, reviews: 178, badge: 'Sale', emoji: '👟' },
  { id: 8, name: 'Gold Hoop Earrings', price: 34.99, oldPrice: null, category: 'Accessories', rating: 4.9, reviews: 241, badge: 'Popular', emoji: '💍' },
];

const badgeColors = {
  'Best Seller': 'bg-pink-500',
  'Top Rated': 'bg-yellow-500',
  'Sale': 'bg-red-500',
  'New': 'bg-green-500',
  'Popular': 'bg-purple-500',
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Handpicked
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-500">Our most-loved pieces, curated just for you.</p>
          </div>
          <Link
            to="/shop"
            className="flex-shrink-0 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200"
          >
            View All
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image Area */}
              <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 h-48 flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>

                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 ${badgeColors[product.badge]} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                  aria-label="Toggle wishlist"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-colors ${wishlist.includes(product.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Quick Add (visible on hover) */}
                <div className="absolute bottom-0 left-0 right-0 bg-pink-500 text-white text-xs font-semibold text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer">
                  Quick Add to Cart
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-pink-500 font-medium mb-1">{product.category}</p>
                <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base font-extrabold text-gray-900">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
