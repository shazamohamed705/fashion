export default function NewsletterSection() {
  return (
    <div className="bg-[#1a1a18] border-b border-white/10">

      {/* ══ MOBILE ══ */}
      <div className="md:hidden px-5 py-10 flex flex-col gap-6">
        {/* Headline */}
        <div>
          <h2
            className="text-white font-normal leading-[1.15] m-0 mb-2.5"
            style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(26px,7vw,36px)' }}
          >
            Good clothes, good company.
          </h2>
          <p className="text-[14px] text-white/80 leading-relaxed m-0">
            New pieces, fabric stories and practical care notes. Sent occasionally.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <label className="text-[13px] font-bold text-white tracking-[0.04em]">
            Email address
          </label>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-full bg-white px-5 py-3 text-[14px] text-[#1a1a1a] outline-none border border-white/20 placeholder:text-[#aaa]"
          />
          <button
            className="w-full rounded-full bg-[#C8502A] text-white text-[14px] font-semibold py-3 transition-colors hover:bg-[#b3421f]"
          >
            Join us
          </button>
        </div>
      </div>

      {/* ══ DESKTOP ══ */}
      <div
        className="hidden md:flex flex-wrap items-start gap-16"
        style={{ padding: 'clamp(28px,4vw,52px) clamp(16px,6%,88px)' }}
      >
        {/* Left */}
        <div style={{ flex: '1 1 280px' }}>
          <h2
            className="text-white font-normal leading-[1.15] m-0 mb-2.5"
            style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(26px,3.4vw,46px)' }}
          >
            Good clothes, good company.
          </h2>
          <p className="text-[15px] text-white/85 leading-relaxed m-0" style={{ maxWidth: 340 }}>
            New pieces, fabric stories and practical care notes. Sent occasionally.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-2" style={{ flex: '1 1 320px' }}>
          <label className="text-[14px] font-bold text-white tracking-[0.04em]">
            Email address
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 min-w-0 rounded-full bg-white px-5 py-2.5 text-[13px] text-[#1a1a1a] outline-none border border-white/25 placeholder:text-[#aaa]"
              style={{ maxWidth: 480 }}
            />
            <button
              className="shrink-0 rounded-full bg-[#C8502A] text-white text-[13px] font-semibold px-6 py-2.5 whitespace-nowrap transition-colors hover:bg-[#b3421f]"
            >
              Join us
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
