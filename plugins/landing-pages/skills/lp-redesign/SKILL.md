---
name: lp-redesign
description: "Redesigns an existing live landing page from its URL without changing a single word of its copy: opens it in a real browser, captures before screenshots at 390 and 1280, extracts the visible copy, the images and the palette, arranges the copy in Dor's Gem format, maps it onto the 13 sections and reports which are missing, runs lp-build, captures after screenshots and produces a side by side before-after.html. Built for the live volunteer block of the masterclass. Use when the user gives a URL and says שפץ את הדף, תעצב מחדש, שיפוץ עיצובי, הדף שלי לא נראה טוב, redesign this page, make this page look good, /lp-redesign. A page that does not load within 20 seconds is reported once and replaced by the demo page, never retried."
version: 1.0.0
---

# lp-redesign: שיפוץ עיצובי לדף קיים, בלי לגעת במילה

## ההבטחה

> נותנים כתובת של דף שלא נראה טוב. יוצא אותו דף, אותו קופי מילה במילה, בעיצוב ברמה של דף הזהב. עם "לפני" ו"אחרי" זה לצד זה.

זה הבלוק שסוגר את המאסטרקלאס: מתנדב מהקהל נותן כתובת, והקהל רואה את השיפוץ קורה. לכן שלושה כללים גוברים על הכול:

1. **הקופי קדוש.** אף מילה לא משתנה, לא מתקצרת ולא "משתפרת". גם לא שגיאת כתיב. הסקיל הזה הוא סקיל עיצוב, וזה בדיוק מה שהוא מוכיח: שהעיצוב לבד עושה את ההבדל.
2. **בלי לנסות שוב.** כתובת שלא נטענת תוך 20 שניות מדווחת פעם אחת, ובאותו משפט עוברים לדף הדוגמה. ניסיון שני מול קהל הוא דקה של שקט, ודקה של שקט הורגת בלוק.
3. **בלי שאלות באמצע.** מה שלא ידוע הוא `[למלא]`. פרטי עסק, מספרים, תאריכים, שמות. לא מנחשים ולא שואלים את המתנדב.

הסקיל הזה **לא** בונה דף בעצמו. הוא מכין קלט ל-`lp-build`, מריץ אותו, ומודד לפני ואחרי. כל כללי העיצוב, 13 המקטעים והצ'קליסט של דור יושבים ב-`lp-build`, ורק שם.

## הקלט

| מה | מאיפה | אם חסר |
|---|---|---|
| כתובת הדף | הארגומנט הראשון | שואלים פעם אחת "מה הכתובת?", וזו השאלה היחידה |
| תיקיית עבודה | ארגומנט שני, אופציונלי | `./redesign-<שם הדומיין>/` |
| דף הדוגמה לנפילה | `demo/bad-page/index.html` בריפו של המאסטרקלאס | `find ~/nextlevel-masterclass ~/.claude -path '*demo/bad-page/index.html' 2>/dev/null \| head -1`. אין: ממשיכים בלי דף, ומדווחים |
| Playwright | `~/.lp-qa` (מותקן בשלב 4.2 של `lp-qa`) | מתקינים לפי אותו סעיף, שורה אחת בעברית לפני. נכשל: צילומים לא יהיו, החילוץ עובר ל-`curl`, ומדווחים |

## הצינור, שבעה שלבים

### שלב 1: פותחים בדפדפן אמיתי, ומצלמים "לפני"

הסקריפט פותח את הכתובת בכרום גלוי (הקהל רואה), מחכה עד 20 שניות, מצלם עמוד מלא ב-390 וב-1280, וגם מחלץ באותה פתיחה את הטקסט הנראה, את התמונות ואת הצבעים. **הכול בפתיחה אחת**, כי כל פתיחה נוספת היא סיכון נוסף מול הקהל.

שומרים אותו כ-`~/.lp-qa/redesign-capture.mjs`:

