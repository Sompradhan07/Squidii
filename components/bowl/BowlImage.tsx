'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Real food photography — Eiliv Aceron (@shootdelicious) on Unsplash.
 * White ceramic bowl · Strawberries · Blueberries · Granola · Yogurt.
 *
 * Visual treatment:
 *  - Soft radial CSS mask → circle fades organically into page background
 *  - Multi-layer atmospheric glow → bowl feels physically present in scene
 *  - Warm table-surface gradient → grounds the bowl on a surface
 *  - Specular catch-light simulation → natural sunlight from top-left
 *  - GSAP float (sine wave) + mouse parallax (3-D tilt)
 */
export default function BowlImage({ className = '' }: { className?: string }) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap  = wrapRef.current
    const image = imageRef.current
    if (!wrap || !image) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    /* Gentle vertical float — sine wave, 4-second period */
    gsap.to(image, {
      y: -13,
      duration: 4.0,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    /* Mouse parallax — subtle 3-D tilt follows cursor */
    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const cx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2)
      const cy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2)
      gsap.to(image, {
        x: cx * 9,
        rotateY: cx * 4,
        rotateX: -cy * 3,
        duration: 1.0,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: cx * 20,
          y: cy * 14,
          duration: 1.0,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    const onMouseLeave = () => {
      gsap.to(image, {
        x: 0, rotateX: 0, rotateY: 0,
        duration: 1.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: 0, y: 0,
          duration: 1.5,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    }

    wrap.addEventListener('mousemove', onMouseMove)
    wrap.addEventListener('mouseleave', onMouseLeave)
    return () => {
      wrap.removeEventListener('mousemove', onMouseMove)
      wrap.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: '1100px' }}
    >

      {/* ── Layer 0: Warm table surface — grounds the bowl on a surface ── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: '40%',
          background: 'linear-gradient(to top, rgba(250,245,235,0.55) 0%, rgba(250,245,235,0.18) 35%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* ── Layer 1: Primary ambient glow — warm golden light behind bowl ── */}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: '5%',
          borderRadius: '50%',
          background: [
            'radial-gradient(ellipse 90% 80% at 42% 44%,',
            '  rgba(230,175,95,0.28) 0%,',
            '  rgba(220,160,80,0.14) 38%,',
            '  rgba(245,235,215,0.06) 60%,',
            '  transparent 75%)',
          ].join(''),
          filter: 'blur(20px)',
          zIndex: 0,
        }}
      />

      {/* ── Layer 2: Diffuse atmosphere — soft environmental haze ─────── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: '-14%',
          background: [
            'radial-gradient(ellipse 72% 68% at 50% 52%,',
            '  rgba(255,250,238,0.22) 0%,',
            '  rgba(248,240,220,0.10) 40%,',
            '  transparent 66%)',
          ].join(''),
          zIndex: 0,
        }}
      />

      {/* ── Layer 3: Contact shadow — depth beneath bowl ─────────────── */}
      <div
        aria-hidden
        className="absolute bottom-[2%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60%',
          height: '4.5%',
          background: 'radial-gradient(ellipse, rgba(32,18,6,0.26) 0%, transparent 70%)',
          filter: 'blur(16px)',
          zIndex: 0,
        }}
      />

      {/* ── Layer 4: Bowl image — floats with GSAP, tilts on mouse ────── */}
      <div
        ref={imageRef}
        className="relative"
        style={{
          width: '85%',
          aspectRatio: '1 / 1',
          willChange: 'transform',
          transformStyle: 'preserve-3d',
          zIndex: 1,
        }}
      >
        {/* Photo container — soft radial mask instead of hard circle clip */}
        <div
          className="relative w-full h-full"
          style={{
            /* Soft radial fade: sharp centre, dissolves at ~80% radius */
            maskImage: 'radial-gradient(circle 47% at 50% 50%, black 55%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.4) 80%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(circle 47% at 50% 50%, black 55%, rgba(0,0,0,0.85) 68%, rgba(0,0,0,0.4) 80%, transparent 92%)',
            /* Multi-layer shadow for depth */
            filter: 'drop-shadow(0 28px 60px rgba(32,18,6,0.22)) drop-shadow(0 8px 20px rgba(32,18,6,0.13)) drop-shadow(0 2px 6px rgba(32,18,6,0.08))',
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1610441009633-b6ca9c6d4be2?auto=format&fit=crop&w=1400&q=92"
            alt="Fresh wellness bowl — strawberries, blueberries, granola and yogurt in a white ceramic bowl"
            fill
            className="object-cover object-center scale-[1.04]"
            priority
            sizes="(max-width: 767px) 84vw, 50vw"
          />
        </div>

        {/* ── Specular highlight — top-left catch light (natural sunlight) */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '3%', left: '5%',
            width: '42%', height: '32%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 38% 36%, rgba(255,252,242,0.44) 0%, transparent 62%)',
            zIndex: 2,
          }}
        />

        {/* ── Rim light — subtle right-side secondary reflection */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: '20%', right: '4%',
            width: '18%', height: '45%',
            background: 'radial-gradient(ellipse at 60% 50%, rgba(255,248,230,0.18) 0%, transparent 70%)',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  )
}
