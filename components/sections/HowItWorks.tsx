'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Step SVG icons ─────────────────────────────────────────────────────── */
const AssessIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <path d="M9 12h6M9 16h4" />
  </svg>
)
const BrainIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 014.9 4H17a3 3 0 010 6h-.1A5 5 0 0112 16a5 5 0 01-4.9-4H7a3 3 0 110-6h.1A5 5 0 0112 2z" />
    <path d="M12 16v6M9 19h6" />
  </svg>
)
const BlueprintIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3C9 6.5 6 9.5 6 13a6 6 0 0012 0c0-3.5-3-6.5-6-10z" />
    <path d="M12 13v4M9 17h6" />
  </svg>
)

const steps = [
  {
    number: '01',
    icon: <AssessIcon />,
    title: 'Tell Us Your Goal',
    subtitle: 'Two minutes, that’s it',
    desc: 'Fat loss, building muscle, managing a condition, or just eating right — you tell us what you’re working toward.',
    duration: '2 min',
    accent: '#d4a660',
  },
  {
    number: '02',
    icon: <BrainIcon />,
    title: 'We Design Your Meals',
    subtitle: 'Built around your body',
    desc: 'Every meal is portioned and balanced for what your body specifically needs. No counting, no calculating, no guesswork.',
    duration: 'Handled',
    accent: '#c28c48',
  },
  {
    number: '03',
    icon: <BlueprintIcon />,
    title: 'Eat Well, Every Day',
    subtitle: 'Consistency without effort',
    desc: 'Goal-aligned meals that fit your routine and your budget — built to be your daily food, not a once-in-a-while splurge.',
    duration: 'Ongoing',
    accent: '#e8a870',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.ri') ?? [],
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.82, stagger: 0.10, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } },
      )
      gsap.fromTo(
        stepsRef.current?.querySelectorAll('.sc') ?? [],
        { opacity: 0, y: 38 },
        { opacity: 1, y: 0, duration: 0.82, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 82%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        /* Warm cinematic dark — espresso / toasted oak — NOT forest green */
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

      {/* Warm ambient light from the left — cinematic mood */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 15% 60%, rgba(200,148,72,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="nura-c nura-section relative z-[2]">

        {/* ── Centered header ─────────────────────────────────────────── */}
        <div ref={titleRef} className="text-center" style={{ marginBottom: 'clamp(2.75rem, 5.5vw, 4.5rem)' }}>
          <div className="ri flex items-center justify-center gap-3 mb-5">
            <div className="line-cream" />
            <span className="label-sm" style={{ color: 'rgba(253,248,240,0.45)' }}>How It Works</span>
            <div className="line-cream" />
          </div>

          <h2
            className="ri font-display font-medium tracking-[-0.024em] leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', marginBottom: '1.25rem', color: 'var(--nb-cream)' }}
          >
            Three steps.<br />
            <span style={{ color: 'var(--nb-amber)', fontStyle: 'italic' }}>Zero guesswork.</span>
          </h2>

          <p
            className="ri nura-prose-center leading-[1.74]"
            style={{ color: 'rgba(255,255,255,0.46)', fontSize: 'clamp(0.88rem,1.2vw,0.98rem)' }}
          >
            No macro math, no meal-prep Sundays. Tell us your goal — Nura handles
            the planning, the portions, and the cooking.
          </p>
        </div>

        {/* ── Steps grid ──────────────────────────────────────────────── */}
        <div ref={stepsRef} className="relative" style={{ marginBottom: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}>

          <div className="nura-grid-3">
            {steps.map((step) => (
              <div key={step.number} className="sc step-card">

                {/* Icon circle + duration */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="step-number"
                    style={{
                      background: `${step.accent}16`,
                      border: `1px solid ${step.accent}3a`,
                    }}
                  >
                    <div style={{ color: step.accent }}>{step.icon}</div>
                  </div>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '0.20rem 0.60rem',
                    borderRadius: '100px',
                    background: 'rgba(255,248,232,0.06)',
                    color: 'rgba(255,248,232,0.38)',
                    border: '1px solid rgba(255,248,232,0.08)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    fontFamily: 'var(--font-inter), sans-serif',
                  }}>
                    {step.duration}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="label-sm mb-1.5" style={{ color: 'rgba(255,248,232,0.32)', fontSize: '0.58rem' }}>
                  {step.subtitle}
                </p>

                {/* Title */}
                <h3
                  className="font-display font-medium leading-[1.2] mb-3"
                  style={{ fontSize: 'clamp(1.08rem, 2vw, 1.42rem)', color: 'var(--nb-cream)' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,248,232,0.46)', lineHeight: 1.72 }}>
                  {step.desc}
                </p>

                {/* Step number label */}
                <div className="mt-5 font-display font-semibold" style={{ fontSize: '0.70rem', color: step.accent, letterSpacing: '0.10em' }}>
                  Step {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            className="btn btn-cream"
            onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Help Us Build Nura
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Atmospheric bottom bridge — bleeds into Features section */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: '64px',
          background: 'linear-gradient(to top, rgba(24,21,14,0.08) 0%, transparent 100%)',
          zIndex: 1,
        }}
      />
    </section>
  )
}