```js
// redesign-capture.mjs <url> <outDir> [before|after]
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
const [url, out, phase = 'before'] = process.argv.slice(2);
mkdirSync(join(out, phase), {recursive: true});
let b;
try { b = await chromium.launch({headless: false}); } catch (e) { b = await chromium.launch(); }
const shots = [[390, 844, 'mobile'], [1280, 800, 'desktop']];
let ok = true;
for (const [w, h, name] of shots) {
  const p = await (await b.newContext({viewport: {width: w, height: h}})).newPage();
  try { await p.goto(url, {timeout: 20000, waitUntil: 'domcontentloaded'}); }
  catch (e) { console.log('LOAD_FAIL ' + name + ' ' + String(e.message).split('\n')[0]); ok = false; await p.close(); break; }
  await p.waitForTimeout(1500);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(600);
  await p.screenshot({path: join(out, phase, name + '.png'), fullPage: true});
  if (name === 'desktop' && phase === 'before') {
    const data = await p.evaluate(() => {
      const vis = el => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0' && (r.width > 0 || r.height > 0); };
      const lines = [], imgs = [], seen = new Set();
      const walk = n => {
        if (n.nodeType === 3) {
          const t = n.textContent.replace(/\s+/g, ' ').trim(); const el = n.parentElement;
          if (!t || seen.has(t) || !el || !vis(el)) return;
          const tag = el.closest('h1,h2,h3,h4,h5,h6,button,a,li,blockquote,label,summary');
          lines.push({kind: tag ? tag.tagName.toLowerCase() : 'p', t}); seen.add(t); return;
        }
        if (n.nodeType !== 1) return;
        const tag = n.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'svg', 'template', 'head'].includes(tag) || !vis(n)) return;
        if (tag === 'img') imgs.push({src: n.currentSrc || n.src, alt: n.alt || '', w: n.naturalWidth, h: n.naturalHeight});
        if (tag === 'input' || tag === 'textarea' || tag === 'select') lines.push({kind: 'field', t: (n.placeholder || n.name || n.type || '').trim()});
        const m = (getComputedStyle(n).backgroundImage || '').match(/url\("?([^")]+)"?\)/);
        if (m && n.getBoundingClientRect().width > 200) imgs.push({src: m[1], alt: '', bg: true});
        for (const c of n.childNodes) walk(c);
      };
      walk(document.body);
      const cols = {};
      document.querySelectorAll('body,section,header,footer,div').forEach(el => { const r = el.getBoundingClientRect(); if (r.width < 300 || r.height < 40) return; const c = getComputedStyle(el).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)') cols[c] = (cols[c] || 0) + Math.round(r.width * r.height / 10000); });
      const btn = [...document.querySelectorAll('a,button')].filter(el => getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)' && el.getBoundingClientRect().width > 80).map(el => getComputedStyle(el).backgroundColor);
      const fonts = [...new Set([...document.querySelectorAll('h1,h2,p')].map(e => getComputedStyle(e).fontFamily))].slice(0, 4);
      return {title: document.title, lines, imgs, backgrounds: Object.entries(cols).sort((a, b) => b[1] - a[1]).slice(0, 8), buttons: [...new Set(btn)].slice(0, 4), fonts};
    });
    writeFileSync(join(out, phase, 'text.md'), data.lines.map(l => l.kind === 'p' ? l.t : '[' + l.kind + '] ' + l.t).join('\n'));
    writeFileSync(join(out, phase, 'images.json'), JSON.stringify(data.imgs, null, 1));
    writeFileSync(join(out, phase, 'palette-css.json'), JSON.stringify({title: data.title, backgrounds: data.backgrounds, buttons: data.buttons, fonts: data.fonts}, null, 1));
    console.log('text lines=' + data.lines.length + ' images=' + data.imgs.length);
  }
  await p.close();
}
await b.close();
console.log(ok ? 'CAPTURE_OK' : 'CAPTURE_FAIL');
```

```bash
URL="<הכתובת>"; OUT="$PWD"
cd ~/.lp-qa && node redesign-capture.mjs "$URL" "$OUT" before
```

**הערת במה, וזה הכלל הקשיח של השלב:** אם הפלט מכיל `LOAD_FAIL` או `CAPTURE_FAIL`, אומרים משפט אחד בעברית, "הדף לא נטען תוך 20 שניות, ממשיך עם דף הדוגמה", מחליפים את `URL` ב-`file://<נתיב>/demo/bad-page/index.html`, ומריצים את אותה פקודה **פעם אחת** על דף הדוגמה. **לא מנסים את הכתובת המקורית שוב.** לא עם `waitUntil` אחר, לא עם timeout ארוך יותר, לא "רק עוד פעם אחת". גם אם המתנדב אומר "זה בטוח עובד". הכתובת המקורית נרשמת בדיווח בסוף, והמתנדב מקבל את הדף שלו אחרי ההרצאה.

