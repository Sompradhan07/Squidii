'use client'

/**
 * Premium CSS-based bowl visual — large, cinematic, 3/4 perspective.
 * Rich ceramic material, visible layered ingredients, morning sunlight feel.
 * Used as mobile fallback and in scattered contexts.
 */

interface BowlVisualProps {
  scattered?: boolean
  className?: string
}

/* ─── Ingredient data ───────────────────────────────────────────────────── */

const BLUEBERRIES = [
  { top: '38%', left: '26%', size: 13, c: '#281a5c', hl: '#4a3490' },
  { top: '42%', left: '34%', size: 12, c: '#2e1f68', hl: '#523c9a' },
  { top: '36%', left: '42%', size: 12, c: '#231650', hl: '#3e2c80' },
  { top: '46%', left: '28%', size: 14, c: '#2c1e62', hl: '#4e3894' },
  { top: '40%', left: '50%', size: 12, c: '#251858', hl: '#46328c' },
  { top: '48%', left: '40%', size: 11, c: '#1f1450', hl: '#3a2878' },
  { top: '44%', left: '56%', size: 13, c: '#2a1a5e', hl: '#483690' },
  { top: '34%', left: '33%', size: 11, c: '#261a56', hl: '#422e84' },
  { top: '50%', left: '46%', size: 12, c: '#2c1e60', hl: '#4a3492' },
  { top: '38%', left: '60%', size: 11, c: '#201450', hl: '#3c287a' },
  { top: '52%', left: '34%', size: 12, c: '#2a1860', hl: '#46328c' },
  { top: '32%', left: '50%', size: 11, c: '#231650', hl: '#3e2c80' },
  { top: '46%', left: '64%', size: 12, c: '#2c1e62', hl: '#4e3894' },
  { top: '42%', left: '24%', size: 11, c: '#251858', hl: '#46328c' },
  { top: '54%', left: '42%', size: 11, c: '#1f1450', hl: '#3a2878' },
  { top: '36%', left: '66%', size: 10, c: '#281a5c', hl: '#4a3490' },
]

const STRAWBERRIES = [
  { top: '34%', left: '56%', size: 18, rot: 15 },
  { top: '42%', left: '20%', size: 16, rot: -20 },
  { top: '30%', left: '40%', size: 17, rot: 8 },
  { top: '46%', left: '60%', size: 15, rot: 25 },
  { top: '38%', left: '70%', size: 14, rot: -12 },
  { top: '50%', left: '30%', size: 14, rot: 18 },
]

const BANANA_SLICES = [
  { top: '46%', left: '54%', size: 17 },
  { top: '50%', left: '62%', size: 15 },
  { top: '44%', left: '66%', size: 16 },
  { top: '53%', left: '56%', size: 14 },
  { top: '48%', left: '72%', size: 15 },
  { top: '40%', left: '60%', size: 14 },
  { top: '55%', left: '64%', size: 14 },
  { top: '52%', left: '48%', size: 13 },
  { top: '42%', left: '48%', size: 13 },
]

const GRANOLA = [
  { top: '34%', left: '48%', size: 6, rot: 30, c: '#c8904a' },
  { top: '38%', left: '60%', size: 7, rot: -15, c: '#b87838' },
  { top: '42%', left: '50%', size: 5, rot: 45, c: '#d4a460' },
  { top: '30%', left: '42%', size: 6, rot: -30, c: '#a06830' },
  { top: '36%', left: '68%', size: 7, rot: 10, c: '#c8904a' },
  { top: '44%', left: '72%', size: 5, rot: 60, c: '#b87838' },
  { top: '28%', left: '55%', size: 6, rot: -45, c: '#d4a460' },
  { top: '40%', left: '36%', size: 7, rot: 20, c: '#a06830' },
  { top: '46%', left: '44%', size: 5, rot: -10, c: '#c8904a' },
  { top: '32%', left: '64%', size: 6, rot: 35, c: '#b87838' },
  { top: '50%', left: '68%', size: 5, rot: 50, c: '#d4a460' },
  { top: '38%', left: '30%', size: 6, rot: -25, c: '#c8904a' },
  { top: '54%', left: '52%', size: 6, rot: 15, c: '#cc9c58' },
  { top: '56%', left: '38%', size: 6, rot: -50, c: '#bd8442' },
  { top: '26%', left: '48%', size: 5, rot: 25, c: '#d4a868' },
  { top: '48%', left: '28%', size: 6, rot: -20, c: '#a06830' },
  { top: '52%', left: '74%', size: 5, rot: 40, c: '#c8904a' },
  { top: '30%', left: '70%', size: 6, rot: -35, c: '#b87838' },
  { top: '58%', left: '48%', size: 5, rot: 10, c: '#dab074' },
  { top: '44%', left: '24%', size: 6, rot: 55, c: '#bd8442' },
]

