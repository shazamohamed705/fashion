import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const offers = [
  {
    id: 1,
    title: 'Summer Mega Sale',
    subtitle: 'Up to 50% off on selected items',
    discount: '50% OFF',
    code: 'SUMMER50',
    bg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    emoji: '☀️',
    endsIn: 3 * 24 * 3600, // 3 days in seconds
  },
  {
    id: 2,
    title: 'New Member Offer',
    subtitle: 'Special discount for first-time shoppers',
    discount: '20% OFF',
    code: 'WELCOME20',
    bg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    emoji: '🎉',
    endsIn: 7 * 24 * 3600,
  },
  {
    id: 3,
    title: 'Free Shipping Weekend',
    subtitle: 'Free delivery on all orders this weekend',
    discount: 'FREE SHIP',
    code: 'FREESHIP',
    bg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    emoji: '🚚',
    endsIn: 2 * 24 * 3600,
  },
];

function CountdownTimer({ seconds: initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5">
      {[{ v: pad(d), l: 'd' }, { v: pad(h), l: 'h' }, { v: pad(m), l: 'm' }, { v: pad(s), l: 's' }].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <span className="bg-white/20 text-white font-extrabold text-lg rounded-lg px-2 py-1 min-w-[2.5rem] text-center tabular-nums">
            {v}
          </span>
          <span className="text-white/70 text-xs mt-0.5">{l}</span>
        </div>
      ))}
    </div>
  );
}

export default function OffersSection() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Limited Time
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Exclusive Offers</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Don't miss out on these limited-time deals. Grab them before they're gone!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className={`${offer.bg} rounded-3xl p-6 text-white relative overflow-hidden`}>
              {/* Background decoration */}
              <div className="absolute -top-6 -right-6 text-8xl opacity-20 select-none">{offer.emoji}</div>

              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {offer.discount}
              </span>
              <h3 className="text-xl font-extrabold mb-1">{offer.title}</h3>
              <p className="text-white/80 text-sm mb-5">{offer.subtitle}</p>

              {/* Countdown */}
              <div className="mb-5">
                <p className="text-white/70 text-xs mb-2 font-medium uppercase tracking-wider">Ends in</p>
                <CountdownTimer seconds={offer.endsIn} />
              </div>

              {/* Promo Code */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/20 rounded-xl px-3 py-2 font-mono font-bold text-sm tracking-widest">
                  {offer.code}
                </div>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="bg-white text-gray-800 hover:bg-gray-100 font-semibold text-xs px-3 py-2 rounded-xl transition-colors flex-shrink-0"
                >
                  {copiedCode === offer.code ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-extrabold">Flash Sale — Today Only!</h3>
            <p className="text-white/80 mt-1 text-sm">Extra 10% off when you spend over $100. Use code FLASH10.</p>
          </div>
          <Link
            to="/offers"
            className="flex-shrink-0 bg-white text-pink-500 hover:bg-gray-100 font-bold px-8 py-3 rounded-full text-sm transition-colors shadow-lg"
          >
            Shop the Sale
          </Link>
        </div>
      </div>
    </section>
  );
}
