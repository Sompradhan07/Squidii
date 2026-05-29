'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const chaos = [
  'Macro counting', 'Conflicting advice', 'Generic plans',
  'Food guilt', 'Energy crashes', 'Calorie obsession',
  'Endless supplements', 'Yo-yo diets',
]

const stats = [
  { value: '73%',  label: 'of people feel lost about what to eat', accent: 'var(--nb-olive)' },
  { value: '86%',  label: "of diets fail because they're generic",  accent: 'var(--nb-amber)' },
  { value: '4.2h', label: 'spent weekly researching nutrition',     accent: 'var(--nb-terra)' },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)

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
        cardsRef.current?.querySelectorAll('.cw') ?? [],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.40, stagger: 0.045, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } },
      )
      gsap.fromTo(
        statsRef.current?.querySelectorAll('.si') ?? [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.70, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 84%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="problem" ref={sectionRef} className="bg-nb-bg2">
      <div className="divider-gradient" />
      <div className="nura-c nura-section">
        <div className="nura-grid-2">

          {/* ── Left: text + chaos tags ──────────────────────────────── */}
          <div className="flex flex-col gap-7">
            <div className="nura-label-row">
              <div className="line-olive" />
              <span className="label-sm text-nb-olive">The Problem</span>
            </div>

            <div ref={titleRef}>
              {[
                { text: "You're eating.",   color: 'var(--nb-heading)', italic: false },
                { text: 'But are you',      color: 'var(--nb-muted)',   italic: false },
                { text: 'truly nourished?', color: 'var(--nb-olive)',   italic: true  },
              ].map(({ text, color, italic }, i) => (
                <div key={i} className="overflow-hidden">
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
              className="nura-prose text-nb-body leading-[1.74]"
              style={{ fontSize: 'clamp(0.88rem, 1.18vw, 0.98rem)' }}
            >
              Modern nutrition is broken. We're overwhelmed by conflicting advice,
              generic plans, and solutions designed for everyone — which means
              they work for{' '}
              <em className="text-nb-heading not-italic font-semibold">no one</em>.
            </p>

            {/* Chaos tags */}
            <div ref={cardsRef} className="flex flex-wrap gap-[0.4rem]">
              {chaos.map((word) => (
                <span
                  key={word}
                  className="cw inline-flex items-center px-[0.82rem] py-[0.28rem] rounded-full bg-nb-card border border-nb-border text-nb-body font-medium cursor-default transition-all duration-200 hover:border-nb-border-warm hover:text-nb-heading"
                  style={{ fontSize: '0.74rem' }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: stat cards ────────────────────────────────────── */}
          <div ref={statsRef} className="flex flex-col gap-3.5">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="si stat-card-accent flex items-center gap-5"
                style={{ borderLeftColor: stat.accent }}
              >
                <div
                  className="font-display font-semibold leading-none shrink-0"
                  style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)', color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-nb-body leading-[1.62]"
                  style={{ fontSize: 'clamp(0.84rem, 1.05vw, 0.90rem)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Pull quote */}
            <div
              className="nb-card-warm rounded-2xl"
              style={{ padding: 'clamp(1.15rem, 2.2vw, 1.6rem)', marginTop: '0.25rem' }}
            >
              <p
                className="font-display font-medium text-nb-heading leading-[1.52] italic"
                style={{ fontSize: 'clamp(0.96rem, 1.7vw, 1.16rem)' }}
              >
                "Generic nutrition advice treats everyone the same.
                Your biology doesn't."
              </p>
              <p className="mt-2.5 text-nb-muted font-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>
                — Nura Research Team
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="divider-gradient" />
    </section>
  )
}
