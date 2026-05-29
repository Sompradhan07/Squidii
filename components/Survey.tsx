'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

/* ─── Micro icons — 15×15, 1.5-weight stroke, wellness-minimal ─────────── */
const ic = {
  flame:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-4 5-6 8-6 11a6 6 0 0012 0C18 10 16 7 12 2z"/><path d="M9.5 16a3.5 3.5 0 005 0"/></svg>,
  barbell:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="6.5" y1="12" x2="17.5" y2="12"/><rect x="3.5" y="5" width="3" height="4" rx="1.5"/><rect x="17.5" y="5" width="3" height="4" rx="1.5"/><rect x="3.5" y="15" width="3" height="4" rx="1.5"/><rect x="17.5" y="15" width="3" height="4" rx="1.5"/><rect x="6.5" y="9" width="11" height="6" rx="3"/></svg>,
  lightning:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z"/></svg>,
  leaf:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22c0-8.4 5.4-15.5 13-17.5"/><path d="M22 2C22 13.8 13.8 22 2 22"/></svg>,
  fork:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6h3.5a1.5 1.5 0 011.5 1.5V22"/></svg>,
  sprout:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10M12 20V10M12 10C8 10 5 7 5 4c4 0 7 3 7 6z"/><path d="M12 10c4 0 7-3 7-6-4 0-7 3-7 6z"/></svg>,
  shield:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  clock:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 3.5"/></svg>,
  moon:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  grid:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="3" rx="1.5"/><rect x="3" y="10.5" width="18" height="3" rx="1.5"/><rect x="3" y="17" width="18" height="3" rx="1.5"/></svg>,
  dots:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="19" cy="5" r="2" fill="currentColor"/><circle cx="5" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="19" cy="12" r="2" fill="currentColor"/><circle cx="5" cy="19" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>,
  wave:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c2-4 4-6 6-6s4 8 6 8 4-6 6-6"/></svg>,
  question: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 015.12 2.1C14.12 12.5 12 13 12 14"/><circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none"/></svg>,
  cycle:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
  heart:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>,
  check:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
  star:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  brain:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 014.9 4H17a3 3 0 010 6h-.1A5 5 0 0112 16a5 5 0 01-4.9-4H7a3 3 0 110-6h.1A5 5 0 0112 2z"/><path d="M12 16v4"/></svg>,
  sun:      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  frown:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 16.5s1.5-2.5 4-2.5 4 2.5 4 2.5"/><circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none"/></svg>,
  dollar:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v1M12 16v1M9.5 9.5A2.5 2.5 0 0112 8.5h.5a2 2 0 010 4H11a2 2 0 000 4h.5a2.5 2.5 0 002.5-1"/></svg>,
  diamond:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-7 10 7v2L12 21 2 11V9z"/><path d="M2 11h20"/></svg>,
  card:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
  person:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v7M9 22h6M9 22l1.5-5h3L16 22"/><path d="M9 13h6"/></svg>,
  infinity: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"/></svg>,
  pin:      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  briefcase:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/></svg>,
  book:     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  rupee:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8 8M6 8a4 4 0 000 5h3"/></svg>,
  target:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  delivery: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="1"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>,
  wa:       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
}

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Opt = { v: string; l: string; icon: React.ReactElement }
type Question = {
  id: number; label: string
  qPre: string; qEm: string
  sub: string; hint: string; ctx: string
  multi: boolean; opts: Opt[]
  grid?: boolean
}
type Answers = Record<number, string | string[]>
type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

