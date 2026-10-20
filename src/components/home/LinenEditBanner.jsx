import { Link } from 'react-router-dom';

export default function LinenEditBanner() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#d8d5d0]"
      style={{ aspectRatio: '803 / 540', maxHeight: '680px' }}
      aria-label="The Linen Edit"
    >
      {/* Image */}
      <img
        src="/e861d07fb0e3b72eb8be78bed87bc52fb546eb0c.jpg"
        alt="Models wearing the linen edit collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* White card */}
      <div
        className="absolute top-1/2 -translate-y-[55%] left-[14%] bg-white flex flex-col items-start"
        style={{
          width: 'clamp(280px, 60%, 540px)',
          padding: 'clamp(28px, 4.5%, 52px) clamp(28px, 4.5%, 52px)',
        }}
      >
        {/* Eyebrow */}
        <p className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-[#2a2a2a] mb-4">
          THE LINEN EDIT
        </p>

        {/* Heading — Fredericka the Great */}
        <h2
          className="mb-4 leading-[1.18] text-[#1a1a1a]"
          style={{
            fontFamily: 'var(--font-story)',
            fontSize: 'clamp(26px, 3.2vw, 42px)',
            fontWeight: 400,
          }}
        >
          Light on the skin.<br />
          Easy on the day.
        </h2>

        {/* Description */}
        <p className="font-sans text-[14px] font-semibold leading-[1.65] text-[#2a2a2a] mb-6">
          Breathable shapes in tones borrowed from earth, sky and stone.
        </p>

        {/* CTA pill */}
        <Link
          to="/new-arrivals"
          className="
            inline-flex items-center justify-center
            bg-[#1D1D1B] text-white rounded-full
            font-sans text-[12px] font-bold tracking-[0.02em]
            px-7 py-2 min-w-[120px]
            transition-colors duration-150
            hover:bg-[#3a3a3a]
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-[#1D1D1B] focus-visible:outline-offset-2
          "
        >
          Discover linen
        </Link>
      </div>
    </section>
  );
}
