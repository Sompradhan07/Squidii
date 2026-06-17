'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── The three struggles — straight from the validation content doc ─────── */
const problems = [
  {
    num: '01',
    title: 'The Math Is Exhausting',
    body: 'How much protein should this meal have? Am I eating too many carbs? Figuring this out for breakfast, lunch, and dinner — seven days a week? That’s where most people give up.',
  },
  {
    num: '02',
    title: 'Willpower Runs Out',
    body: 'You start strong on Monday. By Thursday, you’re ordering whatever’s convenient. Not because you don’t care — but because staying consistent is genuinely hard when every meal is a decision.',
  },
  {
    num: '03',
    title: 'The Alternatives Don’t Fit',
    body: 'The “healthy” meal services charge a premium, throw in extra chicken, and call it a day. But they’re not built around what YOUR body needs — none of it is truly personalized.',
  },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.rl') ?? [],
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.92, stagger: 0.10, ease: 'power4.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } },
      )
      gsap.fromTo(
        cardsRef.current?.querySelectorAll('.pc') ?? [],
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.74, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 84%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(168deg, #191610 0%, #1f1b12 55%, #1a1810 100%)', scrollMarginTop: 72 }}
    >
      {/* Warm ambient light */}
      <div aria-hidden className="absolute pointer-events-none" style={{ top: '8%', right: '6%', width: 540, height: 440, background: 'radial-gradient(ellipse, rgba(200,148,72,0.09), transparent 66%)' }} />

      <div className="squidii-c squidii-section relative z-[2]">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="squidii-label-row mb-6">
          <div className="line-cream" />
          <span className="label-sm" style={{ color: 'rgba(253,248,240,0.5)' }}>The Problem</span>
        </div>

        <div ref={titleRef} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {[
            { text: 'You already know', color: 'var(--nb-cream)', italic: false },
            { text: 'the struggle.',    color: 'var(--nb-amber)', italic: true  },
          ].map(({ text, color, italic }, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="rl font-display font-medium"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5.2rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.025em',
                  marginBottom: '0.04em',
                  color,
                  fontStyle: italic ? 'italic' : undefined,
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>

        {/* ── Three numbered problem cards ─────────────────────────────── */}
        <div
          ref={cardsRef}
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}
        >
          {problems.map((p) => (
            <div
              key={p.num}
              className="pc flex flex-col gap-3.5"
              style={{
                padding: 'clamp(1.6rem,2.5vw,2.3rem)',
                background: 'rgba(255,248,232,0.04)',
                border: '2px solid rgba(255,248,232,0.1)',
                borderRadius: 22,
              }}
            >
              <div
                className="font-display font-semibold"
                style={{ fontSize: 'clamp(2.4rem,4vw,3.4rem)', lineHeight: 0.8, color: 'var(--nb-amber)' }}
              >
                {p.num}
              </div>
              <div>
                <h3
                  className="font-display font-semibold text-nb-cream"
                  style={{ fontSize: 'clamp(1.3rem,2vw,1.7rem)', margin: '0 0 8px', lineHeight: 1.1 }}
                >
                  {p.title}
                </h3>
                <p
                  className="leading-[1.7]"
                  style={{ fontSize: 'clamp(0.95rem,1.2vw,1.1rem)', color: 'rgba(255,248,232,0.6)', margin: 0 }}
                >
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
