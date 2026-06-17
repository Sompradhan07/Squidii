'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'The problem', id: 'problem' },
  { label: 'What we do', id: 'solution' },
  { label: "Who it's for", id: 'who-its-for' },
  { label: 'Shape Squidii', id: 'survey' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 }
    )
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color] duration-300 ${scrolled ? 'navbar-scrolled' : 'bg-transparent border-b border-transparent'}`}
        style={{ opacity: 0 }}
        aria-label="Main navigation"
      >
        <div className="squidii-c h-16 flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Squidii — scroll to top"
            className="font-display font-medium text-xl tracking-[0.04em] text-nb-heading bg-transparent border-none cursor-pointer p-0 leading-none"
          >
            squidii<span className="text-nb-olive">.</span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="label-sm text-nb-muted bg-transparent border-none cursor-pointer py-1 transition-colors duration-200 hover:text-nb-heading"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <button
              onClick={() => scrollTo('survey')}
              className="btn btn-olive px-5 py-2 text-xs min-h-[38px]"
            >
              Help Build It
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2.5 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-[1.5px] rounded-[1px] bg-nb-heading"
                style={{
                  transformOrigin: 'center',
                  transition: 'all 0.22s ease',
                  width: menuOpen ? (i === 1 ? 0 : '100%') : '100%',
                  transform: menuOpen
                    ? (i === 0 ? 'rotate(45deg) translate(3.5px, 3.5px)' : i === 2 ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none')
                    : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col"
        style={{
          background: 'rgba(250,248,244,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          transform: `translateY(${menuOpen ? 0 : -8}px)`,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="h-16 shrink-0" />
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              tabIndex={menuOpen ? 0 : -1}
              className={`font-display font-medium w-full text-center py-[0.85rem] bg-transparent border-none cursor-pointer ${i < NAV_LINKS.length - 1 ? 'border-b border-nb-border2' : ''}`}
              style={{
                fontSize: 'clamp(1.6rem, 7vw, 2.4rem)',
                color: 'var(--nb-heading)',
              }}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-8 w-full max-w-[260px]">
            <button
              onClick={() => scrollTo('survey')}
              className="btn btn-olive w-full"
              tabIndex={menuOpen ? 0 : -1}
            >
              Help Us Build Squidii
            </button>
          </div>
        </div>
        <div className="shrink-0 pb-6 text-center">
          <span className="label-sm text-nb-subtle text-[0.6rem]">
            squidii. · Food That Fits Your Goals
          </span>
        </div>
      </div>
    </>
  )
}