מה שיש אחרי השלב: `before/mobile.png`, `before/desktop.png`, `before/text.md`, `before/images.json`, `before/palette-css.json`.

### שלב 2: מחלצים קופי, תמונות ופלטה

**הקופי** כבר ב-`before/text.md`: כל טקסט נראה בסדר ה-DOM, עם תג לכותרות, כפתורים, פריטי רשימה, ציטוטים ושדות. טקסט מוסתר, תפריטים מקופלים ו-`noscript` לא נכנסו, וזה בכוונה: מה שהמבקר לא רואה הוא לא הקופי.

**התמונות** יורדות ל-`assets/img/original/`, בגודל המקורי, בלי שינוי:

```bash
node -e '
const im = require("./before/images.json"); const { execSync } = require("child_process");
require("fs").mkdirSync("assets/img/original", { recursive: true });
let n = 0;
for (const i of im) {
  if (!i.src || i.src.startsWith("data:")) continue;
  if (i.w && i.w < 200 && !i.bg) continue;
  const ext = (i.src.split("?")[0].match(/\.(png|jpe?g|webp|gif|svg|avif)$/i) || [0, "jpg"])[1];
  const f = "assets/img/original/img_" + String(++n).padStart(2, "0") + "." + ext;
  try { execSync("curl -sL --max-time 20 -o \"" + f + "\" \"" + i.src + "\""); console.log(f, "|", i.alt || "(בלי alt)", "|", i.w ? i.w + "x" + i.h : ""); }
  catch (e) { console.log("נכשל:", i.src); }
}'
```

תמונות מתחת ל-200px נשארות בחוץ (אייקונים, פייביקון). ה-`alt` המקורי נשמר לצד כל קובץ, כי הוא הרמז היחיד למה יש בתמונה עד שפותחים אותה. **פותחים כל תמונה לפני שכותבים לה `alt` חדש**, לפי הכלל של `lp-build`.

**הפלטה** בשני מקורות. הראשון הוא `before/palette-css.json`: רקעים לפי שטח, צבעי כפתורים ופונטים, כלומר מה שהדף באמת עושה. השני הוא `harvest_brand.py` של `lp-brief`, שמוציא `palette.json` ו-`facts.json` מהתמונות:

```bash
H="$(find "${CLAUDE_PLUGIN_ROOT:-$HOME/.claude}" -name harvest_brand.py 2>/dev/null | head -1)"
[ -n "$H" ] && python3 "$H" assets/harvest "$URL" || echo "אין harvest_brand.py או אין פייתון, ממשיך עם palette-css.json בלבד"
```

`facts.json` הוא מקור האמת לכל מספר או תואר שיופיע בדף. מה שלא שם ולא בקופי הוא `[למלא]`.

### שלב 3: מסדרים לפורמט הג'ם, בלי לשנות מילה

עכשיו כותבים `copy.md` בפורמט שהג'ם של דור מוציא: פרוזה בלי כותרות, הערות עיצוב בסוגריים. **הפעולות המותרות הן בדיוק אלה, ושום דבר מעבר:**

