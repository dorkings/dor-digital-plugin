---
name: lp-qa
description: "Quality gate for a Hebrew RTL landing page before it goes live. Runs the full Playwright landing-qa gate on all three files (index.html, legal.html, 404.html) across 6 viewport widths (320/360/390/430/768/1280), plus floating element coverage in three separate scroll states, computed colour contrast for every visible text including the footer and .fill markers, verification of every measurable accessibility statement claim, the external quality gate of four tools (impeccable anti pattern detection, design-taste-frontend, review-animations against Emil Kowalski's motion standard, and Playwright MCP for live page inspection, each skipped gracefully when not installed), the hard grep bans and accessibility checks, then returns PASS or FAIL with an ordered fix list in Hebrew. Never blocks the pipeline: a missing prerequisite is reported and skipped. Use when asked to QA a landing page, run the gate, check a page before shipping, verify responsiveness, audit accessibility or contrast, or in Hebrew: בדיקת איכות לדף נחיתה, שער QA, תריץ את השער, תבדוק את הדף, לבדוק דף נחיתה לפני פרסום, בדיקת נגישות, בדיקת ניגודיות, בדיקת מובייל, בדיקת תנועה, בדיקת אנטי פטרנים, האם הדף עובר, גלישה אופקית, מילים בודדות בשורה, הבאנר מכסה, אימות הצהרת נגישות, בדיקה של הדף המשפטי ודף 404."
version: 1.0.0
---

# lp-qa: שער האיכות של הדף

## 1. מה הסקיל הזה עושה

מריץ שש שכבות בדיקה על דף נחיתה בעברית, ומחזיר `PASS` או `FAIL` עם רשימת תיקונים ממוקדת בעברית:

1. **שער `landing-qa.mjs`** בפלייטרייט, על **שלושת הקבצים** ובכל **ששת הרוחבים** (סעיף 4.2.1).
2. **`cover-check.mjs`** לכיסוי בידי אלמנטים צפים, בשלושה מצבי גלילה נפרדים (סעיף 4.5).
3. **`contrast-check.mjs`** לניגודיות מחושבת של כל טקסט נראה, כולל הפוטר וסימוני `.fill` (סעיף 4.6).
4. **`claims-check.mjs`** לאימות כל טענה בהצהרת הנגישות מול המדידה בפועל (סעיף 4.7).
5. **שער האיכות החיצוני** (סעיף 5): `impeccable detect` לאנטי-פטרנים, `design-taste-frontend` לתחושת תבנית, `review-animations` לתנועה מול הסטנדרט של אמיל קובלסקי, ו-Playwright MCP שמאפשר לקלוד לראות את הדף החי. ארבעתם חיצוניים, וכל אחד שלא מותקן מדולג בחן ונרשם `לא נבדק`.
6. **grep על האיסורים הקשיחים** של הנוסחה, תמיד, גם כששער הפלייטרייט עובר, ובדיקות נגישות בקוד.

### הכלל שמחזיק את כל הסקיל: בודקים את שלושת הקבצים, לא רק את index

`index.html`, `legal.html`, `404.html`, שלושתם, בכל ששת הרוחבים, בשער המלא. דף משפטי שנשבר במובייל הוא באג בדיוק כמו הירו שנשבר.

זה לא ניסוח, זו מסקנה ממה שקרה. `lp-build` שלב ט מריץ את הבדיקות על `index.html` בלבד, מסיבה טובה: בשלב ההוא שני הקבצים האחרים עוד לא נולדו. הסקריפט של `lp-legal` כן נוגע בשלושתם, אבל הוא מודד כיסוי, גודל טקסט ומצבי נגישות, **ולא מילה בודדת בשורה ולא גלישה אופקית**. מכאן שנשאר חור: אחרי ש-`lp-legal` יוצר את `legal.html` ואת `404.html`, אף שער לא מריץ עליהם את השער המלא.

**הבאג היחיד שנולד בסבב הביקורת האחרון נפל בדיוק בחור הזה:** `legal.html` נשבר על `orphans` ב-320 וב-390, ואף שער לא תפס אותו, כי הדף השיווקי עבר וזה נראה כמו סיום.

**הכלל: `lp-qa` הוא השער היחיד שרואה את כל שלושת הקבצים אחרי שכולם קיימים. לכן הוא זה שמריץ עליהם את השער המלא. מה שלא נמדד יישבר.**

## 2. חוקי ההבטחה (מחייבים)

ההבטחה של המוצר היא 20 דקות עבודה מהמשתמש, ומשם הצינור רץ לבד. לכן:

- **אין שאלות באמצע.** לא שואלים אם להריץ, לא שואלים על איזה קובץ, לא שואלים אם לתקן. מריצים ומתקנים.
- **אין עצירות אישור.** עצירה לאישור היא ברירת מחדל כבויה. נדלקת רק אם המשתמש אמר במפורש שהוא רוצה לאשר בדרך.
- **דרישת קדם חסרה לא מפילה כלום.** מדווחים בעברית מה דולג, ממשיכים לשכבה הבאה, ובסיכום כותבים מה לא נבדק.
- **לא מסמנים PASS על סמך הנחה.** אם השכבה לא רצתה, כותבים "לא נבדק" ולא "עבר".
- מה שלא ניתן להסיק מהקבצים עצמם מסומן `[למלא]`. לא ממציאים alt, כיתוב, פרטי עסק או מספרים.

## 3. שלב 0: איסוף הקבצים

```bash
DIR="$(pwd)"            # או התיקייה שהמשתמש ציין
ls -la "$DIR"/*.html
```

קובעים נתיבים **אבסולוטיים** לכל דף. שער הפלייטרייט דורש `file://` מלא, נתיב יחסי פשוט לא עובד:

```
file:///Users/<user>/<project>/index.html
```

לא `./index.html`, לא `index.html`, לא `file://index.html`.

## 4. שלב 1: שער landing-qa.mjs

### 4.1 מה השער בודק

| בדיקה | מה נכשל |
|---|---|
| `overflow` | גלישה אופקית: `scrollWidth` גדול מ-`clientWidth` |
| `clipped` | תוכן שנדחף מחוץ לחלון, נתפס גם כשהוא מוסתר ב-`overflow:hidden` |
| `orphans` | שורה שמחזיקה מילה בודדת קצרה (כותרות וגם פסקאות). כתובת ארוכה שממלאת שורה שלמה היא תקינה |
| `offcenter` | עד 640px: תמונה או `figure` שהחלק **הנראה** שלה (אחרי החיתוך של המסגרות) יושב יותר מ-6px מהמרכז |
| `zeroimg` | תמונה שהפריסה הציבה אבל היא נמדדת בגובה 0. גרסה רספונסיבית שמוסתרת ב-`display:none` אינה שבורה |
| `nodims` | `<img>` בלי `width` **וגם** `height` כתכונות (קפיצת פריסה) |
| `smalltext` | טקסט נראה מתחת ל-14px, כולל טקסט בתוך מוקאפים |
| `touch` | `a.cta`, `button`, `summary`, `input` בגובה קטן מ-44px |
| `hr` | קיום `<hr>` בדף |
| `fade` | גרדיאנט `90deg, transparent` (הקו שמתפוגג, הסימן המובהק לדף AI) |
| `tracking` | `letter-spacing` על אלמנט שמכיל עברית, חיובי או שלילי |
| `hidden` | אלמנטי `.reveal` שנשארו שקופים אחרי גלילה מלאה (האנימציה לא נדלקה) |

הפלט: שורת `PASS <רוחב>px` או `FAIL <רוחב>px` עם כל המונים לכל רוחב, ובסוף שורת `RESULT: PASS` או `RESULT: FAIL (<n> widths)`. קוד יציאה 0 לעבר, 1 לנכשל.

### 4.1.1 המינימום הוא 14px, בכל מקום, בלי חריג

`smalltext` נכשל על כל טקסט נראה מתחת ל-14px. **אין חריג.** לא לתוויות, לא לשורת ההוק (`.eyebrow`), לא לטקסט בתוך מוקאפ, לא לשורת הזכויות בפוטר.

הסיבה: הצהרת הנגישות שהצינור מייצר אומרת במפורש שהטקסט הקטן ביותר בדף הוא 14 פיקסלים. חריג אחד הופך את המסמך המשפטי הזה לשקר שכל אחד מפריך בשלוש שניות עם כלי המפתחים.

**אזהרה לדפים ישנים.** כל דף שנבנה לפני ההכרעה הזאת **ייכשל** ב-`smalltext` ברוחבים 320, 360 ו-390. זה תקין ומצופה, וזה לא סימן שהשער שבור. הסיבה כמעט תמיד אחת: `clamp` על `.eyebrow` שמתחיל ב-11px, ולכן מתחת ל-412px רוחב המסך הוא שמכתיב את הגודל ויוצא מתחת ל-14. התיקון הוא שורה אחת:

```css
.eyebrow{font-size:clamp(14px,3.4vw,1.1rem)}
```

מריצים שוב על הרוחב שנכשל ועוברים הלאה.

### 4.1.2 שינוי גודל גופן מחייב הרצה חוזרת של השער המלא. זו לא בדיקה אופציונלית

**כל שינוי של `font-size`, של רוחב עמודת התוכן (`--w`) או של ריווח שורות ומרווחים מחייב הרצה חדשה של השער המלא: שלושת הקבצים, ששת הרוחבים.** לא רק הרוחב שנכשל, ולא רק הקובץ שנגעת בו.

הסיבה נמדדה, היא לא תיאורטית. העלאת גודל הגופן מ-11px ל-14px כדי לעבור `smalltext` **האריכה שורות ויצרה כשלי `orphans` חדשים שלא היו קיימים לפני התיקון.** גופן גדול יותר בתוך אותו רוחב עמודה זה פחות תווים לשורה, וזה בדיוק מה שדוחף מילה אחת לשורה נפרדת.

שלוש המדידות תלויות זו בזו, ואי אפשר לשנות אחת ולהניח שהשתיים האחרות עמדו במקומן:

| מה שינית | מה זה מזיז |
|---|---|
| גודל גופן למעלה | `orphans`, `overflow`, `clipped`, אורך שורה |
| רוחב עמודה למטה | `orphans`, אורך שורה |
| רוחב עמודה למעלה | אורך שורה מעל 75 תווים |
| ריווח או `padding` | `clipped`, קו הקיפול של ה-CTA, כיסוי בידי הצפים |

**הכלל, בלי חריג:** נגעת בגודל גופן, הרצת השער המלא של 4.2.1 היא הצעד הבא. לא "אחר כך", לא "בסוף כל התיקונים". גם התיקון שמוסיף `text-wrap:pretty` כדי לסגור `orphans` הוא שינוי טיפוגרפי, ולכן גם הוא מחייב הרצה חוזרת.

**וכלל שני שנולד מאותו מקום:** תיקון גודל גופן ב-`legal.html` או ב-`404.html` מחייב הרצה חוזרת **על אותו קובץ**, ולא רק על `index.html`. זה בדיוק מה שלא נעשה, ולכן `legal.html` הגיע שבור עד סוף הסבב.

### 4.2 איפה הסקריפטים ואיך מריצים

שלושת הקבצים `landing-qa.mjs`, `orphanLines.mjs`, `visibleBox.mjs` **נוסעים יחד**. `landing-qa.mjs` מייבא את השניים האחרים מאותה תיקייה, אז העברה של אחד בלבד נכשלת בטעינה.

```bash
# 1. איתור הסקריפטים של הסקיל
QA_SRC="${CLAUDE_PLUGIN_ROOT:-/nonexistent}/skills/lp-qa/scripts"
if [ ! -f "$QA_SRC/landing-qa.mjs" ]; then
  QA_SRC="$(dirname "$(find "$HOME/.claude/plugins" "$HOME/.claude/skills" -type f -name landing-qa.mjs -path '*lp-qa*' 2>/dev/null | head -1)")"
fi
echo "scripts: $QA_SRC"

# 2. תיקיית הרצה עם playwright (נבנית פעם אחת ונשארת)
QA_RUN="$HOME/.lp-qa"; mkdir -p "$QA_RUN"
if [ ! -d "$QA_RUN/node_modules/playwright" ]; then
  echo "מתקין Playwright ב-$QA_RUN. זה הדפדפן שמודד את הדף ב-6 רוחבי מסך, בלעדיו אין שער. פעם אחת, לא בתיקיית הדף, וכ-50 מגה."
  (cd "$QA_RUN" && npm init -y >/dev/null 2>&1 && npm i --no-audit --no-fund playwright) || echo "ההתקנה נכשלה. עובר לבדיקות הסטטיות של 4.4."
fi

# 3. הסקריפטים לתיקיית ההרצה, לא לתיקיית הדף
cp "$QA_SRC"/landing-qa.mjs "$QA_SRC"/orphanLines.mjs "$QA_SRC"/visibleBox.mjs "$QA_RUN"/

# 4. הרצה
cd "$QA_RUN" && node landing-qa.mjs "file:///נתיב/מלא/index.html"
```

