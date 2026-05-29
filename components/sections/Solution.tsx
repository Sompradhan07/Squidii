'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── SVG icon set — replaces unprofessional geometric chars ─────────────── */
const PillarIcons = {
  body: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M5 20a7 7 0 0114 0" />
      <path d="M3 10l1.5 1.5M21 10l-1.5 1.5M12 4V2" />
    </svg>
  ),
  adapt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 018-8" />
      <path d="M20 12a8 8 0 01-8 8" />
      <path d="M12 4L9.5 6.5 12 9" />
      <path d="M12 20l2.5-2.5L12 15" />
    </svg>
  ),
  precision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
}

const pillars = [
  {
    icon: PillarIcons.body,
    title: 'Body Intelligence',
    desc: 'Nura analyzes your unique metabolism, biomarkers, and body composition to understand how you specifically process nutrients.',
    accent: '#5a6c48',
  },
  {
    icon: PillarIcons.adapt,
    title: 'Dynamic Adaptation',
    desc: 'Your blueprint evolves with you — adjusting in real time for activity, sleep, stress, and life changes.',
    accent: '#8da674',
  },
  {
    icon: PillarIcons.precision,
    title: 'Precision Nourishment',
    desc: 'Exact macros, micros, and meal timing — calibrated to your biology, not a population average.',
    accent: '#c28c48',
  },
]

/* ─── Macro bar ───────────────────────────────────────────────────────────── */
function MacroBar({ label, pct, color, value }: {
  label: string; pct: number; color: string; value: string
}) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.05, ease: 'power3.out', delay: 0.35,
          scrollTrigger: { trigger: barRef.current, start: 'top 90%' } },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.38rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--nb-heading)' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color }}>
          {value}{' '}
          <span style={{ fontWeight: 400, color: 'var(--nb-muted)', fontSize: '0.70rem' }}>({pct}%)</span>
        </span>
      </div>
      <div style={{ height: '5px', background: 'var(--nb-border)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: `${pct}%`,
            background: color,
            borderRadius: '3px',
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  )
}

/* ─── SVG icons replacing emoji in stats row ─────────────────────────────── */
const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a9 9 0 100 18A9 9 0 0012 2z"/>
    <path d="M12 7v5l3 2"/>
  </svg>
)
const WaterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 7 5 11 5 14.5a7 7 0 0014 0C19 11 16 7 12 2z"/>
  </svg>
)
const SleepIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
)

