'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import BowlImage from './bowl/BowlImage'

/* ─── Hero ──────────────────────────────────────────────────────────────────
   Centered statement over a soft, lightened full-bleed bowl photograph.
   The bowl keeps its behaviours — gentle float, mouse-parallax tilt, and the
   desktop scroll-scale pin (now applied to the background layer).            */
export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const textColRef  = useRef<HTMLDivElement>(null)   // centered content
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const bowlColRef  = useRef<HTMLDivElement>(null)   // full-bleed bowl background
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      /* Line-reveal — each line slides up from behind its overflow:hidden parent */
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

      /* Background bowl fades in (opacity only — leaves `scale` free for the pin) */
      gsap.fromTo(bowlColRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.1 })

      gsap.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: d + 0.72 })

      /* Scroll-triggered parallax pin — desktop only.
         Scales the background bowl and fades the centered content as you scroll. */
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
          tl.to(bowlColRef.current, { scale: 1.08, duration: 1 }, 0)
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
      {/* ── Bowl food photo — full-bleed background (floats + tilts on cursor) ── */}
      <div
        ref={bowlColRef}
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ opacity: 0, willChange: 'transform, opacity' }}
      >
        <BowlImage className="w-full h-full" />
      </div>

      {/* Light cream scrim — keeps the bowl soft & faint and the text readable.
         A strong centre wash (cream — matches the photo's warm tones) sits behind
         the copy so it stays clearly legible; the bowl shows through at the edges. */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'rgba(250,248,243,0.6)' }} />
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 72% 70% at 50% 47%, rgba(250,248,243,0.9) 0%, rgba(250,248,243,0.58) 40%, rgba(250,248,243,0.16) 66%, transparent 82%)',
      }} />

      {/* ── Cinematic atmosphere — warm depth layers over the scrim ──────── */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 55% at 74% 28%, rgba(210,155,75,0.10) 0%, rgba(220,170,90,0.04) 45%, transparent 68%)',
      }} />
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 52% 52% at 22% 74%, rgba(90,108,72,0.07) 0%, transparent 65%)',
      }} />
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 92% 88% at 50% 50%, transparent 52%, rgba(20,16,10,0.05) 100%)',
      }} />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-24 z-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(242,236,226,0.55))',
      }} />

      {/* ── Centered content ──────────────────────────────────────────────
          pointer-events-none lets cursor movement pass through to the bowl so
          the parallax tilt works across the whole hero; the CTA row re-enables
          pointer events so the buttons stay clickable. */}
      <div
        ref={textColRef}
        className="nura-c relative z-10 flex flex-col items-center justify-center text-center pointer-events-none"
        style={{
          minHeight: 'inherit',
          paddingTop: '76px',
          paddingBottom: '2.5rem',
          gap: 'clamp(1.1rem, 2vw, 1.65rem)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Kicker label */}
        <div className="overflow-hidden">
          <div className="hero-reveal-line flex items-center justify-center gap-3">
            <div className="line-olive" />
            <span className="label-sm text-nb-olive">Launching soon</span>
            <div className="line-olive" />
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
          className="text-nb-body mx-auto"
          style={{ opacity: 0, maxWidth: '44ch', fontSize: 'clamp(0.88rem, 1.20vw, 1rem)', lineHeight: 1.78 }}
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
        <div ref={ctaRef} className="flex flex-wrap gap-2.5 justify-center pointer-events-auto" style={{ opacity: 0 }}>
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
          className="flex justify-center border-t border-nb-border mx-auto"
          style={{
            opacity: 0,
            maxWidth: '30rem',
            paddingTop: 'clamp(0.875rem, 1.6vw, 1.25rem)',
            gap: 'clamp(1.5rem, 3.5vw, 3rem)',
          }}
        >
          {[
            { value: '100%',  label: 'Personalized'  },
            { value: '2 min', label: 'To shape Nura' },
            { value: 'Daily', label: 'Not a splurge' },
          ].map((s) => (
            <div key={s.value}>
              <div
                className="font-display font-semibold text-nb-heading leading-none"
                style={{ fontSize: 'clamp(1.12rem, 2vw, 1.5rem)' }}
              >
                {s.value}
              </div>
              <div className="text-nb-muted mt-1" style={{ fontSize: '0.67rem', letterSpacing: '0.05em' }}>
                {s.label}
              </div>
            </div>
          ))}
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
      <div className="absolute bottom-0 left-0 right-0 h-px bg-nb-border z-10" />
    </section>
  )
}