/* ─── Questions — 10 questions, product-validation framework ─────────────── */
const questions: Question[] = [
  {
    id: 1, label: 'Your City',
    qPre: 'Where do you', qEm: 'currently live?',
    sub: "We're launching city by city — this helps us prioritize.",
    hint: 'Nura is mapping supply and partner kitchens by city.',
    ctx: 'Locating you', multi: false, grid: true,
    opts: [
      { v: 'bengaluru', l: 'Bengaluru',  icon: ic.leaf      },
      { v: 'mumbai',    l: 'Mumbai',     icon: ic.wave      },
      { v: 'delhi',     l: 'Delhi NCR',  icon: ic.sun       },
      { v: 'hyderabad', l: 'Hyderabad',  icon: ic.star      },
      { v: 'pune',      l: 'Pune',       icon: ic.brain     },
      { v: 'chennai',   l: 'Chennai',    icon: ic.moon      },
      { v: 'other',     l: 'Other',      icon: ic.pin       },
    ],
  },
  {
    id: 2, label: 'About You',
    qPre: 'Which best', qEm: 'describes you?',
    sub: 'Your routine shapes when and how you need to eat.',
    hint: 'Your lifestyle determines your meal timing and energy needs.',
    ctx: 'Understanding your life', multi: false, grid: true,
    opts: [
      { v: 'professional', l: 'Working Professional', icon: ic.briefcase },
      { v: 'student',      l: 'Student',              icon: ic.book      },
      { v: 'entrepreneur', l: 'Entrepreneur',          icon: ic.lightning },
      { v: 'freelancer',   l: 'Freelancer',            icon: ic.infinity  },
      { v: 'homemaker',    l: 'Homemaker',             icon: ic.heart     },
      { v: 'other',        l: 'Other',                 icon: ic.dots      },
    ],
  },
  {
    id: 3, label: 'Health Goal',
    qPre: 'What is your primary', qEm: 'health goal?',
    sub: 'This shapes your entire nutritional strategy.',
    hint: 'Personalizing your complete nutritional roadmap.',
    ctx: 'Mapping your goals', multi: false,
    opts: [
      { v: 'lose-fat',   l: 'Lose Fat',                  icon: ic.flame     },
      { v: 'muscle',     l: 'Build Muscle',              icon: ic.barbell   },
      { v: 'energy',     l: 'Improve Energy',            icon: ic.lightning },
      { v: 'gut',        l: 'Improve Gut Health',        icon: ic.leaf      },
      { v: 'nutrition',  l: 'Better Overall Nutrition',  icon: ic.sprout    },
      { v: 'condition',  l: 'Manage a Health Condition', icon: ic.shield    },
    ],
  },
  {
    id: 4, label: 'Biggest Challenge',
    qPre: "What's your biggest challenge", qEm: 'with eating healthy?',
    sub: "We'll build your plan around solving this friction point first.",
    hint: 'Pinpoints what has been stopping you — so Nura can fix it.',
    ctx: 'Identifying your friction', multi: false,
    opts: [
      { v: 'no-plan',    l: 'No time to plan meals',          icon: ic.clock    },
      { v: 'no-cook',    l: 'No time to cook',                icon: ic.fork     },
      { v: 'confused',   l: 'Confused about nutrition',       icon: ic.question },
      { v: 'consistency',l: "Can't stay consistent",          icon: ic.cycle    },
      { v: 'expensive',  l: 'Healthy food is expensive',      icon: ic.rupee    },
      { v: 'no-options', l: 'Lack of healthy options nearby', icon: ic.pin      },
    ],
  },
  {
    id: 5, label: 'Ordering Habits',
    qPre: 'How often do you', qEm: 'order food online?',
    sub: 'This helps us understand where Nura fits your current routine.',
    hint: 'Maps Nura into your existing food behaviour — not against it.',
    ctx: 'Profiling your habits', multi: false,
    opts: [
      { v: 'daily', l: 'Daily',               icon: ic.infinity },
      { v: '3-5x',  l: '3–5 times per week',  icon: ic.grid     },
      { v: '1-2x',  l: '1–2 times per week',  icon: ic.wave     },
      { v: 'rarely',l: 'Rarely',              icon: ic.moon     },
    ],
  },
  {
    id: 6, label: 'Personalization',
    qPre: 'How important is personalized', qEm: 'nutrition to you?',
    sub: 'Your answer helps us understand how much depth to build.',
    hint: 'This guides how precisely Nura calibrates your blueprint.',
    ctx: 'Gauging your priority', multi: false,
    opts: [
      { v: 'extremely', l: 'Extremely important', icon: ic.star  },
      { v: 'very',      l: 'Very important',       icon: ic.heart },
      { v: 'somewhat',  l: 'Somewhat important',   icon: ic.wave  },
      { v: 'not',       l: 'Not important',        icon: ic.frown },
    ],
  },
  {
    id: 7, label: 'Past Attempts',
    qPre: 'Have you ever', qEm: 'tried any of these?',
    sub: "What hasn't worked for you is as important as what has.",
    hint: 'Nura learns from your past attempts to avoid the same mistakes.',
    ctx: 'Learning from history', multi: true,
    opts: [
      { v: 'meal-prep', l: 'Meal prep',            icon: ic.fork     },
      { v: 'diet-plan', l: 'Diet plan',             icon: ic.grid     },
      { v: 'coach',     l: 'Nutrition coach',       icon: ic.person   },
      { v: 'delivery',  l: 'Meal delivery service', icon: ic.delivery },
      { v: 'app',       l: 'Calorie tracking app',  icon: ic.brain    },
      { v: 'none',      l: 'None of the above',     icon: ic.check    },
    ],
  },
  {
    id: 8, label: 'Willingness to Pay',
    qPre: 'How much would you spend for', qEm: 'a personalized healthy meal?',
    sub: 'Real results must work within real budgets.',
    hint: 'Helps Nura design plans that are sustainable for your wallet.',
    ctx: 'Aligning with your budget', multi: false,
    opts: [
      { v: 'u120',    l: 'Under ₹120', icon: ic.rupee   },
      { v: '120-150', l: '₹120 – 150', icon: ic.rupee   },
      { v: '150-200', l: '₹150 – 200', icon: ic.card    },
      { v: '200-250', l: '₹200 – 250', icon: ic.diamond },
      { v: '250p',    l: '₹250+',      icon: ic.star    },
    ],
  },
  {
    id: 9, label: 'Interest Level',
    qPre: 'If Nura handled your nutrition,', qEm: 'how interested would you be?',
    sub: 'Honest feedback helps us build something people actually want.',
    hint: 'Your candid answer shapes what we prioritize building first.',
    ctx: 'Measuring demand', multi: false,
    opts: [
      { v: 'definitely', l: 'Definitely interested', icon: ic.star     },
      { v: 'interested', l: 'Interested',             icon: ic.heart    },
      { v: 'maybe',      l: 'Maybe',                  icon: ic.question },
      { v: 'no',         l: 'Not interested',         icon: ic.frown    },
    ],
  },
  {
    id: 10, label: 'Decision Drivers',
    qPre: 'What would convince you', qEm: 'to try Nura?',
    sub: 'Pick everything that matters — we want to earn your trust.',
    hint: 'These are the features we will build and prove to you first.',
    ctx: 'Understanding your trust signals', multi: true,
    opts: [
      { v: 'results',    l: 'Better health results',         icon: ic.target   },
      { v: 'convenient', l: 'Convenience',                   icon: ic.lightning},
      { v: 'price',      l: 'Affordable pricing',            icon: ic.rupee    },
      { v: 'personal',   l: 'Personalization',               icon: ic.brain    },
      { v: 'experts',    l: 'Doctor / Nutritionist support', icon: ic.shield   },
      { v: 'quality',    l: 'High-quality ingredients',      icon: ic.leaf     },
    ],
  },
]

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function getBrowser(ua: string): string {
  if (ua.includes('Edg'))                                 return 'Edge'
  if (ua.includes('Chrome') && !ua.includes('Edg'))      return 'Chrome'
  if (ua.includes('Safari') && !ua.includes('Chrome'))   return 'Safari'
  if (ua.includes('Firefox'))                            return 'Firefox'
  return 'Other'
}

