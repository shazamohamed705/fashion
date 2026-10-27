import { Link } from 'react-router-dom';

export default function LinenEditBanner() {
  return (
    <section
      aria-label="The Linen Edit"
      className="relative w-full overflow-hidden bg-[#d8d5d0]"
      style={{ aspectRatio: '803 / 540', maxHeight: '680px', minHeight: '340px' }}
    >
      {/* Full-bleed image */}
      <img
        src="/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg"
        alt="Models wearing the linen edit collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ── MOBILE card (< sm) ── */}
      <div className="sm:hidden absolute top-1/2 -translate-y-1/2 left-4 right-4 bg-white flex flex-col items-start px-4 py-4">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#2a2a2a] mb-1.5">The Linen Edit</p>
        <h2 className="leading-[1.15] text-[#1a1a1a] mb-1.5 font-normal" style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(18px,8vw,32px)' }}>
          Light on the skin.<br />Easy on the day.
        </h2>
        <p className="text-[11px] leading-[1.6] text-[#2a2a2a] mb-3">
          Breathable shapes in tones borrowed from earth, sky and stone.
        </p>
        <Link to="/new-arrivals" className="inline-flex items-center justify-center bg-[#1D1D1B] text-white rounded-full text-[11px] font-bold tracking-[0.02em] px-5 py-2 transition-colors hover:bg-[#3a3a3a]">
          Discover linen
        </Link>
      </div>

      {/* ── DESKTOP card (sm+) ── */}
      <div
        className="hidden sm:flex absolute flex-col items-start bg-white px-8 py-8"
        style={{
          top: '50%',
          transform: 'translateY(-55%) translateX(12px)',
          right: 'auto',
          left: '10%',
          width: 'clamp(320px, 52%, 580px)',
        }}
      >
        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#2a2a2a] mb-4">THE LINEN EDIT</p>
        <h2 className="leading-[1.18] text-[#1a1a1a] mb-4 font-normal" style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(26px,3.2vw,42px)' }}>
          Light on the skin.<br />Easy on the day.
        </h2>
        <p className="text-[14px] leading-[1.65] text-[#2a2a2a] mb-6">
          Breathable shapes in tones borrowed from earth, sky and stone.
        </p>
        <Link to="/new-arrivals" className="inline-flex items-center justify-center bg-[#1D1D1B] text-white rounded-full text-[12px] font-bold tracking-[0.02em] px-7 py-2 min-w-[120px] transition-colors hover:bg-[#3a3a3a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1D1D1B] focus-visible:outline-offset-2">
          Discover linen
        </Link>
      </div>

    </section>
  );
}
