'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Persona icons ──────────────────────────────────────────────────────── */
const BarbellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6.5" y1="12" x2="17.5" y2="12" /><rect x="3.5" y="5" width="3" height="4" rx="1.5" /><rect x="17.5" y="5" width="3" height="4" rx="1.5" /><rect x="3.5" y="15" width="3" height="4" rx="1.5" /><rect x="17.5" y="15" width="3" height="4" rx="1.5" /><rect x="6.5" y="9" width="11" height="6" rx="3" />
  </svg>
)
const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="12.01" />
  </svg>
)
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
)
const CycleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 2l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
)

/* Accents brightened for legibility on the dark espresso background. */
const personas = [
  {
    icon: <BarbellIcon />,
    title: 'The Gym-Goer',
    desc: 'Nailing workouts but can’t get nutrition to match.',
    accent: '#8da674',
  },
  {
    icon: <BriefcaseIcon />,
    title: 'The Busy Professional',
    desc: 'Wants to eat right but doesn’t have time to plan every meal.',
    accent: '#d4a660',
  },
  {
    icon: <ShieldIcon />,
    title: 'Managing a Condition',
    desc: 'Living with PCOS, diabetes, or another condition where diet actually matters.',
    accent: '#a8c48c',
  },
  {
    icon: <CycleIcon />,
    title: 'The Repeat Starter',
    desc: 'Anyone who’s ever said “I’ll start eating healthy on Monday” — for the fifth time.',
    accent: '#d4896a',
  },
]

export default function WhoItsFor() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

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
        gridRef.current?.querySelectorAll('.pc') ?? [],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.70, stagger: 0.10, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 84%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="who-its-for"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        /* Warm cinematic dark — espresso / toasted oak (matches the brand dark tone) */
        background: 'linear-gradient(168deg, #191610 0%, #1e1b12 55%, #1a1810 100%)',
      }}
    >
      {/* Atmospheric top bridge — blends from the warm cream section above */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, rgba(242,236,226,0.10) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Warm ambient light — cinematic mood */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 80% 32%, rgba(200,148,72,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="nura-c nura-section relative z-[2]">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="nura-label-row mb-6">
          <div className="line-cream" />
          <span className="label-sm" style={{ color: 'rgba(253,248,240,0.45)' }}>Who It’s For</span>
        </div>

        <div ref={titleRef} style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {[
            { text: 'Built for people who’ve', color: 'var(--nb-cream)', italic: false },
            { text: 'tried everything else.',   color: 'var(--nb-amber)', italic: true  },
          ].map(({ text, color, italic }, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="rl font-display font-medium"
                style={{
                  fontSize: 'clamp(1.85rem, 4.4vw, 4.2rem)',
                  lineHeight: 0.98,
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

        {/* ── Persona cards ────────────────────────────────────────────── */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {personas.map((p) => (
            <div key={p.title} className="pc step-card flex items-start gap-4">
              <div
                className="feat-icon-box"
                style={{ background: `${p.accent}1c`, color: p.accent, border: `1px solid ${p.accent}33` }}
              >
                {p.icon}
              </div>
              <div>
                <h3
                  className="font-display font-medium leading-tight mb-1.5"
                  style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', color: 'var(--nb-cream)' }}
                >
                  {p.title}
                </h3>
                <p className="leading-[1.66]" style={{ fontSize: '0.88rem', color: 'rgba(255,248,232,0.5)' }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Atmospheric bottom edge — subtle vignette into the section below */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: '70px',
          background: 'linear-gradient(to top, rgba(12,10,7,0.22) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />
    </section>
  )
}