function formatAnswer(v: string | string[] | undefined): string {
  if (!v) return ''
  return Array.isArray(v) ? v.join(', ') : v
}

/* ─── Option card ────────────────────────────────────────────────────────── */
function Option({
  opt, selected, onSelect, multi,
}: {
  opt: Opt
  selected: boolean
  onSelect: () => void
  multi: boolean
}) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(() => {
    if (!selected && btnRef.current) {
      gsap.fromTo(btnRef.current,
        { scale: 0.975 },
        { scale: 1, duration: 0.55, ease: 'back.out(2.2)' },
      )
    }
    onSelect()
  }, [selected, onSelect])

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-pressed={selected}
      className="survey-opt"
    >
      <div
        className="survey-icon-box"
        style={{
          background: selected ? 'rgba(90,108,72,0.14)' : 'rgba(44,40,34,0.045)',
          color: selected ? '#5a6c48' : 'var(--nb-muted)',
          transform: selected ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        {opt.icon}
      </div>
      <span
        className="flex-1 text-left font-medium leading-snug"
        style={{ fontSize: '0.93rem', color: selected ? 'var(--nb-heading)' : undefined }}
      >
        {opt.l}
      </span>
      <div
        className="shrink-0 flex items-center justify-center"
        style={{
          width: multi ? 18 : 20,
          height: multi ? 18 : 20,
          borderRadius: multi ? '5px' : '50%',
          border: selected ? '2px solid #5a6c48' : '1.5px solid var(--nb-border)',
          background: selected ? '#5a6c48' : 'transparent',
          transition: 'all 0.26s cubic-bezier(0.34,1.56,0.64,1)',
          flexShrink: 0,
        }}
      >
        {selected && (
          <svg width={10} height={8} viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#fdf9f2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}

/* ─── Success / Thank-you screen ─────────────────────────────────────────── */
function SuccessScreen() {
  const ref      = useRef<HTMLDivElement>(null)
  const checkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (checkRef.current) {
      gsap.fromTo(checkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.72, ease: 'back.out(2.5)', delay: 0.1 },
      )
    }
    gsap.fromTo(
      ref.current?.querySelectorAll('.ri') ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.10, ease: 'power3.out', delay: 0.55 },
    )
  }, [])

  return (
    <div ref={ref} className="text-center flex flex-col items-center gap-8 py-4">

      {/* Animated check */}
      <div ref={checkRef} style={{ opacity: 0 }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          style={{
            background: 'linear-gradient(145deg, rgba(90,108,72,0.12) 0%, rgba(90,108,72,0.05) 100%)',
            border: '1.5px solid rgba(90,108,72,0.28)',
            boxShadow: '0 0 0 8px rgba(90,108,72,0.05), 0 8px 36px rgba(90,108,72,0.18)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l4 4L19 7" stroke="#5a6c48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <div className="ri flex flex-col gap-3">
        <p className="text-[0.68rem] font-semibold tracking-[0.11em] uppercase" style={{ color: '#5a6c48' }}>
          Thank You!
        </p>
        <h2
          className="font-display font-medium tracking-[-0.022em] leading-[1.12] text-nb-heading"
          style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)' }}
        >
          Thank you for helping<br />
          <em className="text-nb-olive" style={{ fontStyle: 'italic' }}>shape Nura.</em>
        </h2>
        <p className="text-nb-body leading-[1.78] max-w-[40ch] mx-auto" style={{ fontSize: '0.9rem' }}>
          Your feedback is helping us build personalized nutrition that actually fits people&rsquo;s lives.
        </p>
      </div>

      {/* WhatsApp CTA */}
      <div className="ri flex flex-col items-center gap-4 w-full">
        <p className="text-nb-muted leading-relaxed max-w-[38ch] mx-auto" style={{ fontSize: '0.84rem' }}>
          Want to stay updated and be among the first to hear about launch updates?
        </p>

        <a
          href="https://chat.whatsapp.com/CuWfKQHEpy5DdxCvU70WAc"
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2.5"
          style={{
            background: 'linear-gradient(135deg, #1fbe55 0%, #25d366 100%)',
            color: '#fff',
            border: 'none',
            minWidth: '240px',
            boxShadow: '0 4px 24px rgba(37,211,102,0.32), 0 1px 6px rgba(37,211,102,0.16)',
            fontSize: '0.86rem',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.38), 0 2px 10px rgba(37,211,102,0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.32), 0 1px 6px rgba(37,211,102,0.16)'
          }}
        >
          {ic.wa}
          Join Nura WhatsApp Community
        </a>

        <button
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-nb-muted bg-transparent border-none cursor-pointer transition-colors duration-200"
          style={{ fontSize: '0.82rem' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--nb-heading)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '' }}
        >
          Finish
        </button>
      </div>

    </div>
  )
}