- **בלי ארגומנטים של רוחב.** ברירת המחדל של הסקריפט היא בדיוק `320 360 390 430 768 1280`. מוסיפים רוחב יחיד רק לאימות מהיר של תיקון: `node landing-qa.mjs "file:///.../index.html" 430`.
- אם כבר יש בסביבה תיקייה עם playwright מותקן, אפשר להשתמש בה במקום `~/.lp-qa`. מעתיקים לשם את שלושת הקבצים, מריצים, ומוחקים אותם בסוף:
  ```bash
  rm -f landing-qa.mjs orphanLines.mjs visibleBox.mjs
  ```

### 4.2.1 השער המלא על שלושת הקבצים, זו הפקודה

**לא "מריצים שוב על legal ועל 404" כהערה בסוף. זו לולאה אחת, והיא חלק מהשער.** 18 הרצות: שלושה קבצים כפול ששה רוחבים. הפקודה מדפיסה ישר את הטבלה שנכנסת לדוח:

```bash
DIR="/נתיב/מלא/לתיקיית/הדף"      # אבסולוטי, בלי ./ ובלי ~
cd "$HOME/.lp-qa"

echo "| קובץ | רוחב | תוצאה | המונים |"
echo "|---|---|---|---|"
GATE=0
for f in index.html legal.html 404.html; do
  if [ ! -f "$DIR/$f" ]; then echo "| $f | - | אין קובץ | לא נבדק |"; continue; fi
  out=$(node landing-qa.mjs "file://$DIR/$f" 2>&1)
  echo "$out" | grep -E '^(PASS|FAIL) ' | while read -r st w rest; do
    echo "| $f | $w | $st | $rest |"
  done
  echo "$out" | grep -q 'RESULT: PASS' || GATE=1
  echo "$out" | grep -E '^ *(orphan|overflow|clip|small|touch|offcenter)' | head -30
done
echo "שער landing-qa: $([ $GATE -eq 0 ] && echo PASS || echo FAIL)"
```

`file://$DIR/$f` ולא `file:///$DIR/$f`: `$DIR` מתחיל ב-`/` ומשלים לבד לשלושה קווים נטויים. ארבעה קווים נטויים נותנים נתיב שבור והשער מודד דף ריק עם `total: 0`.

**פורמט הדיווח.** הטבלה בדוח היא שורה לכל קובץ ולכל רוחב, 18 שורות. לא מקצרים ל"הכול עבר", כי בדיוק הקיצור הזה הסתיר את `orphans` ב-`legal.html`:

```
| קובץ | רוחב | תוצאה |
|---|---|---|
| index.html | 320 | PASS |
| index.html | 360 | PASS |
| ... | ... | ... |
| legal.html | 320 | FAIL orphans=2 |
| ... | ... | ... |
| 404.html | 1280 | PASS |
```

קובץ שלא קיים נרשם `אין קובץ` ו`לא נבדק`, לא `PASS`. בפועל, נמדד על דף הזהב: שלושת הקבצים החזירו `RESULT: PASS` בכל ששת הרוחבים, 18 מתוך 18.

**מה עוד רץ על שלושת הקבצים ולא רק על index:** `cover-check.mjs` (4.5), `contrast-check.mjs` (4.6) ו-ה-grep של 4.4. `claims-check.mjs` (4.7) קורא את שלושתם בהרצה אחת. הדף המשפטי הוא זה שאיש לא הסתכל עליו, ולכן הוא זה שנשבר.

### 4.3 כשחסר Playwright או chromium

סימנים: `Cannot find package 'playwright'`, או `Executable doesn't exist at .../chromium...`.

**ההתקנה אוטומטית. לא שואלים, לא מחכים לאישור.** ההבטחה של המוצר היא שמשם הצינור רץ לבד, וכל שאלה באמצע שוברת אותה. מה שכן חייבים: **אומרים בעברית מה מתקינים ולמה, לפני שמריצים.** שורה אחת, לפני הפקודה:

```bash
echo "מתקין את דפדפן chromium של Playwright. הוא פותח את הדף ב-320, 360, 390, 430, 768 ו-1280 ומודד גלישה, מירכוז, גדלי טקסט וגובה מגע. בלעדיו אפשר לבדוק רק את מה שכתוב בקובץ, לא את מה שנראה על המסך."
cd "$HOME/.lp-qa" && npx playwright install chromium
```

**אם ההתקנה נכשלת, אין רשת או אין הרשאה: לא נופלים, לא עוצרים, לא שואלים מה לעשות.** ממשיכים כך:

1. מדפיסים בעברית שורה אחת עם הסיבה, למשל "ההתקנה נכשלה, אין רשת".
2. מריצים את הבדיקות הסטטיות של סעיף 4.4 במלואן.
3. בסיכום כותבים **בדיוק** מה לא נבדק, בשמות מפורשים ולא ב"חלק מהבדיקות": גלישה אופקית, תוכן חתוך, מילים בודדות בשורה, מירכוז תמונות במובייל, תמונות בגובה 0, טקסט מתחת ל-14px, גובה מגע 44px, `.reveal` שנשאר שקוף, כיסוי ה-CTA והפוטר בשלושת מצבי הגלילה (4.5), ניגודיות מחושבת (4.6) ואימות טענות הצהרת הנגישות (4.7). **ומוסיפים שורה מפורשת: זה נכון לשלושת הקבצים, לא רק ל-`index.html`.**
4. התוצאה נרשמת `לא נבדק` ולא `PASS`. דף בלי שער פלייטרייט אינו דף שעבר.

### 4.4 חלופת grep כשהשער לא רץ

הבלוק רץ על שלושת הקבצים, תמיד, גם כששער הפלייטרייט עבר.

**מלכודת שנמדדה, ושוברת את כל הבלוק הזה ב-zsh.** הגרסה הקודמת החזיקה את שמות הקבצים במשתנה אחד, `F="index.html legal.html 404.html"`, והעבירה אותו ל-grep בתור `$F`. **ב-bash זה עובד, ב-zsh זה לא.** zsh לא מפצל משתנה לא מצוטט למילים, ולכן grep מקבל שם קובץ אחד ארוך ומחזיר:

```
grep: index.html legal.html 404.html: No such file or directory
```

הקונכייה של דור היא zsh, כלומר **כל שכבת הגיבוי הזאת לא מדדה כלום** והדפיסה שורת שגיאה שנראית כמו רעש. הפתרון: מחזיקים את הקבצים בפרמטרים ומשתמשים ב-`"$@"`, שמתפצל נכון בשתי הקונכיות.

```bash
cd "$DIR"
# רשימת הקבצים כפרמטרים, לא כמשתנה עם רווחים. זה מה שעובד גם ב-zsh
set --
for f in index.html legal.html 404.html; do [ -f "$f" ] && set -- "$@" "$f"; done
echo "נבדקים: $*"

echo "== מקפים ארוכים (חייב להיות ריק) =="; grep -n '[—–]' "$@"
echo "== hr =="; grep -n '<hr' "$@"
echo "== letter-spacing =="; grep -n 'letter-spacing' "$@"
echo "== גרדיאנט מתפוגג =="; grep -nE '90deg *, *transparent' "$@"

# מאזין על scroll: חייב 0 בכל קובץ. ההכרעה וההסבר בסעיף 6.1
echo "== listener על scroll (חייב 0 בכל קובץ) =="
for f in "$@"; do printf '%s: ' "$f"; grep -c "addEventListener('scroll'" "$f"; done
echo "== IntersectionObserver (לפחות 1 ב-index) =="
for f in "$@"; do printf '%s: ' "$f"; grep -c 'IntersectionObserver' "$f"; done

echo "== scroll-behavior ב-CSS =="; grep -n 'scroll-behavior' "$@"
echo "== overflow-x על body =="; grep -nE 'body[^{]*\{[^}]*overflow-x' "$@"
echo "== img בלי width =="; grep -o '<img[^>]*>' "$@" | grep -v 'width='
echo "== img בלי height =="; grep -o '<img[^>]*>' "$@" | grep -v 'height='
echo "== img בלי alt =="; grep -o '<img[^>]*>' "$@" | grep -v 'alt='
echo "== hidden גלובלי (חייב להופיע בכל קובץ) =="; grep -c '\[hidden\]' "$@"
echo "== reveal מוגן ב-js =="; grep -n '\.js .reveal\|classList.add(.js.)' "$@"
echo "== קישור דילוג ו-main בשלושת הקבצים =="
for f in "$@"; do printf '%s: skip=%s main=%s\n' "$f" "$(grep -c 'class="skip"' "$f")" "$(grep -c 'id="main"' "$f")"; done
echo "== prefers-reduced-motion בכל קובץ =="
for f in "$@"; do printf '%s: ' "$f"; grep -c 'prefers-reduced-motion' "$f"; done
echo "== כל גדלי הפונט לסריקה ידנית של מה שמתחת ל-14px =="; grep -oE 'font-size:[^;}]*' "$@" | sort -u
```

**הערכים הנדרשים:** ארבע הבדיקות הראשונות לא מדפיסות כלום. `addEventListener('scroll'` מחזיר `0` בכל קובץ. `IntersectionObserver` מחזיר לפחות 1 ב-`index.html`. `[hidden]` ו-`prefers-reduced-motion` מחזירים לפחות 1 **בכל שלושת הקבצים**, ו-`skip=1 main=1` בכל שלושתם. קובץ שמחזיר `skip=0` הוא קובץ שהצהרת הנגישות שקרית עליו, וזה נבדק לעומק ב-4.7.

מה שלא ניתן לבדוק סטטית ולכן חייב להיכנס לשורת "מה לא נבדק": גלישה אופקית, תוכן חתוך, מילים בודדות בשורה, מירכוז תמונות במובייל, תמונות בגובה 0, טקסט מתחת ל-14px (ה-grep מראה רק את המספרים ב-CSS, לא את הגודל הנראה אחרי `clamp`), גובה מגע 44px, `.reveal` שנשאר שקוף, כיסוי בשלושת מצבי הגלילה, ניגודיות מחושבת בפועל, ואימות טענות הצהרת הנגישות. **שורת "לא נבדק" נכתבת לכל שלושת הקבצים בנפרד.**

### 4.5 בדיקת כיסוי: מה האלמנטים הצפים מסתירים, בשלושה מצבים

פס ה-CTA הדביק וכפתור הנגישות צפים מעל הדף, והם מכסים דברים, ולא רק בפוטר. **הודעת ההסכמה לא נמדדת כאן:** מאז "חוק שכבת העגינה האחת" ב-`lp-build` היא יושבת בזרימה בתוך `<footer>` ולכן היא לא יכולה לכסות כלום. אם מצאת אותה צפה, זה לא ממצא כיסוי, זה ממצא מבנה, והתיקון הוא בטבלה בסוף המסמך.

#### למה הגרסה הקודמת של הבדיקה הזאת פספסה

הגרסה הקודמת גללה לתחתית **בלופ**, בצעדים קטנים, ורק אז מדדה. הלופ הזה נחוץ כדי שהדף יסיים להתארך, אבל יש לו תופעת לוואי: **הוא מייצב את הפריסה לפני המדידה.** כל אנימציית חשיפה נדלקת, כל תמונה נטענת, הפוטר מקבל את ה-`padding-bottom` הדינמי שלו, והבאנר מתמקם. כלומר הבדיקה מדדה את המצב הנוח ביותר שיש.

**הגולשת לא גוללת ככה.** היא מקישה על קישור בפוטר, או גוררת את סרגל הגלילה לתחתית בתנועה אחת. זה מגיע לתחתית **לפני** שהפריסה התייצבה, והבאנר יושב על קישורים שבמצב המיוצב היו פנויים.

זה נמדד בפועל על דף הזהב, ב-390px:

| מצב | תוצאה |
|---|---|
| בטעינה, לפני כל גלילה | PASS, הבאנר מוסתר |
| אחרי גלילה הדרגתית בלופ | **PASS** |
| אחרי קפיצה ישירה לתחתית | **FAIL: הבאנר מכסה 34 אחוז מ"מדיניות פרטיות" ו-34 אחוז מ"הצהרת נגישות", ו-100 אחוז משורת "יצירת קשר" ומשורת הזכויות** |

אותו דף, אותו רוחב, אותו רגע. **מצב אחד עובר והשני נכשל, וזה בדיוק הבאג שאף אחד לא תפס.** הבאנר מפנה לקישור הפרטיות, ומכסה אותו.

וההרצה המלאה על ששת הרוחבים הראתה שזה רחב מ-390 לבד:

| רוחב | אחרי קפיצה לתחתית |
|---|---|
| 320 | PASS |
| 360 | **FAIL**, "מדיניות פרטיות" ו"הצהרת נגישות" ב-35 אחוז |
| 390 | **FAIL**, אותם שני קישורים ב-34 אחוז |
| 430 | **FAIL**, "הצהרת נגישות" ב-35 אחוז |
| 768 | **FAIL**, "תקנון ותנאי שימוש" ו"מדיניות ביטולים" ב-**100 אחוז** |
| 1280 | PASS |