/* ─── Nutrition Blueprint Card ────────────────────────────────────────────── */
function NutritionCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current?.querySelectorAll('.nc-item') ?? [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 84%' } },
      )
    })
    return () => ctx.revert()
  }, [])

  const ingredients = [
    { dot: '#f0d648', name: 'Banana slices',      benefit: 'Natural energy + potassium' },
    { dot: '#bf1826', name: 'Fresh strawberries',  benefit: 'Vitamin C + antioxidants'  },
    { dot: '#1a0c3e', name: 'Blueberries',         benefit: 'Brain health + fiber'       },
    { dot: '#c88000', name: 'Raw honey',            benefit: 'Anti-inflammatory enzymes'  },
    { dot: '#b87830', name: 'Granola & oats',       benefit: 'Slow-release carbohydrates' },
    { dot: '#2a7630', name: 'Fresh mint',           benefit: 'Digestion + micronutrients' },
  ]

  const dailyStats = [
    { icon: <CalIcon />,   value: '1,840', label: 'kcal / day',  color: 'var(--nb-olive)' },
    { icon: <WaterIcon />, value: '2.4L',  label: 'Hydration',   color: '#4e9cc4'          },
    { icon: <SleepIcon />, value: '8h',    label: 'Sleep goal',  color: '#8a6cc8'          },
  ]

  return (
    <div
      ref={cardRef}
      style={{
        background: 'var(--nb-card)',
        border: '1px solid var(--nb-border)',
        borderRadius: '22px',
        overflow: 'hidden',
        boxShadow: '0 6px 36px rgba(44,40,34,0.09)',
      }}
    >
      {/* Card header */}
      <div
        className="nc-item"
        style={{
          background: 'linear-gradient(135deg, rgba(90,108,72,0.07) 0%, rgba(194,140,72,0.04) 100%)',
          padding: '1.2rem 1.5rem',
          borderBottom: '1px solid var(--nb-border2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div>
          <p style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--nb-olive)', marginBottom: '0.2rem' }}>
            Your Blueprint
          </p>
          <h3 style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--nb-heading)', lineHeight: 1.2 }}>
            Personalized Nutrition Snapshot
          </h3>
        </div>
        <div style={{
          padding: '0.28rem 0.72rem',
          background: 'rgba(90,108,72,0.09)',
          borderRadius: '100px',
          fontSize: '0.64rem',
          fontWeight: 700,
          color: 'var(--nb-olive)',
          border: '1px solid rgba(90,108,72,0.18)',
          whiteSpace: 'nowrap',
        }}>
          Generated for You
        </div>
      </div>

      {/* Macros */}
      <div className="nc-item" style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--nb-border2)' }}>
        <p style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--nb-muted)', marginBottom: '0.85rem' }}>
          Daily Macro Targets
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <MacroBar label="Protein"       pct={32} color="var(--nb-olive)" value="142g" />
          <MacroBar label="Carbohydrates" pct={45} color="var(--nb-amber)" value="202g" />
          <MacroBar label="Healthy Fats"  pct={23} color="var(--nb-terra)" value="57g"  />
        </div>
      </div>

      {/* Key ingredients */}
      <div className="nc-item" style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--nb-border2)' }}>
        <p style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--nb-muted)', marginBottom: '0.85rem' }}>
          Today's Key Ingredients
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {ingredients.map((ing) => (
            <div key={ing.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: ing.dot, flexShrink: 0, marginTop: '0.3rem' }} />
              <div>
                <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--nb-heading)', lineHeight: 1.25 }}>{ing.name}</div>
                <div style={{ fontSize: '0.66rem', color: 'var(--nb-muted)', lineHeight: 1.35 }}>{ing.benefit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily stats row — SVG icons replace emoji */}
      <div className="nc-item" style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem' }}>
        {dailyStats.map((s) => (
          <div
            key={s.label}
            style={{
              textAlign: 'center',
              padding: '0.72rem 0.5rem',
              background: 'var(--nb-bg)',
              borderRadius: '12px',
            }}
          >
            <div style={{ color: s.color, marginBottom: '0.18rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--nb-heading)', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--nb-muted)', marginTop: '0.15rem' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Solution section ────────────────────────────────────────────────────── */
export default function Solution() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const pillarsRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.rl') ?? [],
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.92, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%' } },
      )
      gsap.fromTo(
        pillarsRef.current?.querySelectorAll('.pl') ?? [],
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.70, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 82%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="solution" ref={sectionRef} style={{ background: 'var(--nb-bg)' }}>
      <div className="nura-c nura-section">
        <div className="nura-grid-2">

          {/* ── Left: content ────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div className="nura-label-row">
              <div className="line-olive" />
              <span className="label-sm text-nb-olive">The Nura Solution</span>
            </div>

            <div ref={titleRef}>
              {[
                { text: 'Finally.',              color: 'var(--nb-muted)',   italic: false },
                { text: 'Nutrition that',        color: 'var(--nb-heading)', italic: false },
                { text: 'truly knows you.',      color: 'var(--nb-olive)',   italic: true  },
              ].map(({ text, color, italic }, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <div
                    className="rl font-display font-medium"
                    style={{
                      fontSize: 'clamp(2rem, 4.5vw, 4.4rem)',
                      lineHeight: 0.94,
                      letterSpacing: '-0.022em',
                      marginBottom: '0.08em',
                      color,
                      fontStyle: italic ? 'italic' : undefined,
                    }}
                  >
                    {text}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="nura-prose text-nb-body leading-[1.76]"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
            >
              Nura doesn't just track what you eat — it understands who you are.
              Your metabolism, lifestyle, and goals become the foundation of a
              nutritional system that actually works for your body.
            </p>

            {/* Pillars — SVG icons, hover state, clean rows */}
            <div ref={pillarsRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pillars.map((p) => (
                <div key={p.title} className="pl pillar-row">
                  <div
                    className="feat-icon-box"
                    style={{ background: `${p.accent}12`, color: p.accent }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--nb-heading)', marginBottom: '0.2rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--nb-body)', lineHeight: 1.66 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                className="btn btn-olive"
                onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Build My Blueprint
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Right: Nutrition card ─────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <NutritionCard />
          </div>

        </div>
      </div>
    </section>
  )
}
