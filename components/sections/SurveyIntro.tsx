'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Signal SVG icons ───────────────────────────────────────────────────── */
const signals = [
  {
    label: 'Your city',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Your work',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    label: 'Your goal',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Your habits',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 3.5" />
      </svg>
    ),
  },
  {
    label: 'Your budget',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12M6 8h12M6 12l7 8M6 8a4 4 0 010 5h3" />
      </svg>
    ),
  },
  {
    label: 'Early access',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
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
            <span className="label-sm text-nb-olive">Shape Nura</span>
            <div className="line-olive" />
          </div>

          {/* Headline */}
          <h2
            className="ri font-display font-medium tracking-[-0.026em] leading-[0.95] text-nb-heading"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.6rem)' }}
          >
            Help us<br />
            <span className="text-nb-olive italic">build Nura</span>
          </h2>

          {/* Body */}
          <p
            className="ri text-nb-body leading-[1.76]"
            style={{ fontSize: 'clamp(0.88rem,1.18vw,0.98rem)', maxWidth: '38ch' }}
          >
            We&rsquo;re building this in Bengaluru. This 2-minute survey shapes
            what Nura becomes — your honest answers decide what we build first.
          </p>

          {/* Meta stats */}
          <div
            className="ri flex flex-wrap justify-center"
            style={{ gap: 'clamp(1.5rem, 4vw, 3.5rem)' }}
          >
            {[
              { value: '10',    label: 'Questions' },
              { value: '2 min', label: 'Duration'  },
              { value: '100%',  label: 'Anonymous' },
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
              Help Us Build Nura
              <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-nb-subtle" style={{ fontSize: '0.72rem' }}>
              No spam · No sign-ups · Just honest answers
            </p>
          </div>

          {/* Signals — premium glass pills */}
          <div
            className="ri border-t border-nb-border w-full"
            style={{ paddingTop: '1.625rem' }}
          >
            <p className="label-sm text-nb-muted mb-4" style={{ fontSize: '0.60rem' }}>
              What the survey covers
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
