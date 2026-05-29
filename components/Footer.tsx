'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const LINKS: Record<string, string[]> = {
  Product: ['Blueprint', 'Features', 'Science', 'Pricing'],
  Company: ['About Nura', 'Research', 'Blog', 'Careers'],
  Support: ['How It Works', 'FAQ', 'Privacy', 'Terms'],
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current?.querySelectorAll('.fi') ?? [],
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 94%' } },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={ref} className="bg-nb-dark2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="nura-c" style={{ paddingTop: 'clamp(3.5rem,7vw,6rem)', paddingBottom: 'clamp(2rem,4vw,3rem)' }}>

        {/* ── Top: brand + CTA ──────────────────────────────────────── */}
        <div
          className="fi"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(2rem,5vw,4rem)',
            paddingBottom: 'clamp(2.5rem,5vw,4rem)',
            marginBottom: 'clamp(2.5rem,5vw,4rem)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div
              className="font-display font-medium text-nb-sage tracking-[0.04em]"
              style={{ fontSize: '1.35rem' }}
            >
              Nura
            </div>
            <p
              className="leading-[1.74]"
              style={{ color: 'rgba(255,255,255,0.46)', fontSize: '0.86rem', maxWidth: '30ch' }}
            >
              The personalized nutrition operating system for your body.
              Not a diet. A living system built around you.
            </p>
            <div className="flex items-center gap-3">
              <div className="line-cream" />
              <span className="label-sm" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.58rem' }}>
                Precision Nutrition Intelligence
              </span>
            </div>
          </div>

          {/* CTA column */}
          <div className="flex flex-col gap-4">
            <p
              className="font-display font-medium text-nb-cream leading-[1.3]"
              style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.45rem)' }}
            >
              Ready to discover<br />
              <span className="text-nb-sage italic">your blueprint?</span>
            </p>
            <div>
              <button
                className="btn btn-cream"
                onClick={() => document.getElementById('survey')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Begin Assessment
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Link grid ─────────────────────────────────────────────── */}
        <div
          className="fi"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: 'clamp(1.5rem,4vw,3rem)',
            marginBottom: 'clamp(2.5rem,5vw,4rem)',
          }}
        >
          {/* Brand blurb */}
          <div className="flex flex-col gap-3">
            <p className="label-sm" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.62rem' }}>Nura</p>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.80rem', lineHeight: 1.72 }}>
              Built by scientists and engineers who believe food should feel like freedom.
            </p>
          </div>

          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat} className="flex flex-col gap-3">
              <p className="label-sm" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.62rem' }}>{cat}</p>
              <ul className="flex flex-col gap-[0.52rem] list-none">
                {items.map((item) => {
                  const href =
                    item === 'Blueprint'   ? '#survey'
                    : item === 'Features'  ? '#features'
                    : item === 'How It Works' ? '#how-it-works'
                    : item === 'Science'   ? '#solution'
                    : item === 'Pricing'   ? '#survey'
                    : '#'
                  return (
                    <li key={item}>
                      <a
                        href={href}
                        className="footer-link"
                        style={{ color: 'rgba(255,255,255,0.36)', fontSize: '0.82rem' }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div
          className="fi flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
          style={{
            paddingTop: 'clamp(1.25rem,2.5vw,1.75rem)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.76rem',
            color: 'rgba(255,255,255,0.26)',
          }}
        >
          <p>© {new Date().getFullYear()} Nura Inc. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="footer-link"
                style={{ color: 'rgba(255,255,255,0.26)' }}
              >
                {item}
              </a>
            ))}
          </div>
          <p>
            Made with intention ·{' '}
            <span className="text-nb-sage">Nura</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
