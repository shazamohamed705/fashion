import { useEffect, useRef, useState } from 'react';

/* ─── Images for sliders ─────────────────────────────────────────────────── */
const SLIDES = [
  '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
  '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
  '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
  '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg',
];

const FILM_SLIDES = [
  '/40bb3e5bf4d0c3683fdb021c735af53e470c00bf.jpg',
  '/a650346682558fb9b59d53bea266cca6c9ae4e9e.jpg',
  '/ce36b5575235158056ba681b0c25c7743486fe47.jpg',
  '/f53ac22ad1a544a8375057de7c8f36b7b1767d2c.jpg',
];

/* ─── Auto-playing crossfade slider ─────────────────────────────────────── */
function AutoSlider({ borderRadius }) {
  const [curr, setCurr] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(c => c);
      setCurr(c => {
        setPrev(c);
        return (c + 1) % SLIDES.length;
      });
      setFading(true);
      setTimeout(() => setFading(false), 900);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
      <img
        key={curr}
        src={SLIDES[curr]}
        alt={`slide ${curr + 1}`}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          display: 'block',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
          zIndex: 2,
        }}
      />
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={SLIDES[prev]}
          alt={`slide prev ${prev + 1}`}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
            opacity: 1,
            zIndex: 1,
          }}
        />
      )}
      <span style={{
        position: 'absolute', top: '10px', right: '12px',
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(4px)',
        borderRadius: '999px',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px', fontWeight: 500, color: '#555',
        padding: '3px 9px',
        zIndex: 3,
      }}>
        {curr + 1} / {SLIDES.length}
      </span>
      <div style={{
        position: 'absolute', bottom: '12px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(curr); setCurr(i); setFading(true); setTimeout(() => setFading(false), 900); }}
            style={{
              width: i === curr ? 18 : 6, height: 6,
              borderRadius: '999px',
              background: i === curr ? '#fff' : 'rgba(255,255,255,0.5)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s, background 0.3s',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Film-strip slider ──────────────────────────────────────────────────── */
function FilmStripSlider({ borderRadius = '16px' }) {
  const [curr, setCurr] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSliding(true);
      setTimeout(() => {
        setCurr(c => (c + 1) % FILM_SLIDES.length);
        setSliding(false);
      }, 650);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  const next = (curr + 1) % FILM_SLIDES.length;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius, overflow: 'hidden' }}>
      <img
        src={FILM_SLIDES[curr]}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
          transition: sliding ? 'transform 0.65s cubic-bezier(0.77,0,0.18,1)' : 'none',
          zIndex: 2,
        }}
      />
      <img
        src={FILM_SLIDES[next]}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
          transform: sliding ? 'translateY(0)' : 'translateY(100%)',
          transition: sliding ? 'transform 0.65s cubic-bezier(0.77,0,0.18,1)' : 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}

