'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Pillar icons ───────────────────────────────────────────────────────── */
const PillarIcons = {
  body: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3" /><path d="M5 20a7 7 0 0114 0" /><path d="M3 10l1.5 1.5M21 10l-1.5 1.5M12 4V2" />
    </svg>
  ),
  consistent: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-2.64-6.36" /><path d="M21 3v5h-5" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  priced: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12M6 8h12M6 13l8 8M6 8a4 4 0 000 5h3" />
    </svg>
  ),
}

const pillars = [
  {
    icon: PillarIcons.body,
    title: 'Built Around Your Body',
    desc: 'Whether you track macros closely or just want the right portions, every meal is designed for you.',
    bg: 'rgba(90,108,72,0.1)',
    accent: '#5a6c48',
  },
  {
    icon: PillarIcons.consistent,
    title: 'Consistent Without Effort',
    desc: 'No meal prep Sundays, no calorie counting apps, no giving up by Thursday.',
    bg: 'rgba(141,166,116,0.16)',
    accent: '#8da674',
  },
  {
    icon: PillarIcons.priced,
    title: 'Priced for Every Day',
    desc: 'Built to be your daily meals, not a luxury splurge.',
    bg: 'rgba(194,140,72,0.14)',
    accent: '#c28c48',
  },
]

/* ─── Ingredient spec card — dark, premium ───────────────────────────────── */
const ingredients = [
  { dot: '#f0d648', name: 'Banana slices',  benefit: 'Natural energy + potassium'  },
  { dot: '#e0556a', name: 'Strawberries',   benefit: 'Vitamin C + antioxidants'    },
  { dot: '#7a5cc0', name: 'Blueberries',    benefit: 'Brain health + fiber'        },
  { dot: '#d99a3a', name: 'Raw honey',      benefit: 'Anti inflammatory enzymes'   },
  { dot: '#b87830', name: 'Granola & oats', benefit: 'Slow release carbs'          },
  { dot: '#4f9d4f', name: 'Fresh mint',     benefit: 'Digestion + micronutrients'  },
]

const dailyStats = [
  { value: '480',   label: 'kcal'      },
  { value: '7g',    label: 'Protein'   },
  { value: 'Daily', label: 'Delivered' },
]

function IngredientCard() {
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

  return (
    <div
      ref={cardRef}
      style={{ background: 'var(--nb-dark2)', borderRadius: 30, overflow: 'hidden', boxShadow: '0 34px 70px -30px rgba(28,24,17,0.6)' }}
    >
      {/* Header */}
      <div className="nc-item flex items-center justify-between" style={{ padding: '26px 28px', borderBottom: '2px solid rgba(255,255,255,0.07)', gap: 14 }}>
        <div>
          <div className="uppercase" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', color: 'var(--nb-amber)' }}>A Squidii Meal</div>
          <div className="font-display font-semibold text-nb-cream" style={{ fontSize: '1.2rem', lineHeight: 1.15, marginTop: 4 }}>Designed around your goal</div>
        </div>
        <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--nb-dark2)', background: 'var(--nb-sage)', padding: '7px 13px', borderRadius: 100, whiteSpace: 'nowrap' }}>Built for you</span>
      </div>

      {/* Ingredients */}
      <div className="nc-item" style={{ padding: '26px 28px' }}>
        <div className="uppercase" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,248,232,0.5)', marginBottom: 16 }}>What&rsquo;s in it</div>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '14px 18px' }}>
          {ingredients.map((ing) => (
            <div key={ing.name} className="flex items-start" style={{ gap: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: ing.dot, marginTop: 5, flex: 'none' }} />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--nb-cream)' }}>{ing.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,248,232,0.45)' }}>{ing.benefit}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 26, paddingTop: 24, borderTop: '2px solid rgba(255,255,255,0.07)' }}>
          {dailyStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-semibold text-nb-cream" style={{ fontSize: '1.8rem', lineHeight: 0.9 }}>{s.value}</div>
              <div className="uppercase" style={{ fontSize: '0.6rem', color: 'rgba(255,248,232,0.45)', marginTop: 6, letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── What Squidii Does ───────────────────────────────────────────────────── */
export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

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
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.70, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 84%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="solution" ref={sectionRef} style={{ background: 'var(--nb-bg)', scrollMarginTop: 72 }}>
      <div className="squidii-c squidii-section">
        <div className="squidii-grid-2">

          {/* ── Left: content ────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div className="squidii-label-row">
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
              className="squidii-prose text-nb-body leading-[1.76]"
              style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
            >
              Tell us what you’re working toward: losing weight, building muscle,
              managing a health condition, or just eating right without the guesswork.
              Squidii designs every meal around what your body specifically needs.
            </p>

            {/* The three benefits — bordered cards */}
            <div ref={pillarsRef} className="flex flex-col" style={{ gap: 14 }}>
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="pl flex items-start"
                  style={{ gap: 18, background: '#ffffff', border: '2px solid rgba(44,40,34,0.07)', borderRadius: 18, padding: '20px 22px' }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 48, height: 48, borderRadius: 14, background: p.bg, color: p.accent, flex: 'none' }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--nb-heading)', margin: '0 0 4px' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--nb-body)', margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: ingredient spec card ───────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <IngredientCard />
          </div>

        </div>
      </div>
    </section>
  )
}
