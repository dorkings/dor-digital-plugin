// Read a PUBLIC Instagram profile with a real browser and hand back the facts a
// landing page needs: display name, bio, follower count, profile picture and the
// visible grid images.
//
// Why a browser and not urllib: instagram.com answers a plain HTTP client with a
// 200 and roughly 600KB of JavaScript shell that contains no og: tags at all, so
// harvest_brand.py's --ig path always came back empty. A rendered page carries the
// og: tags and the grid, with no account and no login.
//
// It never logs in, never connects to an existing browser and never touches a
// Chrome profile. Instagram shows a "Log In / Sign Up" prompt over a public
// profile and serves the profile underneath it anyway, which is what is read here.
//
// It always writes the output file, even on refusal, so the caller can report what
// was missed and carry on. The exit code says what happened:
//   0  the profile rendered and at least a name or a picture came back
//   2  the profile page is not available (wrong handle, removed, or private)
//   3  a hard login wall or a rate limit, nothing readable behind it
//   4  the browser could not start (Playwright missing or no chromium)
//
// Usage: node ig_harvest.mjs <handle> <out.json>

import fs from 'node:fs';
import path from 'node:path';

const EXIT_OK = 0, EXIT_MISSING = 2, EXIT_BLOCKED = 3, EXIT_NO_BROWSER = 4;

const [handleArg, outArg] = process.argv.slice(2);
if (!handleArg || !outArg) {
  console.error('usage: node ig_harvest.mjs <handle> <out.json>');
  process.exit(1);
}
const handle = handleArg.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/.*$/, '').trim();
const out = path.resolve(outArg);

/** Always leave a file behind: a caller that cannot read a result cannot report one. */
function finish(code, payload, message) {
  try {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify({ handle, ok: code === EXIT_OK, ...payload }, null, 1), 'utf8');
  } catch (e) {
    console.error('could not write', out, e.message);
  }
  if (message) console.log(message);
  process.exit(code);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  finish(EXIT_NO_BROWSER, { error: 'playwright-missing' },
    'Playwright לא מותקן, אז הקציר מאינסטגרם דולג. אפשר להתקין עם: npm i playwright && npx playwright install chromium');
}

