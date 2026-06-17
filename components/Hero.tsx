'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Hero ──────────────────────────────────────────────────────────────────
   Two-column statement: editorial copy on the left, a "meal ticket" card on
   the right showing a real Squidii bowl with its macro breakdown.            */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          sectionRef.current?.querySelectorAll('[data-reveal]') ?? [],
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            stagger: 0.08, delay: 0.05,
          },
        )
      }
      /* Macro bars grow from the left */
      sectionRef.current?.querySelectorAll('[data-bar]').forEach((bar, i) => {
        gsap.fromTo(bar,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left', duration: 1, delay: 0.4 + i * 0.1, ease: 'power3.out' },
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const macros = [
    { label: 'Protein',       value: '7g',  pct: '6%',  bar: 18, color: 'var(--nb-olive)' },
    { label: 'Carbohydrates', value: '86g', pct: '74%', bar: 74, color: 'var(--nb-amber)' },
    { label: 'Healthy fats',  value: '10g', pct: '20%', bar: 34, color: 'var(--nb-terra)' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-nb-bg"
      style={{ padding: 'clamp(5rem,9vh,7rem) clamp(1.25rem,4vw,3.5rem) clamp(3rem,6vh,5rem)' }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute pointer-events-none" style={{ top: '-10%', right: '-8%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(194,140,72,0.16), transparent 62%)', filter: 'blur(30px)' }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ bottom: '-20%', left: '-12%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,108,72,0.12), transparent 64%)', filter: 'blur(34px)' }} />

      <div
        className="relative z-[2] mx-auto items-center"
        style={{
          maxWidth: 1320,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(2rem,4vw,4.5rem)',
        }}
      >
        {/* ── Left: copy ─────────────────────────────────────────────── */}
        <div>
          <div data-reveal className="inline-flex items-center gap-2.5 mb-7" style={{ padding: '8px 16px', border: '1.5px solid rgba(90,108,72,0.28)', borderRadius: 100, background: 'rgba(90,108,72,0.05)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5a6c48', animation: 'pulseDot 2.2s infinite' }} />
            <span className="label-sm text-nb-olive">Launching soon</span>
          </div>

          <h1 data-reveal className="font-display font-semibold text-nb-heading" style={{ fontSize: 'clamp(3.4rem,7.4vw,7.4rem)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>
            Eating right<br />
            <span className="text-nb-olive" style={{ fontStyle: 'italic', fontWeight: 500 }}>is simple.</span>
          </h1>

          <p data-reveal className="font-display text-nb-heading" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.3rem,2.3vw,1.9rem)', lineHeight: 1.3, margin: '1.6rem 0 0' }}>
            Doing it every single day? That&rsquo;s the hard part.
          </p>
          <p data-reveal className="text-nb-body" style={{ fontSize: 'clamp(1rem,1.2vw,1.12rem)', lineHeight: 1.7, margin: '1rem 0 0', maxWidth: '46ch' }}>
            Squidii delivers meals designed around your body and your goals, so you
            don&rsquo;t have to plan, calculate, or compromise.
          </p>

          <div data-reveal className="flex flex-wrap gap-3" style={{ marginTop: '2.1rem' }}>
            <button
              className="btn btn-olive"
              onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Help Us Build Squidii
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the problem
            </button>
          </div>

          <div data-reveal className="flex flex-wrap items-stretch" style={{ gap: 'clamp(1.25rem,3vw,3rem)', marginTop: '2.75rem', paddingTop: '1.875rem', borderTop: '2px solid rgba(44,40,34,0.1)' }}>
            {[
              { value: '100%',  label: 'Personalized'    },
              { value: '2 min', label: 'To shape Squidii' },
              { value: 'Daily', label: 'Not a splurge'    },
            ].map((s, i) => (
              <div key={s.value} className="flex items-stretch" style={{ gap: 'clamp(1.25rem,3vw,3rem)' }}>
                {i > 0 && <div style={{ width: 2, background: 'rgba(44,40,34,0.1)' }} />}
                <div>
                  <div className="font-display font-semibold text-nb-heading leading-none" style={{ fontSize: 'clamp(2rem,3.4vw,2.9rem)' }}>{s.value}</div>
                  <div className="text-nb-muted uppercase" style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.04em', marginTop: 8 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: meal ticket card ────────────────────────────────── */}
        <div data-reveal className="relative">
          <div aria-hidden className="absolute" style={{ inset: -22, background: 'radial-gradient(60% 56% at 50% 42%, rgba(194,140,72,0.2), transparent 68%)', filter: 'blur(20px)' }} />
          <div className="relative" style={{ background: '#ffffff', border: '2px solid rgba(44,40,34,0.1)', borderRadius: 30, overflow: 'hidden', boxShadow: '0 34px 70px -28px rgba(44,40,34,0.4)' }}>

            {/* Dark header */}
            <div className="flex items-center justify-between" style={{ background: 'var(--nb-dark2)', padding: '22px 26px' }}>
              <div>
                <div className="uppercase" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--nb-amber)' }}>Today&rsquo;s Squidii</div>
                <div className="font-display font-semibold text-nb-cream" style={{ fontSize: '1.2rem', lineHeight: 1.15, marginTop: 4 }}>Built around your goal</div>
              </div>
              <span style={{ fontSize: '0.64rem', fontWeight: 700, color: 'var(--nb-dark2)', background: 'var(--nb-amber)', padding: '7px 13px', borderRadius: 100, whiteSpace: 'nowrap' }}>For you</span>
            </div>

            {/* Photo */}
            <div aria-hidden style={{ position: 'relative', height: 200, borderBottom: '2px solid rgba(44,40,34,0.08)', overflow: 'hidden' }}>
              <Image
                src="https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?auto=format&fit=crop&w=1200&q=90"
                alt="A fresh Squidii bowl"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>

            {/* Macros + stats */}
            <div style={{ padding: '24px 26px' }}>
              <div className="uppercase text-nb-muted" style={{ fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.14em', marginBottom: 16 }}>This meal&rsquo;s macros</div>

              <div className="flex flex-col" style={{ gap: 14 }}>
                {macros.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between items-baseline" style={{ marginBottom: 7 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--nb-heading)' }}>{m.label}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: m.color }}>
                        {m.value} <span style={{ fontWeight: 500, color: 'var(--nb-muted)' }}>· {m.pct}</span>
                      </span>
                    </div>
                    <div style={{ height: 9, borderRadius: 99, background: 'rgba(44,40,34,0.08)', overflow: 'hidden' }}>
                      <div data-bar style={{ height: '100%', width: `${m.bar}%`, borderRadius: 99, background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 22, paddingTop: 22, borderTop: '2px solid rgba(44,40,34,0.08)' }}>
                {[
                  { value: '480',   label: 'kcal / meal' },
                  { value: '7g',    label: 'Protein', border: true },
                  { value: 'Daily', label: 'Delivered' },
                ].map((s) => (
                  <div key={s.label} className="text-center" style={s.border ? { borderLeft: '2px solid rgba(44,40,34,0.08)', borderRight: '2px solid rgba(44,40,34,0.08)' } : undefined}>
                    <div className="font-display font-semibold text-nb-heading" style={{ fontSize: '1.7rem', lineHeight: 0.9 }}>{s.value}</div>
                    <div className="text-nb-muted uppercase" style={{ fontSize: '0.6rem', marginTop: 5, letterSpacing: '0.05em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