const ALMONDS = [
  { top: '35%', left: '58%', size: 6, rot: 25 },
  { top: '40%', left: '42%', size: 7, rot: -35 },
  { top: '44%', left: '64%', size: 5, rot: 15 },
  { top: '32%', left: '50%', size: 6, rot: -20 },
  { top: '48%', left: '36%', size: 7, rot: 40 },
  { top: '38%', left: '68%', size: 5, rot: -10 },
  { top: '52%', left: '52%', size: 6, rot: 30 },
  { top: '30%', left: '62%', size: 5, rot: -40 },
  { top: '46%', left: '46%', size: 6, rot: 12 },
  { top: '36%', left: '32%', size: 6, rot: -28 },
  { top: '54%', left: '60%', size: 5, rot: 48 },
  { top: '42%', left: '70%', size: 6, rot: -18 },
]

const CHIA_POSITIONS = Array.from({ length: 64 }, () => ({
  top: `${24 + Math.random() * 34}%`,
  left: `${24 + Math.random() * 52}%`,
}))

export default function BowlVisual({ scattered = false, className = '' }: BowlVisualProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      aria-hidden
    >
      {/* ── Ambient glow ring ─────────────────────────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: '92%',
          height: '88%',
          background: 'radial-gradient(ellipse at 45% 38%, rgba(220,180,120,0.16), rgba(180,140,90,0.04) 40%, transparent 65%)',
          filter: 'blur(36px)',
          animation: 'pulse-glow 4.5s ease-in-out infinite',
        }}
      />

      {/* ── Contact shadow ────────────────────────────────────────────── */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '12%',
          width: '62%',
          height: '20px',
          background: 'radial-gradient(ellipse at 44% 50%, rgba(25,15,8,0.58), transparent 72%)',
          filter: 'blur(12px)',
        }}
      />

      {/* ── Bowl container ────────────────────────────────────────────── */}
      <div
        className="relative"
        style={{
          width: 'clamp(260px, 42vw, 440px)',
          aspectRatio: '1.28 / 1',
          animation: scattered ? 'none' : 'float-slow 6s ease-in-out infinite',
          transform: scattered ? 'rotate(-3deg) translateY(6px)' : undefined,
        }}
      >
        {/* ── Bowl outer body (ceramic) ───────────────────────────────── */}
        <div
          className="absolute inset-0 rounded-[50%]"
          style={{
            background: 'linear-gradient(168deg, #f5efe2 0%, #e8dcc8 22%, #d6c6a4 48%, #c8b490 76%, #baa680 100%)',
            boxShadow: `
              0 18px 64px rgba(18,12,4,0.45),
              inset 0 -10px 28px rgba(0,0,0,0.18),
              inset 0 -2px 6px rgba(0,0,0,0.1),
              0 0 0 1px rgba(190,160,120,0.18)
            `,
            transform: 'scaleY(0.54)',
            transformOrigin: 'center bottom',
          }}
        />

        {/* ── Bowl interior (yogurt base) ─────────────────────────────── */}
        <div
          className="absolute"
          style={{
            inset: '6% 5% auto',
            height: '62%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 45% 32%, #faf6ee 0%, #efe4d0 45%, #dccaa8 85%, #c8b48a 100%)',
            transform: 'scaleY(0.5) translateY(-8%)',
            transformOrigin: 'center top',
          }}
        />

        {/* ── Yogurt surface layer ────────────────────────────────────── */}
        <div
          className="absolute"
          style={{
            inset: '10% 9% auto',
            height: '48%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 45% 35%, #fdfaf4 0%, #f4ede0 50%, #e8dcc8 100%)',
            transform: 'scaleY(0.48) translateY(-10%)',
            transformOrigin: 'center top',
            boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.5)',
            opacity: 0.92,
          }}
        />

        {/* ── Ingredients layer ───────────────────────────────────────── */}
        <div
          className="absolute"
          style={{
            inset: '12% 10% auto',
            height: '44%',
            transform: 'scaleY(0.46) translateY(-10%)',
            transformOrigin: 'center top',
          }}
        >
          {/* Chia seeds (background scatter) */}
          {CHIA_POSITIONS.map((p, i) => (
            <div
              key={`chia-${i}`}
              className="absolute rounded-full"
              style={{
                top: p.top,
                left: p.left,
                width: 2.5,
                height: 2.5,
                background: '#1a1210',
                opacity: 0.65 + Math.random() * 0.2,
              }}
            />
          ))}

          {/* Granola clusters */}
          {GRANOLA.map((g, i) => (
            <div
              key={`granola-${i}`}
              className="absolute rounded-full"
              style={{
                top: g.top,
                left: g.left,
                width: g.size + 1,
                height: g.size,
                background: `radial-gradient(ellipse at 40% 35%, ${g.c}, rgba(120,80,40,0.9))`,
                transform: `rotate(${g.rot}deg)`,
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            />
          ))}

          {/* Almond slices */}
          {ALMONDS.map((a, i) => (
            <div
              key={`almond-${i}`}
              className="absolute"
              style={{
                top: a.top,
                left: a.left,
                width: a.size + 2,
                height: a.size,
                borderRadius: '40% 45% 45% 40%',
                background: 'linear-gradient(135deg, #e8d4b8, #c8a878)',
                transform: `rotate(${a.rot}deg)`,
                boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
              }}
            />
          ))}

          {/* Banana slices */}
          {BANANA_SLICES.map((b, i) => (
            <div key={`banana-${i}`} className="absolute" style={{ top: b.top, left: b.left }}>
              {/* Slice body */}
              <div
                className="rounded-full"
                style={{
                  width: b.size,
                  height: b.size * 0.85,
                  background: 'radial-gradient(ellipse at 40% 35%, #f6e8b0, #e8d080 60%, #d4b850)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.4)',
                }}
              />
              {/* Edge ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: -1,
                  border: '1.2px solid rgba(180,150,80,0.5)',
                }}
              />
            </div>
          ))}

          {/* Blueberries */}
          {BLUEBERRIES.map((b, i) => (
            <div
              key={`blueberry-${i}`}
              className="absolute rounded-full"
              style={{
                top: b.top,
                left: b.left,
                width: b.size,
                height: b.size,
                background: `radial-gradient(circle at 32% 28%, ${b.hl}, ${b.c} 65%, #140c38 100%)`,
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.25)',
              }}
            />
          ))}

          {/* Strawberry pieces */}
          {STRAWBERRIES.map((s, i) => (
            <div
              key={`strawberry-${i}`}
              className="absolute"
              style={{
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size * 0.85,
                transform: `rotate(${s.rot}deg)`,
              }}
            >
              {/* Berry body */}
              <div
                className="rounded-full"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(ellipse at 40% 32%, #e84840, #c42028 60%, #9a1820)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,120,100,0.2)',
                }}
              />
              {/* Seed dots */}
              {[0, 1, 2, 3, 4, 5].map((j) => {
                const a = (j / 6) * Math.PI * 2
                const cx = 50 + Math.cos(a) * 28
                const cy = 50 + Math.sin(a) * 25
                return (
                  <div
                    key={j}
                    className="absolute rounded-full"
                    style={{
                      width: 2,
                      height: 2,
                      top: `${cy}%`,
                      left: `${cx}%`,
                      background: '#f5e890',
                      opacity: 0.7,
                    }}
                  />
                )
              })}
            </div>
          ))}

          {/* Mint leaves */}
          {[
            { top: '28%', left: '38%', rot: -15, size: 12 },
            { top: '34%', left: '48%', rot: 25, size: 10 },
          ].map((m, i) => (
            <div
              key={`mint-${i}`}
              className="absolute"
              style={{
                top: m.top,
                left: m.left,
                width: m.size * 0.55,
                height: m.size,
                borderRadius: '45% 50% 50% 45%',
                background: 'linear-gradient(135deg, #4a9848, #307830)',
                transform: `rotate(${m.rot}deg)`,
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>

        {/* ── Rim specular highlight ──────────────────────────────────── */}
        <div
          className="absolute"
          style={{
            top: 4,
            left: '8%',
            right: '8%',
            height: '16%',
            borderRadius: '50%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 50%, transparent)',
            transform: 'scaleY(0.45)',
            transformOrigin: 'center top',
          }}
        />
      </div>

      {/* ── Steam wisps ───────────────────────────────────────────────── */}
      {!scattered && (
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 3,
                height: 24 + i * 4,
                background: 'linear-gradient(to top, rgba(255,255,255,0.12), transparent)',
                animation: `steam-rise ${2.8 + i * 0.5}s ease-out infinite`,
                animationDelay: `${i * 0.65}s`,
                transform: `translateX(${(i - 1.5) * 7}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Nutrition tags (glassmorphism) ────────────────────────────── */}
      {!scattered && (
        <>
          {/* Protein — top right */}
          <div
            className="absolute right-[2%] top-[22%] glass-warm px-3 py-[0.35rem] rounded-full border border-white/30"
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--nb-olive)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(45,42,36,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5 align-middle" style={{ background: 'var(--nb-olive)' }} />
            Protein 34g
          </div>

          {/* Omega-3 — mid right */}
          <div
            className="absolute right-[4%] top-[46%] glass-warm px-3 py-[0.35rem] rounded-full border border-white/30"
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--nb-olive)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(45,42,36,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5 align-middle" style={{ background: 'var(--nb-olive)' }} />
            Omega-3 ✓
          </div>

          {/* Fiber — bottom right */}
          <div
            className="absolute right-[6%] bottom-[26%] glass-warm px-3 py-[0.35rem] rounded-full border border-white/30"
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--nb-olive)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(45,42,36,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5 align-middle" style={{ background: 'var(--nb-olive)' }} />
            Fiber 12g
          </div>

          {/* GI Score — bottom left */}
          <div
            className="absolute left-[4%] bottom-[22%] glass-warm px-3 py-[0.35rem] rounded-full border border-white/30"
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--nb-olive)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(45,42,36,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5 align-middle" style={{ background: 'var(--nb-olive)' }} />
            GI Score: Low
          </div>
        </>
      )}
    </div>
  )
}