**ב-768 שני קישורים משפטיים מכוסים לגמרי, וזה הרוחב שכמעט אף אחד לא בודק בעין.** ארבעה מתוך ששת הרוחבים נכשלו במצב הזה, וכולם עברו במצב הגלילה ההדרגתית. זו הסיבה שהמצב השלישי נכנס לשער, ולא כהמלצה.

ההרצה המלאה של שלושת הקבצים לוקחת כדקה וחצי. זה הזמן הכי זול בכל הצינור.

#### שלושת המצבים, וכולם נמדדים

1. **בטעינה, לפני כל גלילה.** הבאנר אמור להיות מוסתר לגמרי (נחשף רק אחרי ההירו, לפי `lp-legal` 6.1). הלשונית הצפה ופס ה-CTA לא אמורים לכסות כלום, ובמיוחד לא את ה-CTA הראשי של ההירו.
2. **אחרי גלילה הדרגתית.** המצב הקיים, שבו הפריסה מתייצבת. נשאר, כי הוא תופס דברים אחרים.
3. **אחרי קפיצה ישירה לתחתית,** בהקשר טרי: `window.scrollTo(0, document.body.scrollHeight)` פעם אחת, בלי לופ. **זה המצב שתופס את הבאג.**

כל מצב נמדד בהקשר דפדפן **נפרד**. אותו עמוד לא נטען פעם אחת ונמדד שלוש פעמים, כי אחרי הגלילה ההדרגתית אין דרך לחזור למצב לא מיוצב.

#### שתי חומרות, כי שער שמכשיל על הכול הוא שער שאף אחד לא עובר

| מה מכוסה | חומרה |
|---|---|
| ה-CTA הראשי, כפתור, `summary`, שדה טופס, `label` | **כשל.** מתקנים |
| קישור בפוטר, קישור לעמוד המשפטי, `mailto`, `tel` | **כשל.** זה הקישור שהבאנר עצמו מפנה אליו |
| פסקה, פריט רשימה, כותרת, `figure` | **הערה.** מדווחים במספר אחד ולא מתקנים |
| צף צר, עד 64px רוחב, שנוגע בקצה תיבה ברוחב מלא ומתחת ל-12 אחוז | **הערה.** כפתור הנגישות בפינה. הטקסט ממורכז ולא יושב מתחתיו |

הנימוק לחלוקה: קישור מכוסה הוא **פעולה שנחסמה**, וזה חוסם מסירה. פסקה מכוסה היא **טקסט שצריך לגלול אליו**, והגולשת גם יכולה לסגור את הבאנר. שער שמכשיל על פסקה מכוסה יחזיר FAIL על כל דף תקין, ואז מפסיקים להסתכל עליו.

#### איך מריצים

שומרים את הסקריפט בתיקיית ההרצה (`~/.lp-qa`) ומריצים **על שלושת הקבצים**:

```bash
cd "$HOME/.lp-qa"
for f in index.html legal.html 404.html; do
  [ -f "$DIR/$f" ] || continue
  echo "########## $f"
  node cover-check.mjs "file://$DIR/$f"
done
```

בלי ארגומנטים הסקריפט רץ על ששת הרוחבים `320 360 390 430 768 1280`, שלושה מצבים בכל אחד, כלומר 18 מדידות לכל קובץ. לאימות מהיר של תיקון בודד מוסיפים רוחב: `node cover-check.mjs "file://$DIR/index.html" 390`. ארגומנט שאינו מספר הוא סלקטור תוכן חלופי, במקום ברירת המחדל.

```js
// cover-check.mjs  מה האלמנטים הצפים מכסים, בשלושה מצבים נפרדים
// שימוש: node cover-check.mjs "file:///.../index.html" [רוחבים...] [סלקטור-תוכן-חלופי]
import { chromium } from 'playwright';

const [url, ...rest] = process.argv.slice(2);
if (!url) { console.log('שימוש: node cover-check.mjs "file:///נתיב/מלא/index.html" [רוחבים]'); process.exit(2); }
const nums = rest.filter(a => /^\d+$/.test(a)).map(Number);
const extra = rest.find(a => !/^\d+$/.test(a)) || '';
const W = nums.length ? nums : [320, 360, 390, 430, 768, 1280];

// הסלקטורים: מה שכיסוי שלו הוא כשל, ומה שכיסוי שלו הוא הערה
const HARD = 'a.cta, a.btn, button, summary, input, select, textarea, label, footer a, a[href*="legal"], a[href*="#terms"], a[href*="#privacy"], a[href*="#accessibility"], a[href^="mailto"], a[href^="tel"]';
const SOFT = 'p, li, figure, figcaption, h1, h2, h3';

function probe(softSel) {
  const HARD_SEL = 'a.cta, a.btn, button, summary, input, select, textarea, label, footer a, a[href*="legal"], a[href*="#terms"], a[href*="#privacy"], a[href*="#accessibility"], a[href^="mailto"], a[href^="tel"]';
  const vis = e => {
    const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    return r.width > 1 && r.height > 1 && cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05;
  };
  const floats = [...new Set(
    [...document.querySelectorAll('body *')]
      .filter(e => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && vis(e))
      .concat([...document.querySelectorAll('.cookie, #cookie, .sticky')].filter(vis))
  )];
  const box = e => { const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; };
  const cover = (a, b) => {
    const w = Math.min(a.r, b.r) - Math.max(a.l, b.l);
    const h = Math.min(a.b, b.b) - Math.max(a.t, b.t);
    return w > 0 && h > 0 ? { w, h, pct: (w * h) / (a.w * a.h) * 100 } : null;
  };
  const name = e => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : '');
  const inView = e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

  // סורק יעדים מול כל הצפים. minPct מסנן נגיעות זניחות
  const scan = (targets, minPct, kind) => {
    const out = [];
    for (const e of targets) {
      if (!vis(e) || !inView(e)) continue;
      const a = box(e);
      for (const f of floats) {
        if (f === e || f.contains(e) || e.contains(f)) continue;
        const o = cover(a, box(f));
        if (!o || o.w <= 8 || o.h <= 4 || o.pct < minPct) continue;
        const fb = box(f);
        // כפתור פינה צר, למשל כפתור הנגישות: נגיעה בקצה תיבה ברוחב מלא, לא כיסוי אמיתי
        const corner = fb.w <= 64 && o.pct < 12;
        out.push({
          kind: corner ? 'note' : kind,
          target: name(e), text: (e.textContent || '').trim().slice(0, 34),
          by: name(f), byWidth: Math.round(fb.w),
          overlap: Math.round(o.w) + 'x' + Math.round(o.h), pct: Math.round(o.pct) + '%',
          corner,
        });
      }
    }
    return out;
  };

  const hard = [...document.querySelectorAll(HARD_SEL)];
  const soft = [...document.querySelectorAll(softSel || 'p, li, figure, figcaption, h1, h2, h3')];
  const ctaTop = [...document.querySelectorAll('a.cta, .hero a.cta, .hero button, a.btn, button.cta')]
    .filter(e => vis(e) && e.getBoundingClientRect().top < innerHeight)[0];

  const bannerVisible = (() => {
    const b = document.querySelector('#cookie, .cookie');
    return b ? vis(b) : null;
  })();

  return {
    scrollY: Math.round(window.scrollY),
    bannerVisible,
    ctaFound: ctaTop ? name(ctaTop) + ' | ' + (ctaTop.textContent || '').trim().slice(0, 30) : null,
    cta: ctaTop ? scan([ctaTop], 1, 'fail') : [],   // כל חפיפה עם ה-CTA הראשי היא כשל, גם 1 אחוז
    hard: scan(hard, 8, 'fail'),
    soft: scan(soft, 20, 'note'),
    floats: floats.map(f => name(f) + ' w=' + Math.round(box(f).w) + ' top=' + Math.round(box(f).t)),
  };
}

async function open(browser, w) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  return { ctx, p };
}

// מצב 2: גלילה הדרגתית, בלופ, עד שהגובה מתייצב
async function creep(p) {
  let last = -1;
  for (let i = 0; i < 14; i++) {
    const h = await p.evaluate(() => document.body.scrollHeight);
    if (h === last) break;
    last = h;
    await p.evaluate(() => window.scrollBy(0, Math.round(innerHeight * 0.8)));
    await p.waitForTimeout(350);
  }
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(500);
}

let fails = 0, notes = 0;
const rows = [];
const browser = await chromium.launch();

for (const w of W) {
  console.log('\n== ' + w + 'px ==');

  // מצב 1: בטעינה, לפני כל גלילה
  let s = await open(browser, w);
  const load = await s.p.evaluate(probe, SOFT);
  await s.ctx.close();

  // מצב 2: אחרי גלילה הדרגתית
  s = await open(browser, w);
  await creep(s.p);
  const gradual = await s.p.evaluate(probe, SOFT);
  await s.ctx.close();

  // מצב 3: קפיצה ישירה לתחתית, בהקשר טרי. זה המצב שתופס את הבאג
  s = await open(browser, w);
  await s.p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await s.p.waitForTimeout(900);
  const jump = await s.p.evaluate(probe, SOFT);
  await s.ctx.close();

  for (const [label, r] of [['בטעינה, לפני גלילה', load], ['אחרי גלילה הדרגתית', gradual], ['אחרי קפיצה לתחתית', jump]]) {
    const all = [...r.cta, ...r.hard, ...r.soft];
    const bad = all.filter(h => h.kind === 'fail');
    const soft = all.filter(h => h.kind === 'note');
    // בטעינה לפני גלילה הבאנר אמור להיות מוסתר
    const early = label.startsWith('בטעינה') && r.bannerVisible === true;
    if (early) console.log('  כשל: באנר הקוקיז גלוי בטעינה, לפני שגללו בכלל');
    const state = bad.length || early ? 'FAIL' : 'PASS';
    if (bad.length || early) fails++;
    notes += soft.length;
    rows.push({ width: w, state: label, result: state, fails: bad.length + (early ? 1 : 0), notes: soft.length });
    console.log('  ' + state + ' ' + label + '  (scrollY=' + r.scrollY + ', באנר=' + (r.bannerVisible === null ? 'אין' : r.bannerVisible ? 'גלוי' : 'מוסתר') + ')');
    if (label.startsWith('בטעינה')) console.log('    CTA ראשי שזוהה: ' + (r.ctaFound || 'לא נמצא, בדוק את הסלקטור'));
    bad.forEach(h => console.log('    כשל: ' + JSON.stringify(h)));
    soft.forEach(h => console.log('    הערה: ' + JSON.stringify(h)));
  }
}
await browser.close();

console.log('\n| רוחב | מצב | תוצאה | כשלים | הערות |');
console.log('|---|---|---|---|---|');
rows.forEach(r => console.log('| ' + r.width + ' | ' + r.state + ' | ' + r.result + ' | ' + r.fails + ' | ' + r.notes + ' |'));
console.log('\nהערות שאינן כשל: ' + notes);
console.log('RESULT: ' + (fails ? 'FAIL (' + fails + ' מצבים)' : 'PASS אין כיסוי של CTA, קישור משפטי או שדה טופס'));
process.exit(fails ? 1 : 0);
```

#### איך קוראים את הפלט

בסוף מודפסת טבלה של רוחב, מצב, תוצאה, מספר כשלים ומספר הערות. לכל ממצא יש `target` (מה מכוסה), `by` (מי מכסה), `byWidth` (רוחב המכסה), `overlap` ו-`pct` (איזה חלק מהיעד מכוסה).

- `by` הוא פס רחב, למשל `div.cookie` ב-`byWidth` קרוב לרוחב המסך, והיעד הוא קישור או כפתור: **כשל אמיתי**, מתקנים.
- `by` הוא כפתור פינה צר ב-`byWidth` של 46 עם `pct` של אחוזים בודדים: הסקריפט מסמן אותו `note` לבד. מציינים בסיכום ולא מתקנים.
- `כשל: באנר הקוקיז גלוי בטעינה, לפני שגללו בכלל`: ה-JS מציג את הבאנר מיד. הגרסה הנדחית ב-`lp-legal` 6.1.
- `לא נמצא, בדוק את הסלקטור` בשורת ה-CTA: הכפתור הראשי לא נתפס. מוסיפים סלקטור, כי CTA שלא נמדד הוא CTA שלא נבדק.

**שלושה דברים שנבדקו ואסור לשחזר אותם:**
1. **מצב 3 חייב הקשר טרי.** קפיצה לתחתית אחרי שהלופ כבר רץ מודדת פריסה מיוצבת ומחזירה PASS שקרי. זה הבאג המקורי.
2. **גוללים בלופ במצב 2** ולא פעם אחת, כי אנימציות החשיפה מאריכות את הדף והמדידה יוצאת שקרית.
3. **הבאנר עצמו לא נספר כמכוסה.** הסקריפט מדלג על יעד שהצף מכיל אותו, למשל הכפתור "הבנתי" שבתוך הבאנר.

#### התיקון המוכן

הבאנר נעגן לתחתית ולא צף באמצע, והפוטר מקבל מרווח שמפנה לו מקום:

