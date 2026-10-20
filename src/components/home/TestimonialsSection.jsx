import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    role: 'Fashion Blogger',
    avatar: '👩',
    rating: 5,
    text: "I've been shopping here for two years and the quality is always outstanding. Their pieces are timeless and the customer service is top-notch. Highly recommend to anyone who loves fashion!",
    location: 'Cairo, Egypt',
  },
  {
    id: 2,
    name: 'Mohamed Hassan',
    role: 'Stylist',
    avatar: '👨',
    rating: 5,
    text: "As a professional stylist, I need reliable sources for quality pieces. FashionStore never disappoints — the fabrics are premium and the cuts are always on trend. My go-to store!",
    location: 'Alexandria, Egypt',
  },
  {
    id: 3,
    name: 'Layla Ibrahim',
    role: 'Regular Customer',
    avatar: '👩‍🦱',
    rating: 5,
    text: "The new arrivals section is my guilty pleasure! I love how they keep up with international trends while staying affordable. The delivery is always fast and packaging is beautiful.",
    location: 'Dubai, UAE',
  },
  {
    id: 4,
    name: 'Omar Khalil',
    role: 'Fashion Enthusiast',
    avatar: '🧑',
    rating: 4,
    text: "Great variety for men's fashion. I finally found a store that understands modern men's style. The slim-fit collection is 🔥. Will definitely keep coming back!",
    location: 'Riyadh, KSA',
  },
  {
    id: 5,
    name: 'Nour El-Din',
    role: 'Influencer',
    avatar: '👩‍🎤',
    rating: 5,
    text: "My followers always ask where I get my outfits and I always say FashionStore! The quality photos don't do justice to how amazing everything looks in person. Obsessed!",
    location: 'Beirut, Lebanon',
  },
  {
    id: 6,
    name: 'Amira Youssef',
    role: 'Business Owner',
    avatar: '👩‍💼',
    rating: 5,
    text: "Perfect for building a professional wardrobe without breaking the bank. I bought their blazer collection and got compliments every single day. Worth every penny!",
    location: 'Casablanca, Morocco',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const visible = testimonials.slice(activeIndex * itemsPerPage, (activeIndex + 1) * itemsPerPage);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">What Our Customers Say</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Real reviews from real customers who love what they wear.
          </p>
          {/* Overall rating */}
          <div className="mt-5 inline-flex items-center gap-3 bg-yellow-50 px-5 py-2.5 rounded-full">
            <StarRating rating={5} />
            <span className="font-extrabold text-gray-900">4.9</span>
            <span className="text-gray-500 text-sm">out of 5 · 2,400+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t) => (
            <div key={t.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
              {/* Quote icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.location}</p>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex ? 'w-8 h-3 bg-pink-500' : 'w-3 h-3 bg-gray-300 hover:bg-pink-300'
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