| מה שיש ב-`text.md` | מה שנכתב ב-`copy.md` |
|---|---|
| שורה `[h1]`, `[h2]`, `[h3]` | אותה שורה, בבולד `**...**` |
| שורה `[button]` או `[a]` שהיא כפתור (טקסט קצר, פעולה) | `(כפתור: <הטקסט המדויק>)` |
| קבוצת `[field]` | `(טופס: <השדות, בסדר>)` |
| שורה `[blockquote]`, או ציטוט עם שם אחריו, **רק אם הדף המקורי מציג אותו כעדות** | `עדויות -> *"<הציטוט>" - <השם כפי שהוא>*` |
| שורה `[li]` ברשימה של "מתאים לך אם" | `✓ <הטקסט>`, ובגרסת "לא בשבילך" `✕ <הטקסט>` |
| שורה `[li]` שהיא פריט תוכן (שיעור, בונוס, שלב) | השורה כמו שהיא, בבולד אם הייתה כותרת |
| תמונה שהייתה בין שתי פסקאות | `(תמונה של <ה-alt המקורי, או "תמונה" אם אין>)` באותו מקום, עם שם הקובץ ב-`assets/img/original/` |
| לוגו | `(לוגו קטן, assets/img/original/img_NN)` בראש |
| סרטון מוטמע | `(וידאו: <הכתובת>)` באותו מקום |
| ניווט, כפתור עוגיות של הדף המקורי, פוטר עם קישורים משפטיים | **לא נכנסים לקופי.** נרשמים בדיווח: "הושמטו מהקופי: תפריט, באנר קוקיז ופוטר. הפוטר החדש נבנה ב-`/lp-legal`" |
| מחיר | השורה כמו שהיא, בבולד |
| טקסט שהוא ברור `[למלא]` בדף המקורי (Lorem, "כאן יבוא") | `[למלא: <מה אמור להיות שם>]` |

**מה אסור, במפורש:** לסדר מחדש פסקאות, לחבר או לפצל משפטים, להוסיף משפט מעבר, לתקן כתיב, להחליף מילה בנרדפת, להוסיף "בלי" בהירו שלא היה, להוסיף עדות, להוסיף שאלה ל-FAQ. אם הקופי המקורי חלש, הדף החדש יהיה יפה עם קופי חלש, **וזה הנקודה של הבלוק.** את הקופי משפרים אחר כך עם הג'ם, לא כאן.

**אימות שהקופי לא השתנה**, בסקריפט, לפני שממשיכים:

```bash
python3 - <<'EOF'
import re
norm = lambda s: re.sub(r'\s+', ' ', re.sub(r'[*_`>#\[\]✓✕"“”]', '', s)).strip()
S = norm(open('before/text.md', encoding='utf-8').read())
bad = []
for i, l in enumerate(open('copy.md', encoding='utf-8').read().split('\n'), 1):
    t = l.strip()
    if not t or t.startswith('(') or t.startswith('**(') or t.startswith('<!--') or '[למלא' in t: continue
    t = re.sub(r'^עדויות ->\s*', '', t)
    t = re.sub(r'\s-\s[^-]{1,30}$', '', t) if l.startswith('עדויות ->') else t
    t = norm(t)
    if t and t not in S: bad.append((i, t[:70]))