```css
.cookie{position:fixed;inset:auto 0 0 0;bottom:env(safe-area-inset-bottom)}
@media (max-width:720px){
  .cookie{bottom:calc(88px + env(safe-area-inset-bottom))}
  footer{padding-bottom:calc(2.2rem + 88px + env(safe-area-inset-bottom))}
  body.has-cookiebar footer{padding-bottom:calc(2.2rem + 236px + env(safe-area-inset-bottom))}
}
```

וה-JS מוסיף ומסיר `has-cookiebar` על ה-body. **אחרי התיקון מריצים שוב את שלושת המצבים, ולא רק את זה שנכשל.** מרווח שפותר את הקפיצה לתחתית יכול לפתוח פער חדש במצב הטעינה.

### 4.6 ניגודיות: מחשבים כל טקסט נראה, לא בודקים צמדים מה-`:root`

חישוב ידני של הצמדים ב-`:root` (הסקריפט בסעיף 7) מכסה את הצבעים שכתובים בטוקנים, ומפספס את כל השאר: שקיפות שמצטברת מאב לבן, גרדיאנט בלי `background-color`, כפתור מושבת, וטקסט על רקע שירש צבע ממקום אחר.

**מה שפוספס בפועל:** בפוטר נמצאה ניגודיות **3.54** שאף שכבה לא תפסה, וסימוני `.fill` יצאו **2.34** מול סף 4.5 כי השקיפות מורידה אותם. שניהם היו מתחת לסף בזמן שהצהרת הנגישות הצהירה "ניגודיות מספקת".

הבדיקה מחשבת יחס ניגודיות **לכל אלמנט עם טקסט נראה** מול הרקע שמתחתיו בפועל, ומדווחת על כל מה שמתחת ל-4.5. **כולל הפוטר, כולל `.fill`, כולל טקסט בתוך מוקאפים.**

```bash
cd "$HOME/.lp-qa"
for f in index.html legal.html 404.html; do
  [ -f "$DIR/$f" ] || continue
  echo "########## $f"
  node contrast-check.mjs "file://$DIR/$f" 390 1280
done
```

```js
// contrast-check.mjs  ניגודיות בפועל לכל טקסט נראה, מול הרקע שמתחתיו
// שימוש: node contrast-check.mjs "file:///.../index.html" [רוחבים...]
import { chromium } from 'playwright';

const [url, ...rest] = process.argv.slice(2);
if (!url) { console.log('שימוש: node contrast-check.mjs "file:///נתיב/מלא/index.html" [רוחבים]'); process.exit(2); }
const nums = rest.filter(a => /^\d+$/.test(a)).map(Number);
const W = nums.length ? nums : [390, 1280];

function probe() {
  const parse = c => {
    const m = String(c).match(/[\d.]+/g);
    if (!m) return null;
    return { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? +m[3] : 1 };
  };
  const over = (fg, bg) => ({            // הרכבת שכבה שקופה על רקע אטום
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1,
  });
  const lum = c => {
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const shown = el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1 && s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.01;
  };
  // שקיפות מצטברת: opacity על אב מכפילה את זו של הבן
  const chainOpacity = el => {
    let o = 1;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) o *= +getComputedStyle(e).opacity;
    return o;
  };
  // כל עצירות הצבע של גרדיאנט. כפתור זהב הוא גרדיאנט בלי background-color,
  // ובלי זה החישוב מדלג עליו, מגיע לרקע הכהה של הסקשן ומדווח כשל שקרי.
  const stops = img => {
    const m = String(img).match(/rgba?\([^)]+\)/g);
    return m ? m.map(parse).filter(c => c && c.a > 0.3) : [];
  };
  // הרקע בפועל: מטפסים עד הרקע האטום הראשון, ומרכיבים את השכבות השקופות שמעליו.
  // מוחזרות כל האפשרויות, והציון הוא הגרוע שבהן.
  const realBg = el => {
    const stack = [];
    let grad = [], gradName = null;
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (!grad.length && s.backgroundImage && s.backgroundImage !== 'none') {
        grad = stops(s.backgroundImage);
        if (grad.length) gradName = s.backgroundImage.slice(0, 46);
        else if (!gradName) gradName = 'תמונה: ' + s.backgroundImage.slice(0, 30);
      }
      const c = parse(s.backgroundColor);
      if (c && c.a > 0) { stack.push(c); if (c.a >= 0.999) break; }
    }
    let solid = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) solid = over(stack[i], solid);
    // אם נמצא גרדיאנט לפני רקע אטום, עצירות הצבע שלו הן הרקע האמיתי
    const cands = grad.length ? grad.map(c => over(c, solid)) : [solid];
    return { cands, solid, gradName, imageOnly: !!gradName && !grad.length };
  };

  const out = [];
  const unmeasured = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!shown(el)) continue;
    const text = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim().length > 1)
      .map(n => n.textContent.trim()).join(' ');
    if (!text) continue;
    const s = getComputedStyle(el);
    const fgRaw = parse(s.color);
    if (!fgRaw) continue;
    const name = el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
    const host = el.closest('section, header, footer, dialog, .cookie, .sticky');
    const where = host ? (host.id || host.tagName.toLowerCase() + (typeof host.className === 'string' && host.className.trim() ? '.' + host.className.trim().split(/\s+/)[0] : '')) : 'body';
    const { cands, gradName, imageOnly } = realBg(el);
    const op = fgRaw.a * chainOpacity(el);
    // אלמנט שנשאר שקוף לגמרי אי אפשר למדוד. נספר ומדווח, לא מוסתר
    if (op < 0.05) { unmeasured.push(name + ' ב-' + where); continue; }
    const size = parseFloat(s.fontSize);
    const weight = +s.fontWeight || 400;
    const large = size >= 24 || (weight >= 700 && size >= 18.66);
    const need = large ? 3.0 : 4.5;
    const disabled = !!el.closest('[disabled], [aria-disabled="true"]');
    // הגרוע מבין עצירות הרקע. אחת שנכשלת מספיקה כדי לדווח
    let cr = Infinity, worst = cands[0];
    for (const bgc of cands) {
      const r = ratio(over({ ...fgRaw, a: op }, bgc), bgc);
      if (r < cr) { cr = r; worst = bgc; }
    }
    if (cr >= 4.5) continue;                    // עובר את הסף הקשה, לא מדווח
    out.push({
      // רקע תמונה בלי עצירות צבע: אי אפשר לחשב, לא מכשילים, מסמנים לבדיקה בעין.
      // פקד מושבת פטור מדרישת הניגודיות לפי WCAG, לכן הערה ולא כשל.
      kind: imageOnly ? 'manual' : (cr >= need || disabled) ? 'note' : 'fail',
      el: name, where, disabled, inFooter: !!el.closest('footer'), isFill: el.classList.contains('fill'),
      ratio: Math.round(cr * 100) / 100, need, size: Math.round(size * 10) / 10, weight,
      color: s.color, bg: 'rgb(' + [worst.r, worst.g, worst.b].map(Math.round).join(',') + ')',
      opacity: Math.round(op * 100) / 100,
      gradient: gradName || null, stops: cands.length,
      text: text.slice(0, 40),
    });
  }
  // אלמנט אחד לכל שילוב, כדי שלא יוצף דיווח על 40 פריטי רשימה זהים
  const seen = new Set(), uniq = [];
  for (const r of out) {
    const k = r.el + '|' + r.ratio + '|' + r.size;
    if (seen.has(k)) continue;
    seen.add(k); uniq.push(r);
  }
  return { rows: uniq.sort((a, b) => a.ratio - b.ratio), unmeasured: [...new Set(unmeasured)] };
}

let fails = 0, notes = 0;
const browser = await chromium.launch();
for (const w of W) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 844 } });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(700);
  // גוללים לתחתית כדי שאלמנטי .reveal ייחשפו
  let last = -1;
  for (let i = 0; i < 14; i++) {
    const h = await p.evaluate(() => document.body.scrollHeight);
    if (h === last) break;
    last = h;
    await p.evaluate(() => window.scrollBy(0, Math.round(innerHeight * 0.8)));
    await p.waitForTimeout(300);
  }
  // חובה: מנטרלים את שקיפות החשיפה לפני המדידה. בלי זה כל אלמנט .reveal
  // שהאנימציה שלו לא נדלקה נמדד כשקוף, יוצא ביחס 1 בדיוק, וכל הדוח הופך לזבל.
  // נמדד בפועל: 43 מתוך 54 אלמנטי .reveal נשארו ב-opacity 0 אחרי גלילה מלאה.
  // חובה: מבטלים גם כל transition. בלי זה פס ה-CTA הדביק נמדד באמצע ההנפשה,
  // יוצא ב-opacity 0.6, והניגודיות שלו מדווחת נמוכה משקרית.
  await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;animation:none!important}*{transition:none!important}' });
  await p.waitForTimeout(600);
  const { rows: res, unmeasured } = await p.evaluate(probe);
  console.log('\n== ' + w + 'px ==');
  if (unmeasured.length) console.log('  לא נמדד (נשאר שקוף לגמרי): ' + unmeasured.join(', ')
    + '\n    אם פס ה-CTA או באנר הקוקיז ברשימה, הם היו מוסתרים ברגע המדידה. לגלול עד שהם נחשפים ולהריץ שוב.');
  const bad = res.filter(r => r.kind === 'fail');
  const soft = res.filter(r => r.kind === 'note');
  const manual = res.filter(r => r.kind === 'manual');
  fails += bad.length; notes += soft.length;
  if (!res.length) console.log('  PASS כל טקסט נראה ב-4.5 ומעלה');
  bad.forEach(r => console.log('  כשל ' + r.ratio + ' (דרוש ' + r.need + ') ' + r.el
    + (r.inFooter ? ' [פוטר]' : '') + (r.isFill ? ' [fill]' : '')
    + ' ב-' + r.where + ' ' + r.size + 'px/' + r.weight + ' ' + r.color + ' על ' + r.bg
    + (r.opacity < 1 ? ' opacity=' + r.opacity : '')
    + (r.gradient ? ' (רקע גרדיאנט, ' + r.stops + ' עצירות, הגרועה שבהן)' : '')
    + ' "' + r.text + '"'));
  soft.forEach(r => console.log('  הערה ' + r.ratio + ' ' + r.el + ' ב-' + r.where + ' ' + r.size + 'px/' + r.weight
    + (r.disabled ? ' פקד מושבת, פטור לפי WCAG' : ' טקסט גדול, עובר את 3.0 אבל לא את 4.5') + ' "' + r.text + '"'));
  manual.forEach(r => console.log('  לבדוק בעין ' + r.el + ' על רקע תמונה (' + r.gradient + '), אי אפשר לחשב "' + r.text + '"'));
  await ctx.close();
}
await browser.close();
console.log('\nהערות (טקסט גדול בין 3.0 ל-4.5): ' + notes);
console.log('RESULT: ' + (fails ? 'FAIL (' + fails + ' אלמנטים מתחת לסף)' : 'PASS'));
process.exit(fails ? 1 : 0);
```

**איך קוראים את הפלט:**

- `כשל` מתחת לסף: מכהים או מבהירים את **הטוקן ב-`:root`**, לא את האלמנט הבודד. אחרי התיקון מריצים שוב, כי טוקן אחד מופיע בהרבה מקומות.
- `הערה` על טקסט גדול בין 3.0 ל-4.5: עובר את WCAG לטקסט מעל 24px או בולד מעל 18.66px. לא מתקנים.
- `הערה` על פקד מושבת: WCAG פוטר פקד לא פעיל מדרישת הניגודיות. לא מתקנים, אבל אם הכפתור יהיה פעיל בגרסה הסופית, בודקים שוב.
- `לבדוק בעין` על רקע תמונה: אין עצירות צבע לחשב מולן. שורה אחת בסיכום.
- `לא נמדד (נשאר שקוף לגמרי)`: אלמנטים שהיו ב-`opacity:0` ברגע המדידה. אם פס ה-CTA או הבאנר ברשימה, הם היו מוסתרים. זה לא PASS, זה "לא נבדק".

**שלוש מלכודות שנמדדו בסקריפט הזה ואסור לשחזר אותן:**

1. **חייבים לנטרל את שקיפות החשיפה לפני המדידה.** בהרצה הראשונה **43 מתוך 54** אלמנטי `.reveal` נשארו ב-`opacity:0` גם אחרי גלילה מלאה. שקיפות 0 אומרת שהטקסט מתמזג לגמרי ברקע, היחס יוצא **1.00 בדיוק**, וכל הדוח הופך לזבל: 19 "כשלים" שכולם שקריים. לכן הסקריפט מזריק `.reveal{opacity:1!important}` לפני שהוא מודד.
2. **חייבים לנטרל גם `transition`.** בלי זה פס ה-CTA הדביק נמדד באמצע ההנפשה, ב-`opacity:0.6`, והניגודיות שלו מדווחת נמוכה משקרית.
3. **גרדיאנט הוא רקע, לא היעדר רקע.** כפתור זהב הוא `linear-gradient` בלי `background-color`, ולכן חיפוש תמים של הרקע מדלג עליו, מגיע לרקע הכהה של הסקשן ומדווח כשל שקרי של 1.05. הסקריפט מוציא את עצירות הצבע מהגרדיאנט ומחשב מול **הגרועה שבהן**.

