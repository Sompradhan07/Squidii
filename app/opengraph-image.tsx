import { ImageResponse } from 'next/og'

/* Branded social card — rendered at build/request time, no binary asset needed.
   Next.js wires this into both openGraph.images and twitter.images automatically. */

export const alt = 'Squidii — Food That Fits Your Goals'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #faf8f3 0%, #f2ece2 55%, #f5efe6 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Kicker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '44px', height: '3px', background: '#5a6c48' }} />
          <div
            style={{
              fontSize: '24px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: '#5a6c48',
              fontWeight: 600,
            }}
          >
            Launching soon
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ fontSize: '96px', lineHeight: 1.04, color: '#1c1a16', fontWeight: 600 }}>
              Eating right
            </div>
            <div style={{ fontSize: '96px', lineHeight: 1.04, color: '#5a6c48', fontStyle: 'italic', fontWeight: 600 }}>
              is simple.
            </div>
          </div>
          <div style={{ fontSize: '34px', lineHeight: 1.3, color: '#58524a', marginTop: '22px', maxWidth: '900px' }}>
            Doing it every single day? That’s the hard part.
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '40px', color: '#1c1a16', fontWeight: 600, letterSpacing: '2px' }}>
            squidii.
          </div>
          <div style={{ fontSize: '26px', color: '#58524a' }}>
            Food That Fits Your Goals
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
