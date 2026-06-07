'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import BowlImage from './bowl/BowlImage'

/* ─── Orbital nutrition badge ─────────────────────────────────────────────
   Smaller, softer pill-style. Orbits the bowl circumference.
   Supports the bowl — does NOT compete with it.           */
function NutrientBadge({
  value,
  label,
  style,
}: {
  value: string
  label: string
  style: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const delay = 1.45 + Math.random() * 0.35
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.84, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.68, ease: 'back.out(1.7)', delay },
    )
  }, [])

  return (
    <div ref={ref} className="hero-orbital-badge absolute z-10" style={{ opacity: 0, ...style }}>
      <div className="nb-badge-orbital">
        <span className="nb-orbital-dot" />
        <span className="nb-orbital-val">{value}</span>
        <span className="nb-orbital-lbl">{label}</span>
      </div>
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const textColRef  = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const bowlColRef  = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      /* Line-reveal — each line slides up from behind overflow:hidden parent */
      const lines = sectionRef.current?.querySelectorAll('.hero-reveal-line')
      if (lines?.length) {
        gsap.fromTo(
          Array.from(lines),
          { yPercent: reduced ? 0 : 108, opacity: reduced ? 1 : 0 },
          { yPercent: 0, opacity: 1, duration: 1.08, stagger: 0.09, ease: 'power4.out', delay: 0.05 },
        )
      }

      const d = reduced ? 0 : 0.82

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: reduced ? 0 : 14 },
        { opacity: 1, y: 0, duration: 0.88, ease: 'power3.out', delay: d })

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: reduced ? 0 : 10 },
        { opacity: 1, y: 0, duration: 0.74, ease: 'power3.out', delay: d + 0.12 })

      gsap.fromTo(statsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.62, delay: d + 0.26 })

      gsap.fromTo(bowlColRef.current,
        { opacity: 0, y: reduced ? 0 : 26 },
        { opacity: 1, y: 0, duration: 1.30, ease: 'power3.out', delay: 0.14 })

      gsap.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: d + 0.72 })

      /* Scroll-triggered parallax pin — desktop only.
         Pinning + scrub interacts badly with mobile URL-bar resizes and the
         reordered mobile layout, so it is scoped to ≥1024px. */
      if (!reduced) {
        const mm = gsap.matchMedia()
        mm.add('(min-width: 1024px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=60%',
              scrub: 1.0,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
            },
          })
          /* Bowl scales up gradually over the full pin duration.
             Text stays visible for the first 75% of scroll, then fades in the final 25%. */
          tl.to(bowlColRef.current, { scale: 1.06, duration: 1 }, 0)
          tl.to(textColRef.current, { opacity: 0, y: -24, duration: 0.25 }, 0.75)
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-nb-bg min-h-svh max-h-[1080px] overflow-hidden relative"
    >
      {/* ── Cinematic atmosphere ── Apple AirPods-style depth layers ──── */}

      {/* Warm golden hour glow — emanates from upper-right (behind bowl) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 55% at 74% 28%, rgba(210,155,75,0.11) 0%, rgba(220,170,90,0.05) 45%, transparent 68%)',
      }} />

      {/* Cool-warm atmospheric depth — lower-left */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 52% 52% at 22% 74%, rgba(90,108,72,0.08) 0%, transparent 65%)',
      }} />

      {/* Subtle edge vignette — cinematic frame darkening */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 52%, rgba(20,16,10,0.055) 100%)',
      }} />

      {/* Warm horizon — atmospheric depth at bottom of hero */}
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-24 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(242,236,226,0.50))',
      }} />

      {/* ── Asymmetric 44 / 56 grid ────────────────────────────────────── */}
      <div
        className="nura-c hero-2col h-full grid grid-cols-1 items-center pt-[76px] pb-10"
        style={{ minHeight: 'inherit', gap: 'clamp(1.5rem, 3.5vw, 4.5rem)' }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .hero-2col { grid-template-columns: 44% 56% !important; }
          }
        `}</style>

        {/* ── Text column ───────────────────────────────────────────────── */}
        <div
          ref={textColRef}
          className="hero-text-col flex flex-col"
          style={{ gap: 'clamp(1.1rem, 2vw, 1.65rem)', willChange: 'transform, opacity' }}
        >
          {/* Kicker label */}
          <div className="overflow-hidden">
            <div className="hero-reveal-line flex items-center gap-2.5">
              <div className="line-olive" />
              <span className="label-sm text-nb-olive">Launching soon</span>
            </div>
          </div>

          {/* Headline — two-line reveal */}
          <div>
            {[
              { text: 'Eating right', cls: 'text-nb-heading' },
              { text: 'is simple.',   cls: 'text-nb-olive italic' },
            ].map(({ text, cls }) => (
              <div key={text} className="overflow-hidden" style={{ marginBottom: '0.04em' }}>
                <div className={`hero-reveal-line hero-headline ${cls}`}>{text}</div>
              </div>
            ))}
          </div>

          {/* Subheadline + body */}
          <p
            ref={subtitleRef}
            className="text-nb-body"
            style={{
              opacity: 0,
              maxWidth: '38ch',
              fontSize: 'clamp(0.88rem, 1.20vw, 1rem)',
              lineHeight: 1.78,
            }}
          >
            <span
              className="block font-display italic text-nb-heading"
              style={{ fontSize: 'clamp(1.05rem, 1.9vw, 1.45rem)', lineHeight: 1.3, marginBottom: '0.7rem', fontStyle: 'italic' }}
            >
              Doing it every single day? That&rsquo;s the hard part.
            </span>
            Nura delivers meals designed around your body and your goals — so you don&rsquo;t
            have to plan, calculate, or compromise.
          </p>

          {/* CTA row */}
          <div ref={ctaRef} className="flex flex-wrap gap-2.5" style={{ opacity: 0 }}>
            <button
              className="btn btn-olive"
              onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Help Us Build Nura
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the problem
            </button>
          </div>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="flex border-t border-nb-border"
            style={{
              opacity: 0,
              paddingTop: 'clamp(0.875rem, 1.6vw, 1.25rem)',
              gap: 'clamp(1.5rem, 3.5vw, 3rem)',
            }}
          >
            {[
              { value: '100%',      label: 'Personalized'    },
              { value: '2 min',     label: 'To shape Nura'   },
              { value: 'Daily',     label: 'Not a splurge'   },
            ].map((s) => (
              <div key={s.value}>
                <div
                  className="font-display font-semibold text-nb-heading leading-none"
                  style={{ fontSize: 'clamp(1.12rem, 2vw, 1.5rem)' }}
                >
                  {s.value}
                </div>
                <div
                  className="text-nb-muted mt-1"
                  style={{ fontSize: '0.67rem', letterSpacing: '0.05em' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bowl column — real food photograph, orbital badges ─────── */}
        <div
          ref={bowlColRef}
          className="hero-bowl-col relative"
          style={{
            height: 'clamp(340px, 68vh, 700px)',
            willChange: 'transform, opacity',
            opacity: 0,
          }}
        >
          <BowlImage className="w-full h-full" />

          {/*
            Orbital badges — follow the circumference of the circular bowl.
            Sized small and soft so they support the bowl without competing.
            Approximate clock positions: 2h / 3h / 5h / 8h
          */}
          <NutrientBadge value="38g" label="Protein"  style={{ top: '18%',   right: '9%'  }} />
          <NutrientBadge value="52g" label="Carbs"    style={{ top: '45%',   right: '5%'  }} />
          <NutrientBadge value="485" label="Calories" style={{ bottom: '30%', right: '9%' }} />
          <NutrientBadge value="15g" label="Fats"     style={{ bottom: '20%', left: '5%'  }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        aria-label="Scroll down"
        onKeyDown={(e) =>
          e.key === 'Enter' &&
          document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-[0.3rem] cursor-pointer z-10"
        style={{ opacity: 0 }}
      >
        <span className="label-sm text-nb-muted" style={{ fontSize: '0.55rem', whiteSpace: 'nowrap' }}>Scroll to explore</span>
        <div style={{ width: 1, height: 22, background: 'linear-gradient(to bottom, rgba(90,108,72,0.48), transparent)' }} />
      </div>

      {/* Bottom section bridge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-nb-border" />
    </section>
  )
}