/** The pages Instagram serves instead of a profile, in both languages it answers in. */
const MISSING = [/Sorry, this page isn['’]t available/i, /מצטערים, דף זה אינו זמין/];
const RATE_LIMIT = [/Please wait a few minutes before you try again/i, /נסה שוב בעוד כמה דקות/];

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch (e) {
  finish(EXIT_NO_BROWSER, { error: 'chromium-missing', detail: e.message },
    'הדפדפן של Playwright לא מותקן, אז הקציר מאינסטגרם דולג. אפשר להתקין עם: npx playwright install chromium');
}

const page = await browser.newPage({
  viewport: { width: 1280, height: 1000 },
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  locale: 'he-IL',
});

try {
  await page.goto(`https://www.instagram.com/${handle}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
} catch (e) {
  await browser.close();
  finish(EXIT_BLOCKED, { error: 'navigation-failed', detail: e.message },
    'אינסטגרם לא נטען בזמן. ממשיכים בלי הקציר.');
}
// The grid loads after first paint, so give it a moment before reading.
await page.waitForTimeout(4000);

const data = await page.evaluate(() => {
  const meta = (p) => document.querySelector(`meta[property="${p}"]`)?.content || null;
  const body = document.body.innerText || '';

  // og:description is the one reliable line. Instagram answers in the locale it is
  // asked in, so both wordings are read, and the RTL marks it wraps Hebrew numbers
  // in are stripped first or the digits never match.
  const og = (meta('og:description') || '').replace(/[‎‏‪-‮]/g, '');
  const counts =
    og.match(/([\d.,KMB]+)\s+Followers?,\s*([\d.,KMB]+)\s+Following,\s*([\d.,KMB]+)\s+Posts?/i) ||
    og.match(/([\d.,KMB]+)\s+עוקבים,\s*([\d.,KMB]+)\s+במעקב,\s*([\d.,KMB]+)\s+פוסטים/);

  // The display name is the last thing in og:description in both languages, but the
  // page title carries it too ("NAME (@handle) • ...") and survives wording changes.
  const title = (document.title || '').replace(/[‎‏‪-‮]/g, '');
  const fromName =
    og.match(/from\s+(.+?)\s*$/i) ||
    og.match(/של\s+(.+?)\s+באינסטגרם/) ||
    title.match(/^(.+?)\s*\(@/);

  // The bio sits in the header block. Selectors churn, so read the header text and
  // drop the chrome lines (login prompts, the handle, the counters) rather than
  // depending on a class name that will be gone next month.
  const headerEl = document.querySelector('header') || document.body;
  const strip = (s) => s.replace(/[‎‏‪-‮]/g, '').trim();
  const rawLines = (headerEl.innerText || body).split('\n').map(strip).filter(Boolean);
  const NOISE = /^(log ?in|sign ?up|כניסה|הרשמה|follow|message|עקוב|הודעה|posts?|followers?|following|פוסטים|עוקבים|עוקב|במעקב)$/i;
  // A counter line is "128 posts", "126 עוקבים" and also "141 במעקב שלך", so the
  // trailing possessive is allowed for.
  const COUNTER = /^[\d.,KMB]+\s*(posts?|followers?|following|פוסטים|עוקבים|עוקב|במעקב)(\s+שלך)?$/i;
  const lines = rawLines.filter(l =>
    !NOISE.test(l) && !COUNTER.test(l) && l.toLowerCase() !== location.pathname.replace(/\//g, '').toLowerCase());

  const imgs = [...document.querySelectorAll('img')]
    .map(i => i.currentSrc || i.src)
    .filter(s => s && /cdninstagram|fbcdn/.test(s));

  return {
    title: document.title || null,
    ogDescription: og || null,
    profilePic: meta('og:image'),
    followers: counts ? counts[1] : null,
    following: counts ? counts[2] : null,
    posts: counts ? counts[3] : null,
    displayName: fromName ? fromName[1] : null,
    bioLines: lines.slice(0, 12),
    images: [...new Set(imgs)],
    bodySample: body.slice(0, 400),
  };
});

await browser.close();

if (MISSING.some(r => r.test(data.bodySample))) {
  finish(EXIT_MISSING, { ...data },
    `הפרופיל @${handle} לא זמין (שם משתמש שגוי, פרופיל פרטי או פרופיל שהוסר). ממשיכים בלי הקציר.`);
}
if (RATE_LIMIT.some(r => r.test(data.bodySample))) {
  finish(EXIT_BLOCKED, { ...data },
    'אינסטגרם הגביל את הקצב. ממשיכים בלי הקציר, ואפשר לנסות שוב בעוד כמה דקות.');
}
if (!data.displayName && !data.profilePic) {
  finish(EXIT_BLOCKED, { ...data },
    'אינסטגרם החזיר דף בלי פרטי פרופיל. ממשיכים בלי הקציר.');
}

// Instagram serves the grid and the avatar as thumbnails: the profile picture comes
// back at s100x100 and the tiles at s150x150, which are a few kilobytes each. Anything
// that small is useless for a palette and is dropped by the downstream harvester, so
// every size token in the URL is raised to 1080 before the URLs are handed over.
const fullSize = (u) => u.replace(/\b([sp])\d{2,4}x\d{2,4}\b/g, '$11080x1080');

// The profile picture first: it is the one image that is reliably the brand itself.
const imageUrls = [...new Set([data.profilePic, ...data.images].filter(Boolean))].map(fullSize);

finish(EXIT_OK, { ...data, imageUrls },
  `נקצר מאינסטגרם @${handle}: ${data.displayName || 'בלי שם תצוגה'}, ${data.followers || '?'} עוקבים, ${imageUrls.length} תמונות, ${data.bioLines.length} שורות ביו.`);
