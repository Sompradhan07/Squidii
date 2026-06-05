import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

/* ── Allowed answer values per question — 11-question validation survey ───── */
const ALLOWED: Record<string, readonly string[]> = {
  q1:  ['bengaluru','mumbai','delhi','hyderabad','pune','other'],
  q2:  ['professional','student','other'],
  q3:  ['5plus','3-4','1-2','rarely'],
  q4:  ['want-unsure','know-inconsistent','track','dont-think'],
  q5:  ['fat-loss','muscle','healthier','condition'],
  q6:  ['figuring','no-time','consistency','affordable'],
  q7:  ['daily','few-week','sometimes','rarely'],
  q8:  ['meal-prep','diet-app','meal-service','havent'],
  q9:  ['u100','100-150','150-200','200plus'],
  q10: ['yes','maybe','no'],
  // q11 (early-access contact) is free text — validated via sanitizeString, not an allow-list
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

  /* Validate and sanitize each multiple-choice answer (q1–q10) */
  const answers = Object.fromEntries(
    ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'].map((k) => [k, validateAnswer(k, body[k])])
  )

  /* Q11 — early-access contact (WhatsApp / email) is free text, optional */
  const q11 = sanitizeString(body.q11, 256)

  /* Require at minimum: city, primary goal, and interest level */
  if (!answers.q1 || !answers.q5 || !answers.q10) {
    return NextResponse.json({ success: false, error: 'Incomplete survey' }, { status: 400 })
  }

  const payload = {
    submissionId: randomUUID(),
    timestamp:    new Date().toISOString(),
    ...answers,
    q11,
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
