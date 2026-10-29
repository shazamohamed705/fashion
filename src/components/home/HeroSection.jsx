import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchSliders } from '../../api/sliders';

/* ─── Bottom info bar items ─────────────────────────────────────────────── */
const infoItems = [
  'FREE DELIVERY OVER EGP 2,000',
  'FREE DELIVERY OVER EGP 2,000',
  'DESIGNED FOR EVERY BODY',
  'EASY 14-DAY RETURNS',
  'MADE FOR REAL LIFE',
];

/* ─── Strip HTML tags from description ──────────────────────────────────── */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/* ─── Eyebrow label (static fallback) ───────────────────────────────────── */
const EYEBROW = 'The New Cotton Edit';

export default function HeroSection() {
  const [sliders, setSliders]   = useState([]);
  const [current, setCurrent]   = useState(0);
  const intervalRef             = useRef(null);

  /* ── Fetch sliders from API ── */
  useEffect(() => {
    fetchSliders()
      .then(setSliders)
      .catch(() => setSliders([])); // silently fall back to static
  }, []);

  /* ── Auto-rotate when MORE than 2 sliders ── */
  useEffect(() => {
    if (sliders.length <= 2) return;
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % sliders.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [sliders.length]);

  /* ── Current slide data (falls back to static values) ── */
  const slide       = sliders[current] ?? null;
  const title       = slide?.title       ?? 'Made to feel like you.';
  const description = slide ? stripHtml(slide.description) : 'Soft structure, honest fabric and room to move. Everyday clothing, woven for everyone.';

  // Photo logic:
  // - exactly 2 sliders → show both side by side (original design)
  // - 0 or 1 slider     → show static fallbacks side by side
  // - 3+ sliders        → auto-rotate, both panels show current & next
  const hasTwoSliders = sliders.length === 2;
  const img1 = sliders[0]?.image ?? '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg';
  const img2 = sliders[1]?.image ?? '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg';

  // For auto-rotate (3+): left = current, right = next
  const imgLeft  = hasTwoSliders || sliders.length === 0
    ? img1
    : (sliders[current]?.image ?? img1);
  const imgRight = hasTwoSliders || sliders.length === 0
    ? img2
    : (sliders[(current + 1) % sliders.length]?.image ?? img2);

  // Mobile shows left image only
  const imgMobile = imgLeft;

  return (
    <section className="flex flex-col bg-white overflow-hidden isolate">

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (visible below md)
      ═══════════════════════════════════════════════ */}
      <div className="relative w-full flex items-end md:hidden"
           style={{ height: 'calc(100svh - 91px)', minHeight: '520px', maxHeight: '780px' }}>

        <div
          className="hero-ken-burns absolute inset-0 bg-cover bg-[center_top] overflow-hidden"
          role="img"
          aria-label={title}
          style={{ backgroundImage: `url("${imgMobile}")` }}
        />

        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.05) 100%)' }} />

        <div className="relative z-10 w-full px-5 pb-9">
          <p className="hero-text-enter hero-text-d1 text-[10px] font-medium tracking-[0.14em] text-white/75 uppercase mb-3.5">
            {EYEBROW}
          </p>

          <h1 className="hero-text-enter hero-text-d2 font-normal leading-[1.06] tracking-[-0.02em] text-white mb-3.5"
              style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(40px,11vw,58px)' }}>
            {title}
          </h1>

          <p className="hero-text-enter hero-text-d3 text-[13px] leading-relaxed text-white/80 mb-5"
             style={{ maxWidth: '320px' }}>
            {description}
          </p>

          <div className="hero-text-enter hero-text-d4 flex flex-wrap gap-2.5">
            <Link to="/new-arrivals"
              className="inline-flex items-center whitespace-nowrap rounded-full px-7 py-2.5 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(90deg,#C65A3A 0%,rgba(80,44,33,0.9) 100%)' }}>
              Shop new arrivals
            </Link>
            <Link to="/shop"
              className="inline-flex items-center whitespace-nowrap rounded-full border border-white/70 bg-transparent px-7 py-2.5 text-[13px] font-medium text-white no-underline transition-colors hover:bg-white/10">
              Explore the edit
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (visible on md+)
      ═══════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-row flex-1"
           style={{ height: 'calc(100vh - 91px)', minHeight: '560px', maxHeight: '820px' }}>

        {/* LEFT: Text panel */}
        <div className="flex flex-col justify-center px-10 md:px-12 lg:px-16 shrink-0"
             style={{ width: 'clamp(280px, 36%, 480px)', background: 'var(--color-hero-panel-bg)' }}>

          <p className="hero-text-enter hero-text-d1 uppercase tracking-[0.14em] font-medium mb-5"
             style={{ fontSize: 10, color: '#5C574F' }}>
            {EYEBROW}
          </p>

          <h1 className="hero-text-enter hero-text-d2 font-normal leading-[1.08] tracking-[-0.025em] mb-6"
              style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(36px,4.5vw,72px)', color: '#1a1a1a' }}>
            {title}
          </h1>

          <p className="hero-text-enter hero-text-d3 text-base leading-[1.65] mb-8"
             style={{ color: '#5C574F', maxWidth: '360px' }}>
            {description}
          </p>

          <div className="hero-text-enter hero-text-d4 flex flex-wrap gap-3">
            <Link to="/new-arrivals"
              className="inline-flex items-center whitespace-nowrap rounded-full px-7 py-[11px] text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(90deg,#C65A3A 0%,rgba(80,44,33,0.9) 100%)' }}>
              Shop new arrivals
            </Link>
            <Link to="/shop"
              className="inline-flex items-center whitespace-nowrap rounded-full border border-[#1a1a1a] bg-transparent px-7 py-[10px] text-[13px] font-medium text-[#1a1a1a] no-underline transition-colors hover:bg-[#1a1a1a] hover:text-white">
              Explore the edit
            </Link>
          </div>
        </div>

        {/* RIGHT: Two photos */}
        <div className="flex flex-1 overflow-hidden isolate">

          {/* Photo 1 */}
          <div className="hero-photo-l relative overflow-hidden flex-1 isolate">
            <div className="hero-ken-burns absolute inset-0 bg-cover bg-center"
                 style={{ backgroundImage: `url("${imgLeft}")` }}
                 role="img" aria-label={title} />
            <div className="absolute inset-y-0 right-0 w-4 pointer-events-none"
                 style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.10))' }} />
          </div>

          <div className="w-[3px] bg-white shrink-0 z-[2]" />

          {/* Photo 2 */}
          <div className="hero-photo-r relative overflow-hidden isolate" style={{ flex: '0 0 38%' }}>
            <div className="hero-ken-burns absolute inset-0 bg-cover bg-center"
                 style={{ backgroundImage: `url("${imgRight}")`, animationDirection: 'alternate-reverse' }}
                 role="img" aria-label="Collection" />
            <div className="absolute inset-y-0 left-0 w-4 pointer-events-none"
                 style={{ background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.10))' }} />
          </div>
        </div>
      </div>

      {/* ── Marquee bar ── */}
      <div className="marquee-wrapper overflow-hidden w-full border-t border-[#e5e5e5] py-[11px] shrink-0"
           style={{ background: 'var(--color-hero-panel-bg)' }}>
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {infoItems.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-[10px] font-medium tracking-[0.10em] text-[#1a1a1a] uppercase whitespace-nowrap px-8">
                    {item}
                  </span>
                  <span className="text-[10px] text-[#1a1a1a] opacity-25" aria-hidden="true">|</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
