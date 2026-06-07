'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── SVG icon set ───────────────────────────────────────────────────────── */
const PillarIcons = {
  body: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" />
      <path d="M5 20a7 7 0 0114 0" />
      <path d="M3 10l1.5 1.5M21 10l-1.5 1.5M12 4V2" />
    </svg>
  ),
  consistent: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-2.64-6.36" />
      <path d="M21 3v5h-5" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  priced: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12M6 8h12M6 13l8 8M6 8a4 4 0 000 5h3" />
    </svg>
  ),
}

const pillars = [
  {
    icon: PillarIcons.body,
    title: 'Built Around Your Body',
    desc: 'Whether you track macros closely or just want the right portions, every meal is designed for you.',
    accent: '#5a6c48',
  },
  {
    icon: PillarIcons.consistent,
    title: 'Consistent Without Effort',
    desc: 'No meal prep Sundays, no calorie counting apps, no giving up by Thursday.',
    accent: '#8da674',
  },
  {
    icon: PillarIcons.priced,
    title: 'Priced for Every Day',
    desc: 'Built to be your daily meals, not a luxury splurge.',
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

/* ─── SVG icons for the meal-snapshot stats row ──────────────────────────── */
const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a9 9 0 100 18A9 9 0 0012 2z"/>
    <path d="M12 7v5l3 2"/>
  </svg>
)
const ProteinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6.5" y1="12" x2="17.5" y2="12"/><rect x="3.5" y="8" width="3" height="8" rx="1.5"/><rect x="17.5" y="8" width="3" height="8" rx="1.5"/>
  </svg>
)
const DeliveryIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
  </svg>
)

/* ─── Nura Meal Snapshot Card ─────────────────────────────────────────────── */
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
    { icon: <CalIcon />,      value: '480',   label: 'kcal / meal', color: 'var(--nb-olive)' },
    { icon: <ProteinIcon />,  value: '7g',    label: 'Protein',     color: '#c28c48'         },
    { icon: <DeliveryIcon />, value: 'Daily', label: 'Delivered',   color: '#8da674'         },
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
            A Nura Meal
          </p>
          <h3 style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--nb-heading)', lineHeight: 1.2 }}>
            Designed Around Your Goal
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
          Built for You
        </div>
      </div>

      {/* Macros */}
      <div className="nc-item" style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--nb-border2)' }}>
        <p style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--nb-muted)', marginBottom: '0.85rem' }}>
          This Meal’s Macros
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <MacroBar label="Protein"       pct={6}  color="var(--nb-olive)" value="7g"  />
          <MacroBar label="Carbohydrates" pct={74} color="var(--nb-amber)" value="86g" />
          <MacroBar label="Healthy Fats"  pct={20} color="var(--nb-terra)" value="10g" />
        </div>
      </div>

      {/* Key ingredients */}
      <div className="nc-item" style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--nb-border2)' }}>
        <p style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--nb-muted)', marginBottom: '0.85rem' }}>
          What’s In It
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

      {/* Meal stats row */}
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

/* ─── What Nura Does ──────────────────────────────────────────────────────── */
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
              <span className="label-sm text-nb-olive">What We Do</span>
            </div>

            <div ref={titleRef}>
              {[
                { text: 'You focus on', color: 'var(--nb-heading)', italic: false },
                { text: 'your goals.',  color: 'var(--nb-heading)', italic: false },
                { text: 'We’ll handle the food.', color: 'var(--nb-olive)', italic: true },
              ].map(({ text, color, italic }, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <div
                    className="rl font-display font-medium"
                    style={{
                      fontSize: 'clamp(1.9rem, 4.2vw, 4rem)',
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

            <p
              className="nura-prose text-nb-body leading-[1.76]"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
            >
              Tell us what you’re working toward — losing weight, building muscle,
              managing a health condition, or just eating right without the guesswork.
              Nura designs every meal around what your body specifically needs.
            </p>

            {/* The three benefits */}
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
                Help Us Build Nura
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Right: meal snapshot card ─────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <NutritionCard />
          </div>

        </div>
      </div>
    </section>
  )
}
