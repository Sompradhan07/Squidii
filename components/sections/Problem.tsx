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
    <section id="problem" ref={sectionRef} className="bg-nb-bg2">
      <div className="divider-gradient" />
      <div className="nura-c nura-section">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="nura-label-row mb-6">
          <div className="line-olive" />
          <span className="label-sm text-nb-olive">The Problem</span>
        </div>

        <div ref={titleRef} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {[
            { text: 'You already know', color: 'var(--nb-heading)', italic: false },
            { text: 'the struggle.',    color: 'var(--nb-olive)',   italic: true  },
          ].map(({ text, color, italic }, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="rl font-display font-medium"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 4.4rem)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.022em',
                  marginBottom: '0.06em',
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
        <div ref={cardsRef} className="flex flex-col gap-4">
          {problems.map((p) => (
            <div
              key={p.num}
              className="pc stat-card-accent"
              style={{ borderLeftColor: 'var(--nb-olive)' }}
            >
              <div className="flex items-baseline gap-3.5 mb-2.5">
                <span
                  className="font-display font-semibold text-nb-olive leading-none shrink-0"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
                >
                  {p.num}
                </span>
                <h3
                  className="font-display font-medium text-nb-heading leading-tight"
                  style={{ fontSize: 'clamp(1.12rem, 2vw, 1.5rem)' }}
                >
                  {p.title}
                </h3>
              </div>
              <p
                className="text-nb-body leading-[1.74]"
                style={{ fontSize: 'clamp(0.88rem, 1.1vw, 0.96rem)', maxWidth: '62ch' }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
      <div className="divider-gradient" />
    </section>
  )
}