print('שורות בקופי שאין בדף המקורי:', len(bad))
for i, t in bad: print(' ', i, t)
EOF
```

**הערך שעובר: 0.** כל שורה שמודפסת היא מילה שהשתנתה, ואותה מתקנים בחזרה למקור. (שורות שהסקריפט מדפיס בגלל תו מיוחד בלבד, למשל גרש בודד, בודקים בעין ורושמים בדיווח.)

**ואז מזהים אילו מ-13 המקטעים קיימים.** מריצים על `copy.md` את סקריפט הזיהוי משלב א2 של `lp-build` (13 הסימנים), וקוראים את הפלט מול `references/13-sections.md` של `lp-build`. לרוב הדפים שמגיעים לבלוק הזה יש 4 עד 7 מקטעים מתוך 13, וזה בסדר: **הדף נבנה ממה שיש.** מה שחסר נרשם בשורה לכל מקטע, בנוסח הקבוע: "חסר מקטע 4 (סטוריטלינג ונרמול): בלעדיו הקורא נשאר עם התחושה שהבעיה היא בו". שם מוצר שמופיע בהירו נרשם כסטייה, ולא מוזז.

**ו-`brief.md` מינימלי**, שורה לכל שדה, מהקופי ומ-`facts.json` בלבד:

```
שם הלקוח: [מהקופי או [למלא]]
תואר: [מהקופי או [למלא]]
שם המוצר: [הבולד הראשון שמציג מוצר, או [למלא]]
מחיר: [מהקופי או אין]
פעולה: [טופס / וואטסאפ / כפתור לדף חיצוני, לפי מה שהיה בדף, עם הכתובת המקורית של הכפתור]
פרטי עסק: [מהפוטר המקורי אם היו, אחרת [למלא]]
הוכחות: יש/אין
סיפור אישי: יש/אין
בונוסים: יש/אין
הכתובת המקורית: <URL>
מקור התמונות: הדף המקורי של הלקוח, assets/img/original/
```

השורה האחרונה היא מה שמאפשר לפריט 8 בצ'קליסט של דור (זכויות יוצרים) לעבור: התמונות הן של הלקוח, מהדף שלו.

### שלב 4: `lp-build`

מפעילים את `landing-pages:lp-build` על תיקיית העבודה, כרגיל. הוא יזהה שאין כותרות, ירוץ דרך שלב א2, ויבנה. שני דברים ששווה לדעת מראש:

- **הפלטה.** בשיפוץ יש כבר צבעי מותג על המסך, ולכן **הם גוברים**. `before/palette-css.json` (הרקע או הכפתור של הדף המקורי) ו-`assets/harvest/palette.json` מזינים את מסלול 2 של שלב ב ב-`lp-build`, וזה מסלול שלא שואל כלום. נייבי וזהב אינה ההמלצה כאן, היא רק אחת משמונה הפלטות, והיא נבחרת רק אם הנישה מובילה אליה. אם המתנדב אומר בקול "אבל הצבע שלי הוא X", זה מסלול 1 והוא גובר גם על הקציר. אחרי הבנייה זו בכל מקרה החלפה של שש שורות ב-`:root`, לא עצירה.
- **התמונות.** `lp-build` ממיר את `assets/img/original/*` ל-webp בגודל התצוגה כפול שתיים, וכותב `alt` רק אחרי שפתח את התמונה. הקבצים המקוריים נשארים בתיקייה, כי הם הראיה למקור.

`lp-build` מסיים בבדיקה העצמית שלו, בסעיף המהירות ובצ'קליסט של דור. הכול כרגיל.

### שלב 5: מצלמים "אחרי" ובונים את ההשוואה

```bash
cd ~/.lp-qa && node redesign-capture.mjs "file://$OUT/index.html" "$OUT" after
```

ואז `before-after.html` בתיקיית העבודה, זה לצד זה, עם מעבר בין מובייל לדסקטופ. קובץ אחד, בלי תלויות, RTL:

```bash
node -e '
const fs = require("fs"), { execSync } = require("child_process");
const dim = f => { try { const o = execSync("sips -g pixelWidth -g pixelHeight " + f).toString(); return [/pixelWidth: (\d+)/.exec(o)[1], /pixelHeight: (\d+)/.exec(o)[1]]; } catch (e) { return ["", ""]; } };
const img = (f, alt) => { const [w, h] = dim(f); return "<img src=\"" + f + "\" alt=\"" + alt + "\" width=\"" + w + "\" height=\"" + h + "\" loading=\"lazy\" decoding=\"async\">"; };
const url = process.argv[1] || "";
fs.writeFileSync("before-after.html", `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>לפני ואחרי</title>
<style>*{box-sizing:border-box;margin:0}body{font-family:Heebo,-apple-system,Arial,sans-serif;background:#0B0F19;color:#F2EDE6;padding:20px 16px;text-align:center}h1{font-size:clamp(1.3rem,3vw,2rem);margin-bottom:6px}p{color:#AEB5C4;font-size:.95rem;margin-bottom:16px;word-break:break-all}
.tabs{display:inline-flex;gap:8px;margin-bottom:18px}.tabs button{min-height:44px;padding:10px 22px;border-radius:999px;border:1px solid rgba(201,169,110,.5);background:transparent;color:#E9CC82;font:inherit;font-weight:700;cursor:pointer}.tabs button[aria-pressed=true]{background:#C9A96E;color:#1A1408}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:1400px;margin-inline:auto}.grid figure{background:#121826;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:12px;overflow:auto;max-height:85vh}figcaption{font-weight:800;color:#E9CC82;margin-bottom:10px;font-size:1.05rem}img{width:100%;height:auto;display:block;border-radius:8px}
.grid.mobile figure{max-width:430px;margin-inline:auto;width:100%}[hidden]{display:none!important}@media(max-width:720px){.grid{grid-template-columns:1fr}}</style></head><body>
<h1>לפני ואחרי</h1><p>${url}</p>
<div class="tabs" role="group" aria-label="גודל מסך"><button type="button" aria-pressed="true" data-v="mobile">מובייל 390</button><button type="button" aria-pressed="false" data-v="desktop">דסקטופ 1280</button></div>
<div class="grid mobile" id="mobile"><figure><figcaption>לפני</figcaption>${img("before/mobile.png", "הדף המקורי במובייל")}</figure><figure><figcaption>אחרי</figcaption>${img("after/mobile.png", "הדף החדש במובייל")}</figure></div>
<div class="grid" id="desktop" hidden><figure><figcaption>לפני</figcaption>${img("before/desktop.png", "הדף המקורי בדסקטופ")}</figure><figure><figcaption>אחרי</figcaption>${img("after/desktop.png", "הדף החדש בדסקטופ")}</figure></div>
<script>document.querySelectorAll(".tabs button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-pressed",x===b));document.getElementById("mobile").hidden=b.dataset.v!=="mobile";document.getElementById("desktop").hidden=b.dataset.v!=="desktop";}));</script>
</body></html>`);
console.log("before-after.html נכתב");
' "$URL"
open before-after.html
```

הצילומים גבוהים (עמוד מלא), ולכן כל טור גולל בנפרד בתוך `max-height:85vh`. ככה הקהל רואה את ההירו של שניהם באותו מסך, וגולל כל אחד בקצב שלו.

### שלב 6: לא ידוע שווה `[למלא]`

כל מה שלא היה בדף המקורי ולא ב-`facts.json` נשאר `[למלא]` בתוך `.fill`, ונכנס לרשימת "מה נשאר לך": שם העסק הרשום, ח.פ., מייל, תאריך, מספרים. **לא מנחשים מה המתנדב "בטח" התכוון.** אם הדף המקורי לא הציג מחיר, בדף החדש אין מחיר, ואין `[למלא: מחיר]` בכרטיס מחיר ענק, כי סקשן בלי חומר נמחק לפי הכלל של `lp-build`.

### שלב 7: דיווח בעברית

הודעה אחת, בסדר הזה:

1. **מה נמצא:** "הדף המקורי: [N] מילים, [N] תמונות, [N] מתוך 13 המקטעים." ואז שורה לכל מקטע חסר עם התפקיד שלו, ושורה לכל סטייה (סדר, שם מוצר בהירו).
2. **מה השתנה:** העיצוב בלבד. הפלטה שנבחרה, מספר הסקשנים בדף החדש, מה הוחלף ברכיב (למשל "רשימת התכונות הפכה לכרטיסי `.deliv` עם אייקוני קו זהב").
3. **מה לא השתנה:** "הקופי: 0 מילים שונו, נבדק בסקריפט." ומה הושמט (תפריט, באנר, פוטר) ולמה.
4. **מה נמדד:** תוצאות `lp-build` כמו שהן: CTA בהירו ב-390, השערים, המהירות, הצ'קליסט של דור בשלוש קבוצות.
5. **הקבצים:** `index.html`, `before-after.html`, `before/`, `after/`, `assets/img/original/`. ואיך פותחים.
6. **מה נשאר לך:** כל `[למלא]`, מהחוסם לפחות חוסם.
7. **השלב הבא:** "ממשיך ל-`/lp-legal` ואז ל-`/lp-qa`", ואם הבלוק בלייב, "ואפשר לעצור כאן ולהמשיך אחרי ההרצאה". אם רצנו על דף הדוגמה במקום על הכתובת שנמסרה, השורה הראשונה בדיווח אומרת את זה, עם הכתובת המקורית, כדי שהמתנדב יקבל את הדף שלו אחר כך.

## מה הסקיל הזה לא עושה

- לא כותב קופי, לא משפר קופי, לא מוסיף מקטעים חסרים. זה `/lp-copy` או הג'ם של דור, אחרי ההרצאה.
- לא מפרסם. `/lp-ship` נפרד, ורק אם המתנדב ביקש.
- לא מנסה כתובת שנייה, ולא מנסה את אותה כתובת פעמיים.
- לא מוריד תמונות מאתרים אחרים, רק מהדף שנמסר. תמונה שהייתה בדף המקורי היא של הלקוח, וזה כל מה שמותר.
