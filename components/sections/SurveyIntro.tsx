'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const tags = ['Your city', 'Your work', 'Your goal', 'Your habits', 'Your budget', 'Early access']

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
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#5a6c48', padding: 'clamp(4.5rem,9vw,8rem) clamp(1.25rem,4vw,3.5rem)', scrollMarginTop: 72 }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute pointer-events-none" style={{ top: '-15%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(194,140,72,0.3), transparent 64%)', filter: 'blur(20px)' }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ bottom: '-25%', left: '-10%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,18,12,0.22), transparent 66%)', filter: 'blur(24px)' }} />

      <div
        ref={innerRef}
        className="relative z-[2] text-center"
        style={{ maxWidth: 760, margin: '0 auto' }}
      >
        {/* Kicker */}
        <div className="ri inline-flex items-center gap-2.5" style={{ marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e6c99a' }} />
          <span className="label-sm" style={{ color: '#e6c99a' }}>Shape Squidii</span>
        </div>

        {/* Headline */}
        <h2
          className="ri font-display font-semibold text-nb-cream"
          style={{ fontSize: 'clamp(2.8rem,6.4vw,6.2rem)', lineHeight: 0.92, letterSpacing: '-0.025em', margin: 0 }}
        >
          Help us<br />
          <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#e6c99a' }}>build Squidii</span>
        </h2>

        {/* Body */}
        <p
          className="ri"
          style={{ fontSize: 'clamp(1rem,1.3vw,1.18rem)', lineHeight: 1.7, color: 'rgba(253,248,240,0.82)', margin: '24px auto 0', maxWidth: '42ch' }}
        >
          We&rsquo;re building Squidii right now. This 2-minute survey shapes what
          Squidii becomes. Your honest answers decide what we build first.
        </p>

        {/* Meta stats */}
        <div className="ri flex flex-wrap justify-center items-stretch" style={{ gap: 'clamp(2rem,5vw,4rem)', marginTop: 40 }}>
          {[
            { value: '11',    label: 'Questions' },
            { value: '2 min', label: 'Duration'  },
            { value: '100%',  label: 'Honest'    },
          ].map((item, i) => (
            <div key={item.label} className="flex items-stretch" style={{ gap: 'clamp(2rem,5vw,4rem)' }}>
              {i > 0 && <div style={{ width: 2, background: 'rgba(253,248,240,0.2)' }} />}
              <div>
                <div className="font-display font-semibold text-nb-cream leading-none" style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)' }}>{item.value}</div>
                <div className="uppercase" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(253,248,240,0.6)', marginTop: 8 }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="ri" style={{ marginTop: 40 }}>
          <button
            className="btn btn-cream"
            style={{ padding: '1.2rem 2.6rem' }}
            onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Help Us Build Squidii
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ fontSize: '0.76rem', color: 'rgba(253,248,240,0.6)', marginTop: 16 }}>
            No spam · No sign ups · Just honest answers
          </p>
        </div>

        {/* What the survey covers — glass pills */}
        <div className="ri" style={{ marginTop: 44, paddingTop: 32, borderTop: '2px solid rgba(253,248,240,0.18)' }}>
          <div className="uppercase" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(253,248,240,0.55)', marginBottom: 18 }}>
            What the survey covers
          </div>
          <div className="flex flex-wrap justify-center" style={{ gap: 10 }}>
            {tags.map((t) => (
              <span
                key={t}
                className="text-nb-cream"
                style={{ background: 'rgba(253,248,240,0.12)', border: '1px solid rgba(253,248,240,0.2)', fontSize: '0.78rem', fontWeight: 600, padding: '9px 16px', borderRadius: 100 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
