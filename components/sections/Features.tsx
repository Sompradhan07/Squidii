'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Feature SVG icons ──────────────────────────────────────────────────── */
const GoalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
)
const PortionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" /><path d="M12 13L12 5M12 13l5.5 5.5" /><path d="M4 13a8 8 0 0116 0" />
  </svg>
)
const ChronoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 3.5" />
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
const RupeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4h12M6 8.5h12M6 13l8 7M6 8.5a4 4 0 010 5h3" />
  </svg>
)
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const features = [
  { icon: <GoalIcon />,    title: 'Built Around Your Goal', desc: 'Every meal is designed for fat loss, muscle, managing a condition — whatever you’re actually working toward.',          tag: 'Core',      accent: '#5a6c48' },
  { icon: <PortionIcon />, title: 'The Right Portions',     desc: 'Whether you track macros closely or just want the right amount on your plate, your portions are handled for you.',     tag: 'Core',      accent: '#8da674' },
  { icon: <ChronoIcon />,  title: 'No Planning Required',   desc: 'No meal-prep Sundays, no calorie-tracking apps, no deciding what to eat by Thursday. We take the deciding off your plate.', tag: 'Effortless', accent: '#c28c48' },
  { icon: <MacroIcon />,   title: 'Macros That Match',      desc: 'Protein, carbs, and fats balanced to your body and your goal — without you ever doing the math.',                       tag: 'Precision', accent: '#5a6c48' },
  { icon: <RupeeIcon />,   title: 'Priced for Every Day',   desc: 'Built to be your daily meals, not a luxury splurge. Real, goal-aligned food at an everyday price.',                     tag: 'Everyday',  accent: '#c07458' },
  { icon: <PinIcon />,     title: 'Made for Bengaluru',     desc: 'We’re launching city by city — cooked fresh and built for how people here actually eat and live.',                      tag: 'Local',     accent: '#8da674' },
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
            <span className="label-sm text-nb-olive">Why Nura</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <h2
              className="ri font-display font-medium tracking-[-0.022em] leading-none text-nb-heading"
              style={{ fontSize: 'clamp(1.85rem, 4.5vw, 4.4rem)', maxWidth: '20ch' }}
            >
              Everything handled,{' '}
              <span className="text-nb-olive italic">so you don’t have to.</span>
            </h2>
            <p
              className="ri nura-prose text-nb-body leading-[1.74]"
              style={{ fontSize: 'clamp(0.88rem,1.18vw,0.98rem)' }}
            >
              From your goal to your plate, Nura takes care of the parts that make
              eating right hard to keep up — so you can just eat well and get on with your day.
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
