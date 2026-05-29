import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

/* ── Allowed answer values per question ──────────────────────────────────── */
const ALLOWED: Record<string, readonly string[]> = {
  q1:  ['bengaluru','mumbai','delhi','hyderabad','pune','chennai','other'],
  q2:  ['professional','student','entrepreneur','freelancer','homemaker','other'],
  q3:  ['lose-fat','muscle','energy','gut','nutrition','condition'],
  q4:  ['no-plan','no-cook','confused','consistency','expensive','no-options'],
  q5:  ['daily','3-5x','1-2x','rarely'],
  q6:  ['extremely','very','somewhat','not'],
  q7:  ['meal-prep','diet-plan','coach','delivery','app','none'],   // multi
  q8:  ['u120','120-150','150-200','200-250','250p'],
  q9:  ['definitely','interested','maybe','no'],
  q10: ['results','convenient','price','personal','experts','quality'], // multi
}

function sanitizeString(v: unknown, maxLen = 512): string {
  if (typeof v !== 'string' && !Array.isArray(v)) return ''
  const raw = Array.isArray(v) ? v.join(', ') : v
  return raw.trim().slice(0, maxLen).replace(/[<>]/g, '')
}

function validateAnswer(key: string, raw: unknown): string {
  const allowed = ALLOWED[key]
  if (!allowed) return ''

  if (Array.isArray(raw)) {
    const valid = raw.filter((x): x is string => typeof x === 'string' && allowed.includes(x))
    return valid.join(', ')
  }

  if (typeof raw === 'string' && allowed.includes(raw)) return raw
  return ''
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    console.error('[survey-submit] GOOGLE_SHEET_WEBHOOK_URL not set')
    return NextResponse.json({ success: false, error: 'Webhook not configured' }, { status: 500 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  /* Validate and sanitize each answer */
  const answers = Object.fromEntries(
    ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'].map((k) => [k, validateAnswer(k, body[k])])
  )

  /* Require at minimum Q1–Q3 answered */
  if (!answers.q1 || !answers.q2 || !answers.q3) {
    return NextResponse.json({ success: false, error: 'Incomplete survey' }, { status: 400 })
  }

  const payload = {
    submissionId: randomUUID(),
    timestamp:    new Date().toISOString(),
    ...answers,
    deviceType: sanitizeString(body.deviceType, 32),
    browser:    sanitizeString(body.browser,    64),
    referrer:   sanitizeString(body.referrer,   256),
  }

  try {
    const res = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      console.error('[survey-submit] Webhook returned', res.status)
      return NextResponse.json({ success: false, error: 'Upstream error' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[survey-submit] Fetch failed', err)
    return NextResponse.json({ success: false, error: 'Network error' }, { status: 502 })
  }
}
