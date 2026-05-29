'use client'

/**
 * CSS-only bowl skeleton — shown while WebGL loads.
 * Matches the new deeper ceramic bowl tilted ~41° toward the viewer
 * so there's no visual jump when the 3D scene arrives.
 */
export default function BowlSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden>

      {/* Warm ambient glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: '82%',
          height: '72%',
          background: 'radial-gradient(ellipse at 44% 40%, rgba(220,176,110,0.18), transparent 64%)',
          filter: 'blur(28px)',
        }}
      />

      {/* Contact shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '13%',
          width: '54%',
          height: '20px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(36,24,10,0.38), transparent 70%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Bowl — perspective tilt mimics the 3D scene */}
      <div
        style={{
          width: 'clamp(230px, 44vw, 440px)',
          aspectRatio: '1.12 / 1',
          perspective: '920px',
          animation: 'float-slow 6s ease-in-out infinite',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{ transform: 'rotateX(54deg)', transformStyle: 'preserve-3d' }}
        >
          {/* Bowl exterior — warm oat ceramic */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(160deg, #f0e6d0 0%, #e2d2b4 48%, #cbb892 100%)',
              boxShadow: '0 26px 56px rgba(36,20,8,0.30), inset 0 -8px 22px rgba(0,0,0,0.12)',
            }}
          />

          {/* Food fill — colourful layered toppings */}
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              inset: '7%',
              background:
                'radial-gradient(circle at 34% 28%, #f8f2e6 0%, #eee0c6 38%, #e0c8a0 68%, #c8a872 100%)',
            }}
          >
            {/* Scattered ingredient dots */}
            {[
              { c: '#bf1826', x: '26%', y: '32%', s: 14 }, /* strawberry */
              { c: '#f0d648', x: '58%', y: '26%', s: 17 }, /* banana */
              { c: '#1a0c3e', x: '44%', y: '56%', s: 11 }, /* blueberry */
              { c: '#2a7630', x: '70%', y: '58%', s: 13 }, /* mint */
              { c: '#b87830', x: '36%', y: '68%', s: 12 }, /* granola */
              { c: '#1a0c3e', x: '65%', y: '42%', s: 10 }, /* blueberry */
              { c: '#bf1826', x: '50%', y: '38%', s: 12 }, /* strawberry */
              { c: '#f0d648', x: '32%', y: '50%', s: 13 }, /* banana */
              { c: '#c88000', x: '52%', y: '62%', s: 8  }, /* honey */
            ].map((d, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: d.x,
                  top: d.y,
                  width: d.s,
                  height: d.s,
                  background: d.c,
                  boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.22)',
                }}
              />
            ))}
          </div>

          {/* Rim highlight */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '4%',
              border: '2px solid rgba(255,255,255,0.16)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