### 4.7 אימות הצהרת הנגישות מול המדידה בפועל

הצהרת הנגישות טוענת טענות **מדידות**: גודל טקסט מינימלי, ניגודיות, קישור דילוג בכל עמודי האתר, אזור לחיצה של 44 פיקסלים, כיבוד הפחתת תנועה, תפריט נגישות שחל על כל הדף.

**הכלל: הצהרה שאפשר להפריך בדפדפן היא גרועה יותר מאי-הצהרה.** אי-הצהרה היא פער ידוע. הצהרה שקרית היא חשיפה משפטית, והיא מופרכת בשלוש שניות עם כלי המפתחים.

שלוש הצהרות שקריות נמדדו בפועל באותה הצהרה אחת: "ניגודיות מספקת" בזמן ש-`.fill` היה ב-2.34, "קישור דלג לתוכן" כשהוא היה קיים רק ב-`index.html` וההצהרה יושבת ב-`legal.html`, ו"האתר משתמש בעוגיות" כשהדף לא כותב אף עוגייה אלא רק `localStorage`.

הסקריפט **קורא את הצהרת הנגישות מ-`legal.html`, מזהה אילו טענות היא באמת טוענת, ומודד כל אחת בשלושת הקבצים.** טענה שלא הוצהרה לא נדרשת ולא מכשילה. טענה שהוצהרה ולא מתקיימת היא פער, וזה כשל.

```bash
cd "$HOME/.lp-qa"
node claims-check.mjs "$DIR" 390
```

```js
// claims-check.mjs  מאמת כל טענה בהצהרת הנגישות מול המדידה בפועל
// שימוש: node claims-check.mjs <תיקיית הדף> [רוחב]
// קורא את הצהרת הנגישות מ-legal.html, מזהה אילו טענות היא טוענת,
// ומודד כל אחת מהן בשלושת הקבצים. פער מדווח ככשל.
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const dir = resolve(process.argv[2] || '.');
const width = +(process.argv[3] || 390);
const files = ['index.html', 'legal.html', '404.html'].filter(f => existsSync(join(dir, f)));
if (!files.includes('legal.html')) { console.log('אין legal.html בתיקייה, אין הצהרה לאמת'); process.exit(0); }

const legalSrc = readFileSync(join(dir, 'legal.html'), 'utf8');
// קטע הצהרת הנגישות בלבד: מהעוגן ועד הכותרת הבאה או סוף ה-section.
// העוגן יושב על h2 ולא על section, ולכן חיפוש </section> בלבד מחזיר ריק,
// והבדיקה נופלת לכל הקובץ ומזהה טענות מסעיף הפרטיות. זה נמדד ותוקן.
const from = legalSrc.search(/id=["']accessibility["']/i);
let sec = '';
if (from > -1) {
  const rest = legalSrc.slice(from);
  const end = rest.slice(1).search(/<h2\b|<\/section>|<footer\b/i);
  sec = end > -1 ? rest.slice(0, end + 1) : rest;
}
const statement = sec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
if (!statement) console.log('אזהרה: לא נמצא עוגן accessibility ב-legal.html. מאמת מול כל הקובץ.');
const hay = statement || legalSrc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
// הטענה על עוגיות יושבת בבאנר ובסעיף הפרטיות, לא בהצהרת הנגישות
const pageWide = legalSrc.replace(/<[^>]+>/g, ' ') + ' ' + (existsSync(join(dir, 'index.html')) ? readFileSync(join(dir, 'index.html'), 'utf8').replace(/<[^>]+>/g, ' ') : '');

// כל טענה: איך מזהים אותה בהצהרה, ומה מודדים
const CLAIMS = [
  { id: 'font', re: /14 פיקסלים|14px|גודל טקסט/, label: 'גודל טקסט 14 פיקסלים לפחות' },
  { id: 'contrast', re: /ניגודיות/, label: 'ניגודיות מספקת בין הטקסט לרקע' },
  { id: 'skip', re: /דלג|דילוג/, label: 'קישור דילוג לתוכן הראשי' },
  { id: 'touch', re: /אזור לחיצה|שטח לחיצה|44/, label: 'אזור לחיצה 44 פיקסלים' },
  { id: 'focus', re: /מקלדת|פוקוס|מיקוד/, label: 'ניווט מקלדת עם סימון מיקוד נראה' },
  { id: 'motion', re: /הפחתת תנועה|תנועה מופחתת|prefers-reduced/, label: 'כיבוד הפחתת תנועה' },
  { id: 'a11ymenu', re: /תפריט נגישות|היפוך צבעים|שחור לבן/, label: 'תפריט נגישות שחל על כל הדף' },
  { id: 'cookies', re: /עוגיות|קוקיז/, label: 'שימוש בעוגיות' },
  { id: 'alt', re: /טקסט חלופי|alt/, label: 'טקסט חלופי לכל תמונה' },
  { id: 'lang', re: /שפת האתר|lang|עברית.*כתיב|dir/, label: 'שפה וכיווניות מוצהרות בקוד' },
];
const claimed = CLAIMS.filter(c => c.re.test(c.id === 'cookies' ? pageWide : hay));

function measure() {
  const vis = el => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1 && s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05;
  };
  // גודל הטקסט הקטן ביותר שמוצג בפועל
  let small = null;
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue;
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
    const size = parseFloat(getComputedStyle(el).fontSize);
    if (!small || size < small.size) small = {
      size: Math.round(size * 10) / 10,
      el: el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : ''),
      text: el.textContent.trim().slice(0, 28),
    };
  }
  // אזור לחיצה: הגובה הקטן ביותר בפקד אינטראקטיבי נראה
  let touch = null;
  for (const el of document.querySelectorAll('a.cta, a.btn, button, summary, input:not([type=hidden]), select, textarea')) {
    if (!vis(el)) continue;
    const h = el.getBoundingClientRect().height;
    if (!touch || h < touch.h) touch = {
      h: Math.round(h * 10) / 10,
      el: el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : ''),
      text: (el.textContent || el.value || '').trim().slice(0, 24),
    };
  }
  // קישור דילוג: קיים, מצביע לעוגן קיים, ובפוקוס נכנס למסך
  const skipEl = document.querySelector('a.skip, a[href="#main"]');
  let skip = { exists: !!skipEl, target: false, visibleOnFocus: false, href: skipEl ? skipEl.getAttribute('href') : null };
  if (skipEl) {
    const id = (skipEl.getAttribute('href') || '').replace('#', '');
    skip.target = !!(id && document.getElementById(id));
    skipEl.focus();
    const r = skipEl.getBoundingClientRect();
    skip.visibleOnFocus = r.top >= 0 && r.top < innerHeight && r.height > 1;
    skip.topOnFocus = Math.round(r.top);
    skipEl.blur();
  }
  // סימון מיקוד: האם מופיע קו מיקוד נראה על הפקד הראשון
  let focus = { tested: null, outline: null, ok: false };
  const f = document.querySelector('a.cta, button, a[href]');
  if (f) {
    f.focus();
    const s = getComputedStyle(f);
    const w = parseFloat(s.outlineWidth) || 0;
    focus = {
      tested: f.tagName.toLowerCase(),
      outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor,
      ok: w >= 1 && s.outlineStyle !== 'none' || s.boxShadow !== 'none',
    };
    f.blur();
  }
  // תפריט הנגישות: האם מצבי ההיפוך חלים גם על מה שצף
  const menu = document.querySelector('.a11y-btn, [aria-label*="נגישות"], #a11y');
  document.documentElement.classList.add('a11y-invert');
  const filt = sel => { const el = document.querySelector(sel); return el ? getComputedStyle(el).filter : 'אין אלמנט'; };
  const a11y = { menu: !!menu, main: filt('main'), sticky: filt('.sticky'), cookie: filt('#cookie, .cookie') };
  document.documentElement.classList.remove('a11y-invert');
  // תמונות בלי alt
  const noAlt = [...document.querySelectorAll('img:not([alt])')].length;
  const html = document.documentElement;
  return { small, touch, skip, focus, a11y, noAlt, lang: html.lang, dir: html.dir };
}

const browser = await chromium.launch();
const per = {};
for (const f of files) {
  const ctx = await browser.newContext({ viewport: { width, height: 844 } });
  const p = await ctx.newPage();
  await p.goto('file://' + join(dir, f), { waitUntil: 'load' });
  await p.waitForTimeout(700);
  let last = -1;
  for (let i = 0; i < 12; i++) {
    const h = await p.evaluate(() => document.body.scrollHeight);
    if (h === last) break; last = h;
    await p.evaluate(() => window.scrollBy(0, Math.round(innerHeight * 0.8)));
    await p.waitForTimeout(250);
  }
  await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important;animation:none!important}*{transition:none!important}' });
  await p.waitForTimeout(400);
  per[f] = await p.evaluate(measure);
  await ctx.close();
}
await browser.close();

const src = {};
for (const f of files) src[f] = readFileSync(join(dir, f), 'utf8');
const anySrc = Object.values(src).join('\n');

let gaps = 0;
const line = (state, claim, measured) => {
  if (state === 'פער') gaps++;
  console.log('| ' + claim + ' | ' + measured + ' | ' + state + ' |');
};

console.log('טענות שההצהרה טוענת: ' + (claimed.map(c => c.id).join(', ') || 'אין'));
console.log('נמדד ברוחב ' + width + 'px על ' + files.join(', ') + '\n');
console.log('| הטענה בהצהרה | מה נמדד בפועל | תוצאה |');
console.log('|---|---|---|');

for (const c of claimed) {
  if (c.id === 'font') {
    const worst = files.map(f => ({ f, ...per[f].small })).filter(x => x.size).sort((a, b) => a.size - b.size)[0];
    line(worst && worst.size >= 14 ? 'מתקיים' : 'פער', c.label,
      worst ? worst.size + 'px ב-' + worst.el + ' (' + worst.f + ', "' + worst.text + '")' : 'לא נמדד');
  }
  if (c.id === 'touch') {
    const worst = files.map(f => ({ f, ...per[f].touch })).filter(x => x.h).sort((a, b) => a.h - b.h)[0];
    line(worst && worst.h >= 44 ? 'מתקיים' : 'פער', c.label,
      worst ? worst.h + 'px ב-' + worst.el + ' (' + worst.f + ', "' + worst.text + '")' : 'אין פקדים');
  }
  if (c.id === 'skip') {
    const bad = files.filter(f => !(per[f].skip.exists && per[f].skip.target && per[f].skip.visibleOnFocus));
    line(bad.length ? 'פער' : 'מתקיים', c.label, bad.length
      ? 'חסר או לא נכנס למסך בפוקוס ב: ' + bad.map(f => f + ' (קיים=' + per[f].skip.exists + ', עוגן=' + per[f].skip.target + ', נראה בפוקוס=' + per[f].skip.visibleOnFocus + ')').join('; ')
      : 'קיים, מצביע לעוגן קיים ונכנס למסך בפוקוס בכל ' + files.length + ' הקבצים');
  }
  if (c.id === 'focus') {
    const bad = files.filter(f => !per[f].focus.ok);
    const noCss = files.filter(f => !/focus-visible/.test(src[f]));
    line(bad.length || noCss.length ? 'פער' : 'מתקיים', c.label,
      (noCss.length ? 'אין focus-visible ב-CSS של: ' + noCss.join(', ') + '. ' : '')
      + (bad.length ? 'אין סימון מיקוד נראה ב: ' + bad.map(f => f + ' (' + per[f].focus.outline + ')').join('; ')
        : 'סימון מיקוד נראה: ' + per[files[0]].focus.outline));
  }
  if (c.id === 'motion') {
    const bad = files.filter(f => !/prefers-reduced-motion/.test(src[f]));
    line(bad.length ? 'פער' : 'מתקיים', c.label, bad.length ? 'אין כלל prefers-reduced-motion ב: ' + bad.join(', ') : 'קיים בכל הקבצים');
  }
  if (c.id === 'a11ymenu') {
    const r = per['index.html'] || per[files[0]];
    const parts = [];
    if (!r.a11y.menu) parts.push('לא נמצא כפתור תפריט נגישות בדף');
    for (const k of ['sticky', 'cookie']) {
      if (r.a11y[k] === 'none') parts.push('ההיפוך לא חל על .' + k);
    }
    line(parts.length ? 'פער' : 'מתקיים', c.label,
      parts.length ? parts.join(', ') : 'התפריט קיים וההיפוך חל על main, על הפס הדביק ועל הבאנר');
  }
  if (c.id === 'cookies') {
    const writes = /document\.cookie\s*=/.test(anySrc);
    const third = /connect\.facebook\.net|googletagmanager\.com|gtag\(|hotjar|clarity\.ms/.test(anySrc);
    line(writes || third ? 'מתקיים' : 'פער', c.label,
      writes ? 'הדף כותב document.cookie' : third ? 'אין עוגייה מהדף, אבל יש כלי צד שלישי שמניח עוגיות'
        : 'אפס עוגיות. document.cookie לא נכתב ואין כלי צד שלישי. ' + (/localStorage/.test(anySrc) ? 'הדף משתמש ב-localStorage בלבד, וכך צריך לנסח' : ''));
  }
  if (c.id === 'alt') {
    const bad = files.filter(f => per[f].noAlt > 0);
    line(bad.length ? 'פער' : 'מתקיים', c.label,
      bad.length ? bad.map(f => f + ': ' + per[f].noAlt + ' תמונות בלי alt').join('; ') : 'לכל תמונה יש alt');
  }
  if (c.id === 'lang') {
    const bad = files.filter(f => per[f].lang !== 'he' || per[f].dir !== 'rtl');
    line(bad.length ? 'פער' : 'מתקיים', c.label,
      bad.length ? bad.map(f => f + ': lang="' + per[f].lang + '" dir="' + per[f].dir + '"').join('; ') : 'lang="he" dir="rtl" בכל הקבצים');
  }
  if (c.id === 'contrast') {
    line('לא נמדד כאן', c.label, 'נמדד ב-contrast-check.mjs. התוצאה שלו היא התוצאה של הטענה הזאת');
  }
}

// טענות שהיו נכונות אבל לא הוצהרו: לא כשל, רק מידע
const notClaimed = CLAIMS.filter(c => !claimed.includes(c));
if (notClaimed.length) console.log('\nלא מוצהר, ולכן לא נדרש: ' + notClaimed.map(c => c.label).join(', '));
console.log('\nRESULT: ' + (gaps ? 'FAIL (' + gaps + ' טענות שההצהרה טוענת ולא מתקיימות)' : 'PASS כל טענה שההצהרה טוענת נמדדה ומתקיימת'));
process.exit(gaps ? 1 : 0);
```