/* ─── Survey main ────────────────────────────────────────────────────────── */
export default function Survey() {
  const [idx, setIdx]               = useState(0)
  const [answers, setAnswers]       = useState<Answers>({})
  const [done, setDone]             = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const contentRef      = useRef<HTMLDivElement>(null)
  const sectionRef      = useRef<HTMLElement>(null)
  const ctaBtnRef       = useRef<HTMLButtonElement>(null)
  const prevAnsweredRef = useRef(false)

  const q        = questions[idx]
  const progress = ((idx + 1) / questions.length) * 100
  const minsLeft = Math.max(1, Math.round((questions.length - idx) * 11 / 60))
  const isLast   = idx === questions.length - 1

  const transition = useCallback((dir: 'l' | 'r', cb: () => void) => {
    const xOut = dir === 'l' ? -22 : 22
    const xIn  = dir === 'l' ?  22 : -22
    gsap.to(contentRef.current, {
      opacity: 0, x: xOut, duration: 0.20, ease: 'power2.in',
      onComplete: () => {
        cb()
        requestAnimationFrame(() =>
          gsap.fromTo(contentRef.current,
            { opacity: 0, x: xIn },
            { opacity: 1, x: 0, duration: 0.38, ease: 'power3.out' },
          )
        )
      },
    })
  }, [])

  const select = useCallback((v: string) => {
    setAnswers((prev) => {
      if (q.multi) {
        const cur = (prev[q.id] as string[] | undefined) ?? []
        if (v === 'none') return { ...prev, [q.id]: cur.includes('none') ? [] : ['none'] }
        const withoutNone = cur.filter((x) => x !== 'none')
        return {
          ...prev,
          [q.id]: withoutNone.includes(v)
            ? withoutNone.filter((x) => x !== v)
            : [...withoutNone, v],
        }
      }
      return { ...prev, [q.id]: v }
    })
  }, [q])

  const handleSubmit = useCallback(async (currentAnswers: Answers) => {
    setSubmitState('submitting')

    const deviceType = typeof window !== 'undefined'
      ? (window.innerWidth < 768 ? 'Mobile' : 'Desktop')
      : 'Unknown'
    const browser  = typeof navigator !== 'undefined' ? getBrowser(navigator.userAgent) : 'Unknown'
    const referrer = typeof document !== 'undefined' ? (document.referrer || 'direct') : 'direct'

    const payload = {
      q1:  formatAnswer(currentAnswers[1]),
      q2:  formatAnswer(currentAnswers[2]),
      q3:  formatAnswer(currentAnswers[3]),
      q4:  formatAnswer(currentAnswers[4]),
      q5:  formatAnswer(currentAnswers[5]),
      q6:  formatAnswer(currentAnswers[6]),
      q7:  formatAnswer(currentAnswers[7]),
      q8:  formatAnswer(currentAnswers[8]),
      q9:  formatAnswer(currentAnswers[9]),
      q10: formatAnswer(currentAnswers[10]),
      deviceType,
      browser,
      referrer,
    }

    try {
      const res  = await fetch('/api/survey-submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json() as { success: boolean }

      if (data.success) {
        setSubmitState('success')
        transition('l', () => setDone(true))
      } else {
        setSubmitState('error')
      }
    } catch {
      setSubmitState('error')
    }
  }, [transition])

  const next = useCallback(() => {
    if (isLast) {
      void handleSubmit(answers)
    } else {
      transition('l', () => setIdx((i) => i + 1))
    }
  }, [isLast, handleSubmit, answers, transition])

  const back = useCallback(() => {
    if (idx > 0) {
      setSubmitState('idle')
      transition('r', () => setIdx((i) => i - 1))
    }
  }, [idx, transition])

  const answered = q.multi
    ? ((answers[q.id] as string[] | undefined) ?? []).length > 0
    : !!answers[q.id]

  /* Spring-animate CTA on first answer activation */
  useEffect(() => {
    if (answered && !prevAnsweredRef.current && ctaBtnRef.current) {
      gsap.fromTo(ctaBtnRef.current,
        { scale: 0.94, opacity: 0.72 },
        { scale: 1, opacity: 1, duration: 0.50, ease: 'back.out(2)' },
      )
    }
    prevAnsweredRef.current = answered
  }, [answered])

  /* Reset prevAnsweredRef when question changes */
  useEffect(() => {
    prevAnsweredRef.current = false
    setSubmitState('idle')
  }, [idx])

  /* Section entrance */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const content = el.querySelector('.survey-content')
    const prog    = el.querySelector('.survey-progress')
    if (content) gsap.fromTo(content, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.62, ease: 'power3.out', delay: 0.18 })
    if (prog)    gsap.fromTo(prog,    { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.28 })
  }, [])

  const submitting = submitState === 'submitting'

  return (
    <section
      id="survey"
      ref={sectionRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
      aria-label="Nura Nutrition Survey"
      style={{ background: 'linear-gradient(180deg, #f0ebe1 0%, #f5f0e8 40%, #faf7f2 100%)' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          opacity: 0.024,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute top-0 inset-x-0 pointer-events-none" aria-hidden style={{ height: '320px', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(194,140,72,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 pointer-events-none" aria-hidden style={{ width: '400px', height: '400px', background: 'radial-gradient(circle at 80% 80%, rgba(90,108,72,0.05) 0%, transparent 65%)' }} />

      <div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ padding: 'clamp(3.5rem,8vw,7rem) clamp(1.25rem,4vw,3rem)' }}
      >
        <div className="w-full max-w-[540px]">

          {/* ── Progress header ─────────────────────────────────────── */}
          {!done && (
            <div className="survey-progress" style={{ marginBottom: 'clamp(2.25rem,4vw,3rem)' }}>

              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-[0.45rem]">
                  <span
                    className="font-semibold tabular-nums tracking-[0.07em]"
                    style={{ fontSize: '0.64rem', color: '#5a6c48' }}
                  >
                    STEP {idx + 1} OF {questions.length}
                  </span>
                  <span className="text-nb-border" aria-hidden>·</span>
                  <span className="text-nb-muted tracking-[0.02em]" style={{ fontSize: '0.64rem' }}>
                    {q.ctx}
                  </span>
                </div>
                <span className="text-nb-muted italic" style={{ fontSize: '0.64rem' }}>
                  {idx < 6 ? 'Building your nutrition blueprint…' : `~${minsLeft} min remaining`}
                </span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex justify-center gap-[5px] mt-3">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === idx ? 18 : 5,
                      height: 4,
                      borderRadius: '100px',
                      background: i <= idx ? '#5a6c48' : 'rgba(44,40,34,0.12)',
                      opacity: i < idx ? 0.5 : 1,
                      transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Content ────────────────────────────────────────────── */}
          {done ? (
            <SuccessScreen />
          ) : (
            <div ref={contentRef} className="survey-content">

              {/* Question header */}
              <div className="text-center" style={{ marginBottom: 'clamp(1.75rem,3.5vw,2.5rem)' }}>
                <p className="label-sm text-nb-olive opacity-55 tracking-[0.09em] mb-4">
                  {q.label}
                </p>
                <h2
                  className="font-display font-medium tracking-[-0.014em] leading-[1.18] text-nb-heading"
                  style={{ fontSize: 'clamp(1.35rem,3vw,1.95rem)', maxWidth: '28ch', margin: '0 auto 0.75rem' }}
                >
                  {q.qPre}{' '}
                  <em style={{ color: '#5a6c48', fontStyle: 'italic' }}>{q.qEm}</em>
                </h2>
                <p className="text-nb-body leading-[1.72] max-w-[40ch] mx-auto" style={{ fontSize: '0.875rem' }}>
                  {q.sub}
                </p>
                <p className="text-nb-subtle italic mt-2.5" style={{ fontSize: '0.70rem' }}>
                  {q.hint}
                  {q.multi && (
                    <span className="not-italic ml-2 opacity-70">· Select all that apply</span>
                  )}
                </p>
              </div>

              {/* Option cards */}
              <div
                style={{
                  marginBottom: 'clamp(1.75rem,3.5vw,2.5rem)',
                  ...(q.grid
                    ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }
                    : { display: 'flex', flexDirection: 'column', gap: '0.625rem' }),
                }}
              >
                {q.opts.map((opt) => {
                  const sel = q.multi
                    ? ((answers[q.id] as string[] | undefined) ?? []).includes(opt.v)
                    : answers[q.id] === opt.v
                  return (
                    <Option
                      key={opt.v}
                      opt={opt}
                      selected={sel}
                      multi={q.multi}
                      onSelect={() => select(opt.v)}
                    />
                  )
                })}
              </div>

              {/* Error banner */}
              {submitState === 'error' && (
                <div
                  className="text-center mb-4 rounded-xl py-2.5 px-4"
                  style={{ background: 'rgba(200,80,60,0.07)', border: '1px solid rgba(200,80,60,0.14)' }}
                >
                  <p style={{ fontSize: '0.80rem', color: 'rgba(180,60,40,0.85)' }}>
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="text-center">
                <button
                  ref={ctaBtnRef}
                  onClick={next}
                  disabled={!answered || submitting}
                  className="btn text-[0.81rem] tracking-[0.04em] min-w-[210px] transition-all duration-280"
                  style={
                    answered && !submitting
                      ? {
                          background: 'linear-gradient(140deg, #4e5f3e 0%, #5a6c48 50%, #6d8358 100%)',
                          color: '#fdf9f2',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 3px 24px rgba(90,108,72,0.26), 0 1px 6px rgba(90,108,72,0.14)',
                        }
                      : submitting
                        ? {
                            background: 'linear-gradient(140deg, #4e5f3e 0%, #5a6c48 50%, #6d8358 100%)',
                            color: 'rgba(253,249,242,0.70)',
                            border: 'none',
                            cursor: 'wait',
                            boxShadow: '0 3px 24px rgba(90,108,72,0.14)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.52)',
                            color: 'var(--nb-subtle)',
                            border: '1px solid rgba(44,40,34,0.08)',
                            cursor: 'not-allowed',
                            boxShadow: 'none',
                          }
                  }
                  onMouseEnter={(e) => {
                    if (answered && !submitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 6px 30px rgba(90,108,72,0.32), 0 2px 10px rgba(90,108,72,0.16)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answered && !submitting) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 3px 24px rgba(90,108,72,0.26), 0 1px 6px rgba(90,108,72,0.14)'
                    }
                  }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="32" strokeDashoffset="12" strokeLinecap="round"/>
                      </svg>
                      Saving your answers…
                    </>
                  ) : answered ? (
                    <>
                      {submitState === 'error'
                        ? 'Retry'
                        : isLast
                          ? 'Complete My Blueprint'
                          : 'Continue Building Blueprint'}
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  ) : (
                    'Select an option to continue'
                  )}
                </button>

                <div className="mt-5">
                  <button
                    onClick={back}
                    tabIndex={idx > 0 ? 0 : -1}
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium bg-transparent border-none cursor-pointer rounded-lg py-1 px-2 transition-colors duration-200"
                    style={{
                      opacity: idx > 0 ? 1 : 0,
                      pointerEvents: idx > 0 ? 'auto' : 'none',
                      color: 'var(--nb-muted)',
                    }}
                    onMouseEnter={(e) => { if (idx > 0) e.currentTarget.style.color = 'var(--nb-heading)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--nb-muted)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      <div
        className="h-px w-full pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(90,108,72,0.09), transparent)' }}
      />
    </section>
  )
}