/* ─── Fade-up on scroll ──────────────────────────────────────────────────── */
function useFadeUp(selector) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(selector);
    items.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(32px)'; });
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        items.forEach((c, i) => setTimeout(() => {
          c.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';
          c.style.opacity = '1'; c.style.transform = 'translateY(0)';
        }, i * 140));
        obs.disconnect();
      }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [selector]);
  return ref;
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function OurStoryPage() {
  const sec3Ref = useFadeUp('.s3-anim');
  const sec4Ref = useFadeUp('.s4-anim');

  const outerRadius = `${(129 / 760) * 100}%`;
  const innerRadius = `${(79 / 620) * 100}%`;

  return (
    <div style={{ background: '#FAF6EF', minHeight: '100vh' }}>

      {/* Mobile-only overrides — desktop untouched */}
      <style>{`
        @media (max-width: 767px) {
          .os-sec1 { flex-direction: row !important; padding: 16px 16px !important; align-items: center !important; gap: 12px !important; }
          .os-sec1-text { flex: 1 1 0 !important; max-width: 55% !important; min-width: 0 !important; }
          .os-sec1-text h1 { font-size: clamp(20px,6vw,30px) !important; margin-bottom: 8px !important; }
          .os-sec1-text p { font-size: 12px !important; }
          .os-sec1-circle { width: min(40vw, 160px) !important; height: min(40vw, 160px) !important; flex-shrink: 0 !important; }

          .os-sec2 { min-height: 420px !important; }
          .os-sec2-overlay { background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%) !important; }
          .os-sec2-card { position: absolute !important; bottom: 0 !important; left: 0 !important; top: auto !important; margin: 0 !important; width: 100% !important; padding: 20px !important; background: transparent !important; }
          .os-sec2-card h2 { color: #fff !important; font-size: clamp(22px,6vw,32px) !important; }
          .os-sec2-card p  { color: rgba(255,255,255,0.82) !important; font-size: 13px !important; }
          .os-sec2-card .os-stat p:first-child { color: #ffb49a !important; }
          .os-sec2-card .os-stat p:last-child  { color: #fff !important; font-size: 18px !important; }

          .os-sec3 { flex-direction: column !important; padding: 40px 20px !important; gap: 20px !important; }
          .os-sec3-title { flex: unset !important; max-width: 100% !important; }

          .os-sec4 { padding: 32px 20px !important; }
          .os-sec4-inner { flex-direction: column !important; }
          .os-sec4-film { flex: unset !important; max-width: 100% !important; width: 100% !important; }
          .os-sec4-text { flex: unset !important; width: 100% !important; }
        }

        /* Surface Pro / tablet — force row and tighter sizes */
        @media (min-width: 768px) and (max-width: 1100px) {
          .os-sec1 { flex-wrap: nowrap !important; padding: 24px 32px !important; gap: 24px !important; align-items: center !important; }
          .os-sec1-text { flex: 1 1 0 !important; min-width: 0 !important; max-width: 55% !important; }
          .os-sec1-text h1 { font-size: clamp(28px,3.8vw,46px) !important; }
          .os-sec1-circle { width: clamp(200px,36vw,320px) !important; height: clamp(200px,36vw,320px) !important; flex-shrink: 0 !important; }
        }
      `}</style>

      {/* ── Section 1: Hero ── */}
      <section className="os-sec1" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '32px', padding: 'clamp(16px,2vw,28px) clamp(40px,5%,80px)', flexWrap: 'wrap',
      }}>
        {/* Mobile gradient overlay — hidden on desktop */}
        <div className="os-sec1-overlay" style={{
          display: 'none',
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)',
          pointerEvents: 'none',
        }} />
        <div className="os-sec1-text" style={{ flex: '1 1 420px', maxWidth: '520px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(42px,5.5vw,74px)', fontWeight: 400, lineHeight: 1.12, color: '#1a1a1a', margin: '0 0 clamp(16px,2vw,26px)', letterSpacing: '-0.01em' }}>
            Made from<br />threads.<br />Held by people.
          </h1>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 'clamp(14px,1.1vw,17px)', fontWeight: 600, lineHeight: 1.6, color: '#444', margin: 0 }}>
            nesej comes from the Arabic word for "weave". It describes how we make clothes — and how we see community.
          </p>
        </div>

        <div className="os-sec1-circle" style={{
          flex: '0 0 auto',
          width: 'clamp(280px,46vw,540px)', height: 'clamp(280px,46vw,540px)',
          borderRadius: outerRadius, background: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', flexShrink: 0,
        }}>
          <div style={{ width: '81.6%', height: '81.6%', borderRadius: innerRadius, overflow: 'hidden', position: 'relative' }}>
            <AutoSlider borderRadius={innerRadius} />
          </div>
        </div>
      </section>

      {/* ── Section 2: Clothes for every body ── */}
      <section className="os-sec2" style={{ position: 'relative', width: '100%', overflow: 'hidden', minHeight: 'clamp(260px,34vw,420px)', display: 'flex', alignItems: 'center' }}>
        <img src="/07c56b2eba15cf1613a8497efc9b21e9a6e9f7be.png" alt="Linen texture"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 65%', display: 'block' }} />
        <div className="os-sec2-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg,#D8CDBB 41.49%,rgba(170,162,147,0.88) 53.89%,rgba(0,0,0,0) 80%)', zIndex: 1 }} />
        <div className="os-sec2-card" style={{ position: 'relative', zIndex: 2, marginLeft: 'auto', marginRight: 'clamp(40px,12%,160px)', width: 'clamp(280px,48%,580px)', padding: 'clamp(28px,3.5vw,52px) clamp(24px,4%,56px)', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(24px,3.2vw,48px)', fontWeight: 400, lineHeight: '108.33%', letterSpacing: '-1.61px', color: '#1a1a1a', margin: '0 0 clamp(14px,1.6vw,24px)' }}>
            Clothes for every<br />body and every<br />season.
          </h2>
          <p style={{ fontFamily: 'system-ui,sans-serif', fontSize: 'clamp(12px,1vw,15px)', lineHeight: '137%', color: '#2a2a2a', margin: '0 0 clamp(20px,2.4vw,36px)', maxWidth: '480px' }}>
            We make well-built everyday pieces for women, men and kids. Clothes that feel considered, but never precious.
          </p>
          <div style={{ display: 'flex', gap: 'clamp(24px,4vw,56px)', flexWrap: 'nowrap' }}>
            {[['⟷','SIZES XS TO 4XL','XS–4XL'],['◎','100% ORGANIC COTTON','100%'],['↩','EASY 14-DAY RETURNS','14 days']].map(([icon,label,val]) => (
              <div key={label} className="os-stat" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontFamily: 'system-ui', fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8502A', margin: 0, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: '11px' }}>{icon}</span>{label}
                </p>
                <p style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(16px,1.8vw,24px)', fontWeight: 400, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Over, under, together ── */}
      <section ref={sec3Ref} className="os-sec3" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(32px,6vw,96px)', padding: 'clamp(48px,6vw,88px) clamp(40px,6%,96px)', flexWrap: 'wrap', background: '#ffff' }}>
        <div className="s3-anim os-sec3-title" style={{ flex: '1 1 360px', maxWidth: '480px' }}>
          <h2 style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(36px,4.8vw,68px)', fontWeight: 400, lineHeight: 1.12, color: '#1a1a1a', margin: 0, letterSpacing: '-0.01em' }}>
            Over, under,<br />together.
          </h2>
        </div>
        <div style={{ flex: '1 1 280px', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { t: 'Every garment is threads crossing over and under each other. That is our idea of community too: different people, held together.', c: '#222', s: 'clamp(15px,1.2vw,18px)' },
            { t: 'Vertical threads: structure and quality.', c: '#555', s: 'clamp(14px,1.1vw,17px)' },
            { t: 'Horizontal threads: warmth and the human hand.', c: '#555', s: 'clamp(14px,1.1vw,17px)' },
          ].map((p, i) => (
            <p key={i} className="s3-anim" style={{ fontFamily: 'system-ui,sans-serif', fontSize: p.s, lineHeight: 1.65, color: p.c, margin: 0 }}>{p.t}</p>
          ))}
        </div>
      </section>

      {/* ── Section 4: Warm. Honest. Quietly confident. ── */}
      <section ref={sec4Ref} className="os-sec4" style={{ background: '#FAF6EF', padding: 'clamp(24px,3vw,48px) clamp(24px,6%,88px)' }}>
        <h2 className="s4-anim" style={{ fontFamily: 'var(--font-story)', fontSize: 'clamp(24px,3vw,42px)', fontWeight: 400, color: '#C8502A', margin: '0 0 clamp(24px,3vw,40px)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
          Warm. Honest. Quietly confident.
        </h2>
        <div className="os-sec4-inner" style={{ display: 'flex', gap: 'clamp(24px,4vw,64px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="s4-anim os-sec4-film" style={{ flex: '1 1 300px', maxWidth: 'clamp(300px,48%,760px)', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, aspectRatio: '760/457' }}>
            <FilmStripSlider borderRadius="16px" />
          </div>
          <div className="os-sec4-text" style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,28px)', paddingTop: '8px' }}>
            <h3 className="s4-anim" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,3.2vw,48px)', fontWeight: 400, color: '#1a1a1a', margin: 0, lineHeight: 1.1, letterSpacing: 0 }}>
              These three principles shape every piece we make.
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.8vw,22px)' }}>
              {[
                { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8502A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Welcoming', desc: 'Made for different ages, bodies and ways of living.' },
                { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8502A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: 'Crafted', desc: 'Attention to fabric, fit and finish. Details are the luxury.' },
                { svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8502A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: 'Timeless', desc: 'Simple pieces and colours that outlive the season.' },
              ].map((p) => (
                <div key={p.title} className="s4-anim" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', border: '1px solid #e8d8cc', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>{p.svg}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(15px,1.3vw,20px)', fontWeight: 500, color: '#1a1a1a', margin: '0 0 3px', lineHeight: 1.2 }}>{p.title}</p>
                    <p style={{ fontFamily: 'system-ui', fontSize: 'clamp(11px,0.85vw,13px)', color: '#888', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cotton Banner — last section ── */}
      <section style={{
        width: '100%',
        padding: 'clamp(48px, 7vw, 96px) clamp(20px, 6%, 80px)',
        background: 'linear-gradient(180deg, #A25943 0%, #0B0B0B 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(18px, 2.5vw, 32px)',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-story)',
          fontSize: 'clamp(22px, 3.4vw, 48px)',
          fontWeight: 400,
          color: '#e8ddd6',
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}>
          Soft cotton, cut for real life.
        </h2>
        <a
          href="/new-arrivals"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '999px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 'clamp(12px, 1vw, 14px)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '10px 28px',
            textDecoration: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#333')}
          onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
        >
          Shop new arrivals
        </a>
      </section>

    </div>
  );
}
