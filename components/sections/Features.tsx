'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Feature SVG icons ──────────────────────────────────────────────────── */
const MetabolicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 12 5 7 8 13 11 9 14 14 17 6 20 12" />
  </svg>
)
const ChronoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 3.5" />
  </svg>
)
const GutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3C8.5 6.5 6 9.5 6 13a6 6 0 0012 0c0-3.5-2.5-6.5-6-10z" />
  </svg>
)
const MacroIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6"  x2="20" y2="6"  />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="9"  cy="6"  r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="10" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)
const RecoveryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" />
  </svg>
)
const SleepIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

const features = [
  { icon: <MetabolicIcon />, title: 'Metabolic Mapping',   desc: 'Real-time metabolic rate calculation based on your unique physiology — not population BMR averages.',                  tag: 'Core',        accent: '#5a6c48' },
  { icon: <ChronoIcon />,    title: 'Chrono-Nutrition',     desc: 'Optimal meal timing synced to your circadian rhythm for maximum nutrient absorption.',                                   tag: 'Advanced',    accent: '#8da674' },
  { icon: <GutIcon />,       title: 'Gut Intelligence',     desc: 'Personalized prebiotic and probiotic recommendations based on microbiome health signals.',                                tag: 'Precision',   accent: '#c28c48' },
  { icon: <MacroIcon />,     title: 'Adaptive Macros',      desc: 'Protein, fat, and carb targets that shift dynamically with your training load and life cycles.',                         tag: 'Core',        accent: '#5a6c48' },
  { icon: <RecoveryIcon />,  title: 'Recovery Nutrition',   desc: 'Post-activity fuel windows calibrated to your exercise type, intensity, and recovery profile.',                          tag: 'Performance', accent: '#c07458' },
  { icon: <SleepIcon />,     title: 'Stress & Sleep Sync',  desc: 'Nutritional support that responds to your cortisol patterns, sleep quality, and nervous system state.',                  tag: 'Holistic',    accent: '#8da674' },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.ri') ?? [],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.76, stagger: 0.10, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } },
      )
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.fc') ?? [],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.68, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="bg-nb-bg2 relative overflow-hidden">
      {/* Atmospheric bridge from HowItWorks dark section above */}
      <div className="atm-top-bridge" aria-hidden />
      <div className="divider-gradient" />

      <div className="nura-c nura-section">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div ref={titleRef} style={{ marginBottom: 'clamp(2.75rem,5.5vw,4.5rem)' }}>
          <div className="ri nura-label-row mb-4">
            <div className="line-olive" />
            <span className="label-sm text-nb-olive">Precision Features</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <h2
              className="ri font-display font-medium tracking-[-0.022em] leading-none text-nb-heading"
              style={{ fontSize: 'clamp(1.85rem, 4.5vw, 4.4rem)', maxWidth: '20ch' }}
            >
              Every dimension of your nutrition,{' '}
              <span className="text-nb-olive italic">mastered.</span>
            </h2>
            <p
              className="ri nura-prose text-nb-body leading-[1.74]"
              style={{ fontSize: 'clamp(0.88rem,1.18vw,0.98rem)' }}
            >
              Nura integrates the full spectrum of nutritional science into one coherent,
              living system that adapts to your unique biology every day.
            </p>
          </div>
        </div>

        {/* ── Feature grid ─────────────────────────────────────────────── */}
        <div ref={gridRef} className="nura-grid-3">
          {features.map((feat) => (
            <div key={feat.title} className="fc feature-card">
              <div className="flex items-start justify-between mb-5">
                <div
                  className="feat-icon-box"
                  style={{ background: `${feat.accent}11`, color: feat.accent }}
                >
                  {feat.icon}
                </div>
                <span
                  className="tag-pill"
                  style={{
                    background: `${feat.accent}0e`,
                    color: feat.accent,
                    border: `1px solid ${feat.accent}22`,
                  }}
                >
                  {feat.tag}
                </span>
              </div>
              <h3 className="font-semibold text-nb-heading mb-2" style={{ fontSize: '0.94rem' }}>
                {feat.title}
              </h3>
              <p className="text-nb-body leading-[1.68]" style={{ fontSize: '0.84rem' }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="divider-gradient" />
    </section>
  )
}