**מה עושים עם התוצאה.** לכל פער יש בדיוק שלושה מסלולים, ואין רביעי:

1. **מתקנים את הדף**, וההצהרה נשארת. זה המסלול המועדף, וכמעט תמיד הוא תיקון של שורה או שתיים.
2. **מנסחים את ההצהרה מדויק.** דף שמשתמש ב-`localStorage` בלבד לא מצהיר "עוגיות", הוא מצהיר "אחסון מקומי בדפדפן".
3. **מעבירים את השורה ל"פערים ידועים"**, ומוסיפים שורה ל"מה נשאר לך".

**אסור למחוק טענה מההצהרה כדי לעבור את הבדיקה.** הכיוון חד סטרי: מתקנים את הדף כדי שהטענה תתקיים, ולא מרככים את הטענה כדי שתתאים לדף. הנוסח "גודל טקסט קריא" במקום "14 פיקסלים לפחות" הוא בדיוק הריכוך הזה, והוא אסור.

**נמדד בפועל על דף הזהב:** תשע טענות זוהו, שבע מתקיימות, ושתיים יצאו פערים אמיתיים: `prefers-reduced-motion` חסר ב-`404.html` בזמן שההצהרה מבטיחה הפחתת תנועה, והטענה על עוגיות בזמן שהדף כותב `localStorage` בלבד. **שני הפערים האלה בקבצים שהשער הקודם לא הסתכל עליהם.**

## 5. שלב 2: שער האיכות החיצוני, ארבעה כלים

ארבע השכבות הקודמות הן שלנו: הן מודדות את הדף מול הנוסחה של דור. השכבה הזאת מביאה **עין חיצונית**, ארבעה כלים שלא נכתבו כאן ולכן הם תופסים בדיוק את מה שהסקיל הזה עיוור אליו.

**הכלים חיצוניים ולא נכתבו על ידי dor digital.** לפי הריפו: `design-taste-frontend` של Leonxlnx, `impeccable` של pbakaus, `review-animations` ו-`emilkowal-animations` של emilkowalski, ו-Playwright MCP מחבילת `@playwright/mcp`. **ויקו הוא זה שהמליץ עליהם**, והם נכנסו לערכה בזכותו.

### 5.0 הכלל שגובר על כל השלב: לא מותקן, מדלגים בחן

**אף אחד מארבעת הכלים אינו דרישת קדם.** כלי שלא מותקן, שאין לו רשת או שנכשל בטעינה נרשם `לא נבדק` עם שורת סיבה אחת בעברית, והשער ממשיך לכלי הבא. **לא נופלים, לא שואלים, ולא מסמנים PASS על כלי שלא רץ.** זה בדיוק חוק ההבטחה של סעיף 2, והוא חל כאן במלואו.

| הכלי | פקודת ההתקנה | מה הוא תופס | מתי מריצים |
|---|---|---|---|
| `impeccable` | `npx impeccable install` | אנטי פטרנים ויזואליים בדף בנוי | אחרי שהדף מוכן, לפני מסירה |
| `design-taste-frontend` | `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` | תחושת תבנית ועיצוב גנרי | אחרי שהדף מוכן, קריאה ולא הרצה |
| `review-animations` | `npx skills add emilkowalski/skills` | תנועה מול הסטנדרט של אמיל קובלסקי | כשיש תנועה בדף. **ידנית בלבד** |
| Playwright MCP | `claude mcp add playwright npx @playwright/mcp@latest` | קלוד רואה את הדף החי בזמן שהוא עובד עליו | לאורך כל השער |

