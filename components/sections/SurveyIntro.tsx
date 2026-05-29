'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Signal SVG icons ───────────────────────────────────────────────────── */
const signals = [
  {
    label: 'Metabolic type',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2 12 5 7 8 13 11 9 14 14 17 6 20 12" />
      </svg>
    ),
  },
  {
    label: 'Gut health',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3C8.5 6.5 6 9.5 6 13a6 6 0 0012 0c0-3.5-2.5-6.5-6-10z" />
      </svg>
    ),
  },
  {
    label: 'Activity patterns',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <path d="M5 22l3-8 2 4 2-6 2 4 2-4 3 10" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Stress response',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 015 5c0 4-5 8-5 8S7 11 7 7a5 5 0 015-5z" />
        <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Sleep quality',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
  {
    label: 'Food relationships',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
]

export default function SurveyIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current?.querySelectorAll('.ri') ?? [],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.86, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: innerRef.current, start: 'top 82%' } },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-nb-bg relative">
      <div className="divider-gradient" />
      <div className="nura-c nura-section">

        {/* Centred editorial block — max 680px */}
        <div
          ref={innerRef}
          className="flex flex-col items-center text-center"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            gap: 'clamp(1.15rem, 2.2vw, 1.875rem)',
          }}
        >
          {/* Kicker */}
          <div className="ri flex items-center gap-3">
            <div className="line-olive" />
            <span className="label-sm text-nb-olive">Your Journey Begins</span>
            <div className="line-olive" />
          </div>

          {/* Headline */}
          <h2
            className="ri font-display font-medium tracking-[-0.026em] leading-[0.95] text-nb-heading"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.6rem)' }}
          >
            Discover your<br />
            <span className="text-nb-olive italic">nutritional blueprint</span>
          </h2>

          {/* Body */}
          <p
            className="ri text-nb-body leading-[1.76]"
            style={{ fontSize: 'clamp(0.88rem,1.18vw,0.98rem)', maxWidth: '38ch' }}
          >
            11 precise questions. Infinite personalization.
            Your complete nutritional identity revealed in 3 minutes.
          </p>

          {/* Meta stats */}
          <div
            className="ri flex flex-wrap justify-center"
            style={{ gap: 'clamp(1.5rem, 4vw, 3.5rem)' }}
          >
            {[
              { value: '11',    label: 'Questions'       },
              { value: '3 min', label: 'Duration'        },
              { value: '∞',     label: 'Personalization' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className="font-display font-semibold text-nb-heading leading-none"
                  style={{ fontSize: 'clamp(1.2rem, 2.6vw, 1.8rem)' }}
                >
                  {item.value}
                </div>
                <div className="text-nb-muted mt-[0.3rem]" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="ri flex flex-col items-center gap-3 w-full">
            <button
              className="btn btn-olive w-full"
              style={{ maxWidth: '290px' }}
              onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Begin My Assessment
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-nb-subtle" style={{ fontSize: '0.72rem' }}>
              Free forever · No account required · Instant results
            </p>
          </div>

          {/* Signals — premium glass pills */}
          <div
            className="ri border-t border-nb-border w-full"
            style={{ paddingTop: '1.625rem' }}
          >
            <p className="label-sm text-nb-muted mb-4" style={{ fontSize: '0.60rem' }}>
              What Nura reads about you
            </p>
            <div className="flex flex-wrap justify-center gap-[0.45rem]">
              {signals.map((s) => (
                <div key={s.label} className="signal-pill">
                  <span className="text-nb-olive">{s.icon}</span>
                  <span className="text-nb-body font-semibold" style={{ fontSize: '0.74rem' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="divider-gradient" />
    </section>
  )
}
