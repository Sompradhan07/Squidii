/**
 * Nura survey backend — Google Apps Script Web App
 * ------------------------------------------------------------------
 * Receives survey submissions from the Next.js API route
 * (app/api/survey-submit/route.ts → process.env.GOOGLE_SHEET_WEBHOOK_URL)
 * and appends one row per submission to the bound Google Sheet.
 *
 * PAYLOAD SHAPE sent by the site (10-question survey, no contact field):
 *   { submissionId, timestamp, q1..q10, deviceType, browser, referrer }
 *
 * ── HOW TO UPDATE YOUR EXISTING BACKEND ──────────────────────────
 * 1. Open your Google Sheet → Extensions → Apps Script.
 * 2. Replace the whole Code.gs with THIS file's contents → Save.
 * 3. (One-time) Run `setupHeaders` once and authorize when prompted —
 *    this (re)writes the header row to match the new questions.
 *    ⚠ If your sheet still has OLD columns/data, clear it first
 *    (or make a fresh tab named "Responses") so columns line up.
 * 4. Deploy the SAME web app so the /exec URL does NOT change:
 *    Deploy → Manage deployments → (your deployment) → ✏️ Edit →
 *    Version: "New version" → Deploy.
 *    (Keep: Execute as = Me, Who has access = Anyone.)
 * 5. The existing GOOGLE_SHEET_WEBHOOK_URL stays valid — no change
 *    needed in Netlify. (Only if you create a brand-new deployment
 *    does the URL change; then update the Netlify env var.)
 * ------------------------------------------------------------------
 */

// Sheet tab to write to (created automatically if missing).
var SHEET_NAME = 'Responses';

// [ payload key, human-friendly column header ] — order = column order.
var FIELDS = [
  ['submissionId', 'Submission ID'],
  ['timestamp',    'Timestamp'],
  ['q1',  'City'],
  ['q2',  'Occupation'],
  ['q3',  'Workout frequency'],
  ['q4',  'Healthy-eating relationship'],
  ['q5',  'Primary goal'],
  ['q6',  'Hardest part'],
  ['q7',  'Frustration frequency'],
  ['q8',  'Tried recently'],
  ['q9',  'Expected price / meal'],
  ['q10', 'Interested in Nura'],
  ['deviceType', 'Device'],
  ['browser',    'Browser'],
  ['referrer',   'Referrer'],
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function headerRow_() {
  return FIELDS.map(function (f) { return f[1]; });
}

/** Run this ONCE manually to write/refresh the header row. */
function setupHeaders() {
  var sheet = getSheet_();
  sheet.getRange(1, 1, 1, FIELDS.length).setValues([headerRow_()]);
  sheet.setFrozenRows(1);
}

/** Receives a POST from the Nura site and appends a row. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // serialize concurrent submissions

    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    // Write headers if the sheet is empty.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headerRow_());
      sheet.setFrozenRows(1);
    }

    var row = FIELDS.map(function (f) {
      var v = data[f[0]];
      return (v === undefined || v === null) ? '' : v;
    });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Health check — visiting the /exec URL in a browser returns ok. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'nura-survey' }))
    .setMimeType(ContentService.MimeType.JSON);
}