ארבע הפקודות, פעם אחת למחשב, בסדר הזה:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
npx impeccable install
npx skills add emilkowalski/skills
claude mcp add playwright npx @playwright/mcp@latest
```

אחרי ההתקנה **סוגרים את קלוד קוד ופותחים מחדש**, אחרת הסקילים החדשים ושרת ה-MCP לא נטענים.

**בדיקת קיום לפני שמריצים. שורה לכל כלי, והיא זו שקובעת אם מדלגים:**

```bash
ls -d "$HOME/.claude/skills/design-taste-frontend" >/dev/null 2>&1 && echo "taste: מותקן"   || echo "taste: לא מותקן, מדלג"
ls -d "$HOME/.claude/skills/review-animations"    >/dev/null 2>&1 && echo "anim: מותקן"    || echo "anim: לא מותקן, מדלג"
npx -y impeccable@latest --version                >/dev/null 2>&1 && echo "impeccable: זמין" || echo "impeccable: לא זמין, מדלג"
claude mcp list 2>/dev/null | grep -q playwright              && echo "playwright mcp: רשום" || echo "playwright mcp: לא רשום, מדלג"
```

כל שורה שיוצאת "מדלג" נכנסת לשורת **"לא נבדק"** בדוח הסופי (סעיף 9), בשם מפורש ולא ב"חלק מהבדיקות".

### 5.1 impeccable: אנטי פטרנים ויזואליים

מזהה אנטי-פטרנים ויזואליים שהשער לא תופס. עובד על שרת מקומי:

```bash
cd "$DIR" && python3 -m http.server 8765 >/dev/null 2>&1 &
SRV=$!
sleep 1
npx -y impeccable@latest detect http://localhost:8765/
kill $SRV
```

אם `python3` חסר: `npx -y serve -l 8765 .`

**חובה להבחין בין ממצא אמיתי לממצא מכוון.** ההבחנה היא לא תחושה, יש לה שלוש שאלות, בסדר הזה:

1. **האם הממצא מצביע על משהו שהנוסחה של דור מורה עליו במפורש?** אם כן, הוא מכוון. הנוסחה היא המקור, לא הכלי.
2. **האם האלמנט הוא מוקאפ, כלומר ייצוג של מסך אחר בתוך הדף?** אם כן, הכללים של הדף לא חלים עליו, כי הוא לא ממשק של הדף.
3. **האם הממצא חוזר על עצמו באותו רכיב בכל הדף?** חזרה עקבית היא מערכת. הופעה אחת חריגה היא באג.

שני סוגים של ממצאים מכוונים בנוסחה של דור, ואותם **לא מתקנים**, רק מציינים בסיכום שהם מכוונים:
- **בועות בתוך מוקאפ צ'אט** נראות לכלי כמו רכיבי ממשק לא מיושרים. הן מוקאפ, הן אמורות להיות מיושרות ימין.
- **שורות ההוק בראש הדף** נראות כמו טקסט חלש או חוזר. זו הנוסחה: הוק קטן ומעומעם שלא מתחרה בכותרת.

כל ממצא אחר, ובמיוחד גרדיאנטים על טקסט, קווים דקורטיביים, מערכת רדיוסים לא עקבית, צללים צבעוניים, אייקונים מצוירים ביד ותנועה בלי סיבה, הוא ממצא אמיתי שנכנס לרשימת התיקונים.

**מה כותבים בדוח:** מספר הממצאים, וכמה מהם מכוונים. `impeccable: 4 ממצאים, כולם מכוונים (בועות המוקאפ ושורות ההוק)`. מספר לבד בלי הפילוח הזה הוא דיווח שאי אפשר לעשות איתו כלום.

#### 5.1.1 אורך שורה

`impeccable` מדווח `line-length` כשהשורות ארוכות מדי. **הטווח הרצוי הוא 60 עד 75 תווים לשורה.** מעל זה העין מאבדת את תחילת השורה הבאה, ובעברית זה מורגש יותר.

התיקון: מקטינים את `--w` (רוחב עמודת התוכן) או מגדילים את גודל הגופן של הפסקה. את שניהם לא משנים יחד, כי אז אי אפשר לדעת מה עבד. מודדים שוב אחרי שינוי אחד.

ממצא `line-length` בודד, למשל `~87 chars/line`, הוא **סביר ולא חוסם מסירה**. רושמים אותו ברשימת התיקונים בסוף, לא בראשה, ולא עוצרים את הפרסום בגללו. מה שכן חוסם: גלישה אופקית, טקסט מתחת ל-14px, חפיפה על ה-CTA, ובעיות נגישות.

**שימו לב:** שינוי של `--w` או של גודל גופן הוא שינוי טיפוגרפי, ולכן הוא מחייב הרצה חוזרת של השער המלא (4.1.2). זה הכלל שהכי הרבה פעמים נשכח אחרי תיקון של `line-length`.

אם `npx` נכשל או אין רשת: מדווחים "impeccable לא רץ, בלי רשת" וממשיכים.

### 5.2 design-taste-frontend: האם הדף נראה כמו תבנית

**זה סקיל קריאה, לא סקריפט.** אין פקודת הרצה ואין פלט מספרי. טוענים אותו, קוראים את רשימת האנטי-פטרנים שלו, ועוברים על הדף מולה. הוא נמצא ב-`~/.claude/skills/design-taste-frontend/SKILL.md`, והפרקים הרלוונטיים הם 4.2 (טיפוגרפיה), 4.3 (פריסה), 4.4 (כרטיסים וצללים) ו-4.6 (הירו וסקשנים).

**מה כן בודקים מולו, כי כאן הוא צודק והנוסחה מסכימה:**

| האנטי-פטרן שלו | מה מחפשים בדף |
|---|---|
| אייקונים מצוירים ביד | כל `<svg>` עם `<path>` שנכתב ידנית ואינו מספרייה. הנוסחה דורשת אייקוני קו זהב מספרייה |
| מערכת רדיוסים מעורבת | רדיוס אחד לכרטיסים, אחד לכפתורים, אחד לצ'יפים, ואותו ערך בכל הדף |
| צללים צבעוניים והילות | צל ניטרלי בלבד. הילה זהובה מסביב לכרטיס היא ממצא אמיתי |
| גרדיאנט על טקסט | אסור. הנוסחה כבר אוסרת אותו ב-grep של 4.4, וזו הסכמה ולא סתירה |
| ניגודיות על כפתורים ובטפסים | חופף ל-4.6. אם 4.6 עבר, זה עבר |
| מסך מוצר מזויף מ-`div` | חל על **צילום מסך מזויף של מוצר אמיתי**. מוקאפ הצ'אט ומוקאפ הלפטופ הם איור מוצהר, לא ראיה מזויפת. ראו למטה |

#### הנקודות שבהן הוא מתנגש עם הנוסחה, ושם הנוסחה גוברת

**זה הסעיף שמונע מקלוד "לתקן" דף תקין.** בשש הנקודות האלה הכלי יסמן ממצא, **והממצא שגוי בהקשר הזה**. לא נוגעים, רק כותבים בדוח "ממצא מכוון, הנוסחה גוברת".

| מה הכלי אומר | מה הנוסחה אומרת | למה הנוסחה גוברת |
|---|---|---|
| הירו ממורכז נמנע, עדיף פיצול מסך או יישור לשמאל | `text-align:center` על ה-`body`, הירו ממורכז, עמודה אחת | הכלי עצמו מחריג בריף מסוג מניפסט או הכרזה. דף נחיתה ישיר בעברית הוא בדיוק זה |
| סריף מאוד לא מומלץ כברירת מחדל | Frank Ruhl Libre ל-`h1`, ל-`h2` ולמספרים הגדולים | רשימת הסריפים שלו כולה לטינית. בעברית אין בררה דומה, וזה עמוד השדרה של הנוסחה |
| כרטיסים רק כשההגבהה מייצגת היררכיה אמיתית | `.tiles`, `.ledger` וכרטיס המחיר הם כרטיסים | הכרטיס כאן הוא גבול של מקטע ולא הגבהה דקורטיבית, וכל הדף עמודה אחת |
| אסור לחזור על משפחת פריסה, ויש תקרה לזיגזג | קצב רקעים מתחלף כהה ובהיר לאורך הדף | האיסור שלו הוא על פיצולי תמונה מול טקסט. בנוסחה **אין פיצולים בכלל**, יש עמודה אחת עם רקע מתחלף, וזה לא אותו דבר |
| אסור רשימת נקודות או שורת טקסט קטנה בתוך ההירו | שלושת ה"בלי" יושבים בהירו | זו הליבה של ההבטחה, ובלעדיה ההירו מאבד את הניגוד. החלטה מודעת |
| מסך מזויף מ-`div` אסור | מוקאפ הצ'אט ומוקאפ הלפטופ בנויים מ-`div` | האיסור שלו מכוון לצילום מסך שמתחזה למוצר אמיתי. המוקאפים כאן הם איור מוצהר של שיחה, לא ראיה |

**חריג אחד שאומץ מהכלי ונכנס לנוסחה:** אייקון ליד הכותרת, במקום ריבוע אייקון של 58 פיקסלים מעל הכותרת. זה השינוי היחיד שהתקבל ממנו, והוא כבר בתוך הנוסחה.

**אם הסקיל לא מותקן:** כותבים `design-taste-frontend: לא מותקן, לא נבדק` וממשיכים. אין לו תחליף סטטי, ואין טעם לדמות אותו ב-grep.

### 5.3 review-animations: התנועה מול הסטנדרט של אמיל קובלסקי

**הסקיל הזה לא נטען לבד.** ב-`SKILL.md` שלו יש `disable-model-invocation: true`, כלומר קלוד לא יפעיל אותו מיוזמתו גם אם הנושא מתאים בול. **חייבים להפעיל אותו במפורש:**

```
/review-animations
```

או, בלי סלאש: "תטען את הסקיל review-animations ותבדוק את התנועה ב-index.html". הסקיל עונה קודם בשורה אחת שהוא מוכן, ורק אחר כך שואלים אותו. לצידו מותקן `emilkowal-animations`, שכן נטען לבד והוא המדריך המלא (43 כללים). `review-animations` הוא הביקורת, `emilkowal-animations` הוא ההסבר.

**מה שולחים לו:** את בלוק התנועה של הדף, כלומר את כללי ה-`.reveal`, את `.hero-in`, את כללי ה-`transition` על ה-CTA, ואת בלוק `prefers-reduced-motion`. לא את כל הקובץ.

**מה הוא בודק, וזה בדיוק מה ששלב ו ב-`lp-build` כבר מיישר אליו:**

| הכלל | הערך הנדרש |
|---|---|
| easing | `ease-out` בלבד. בנוסחה זה `--ease: cubic-bezier(.16,1,.3,1)`, ואין easing שני בדף. `ease-in` על ממשק אסור |
| משך | תנועת ממשק מתחת ל-300ms. כניסת מקטע בגלילה היא שיווק ומותר לה להיות ארוכה יותר |
| מה מונפש | `transform` ו-`opacity` בלבד. `height`, `width`, `top`, `margin` ו-`padding` מפילים |
| stagger | 30 עד 80ms בין פריטים ברשימה. הנוסחה על 60, וההירו על 70 |
| `prefers-reduced-motion` | נשאר fade, יורדת התזוזה. **לא אפס תנועה**, כי fade עוזר להבנה |
| סיבה | לכל תנועה תפקיד: המשכיות מרחבית, סימון מצב, משוב או מניעת קפיצה. "זה נראה טוב" אינו תפקיד |

**מה עושים עם הפלט.** הוא מחזיר ממצאים, לא ציון. ממצא על `easing`, על משך או על תכונה שמונפשת הוא **תיקון**, והוא נכנס לרשימה של סעיף 9. ממצא על "יותר מדי תנועה" בדף שיווקי הוא **הערה**, כי הסקיל מכוון בעיקרו לממשק מוצר ולא לדף נחיתה, ויש לו חריג מפורש לשיווק. **אסור לו לגעת במנגנון ה-`.reveal` עצמו.** המנגנון הזה עבר מדידה, הוא זה שמחזיק את בדיקת `hidden` בשער, והחלפתו שוברת את 4.6 ואת 4.2.1 ביחד.

**אם הסקיל לא מותקן:** `review-animations: לא מותקן, התנועה לא נבדקה מול הסטנדרט של אמיל` וממשיכים. הבדיקות של 4.1 על `hidden` ו-`prefers-reduced-motion` רצות בכל מקרה, והן לא תלויות בו.

### 5.4 Playwright MCP: הכלי שמאפשר לקלוד לראות את הדף בזמן אמת

זה הכלי שכל השער כבר נשען עליו, ולכן הוא מתועד כאן ולא נשאר מובן מאליו.

`landing-qa.mjs`, `cover-check.mjs`, `contrast-check.mjs` ו-`claims-check.mjs` מריצים דפדפן אמיתי דרך חבילת `playwright` שמותקנת ב-`~/.lp-qa`. **שרת ה-MCP הוא שכבה שנייה, נפרדת מהסקריפטים:** הוא נותן לקלוד לפתוח את הדף, ללחוץ, לגלול, לצלם ולקרוא את הקונסול **בזמן שהוא עובד על הדף**, בלי לכתוב סקריפט לכל שאלה.

```bash
claude mcp add playwright npx @playwright/mcp@latest
claude mcp list | grep playwright      # אימות: אמור להחזיר "Connected"
```

**מתי משתמשים בו ולא בסקריפט:** כשצריך לראות מצב שקשה לתאר במדידה. באנר שנפתח אחרי לחיצה, טופס שנשלח, תפריט נגישות שמשנה מצב, אנימציה שנראית לא נכון. **מתי לא:** לכל מה שכבר יש לו סקריפט. סקריפט מחזיר טבלה שנכנסת לדוח, MCP מחזיר תצפית שצריך לנסח מחדש.

**אם לא רשום:** `Playwright MCP: לא רשום, קלוד לא ראה את הדף החי` בשורת "לא נבדק". הסקריפטים של 4.2 עד 4.7 ממשיכים לרוץ כרגיל, כי הם לא עוברים דרכו.

## 6. שלב 3: grep על האיסורים, תמיד

מריצים את הבלוק של סעיף 4.4 **גם כששער הפלייטרייט החזיר PASS**. השער בודק CSS מחושב, ה-grep בודק מה כתוב בקובץ. שניהם נחוצים:

- מקף ארוך בתוך הערה או ב-`<meta description>` לא ייראה בשער אבל כן יגיע לתוצאות החיפוש.
- `scroll-behavior:smooth` גלובלי על `html` שובר כל גלילה תוכניתית: כל `window.scrollTo` הופך לאנימציה שהקריאה הבאה קוטעת. בפועל השער הגיע ל-954px מתוך 19,083 ודיווח על 47 אלמנטי `.reveal` שקופים. הגלילה החלקה עוברת ל-JS, על קליקים בעוגן בלבד.
- `overflow-x:hidden` על `body` הופך את body לאלמנט הגולל ו-`window.scrollY` קופא. מעבירים ל-`html`.

### 6.1 `addEventListener('scroll'` חייב להיות 0. IntersectionObserver מנצח

**הייתה סתירה בין שני סקילים, וזו ההכרעה.** `lp-build` (בדיקה 6 בשלב ט) דרש `grep -c "addEventListener('scroll'"` שווה ל-**0**. `lp-legal` דרש **לפחות 1**, כדי שבאנר הקוקיז ייחשף בגלילה ולא בטעינה. שתי דרישות הפוכות על אותו קובץ, ובדיוק במצב הזה אי אפשר לעבור את שני השערים.

**ההכרעה: 0. `IntersectionObserver` מנצח.** הבדיקה בסעיף 4.4 דורשת `0` בכל שלושת הקבצים, והיא תואמת ל-`lp-build`.

למה `IntersectionObserver` ולא מאזין גלילה:

| | `addEventListener('scroll'` | `IntersectionObserver` |
|---|---|---|
| תדירות | נורה עשרות פעמים בשנייה, על כל פיקסל | נורה פעם אחת, כשהיעד חוצה את הגבול |
| קריאת פריסה | `getBoundingClientRect` בתוך מאזין גלילה מאלץ חישוב פריסה מחדש בכל פעם | הדפדפן מודד לבד, בלי לאלץ חישוב |
| נכונות | תלוי באיזה אלמנט גולל. `overflow-x:hidden` על `body` מקפיא את `window.scrollY`, והבאנר לא נחשף לעולם | לא מסתמך על `scrollY` בכלל |
| מובייל | גלילת אינרציה מייצרת התנהגות שונה בין דפדפנים | זהה בכל הדפדפנים |

**מה שהדרישה של `lp-legal` באמת ביקשה מתקיים במלואו עם observer.** הבאנר נחשף כשההירו יוצא מהמסך, וזו בדיוק ההגדרה של `IntersectionObserver`: לצפות בהירו, וכשהוא חוצה את הגבול להציג את הבאנר. הקריאה `if (past) showBar()` שדורש `lp-build` היא בדיוק הקריאה הזאת מתוך ה-observer, והיא לא צריכה מאזין גלילה.

לכן הבדיקה בסעיף 4.4 מדפיסה שני מספרים ולא אחד: `addEventListener('scroll'` חייב לצאת `0` בכל קובץ, ו-`IntersectionObserver` חייב לצאת לפחות `1` ב-`index.html`. **אפס בשניהם אומר שהבאנר לא נחשף בכלל**, וזה כשל אחר, לא מעבר.

נמדד בפועל על דף הזהב: `addEventListener('scroll'` יצא 0 בשלושת הקבצים, ו-`IntersectionObserver` יצא 5 ב-`index.html`. השער עבר.

## 7. שלב 4: נגישות בקוד

| מה בודקים | איך |
|---|---|
| alt לכל תמונה | `grep -o '<img[^>]*>' *.html \| grep -v 'alt='`. תמונה דקורטיבית מקבלת `alt=""` מפורש. **אסור להמציא alt.** פותחים את התמונה, קוראים מה כתוב בה, ואם אי אפשר לקבוע, `alt="[למלא]"` ושורה ברשימת "מה נשאר לך" |
| `:focus-visible` נראה | `grep -c 'focus-visible' *.html`. לכל כפתור, קישור, `summary` ו-`input` צריך מצב מיקוד נראה, לא `outline:none` |
| קישור דילוג לתוכן | `grep -n 'skip\|דלג' index.html` ובנוסף `<main id="main">` קיים והעוגן מגיע אליו |
| סמנטיקה | `h1` אחד בדיוק, בלי דילוג מ-`h2` ל-`h4`, `<main>` `<footer>` `<nav>` במקום `div`, FAQ ב-`details`/`summary`, כפתור אמיתי ולא `div` עם `onclick` |
| `lang` ו-`dir` | `<html lang="he" dir="rtl">` |
| טופס | לכל `input` יש `label` או `aria-label`, ויש שורת הסכמה לתקנון ליד הכפתור |
| SVG דקורטיבי | `aria-hidden="true"` על אייקונים, `role` ותיאור רק כשהאייקון נושא מידע |
| `prefers-reduced-motion` | `grep -n 'prefers-reduced-motion' index.html`. חייב להשאיר fade ולהוריד תזוזה |
| ניגודיות AA | **`contrast-check.mjs` בסעיף 4.6 הוא הבדיקה המחייבת.** הוא מודד כל טקסט נראה מול הרקע בפועל, כולל הפוטר ו-`.fill`. החישוב הידני למטה הוא רק לבדיקה מהירה של צמד בודד |
| טענות הצהרת הנגישות | `claims-check.mjs` בסעיף 4.7. כל טענה מדידה מאומתת מול המדידה בפועל בשלושת הקבצים |

חישוב ניגודיות מהיר לצמד בודד מה-`:root`, **לא תחליף לסעיף 4.6**:

```bash
node -e 'const L=h=>{const c=h.replace("#","").match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4);return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]};const r=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return((x+0.05)/(y+0.05)).toFixed(2)};for(const[a,b]of[["#AEB5C4","#121826"],["#E9CC82","#121826"],["#59627A","#F7F2E9"],["#8F6E2E","#F7F2E9"]])console.log(a,"על",b,"=",r(a,b))'
```

הסף: 4.5 לטקסט גוף, 3.0 לטקסט גדול מ-24px או בולד מעל 18.66px. מתחת לסף מכהים או מבהירים את הטוקן ב-`:root`, לא את האלמנט הבודד.

**החישוב הזה לא מספיק, וזה נמדד.** הוא בודק צמדים שכתובים בטוקנים, ומפספס שקיפות מצטברת, גרדיאנטים וצבעים שירשו ממקום אחר. ניגודיות 3.54 בפוטר ו-2.34 ב-`.fill` שרדו בדיוק את הבדיקה הזאת. **הבדיקה המחייבת היא 4.6.**

## 8. שלב 5: גיבוי לפני תיקונים

**הגיבוי חייב להסתיים בסיומת `.html`.** קובץ בשם `index.html.bak-20260927` נטען בכרום כטקסט רגיל ולא כ-HTML, וכל המדידות עליו יוצאות זבל, עם `total: 0` אלמנטים. זה מלכודת שכבר גזלה זמן.

```bash
cp index.html "_orig-$(date +%Y%m%d).html"
```

את קובץ הגיבוי מוסיפים ל-`.vercelignore` לפני הפרסום, כדי שלא יעלה לאוויר.

## 9. שלב 6: הפלט למשתמש

עברית פשוטה, בלי ז'רגון, בלי מקפים ארוכים. תבנית:

הדוח פותח בטבלת השער, שורה לכל קובץ ולכל רוחב. **הטבלה היא חלק מהדוח ולא נספח.** בדיוק הקיצור של "הכול עבר" הוא זה שהסתיר `orphans` ב-`legal.html`.

```
שער האיכות: PASS

| קובץ | רוחב | תוצאה |
|---|---|---|
| index.html | 320 | PASS |
| index.html | 360 | PASS |
| index.html | 390 | PASS |
| index.html | 430 | PASS |
| index.html | 768 | PASS |
| index.html | 1280 | PASS |
| legal.html | 320 | PASS |
| legal.html | 360 | PASS |
| legal.html | 390 | PASS |
| legal.html | 430 | PASS |
| legal.html | 768 | PASS |
| legal.html | 1280 | PASS |
| 404.html | 320 | PASS |
| 404.html | 360 | PASS |
| 404.html | 390 | PASS |
| 404.html | 430 | PASS |
| 404.html | 768 | PASS |
| 404.html | 1280 | PASS |

כיסוי (4.5): PASS בשלושת המצבים, בששת הרוחבים, בשלושת הקבצים. 2 הערות על פסקאות בפוטר
ניגודיות (4.6): PASS, הנמוך ביותר 4.61 בפוטר
הצהרת נגישות (4.7): 9 טענות, 9 מתקיימות
impeccable (5.1): 4 ממצאים, כולם מכוונים (בועות המוקאפ ושורות ההוק)
design-taste-frontend (5.2): נקרא. 2 ממצאים מכוונים, הנוסחה גוברת (הירו ממורכז, סריף בכותרות)
review-animations (5.3): הופעל ידנית. PASS, ease-out יחיד, stagger 60ms, reduced-motion משאיר fade
Playwright MCP (5.4): רשום ומחובר, הדף נצפה חי
grep על האיסורים: PASS, scroll listener 0 בשלושת הקבצים

מה נשאר לך:
- מזהה הפיקסל של מטא, כרגע מסומן [למלא]
- ח.פ. ומייל לפוטר, כרגע מסומן [למלא]
```

וכשיש כשלים:

```
שער האיכות: FAIL

| קובץ | רוחב | תוצאה |
|---|---|---|
| index.html | 320 | FAIL overflow=1 tracking=7 |
| index.html | 360 | FAIL tracking=7 |
| index.html | 390 | FAIL tracking=7 smalltext=1 |
| index.html | 430 | FAIL tracking=7 |
| index.html | 768 | PASS |
| index.html | 1280 | PASS |
| legal.html | 320 | FAIL orphans=2 |
| legal.html | 390 | FAIL orphans=1 |
| legal.html | שאר הרוחבים | PASS |
| 404.html | כל הרוחבים | PASS |

כיסוי (4.5): FAIL ב-390 אחרי קפיצה לתחתית, PASS בגלילה הדרגתית
ניגודיות (4.6): FAIL, 4.09 בשורת ההמתנה של הטופס
הצהרת נגישות (4.7): 9 טענות, 2 פערים
שער חיצוני (5): impeccable 6 ממצאים, 4 מכוונים. design-taste-frontend לא מותקן, לא נבדק. review-animations ממצא אחד: הפס הדביק ב-420ms. Playwright MCP מחובר

תיקונים לפי סדר החשיפה:
1. [כל הדף] 7 אלמנטים עם letter-spacing על עברית. מוריד את הכלל.
2. [הירו] גלישה אופקית של 10px ב-320px. בסיס מוקאפ הלפטופ ברוחב 114%.
3. [הירו] 4 תמונות בלי width ו-height. מוסיף מידות אמיתיות.
4. [הפוטר] הודעת ההסכמה צפה ומכסה את הקישורים המשפטיים ב-390. מוריד אותה לזרימה בתוך הפוטר, לפי פרק 6.3.
5. [סקשן הכאב] טקסט ב-11px בתוך המוקאפ. מעלה ל-14px.
6. [כרטיס המחיר] הכפתור בגובה 38px. מעלה ל-44px.
7. [legal.html] 2 מילים בודדות בשורה ב-320 ו-1 ב-390. מוסיף text-wrap:pretty.
8. [הפוטר] הבאנר מכסה את "מדיניות פרטיות" ואת "הצהרת נגישות" בקפיצה לתחתית ב-390. מעגן את הבאנר ומרחיב את מרווח הפוטר.
9. [404.html] חסר prefers-reduced-motion בזמן שההצהרה מבטיחה הפחתת תנועה. מוסיף את הכלל.
10. [הפס הדביק] מעבר של 420 מילישניות על פקד ממשק. מוריד ל-240 לפי הסטנדרט של 5.3.

לא נבדק: design-taste-frontend, לא מותקן. impeccable, בלי רשת.
```

**כשל ב-`legal.html` או ב-`404.html` נכנס לרשימה כמו כל כשל אחר, ולא לשורת הערה בסוף.** הקובץ שאף אחד לא מסתכל עליו הוא הקובץ שנשבר, וזה נמדד.

**סדר הרשימה הוא סדר החשיפה של המבקר:** קודם תקלה שחוצה את כל הדף ולכן נראית כבר במסך הראשון, אחריה ההירו, ואחריה שאר הסקשנים בסדר הגלילה. לא לפי חומרה טכנית ולא לפי סדר הפלט של השער.

## 10. שלב 7: תקן אחד, אמת, עבור לבא

**לא צוברים תיקונים.** אחרי כל תיקון בודד:

1. מריצים את השער על **הקובץ שתיקנת** ועל הרוחב שנכשל בלבד: `node landing-qa.mjs "file://$DIR/legal.html" 320`.
2. רק כשהוא ירוק עוברים לתיקון הבא.
3. **חריג אחד, והוא מחייב:** שינית גודל גופן, רוחב עמודה או ריווח, מריצים מיד את השער המלא של 4.2.1 על שלושת הקבצים ובששת הרוחבים. לא את הרוחב שנכשל. הנימוק המלא ב-4.1.2.
4. בסוף כל התיקונים מריצים את **כל השכבות** מחדש: השער המלא (4.2.1), הכיסוי (4.5), הניגודיות (4.6) ואימות ההצהרה (4.7). על שלושת הקבצים.

הסיבה: שני תיקונים ביחד שמבטלים זה את זה נראים כמו תיקון אחד שלא עבד, והחיפוש אחר מי מהם שבר מה לוקח יותר זמן מהתיקונים עצמם.

**והסיבה לסעיף 4:** תיקון ב-`index.html` יכול לשבור את `legal.html` כשהם חולקים טוקן `:root`, ותיקון ניגודיות של טוקן משנה כל אלמנט שמשתמש בו. **התיקון האחרון הוא זה שאף אחד לא בודק,** וזה בדיוק המקום שממנו הגיע הבאג של הסבב הזה.

## 11. מתכוני תיקון מוכנים

| ממצא | התיקון שעובד |
|---|---|
| `orphans` | `text-wrap:balance` על `h1,h2,h3` ו-`text-wrap:pretty` על `p,li,figcaption`. פותר כ-85% מהמקרים (22 ירדו ל-3 בשורתיים CSS) |
| `orphans` שנשאר | כותרת עם `<br>` בפנים. `text-wrap:balance` לא עובד עם `<br>` באותה כותרת ויוצא זיגזג. מפצלים לשני `<span class="lg">` עם `display:block;text-wrap:balance`, כל קבוצה מתאזנת בנפרד |
| `hidden` (reveal שקוף) | מורידים `scroll-behavior` מה-CSS ומעבירים את הגלילה החלקה ל-JS על עוגנים בלבד. בנוסף `<script>document.documentElement.classList.add('js')</script>` ב-head, `.js .reveal{opacity:0}` ולא `.reveal{opacity:0}`, ו-`<noscript>` שמחזיר לאחור |
| `overflow` במובייל | בליטה ברוחב אחוזים. משתנה `--flare` עם ערך באחוזים בדסקטופ ו-`10px` מתחת ל-720px |
| `smalltext` | מעלים ל-14px. נקודה. אם הגודל בא מ-`clamp`, המספר הראשון ב-`clamp` הוא זה שצריך להיות `14px`. תקף גם לטקסט בתוך מוקאפ, שדווקא נראה טוב יותר אחרי זה. אין חריג לאף אלמנט. **ואחרי התיקון מריצים את השער המלא מחדש, כי הגדלת גופן מייצרת `orphans` חדשים (4.1.2)** |
| ניגודיות מתחת ל-4.5 | מכהים או מבהירים את **הטוקן ב-`:root`**, לא את האלמנט. **ב-`.fill`: מוחקים את ה-`opacity` לגמרי.** שקיפות על סימון `[למלא]` נמדדה בכל ערך והיא נכשלת: `.55` נתנה 2.26 עד 4.24, `.75` נתנה 3.26 עד 3.49, ו-`.85` נתנה 3.98 על `--ivory`. ההחלשה של הסימון היא צבע (`--fill-d` / `--fill-l`), גודל גופן קבוע ומסגרת מקווקוות, לפי הפרק "כל `[למלא]` שמוצג בדף" ב-`lp-build`. אחרי התיקון מריצים את 4.6 מחדש, כי טוקן אחד נוגע בהרבה אלמנטים |
| הודעת ההסכמה צפה, או מכסה קישור בפוטר | **מורידים אותה לזרימה בתוך `<footer>`** לפי פרק 6.3 של `design-formula.md`, ומוחקים מהדף כל `has-cookiebar`, `showBar` וה-observer שהדליק אותה. זה מבטל את הכיסוי במקום למדוד אותו. `padding-bottom` שנוסף אחרי שהקוראת כבר גללה לתחתית לא מזיז אותה |
| טענה בהצהרה שלא מתקיימת | מתקנים את הדף, או מנסחים את הטענה מדויק, או מעבירים ל"פערים ידועים". **לא מוחקים את הטענה כדי לעבור** (4.7) |
| `nodims` | `width` ו-`height` אמיתיים כתכונות על כל `<img>`, ו-`height:auto` ב-CSS כדי שלא תימתח |
| `touch` | `min-height:44px` על `a.cta`, `button`, `summary` ושדות הטופס |
| `tracking` | מוחקים את `letter-spacing`. כותרת קטנה היא כותרת אמיתית: `clamp(1rem, 2.4vw, 1.1875rem)`, משקל 800, בצבע הכותרות של הסקשן, ולא תווית זהב זעירה ומרווחת |
| `hr` ו-`fade` | מוחקים. מפרידים סקשנים בשינוי רקע וריווח בלבד |
| `offcenter` | התמונה חתוכה ועוגנת לצד אחד. מחזירים את המסגרת הנראית למרכז, לא את התמונה |
| ממצא תנועה מ-5.3 | `easing` שאינו `var(--ease)`: מחליפים לטוקן. משך ממשק מעל 300ms: מורידים. תכונה שאינה `transform` או `opacity`: כותבים מחדש דרך `transform`. `stagger` מעל 80ms: מורידים ל-60. **את מנגנון ה-`.reveal` לא נוגעים**, הוא זה שמחזיק את בדיקת `hidden` בשער |
| ממצא מ-5.2 שסותר את הנוסחה | לא מתקנים. כותבים בדוח "ממצא מכוון, הנוסחה גוברת" ומציינים איזו שורה בטבלת ההתנגשויות של 5.2 מכסה אותו |
| `[hidden]` לא עובד | `[hidden]{display:none!important}` גלובלי. `[hidden]` מובס על ידי `display:flex` מפורש, וזה מה שמשאיר באנר קוקיז פתוח וטפסים מוכפלים |

## 12. הרשאה לשנות תוכן

התיקונים כאן הם **עיצוב ומבנה**. אין רשות:

- לשנות את הקופי, לקצר אותו או להוסיף סקשן. אורך הדף שווה לאורך הקופי שנמסר.
- להמציא alt, כיתוב, עדות, מספר או פרט עסק.
- להחליף תמונה בתמונה אחרת. תמונה חסרה נשארת סלוט שאומר מה חסר, ולא placeholder מומצא.
