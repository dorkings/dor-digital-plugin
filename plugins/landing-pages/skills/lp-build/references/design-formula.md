# נוסחת העיצוב: מערכת העיצוב המלאה של דף הזהב

מסמך זה הוא הנדסה לאחור מלאה של `growth-partner-v2/index.html`, הדף הטוב ביותר שדור עמוס בנה (99KB, 1078 שורות, HTML אחד בלי תלויות). כל שורת קוד כאן מצוטטת מהדף האמיתי, לא משוחזרת מהזיכרון. מי שקורא את המסמך הזה צריך להיות מסוגל לבנות דף באותה איכות בלי לפתוח את המקור.

**איך משתמשים במסמך:**
1. הטוקנים, הטיפוגרפיה, דקדוק הסקשנים והרכיבים הם **המערכת**. מעתיקים אותם כמו שהם.
2. **הצבעים הם ברירת מחדל אחת מתוך כמה, לא חוק.** נייבי וזהב היא הפלטה של הדף המקורי, ולא התשובה לכל לקוח. פרק 1.5 מחזיק שמונה פלטות בדוקות לפי נישה, את ארבעת המסלולים לבחירת פלטה ואת בדיקת הניגודיות. אם לעסק יש פלטה משלו, היא גוברת: מחליפים את הערכים ב-`:root` ומשאירים את כל המבנה.
3. הטקסטים, המספרים, העדויות והתמונות בדוגמאות הם של דור. **אסור להעתיק אותם לדף של לקוח.** מה שאין, מסמנים `[למלא]`.
4. לא מוסיפים סקשנים שהקופי לא ביקש. אורך הדף שווה לאורך הקופי.

---

## 1. טוקנים: כל משתני ה-`:root` המדויקים

זה הבלוק המלא מהדף, מילה במילה:

```css
:root{
  --ink:#0B0F19; --ink-2:#121826; --ink-3:#1A2236; --ink-4:#232D45;
  --gold:#C9A96E; --gold-2:#E9CC82; --gold-deep:#8F6E2E; --gold-ink:#1A1408;
  --ivory:#F7F2E9; --ivory-2:#FFFCF7; --paper:#EFE6D4;
  --text-d:#F2EDE6; --muted-d:#AEB5C4; --soft-d:#7E8797;
  --text-l:#1B2233; --muted-l:#59627A;
  --ok:#2F9C6C; --bad:#C6494B;
  --wa:#25D366;
  --fill-d:#8F96A6; --fill-l:#626A7D;
  --serif:'Frank Ruhl Libre',Georgia,'Times New Roman',serif;
  --sans:'Heebo',-apple-system,'Segoe UI',Arial,sans-serif;
  --r:16px; --r-s:12px; --ease:cubic-bezier(.16,1,.3,1);
  --w:760px; --w-card:640px;
}
```

**מה כל טוקן משרת בפועל:**

| טוקן | ערך | תפקיד מדויק בדף |
|---|---|---|
| `--ink` | `#0B0F19` | הרקע הכהה העמוק. רקע ה-`body`, הסקשנים `dark deep`, ההירו, הפוטר ופס ה-CTA הדביק. |
| `--ink-2` | `#121826` | הרקע הכהה ה"רגיל" של `.dark`. מדרגה אחת בהירה מ-`--ink`, וזה כל ההבדל בין שני סקשנים כהים עוקבים. |
| `--ink-3` | `#1A2236` | רקע כרטיסים בתוך סקשן כהה: `.feat`, `.reel-card`, `.case`. |
| `--ink-4` | `#232D45` | הקצה הבהיר בגרדיאנט של `.vslot` (סלוט וידאו ריק). זה השימוש היחיד שלו. |
| `--gold` | `#C9A96E` | הזהב ה"מבני": מסגרת הפורטרט, מסגרת כפתור הנגישות, `outline` של קישור הדילוג. לא לטקסט. |
| `--gold-2` | `#E9CC82` | זהב הטקסט על רקע כהה: `.g`, מספרי סטטיסטיקה, `.gold-line`, כותרות בכרטיסים כהים, חצי הקרוסלה. |
| `--gold-deep` | `#8F6E2E` | זהב הטקסט על רקע בהיר. אותו תפקיד כמו `--gold-2` אבל בסקשן `light`, כי `--gold-2` על קרם לא עובר ניגודיות. |
| `--gold-ink` | `#1A1408` | **צבע הטקסט בתוך כפתור הזהב.** חום כמעט שחור, לא `#000`. זה מה שנותן לכפתור מראש מוטבע ולא זול. |
| `--ivory` | `#F7F2E9` | הרקע הבהיר הראשי (`.light`). קרם, לא לבן. |
| `--ivory-2` | `#FFFCF7` | הרקע הבהיר הבוהק (`.light.bright`). כמעט לבן, נותן מדרגה שנייה בתוך המשפחה הבהירה. |
| `--paper` | `#EFE6D4` | מוגדר לשלמות הפלטה, לא בשימוש בדף הזה. |
| `--text-d` | `#F2EDE6` | טקסט גוף על רקע כהה כשהוא צריך להיות בולט (לא לבן טהור, קרמי קצת). |
| `--muted-d` | `#AEB5C4` | פסקאות רגילות על רקע כהה. |
| `--soft-d` | `#7E8797` | הטקסט החלש ביותר: כיתובי תמונה, הערות כוכבית, שורת ההסכמה, רמז הקרוסלה. |
| `--text-l` | `#1B2233` | טקסט כותרות וטקסט מודגש על רקע בהיר. |
| `--muted-l` | `#59627A` | פסקאות רגילות על רקע בהיר. |
| `--ok` | `#2F9C6C` | וי ירוק ב-`.chips` וב-`.fit.yes`. |
| `--bad` | `#C6494B` | איקס אדום ב-`.fit.no`. |
| `--wa` | `#25D366` | ירוק וואטסאפ. מוגדר לזמינות, הכפתורים בדף נשארים זהב. |
| `--fill-d` | `#8F96A6` | צבע הטקסט של סימון `[למלא]` על רקע כהה. נמדד: 5.26 עד 6.46 מול שלוש דרגות הכהה. |
| `--fill-l` | `#626A7D` | אותו תפקיד על רקע בהיר. נמדד: 4.86 עד 5.42 מול קרם, קרם בוהק ולבן. |
| `--serif` | `'Frank Ruhl Libre',Georgia,'Times New Roman',serif` | כותרות ומספרים. |
| `--sans` | `'Heebo',-apple-system,'Segoe UI',Arial,sans-serif` | כל הגוף וכל ה-h3. |
| `--r` | `16px` | רדיוס כרטיס. |
| `--r-s` | `12px` | רדיוס פריט רשימה וכפתור. |
| `--ease` | `cubic-bezier(.16,1,.3,1)` | **ה-easing היחיד בדף.** ease-out חד. אין שום easing אחר. |
| `--w` | `760px` | רוחב מקסימלי של עמודת התוכן (`.wrap`, h1, h2). |
| `--w-card` | `640px` | רוחב מקסימלי של כל ערימת כרטיסים ורשימה. |

**שלוש מערכות ולא יותר:** שלוש דרגות רקע כהה (`ink`, `ink-2`, `ink-3`), שלוש דרגות טקסט לכל צד (text / muted / soft), שני רדיוסים (`16` לכרטיס, `12` לפריט) ועוד `999px` לצ'יפ. כל חריגה מהמערכת הזאת נראית מיד.

### מצב ניגודיות גבוהה מחליף טוקנים, לא כללים

זה הרווח הגדול מהעבודה עם טוקנים. כל מצב הנגישות "ניגודיות גבוהה" הוא שורה אחת:

```css
html.a11y-contrast{--ink:#000;--ink-2:#000;--ink-3:#111;--ink-4:#111;--ivory:#fff;--ivory-2:#fff;--paper:#fff;--text-d:#fff;--muted-d:#fff;--soft-d:#fff;--text-l:#000;--muted-l:#000;--gold:#ffd400;--gold-2:#ffe14d;--gold-deep:#4a3a00;--fill-d:#fff;--fill-l:#000}
```

**זה גם מה שמציל את `.fill`.** סימון `[למלא]` מקבל את צבעו מ-`--fill-d`/`--fill-l`, ולכן במצב ניגודיות גבוהה הוא הופך ללבן על שחור ולשחור על לבן לבד, בלי שורה נוספת. נמדד: 21 לאחד בשני הכיוונים. **זו הסיבה שאסור לכתוב hex בתוך כלל `.fill`, וגם לא `opacity`:** מצב הנגישות מחליף טוקנים, הוא לא מחליף כללים.

---

## 1.5 מדף הפלטות: שמונה פלטות בדוקות, והצבעים אינם חוק

**זה הסעיף שמונע מכל הדפים לצאת באותו נייבי וזהב.**

הכלל, חד: **המבנה הוא החוק. הצבעים הם בחירה.** 31 הרכיבים, ה-`clamp`, הדקדוק והתנועה קוראים צבע דרך `var(--token)`, ולכן **החלפת פלטה היא שש שורות ב-`:root` והיא לא נוגעת בשום רכיב.** דף שנבנה בנייבי וזהב הופך לוורוד ולבן בשש שורות, והפריסה, המרווחים, הטיפוגרפיה והאנימציות נשארים בדיוק אותו דבר.

**התנאי שמחזיק את ההבטחה הזאת, ומדידה שמראה שהוא לא מובן מאליו:** הרצת שער ה-hex על `growth-partner-v2/index.html` מחזירה **40 קודי hex ועוד 29 ערכי `rgb` ידניים בתוך כללים**, מחוץ לבלוק הטוקנים. כלומר בדף המקור עצמו החלפת פלטה אינה באמת שש שורות, היא שש שורות ועוד 69 מקומות. זה לא פגם בדף החי, שם הצבעים האלה נבחרו ידנית והוא לא נועד להחליף פלטה. **אבל דף שהסקיל בונה חייב להיות נקי, אחרת ההבטחה למשתמש שקרית.** לכן הכלל והשער שמיד אחריו.

### אפס hex בתוך כלל, וארבעה טוקני ערוצים לשקיפות

**חוק:** בתוך `<style>` מותרים קודי צבע רק בשלושה מקומות: בלוק `:root`, השורה של `html.a11y-contrast`, ושורות `a11y-invert` ו-`a11y-gray`. כל שאר הגיליון מקבל צבע רק דרך `var(--token)`.

שקיפות היא המקום שבו זה נשבר בדרך כלל, כי `rgba()` לא מקבל `var` של hex. לכן כל פלטה מגיעה עם **חמישה טוקני ערוצים**, והסקריפט מייצר אותם לבד:

```css
--ink-rgb:11,15,25; --gold-rgb:201,169,110; --gold-deep-rgb:134,104,43; --ivory-rgb:247,242,233; --text-l-rgb:27,34,51;
```

ואז, במקום `rgba(201,169,110,.16)`, כותבים:

```css
background:rgba(var(--gold-rgb),.16);
border:1px solid rgba(var(--gold-rgb),.5);
background:rgba(var(--ink-rgb),.92);
```

`rgba(0,0,0,.x)` ו-`rgba(255,255,255,.x)` **מותרים**, כי שחור ולבן אינם צבעי מותג והם צללים והבהרות. כל שאר הערכים המספריים אסורים.

**השער, שתי פקודות, שתיהן חייבות לחזור ריקות:**

```bash
# hex בתוך כלל, מחוץ לטוקנים ולמצבי הנגישות
perl -0777 -ne 'if(/<style>([\s\S]*?)<\/style>/){$c=$1; $c=~s/:root\{[^}]*\}//g; $c=~s/html\.a11y-contrast\{[^}]*\}//g; while($c=~/(#[0-9a-fA-F]{3,8})\b/g){ $h=lc $1; print "hex בכלל: $1\n" unless $h=~/^#(fff|000|ffffff|000000)$/ }}' index.html

# rgb עם ערוצים ידניים שאינם שחור או לבן
perl -0777 -ne 'if(/<style>([\s\S]*?)<\/style>/){$c=$1; while($c=~/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g){ print "rgb ידני: $1,$2,$3\n" unless "$1,$2,$3" eq "0,0,0" or "$1,$2,$3" eq "255,255,255" }}' index.html
```

### שלושת סוגי הטוקנים

**12 טוקנים נבחרים.** אלה מה שאתה מחליט עליו, או שואל עליו, או גוזר מהמותג:

| # | טוקן | מה הוא |
|---|---|---|
| 1 | `--ink` | הרקע הכהה העמוק |
| 2 | `--ink-2` | הרקע הכהה הרגיל |
| 3 | `--ink-3` | כרטיס בתוך סקשן כהה |
| 4 | `--gold` | צבע המבטא המבני: מסגרות בלבד |
| 5 | `--gold-2` | המבטא כטקסט על רקע כהה |
| 6 | `--gold-deep` | המבטא כטקסט על רקע בהיר |
| 7 | `--gold-ink` | הטקסט בתוך כפתור המבטא |
| 8 | `--ivory` | הרקע הבהיר הראשי |
| 9 | `--ivory-2` | הרקע הבהיר הבוהק |
| 10 | `--text-d` | טקסט בולט על רקע כהה |
| 11 | `--muted-d` | פסקה רגילה על רקע כהה |
| 12 | `--text-l` | כותרת וטקסט מודגש על רקע בהיר |

**6 טוקנים נגזרים.** הסקריפט מחשב אותם, ואסור לבחור אותם ביד:

| טוקן | הנוסחה |
|---|---|
| `--ink-4` | `--ink-3` עם בהירות פלוס 4.5 נקודות |
| `--paper` | `--ivory` עם בהירות מינוס 5.5 נקודות |
| `--soft-d` | `--muted-d` עם בהירות מינוס 17 נקודות ורוויה כפול 0.60, ואז מעלים נקודה בכל פעם עד ש-4.5 מול שלוש דרגות הכהה |
| `--muted-l` | `--text-l` עם בהירות פלוס 26 נקודות ורוויה כפול 0.36, ואז מורידים נקודה עד ש-4.5 מול שתי דרגות הבהיר |
| `--fill-d` | `--muted-d` עם בהירות מינוס 12 נקודות ורוויה כפול 0.75, עם אותו תיקון |
| `--fill-l` | `--muted-l` עם בהירות פלוס 2 נקודות, ואז מורידים עד 4.5 מול קרם, קרם בוהק ולבן |

הרוויה יורדת ככל שהטקסט נחלש, וזה לא קישוט: פסקת גוף בצבע מותג רווי היא הסימן המובהק ביותר לדף חובבני. הנוסחה שוחזרה מהדף של דור ומחזירה אותו כמעט מדויק: `--fill-d` יוצא `#8F96A6` בול, `--ink-4` יוצא `#212C45` מול `#232D45` שבדף, `--paper` יוצא `#F0E6D4` מול `#EFE6D4`.

**3 טוקנים קבועים בכל פלטה,** כי הם סמנטיים ולא מותגיים: `--ok:#2F9C6C`, `--bad:#C6494B`, `--wa:#25D366`.

### שמונה הפלטות

כולן נמדדו בפועל בסקריפט על 24 צירופי הטקסט שבשימוש בדף. **בכולן הצירוף הגרוע ביותר עובר AA.**

| פלטה | לאילו נישות | `--ink` | `--gold-2` | `--ivory` | הגרוע ביותר |
|---|---|---|---|---|---|
| נייבי וזהב | יוקרה, עסקים, ליווי, יעוץ, פיננסי אישי, B2B | `#0B0F19` | `#E9CC82` | `#F7F2E9` | 4.57 |
| חציל ורוז | ביוטי, אסתטיקה, קוסמטיקה, ציפורניים, מיתוג אישי לנשים | `#170E1C` | `#E8A9BE` | `#FAF4F6` | 4.53 |
| יער ומרווה | בריאות, תזונה, טיפול, נטורופתיה, פסיכולוגיה, יוגה | `#0B1712` | `#9BDFBA` | `#F3F7F3` | 4.56 |
| פחם וגחלת | כושר, אימון אישי, ספורט, תזונת ספורט, אתגרים | `#0E0F11` | `#FF8A4C` | `#F6F4F1` | 4.78 |
| אינדיגו וענבר | חינוך, הורות, קורסים, מורות, חוגים, ילדים | `#101534` | `#F5C36B` | `#F7F5EF` | 4.64 |
| סלייט וציאן | פיננסים, טק, SaaS, נדלן, השקעות, אוטומציה | `#0A1220` | `#8BE0F2` | `#F2F6F9` | 4.57 |
| קקאו וטרקוטה | אוכל, מתכונים, אפייה, קייטרינג, בתי קפה, מארחות | `#1A1210` | `#E9A183` | `#FAF3EA` | 4.51 |
| גרפיט ואבן | אופנה, עיצוב פנים, אדריכלות, צילום, מינימליזם | `#101010` | `#D6D0C6` | `#F4F2EE` | 4.59 |

**הנישה היא רמז, לא כלא.** מאמנת כושר שהמותג שלה ורוד מקבלת חציל ורוז. יועצת עסקית שביקשה ירוק מקבלת יער ומרווה. מה שהמשתמש אמר גובר תמיד.

### בלוקי ה-`:root` המלאים

**נייבי וזהב.** זו הפלטה של הדף המקורי, עם שני ערכים מוחמרים שמוסברים מיד אחריה:

```css
:root{
  --ink:#0B0F19; --ink-2:#121826; --ink-3:#1A2236; --ink-4:#212C45;
  --gold:#C9A96E; --gold-2:#E9CC82; --gold-deep:#86682B; --gold-ink:#1A1408;
  --ivory:#F7F2E9; --ivory-2:#FFFCF7; --paper:#F0E6D4;
  --text-d:#F2EDE6; --muted-d:#AEB5C4; --soft-d:#838A98;
  --text-l:#1B2233; --muted-l:#5E6475;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#8F96A6; --fill-l:#63697B;
  --ink-rgb:11,15,25; --gold-rgb:201,169,110; --gold-deep-rgb:134,104,43; --ivory-rgb:247,242,233; --text-l-rgb:27,34,51;
}
```

נמדד: `text-d` על `ink` 16.44, `muted-d` על `ink-2` 8.62, `gold-2` על `ink-3` 10.12, `gold-deep` על `ivory` 4.67, `muted-l` על `ivory` 5.30, טקסט הכפתור על הזהב 8.18. הגרוע ביותר 4.57.

**שני ההחמרות, והמדידה שמאחוריהן.** בדף החי של דור `--gold-deep` הוא `#8F6E2E` ו-`--soft-d` הוא `#7E8797`. הרצת הסקריפט על `growth-partner-v2/index.html` מחזירה 4.24 ו-4.37, שניהם מתחת ל-4.5. בדף עצמו הם עוברים בהקשר: `--soft-d` מופיע ב-`.feat figcaption` על רקע `rgba(0,0,0,.25)` מעל `--ink-3`, כלומר על `#141928` בפועל, ושם הוא 4.84. `--gold-deep` מופיע רובו ככולו בכותרות גדולות ובחתימה. **אבל `.silos span` הוא 0.95rem במשקל 800, וזה לא טקסט גדול לפי AA.** לכן בטבלה כאן הערכים מוחמרים לערכים שעוברים בכל מקרה, והם נראים זהים לעין. דף חדש נבנה עם הערכים שבטבלה.

**חציל ורוז.**

```css
:root{
  --ink:#170E1C; --ink-2:#1F1427; --ink-3:#2A1B34; --ink-4:#362343;
  --gold:#C9819B; --gold-2:#E8A9BE; --gold-deep:#8E3E5C; --gold-ink:#1F0A12;
  --ivory:#FAF4F6; --ivory-2:#FFFBFC; --paper:#F1E1E6;
  --text-d:#F4EAF0; --muted-d:#C0AEBD; --soft-d:#948391;
  --text-l:#26182C; --muted-l:#695A6F;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#A28F9F; --fill-l:#6E5F75;
  --ink-rgb:23,14,28; --gold-rgb:201,129,155; --gold-deep-rgb:142,62,92; --ivory-rgb:250,244,246; --text-l-rgb:38,24,44;
}
```

נמדד: 16.02 / 8.45 / 8.32 / 6.46 / 5.87 / 6.39. הגרוע ביותר 4.53.

**יער ומרווה.**

```css
:root{
  --ink:#0B1712; --ink-2:#102019; --ink-3:#172C23; --ink-4:#1F3B2F;
  --gold:#6FBF96; --gold-2:#9BDFBA; --gold-deep:#2F6B4C; --gold-ink:#06160F;
  --ivory:#F3F7F3; --ivory-2:#FBFDFB; --paper:#E2ECE2;
  --text-d:#E8F1EB; --muted-d:#A9BDB2; --soft-d:#81938A;
  --text-l:#16241D; --muted-l:#57685F;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#8A9F93; --fill-l:#5C6E64;
  --ink-rgb:11,23,18; --gold-rgb:111,191,150; --gold-deep-rgb:47,107,76; --ivory-rgb:243,247,243; --text-l-rgb:22,36,29;
}
```

נמדד: 15.90 / 8.54 / 9.61 / 5.83 / 5.47 / 8.47. הגרוע ביותר 4.56.

**פחם וגחלת.**

```css
:root{
  --ink:#0E0F11; --ink-2:#15171A; --ink-3:#1E2126; --ink-4:#282C33;
  --gold:#F2622B; --gold-2:#FF8A4C; --gold-deep:#A63B12; --gold-ink:#170A03;
  --ivory:#F6F4F1; --ivory-2:#FDFCFA; --paper:#EBE7E0;
  --text-d:#F0EEEB; --muted-d:#B3B7BE; --soft-d:#888C92;
  --text-l:#16181C; --muted-l:#575A5F;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#9498A0; --fill-l:#5C5F64;
  --ink-rgb:14,15,17; --gold-rgb:242,98,43; --gold-deep-rgb:166,59,18; --ivory-rgb:246,244,241; --text-l-rgb:22,24,28;
}
```

נמדד: 16.56 / 8.92 / 6.91 / 5.88 / 6.31 / 6.07. הגרוע ביותר 4.78.

**אינדיגו וענבר.**

```css
:root{
  --ink:#101534; --ink-2:#171D42; --ink-3:#202752; --ink-4:#262F63;
  --gold:#E0A94E; --gold-2:#F5C36B; --gold-deep:#8A5E12; --gold-ink:#1A1204;
  --ivory:#F7F5EF; --ivory-2:#FFFDF8; --paper:#EEE9DC;
  --text-d:#EFEFF7; --muted-d:#B4B8D0; --soft-d:#8E92A9;
  --text-l:#1A1E3A; --muted-l:#5D617B;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#9498B3; --fill-l:#616681;
  --ink-rgb:16,21,52; --gold-rgb:224,169,78; --gold-deep-rgb:138,94,18; --ivory-rgb:247,245,239; --text-l-rgb:26,30,58;
}
```

נמדד: 15.57 / 8.30 / 8.76 / 5.22 / 5.56 / 8.79. הגרוע ביותר 4.64.

**סלייט וציאן.**

```css
:root{
  --ink:#0A1220; --ink-2:#0F1929; --ink-3:#172438; --ink-4:#1E2E48;
  --gold:#3FB6D4; --gold-2:#8BE0F2; --gold-deep:#10657C; --gold-ink:#04161C;
  --ivory:#F2F6F9; --ivory-2:#FBFDFE; --paper:#DFE9F0;
  --text-d:#E9F1F6; --muted-d:#A8B8C6; --soft-d:#7D8D9A;
  --text-l:#14202E; --muted-l:#556271;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#8899A8; --fill-l:#596777;
  --ink-rgb:10,18,32; --gold-rgb:63,182,212; --gold-deep-rgb:16,101,124; --ivory-rgb:242,246,249; --text-l-rgb:20,32,46;
}
```

נמדד: 16.40 / 8.68 / 10.43 / 6.09 / 5.73 / 7.79. הגרוע ביותר 4.57.

**קקאו וטרקוטה.**

```css
:root{
  --ink:#1A1210; --ink-2:#221816; --ink-3:#2E211D; --ink-4:#3C2B26;
  --gold:#D2795A; --gold-2:#E9A183; --gold-deep:#96421F; --gold-ink:#1C0B04;
  --ivory:#FAF3EA; --ivory-2:#FFFBF5; --paper:#F5E6D3;
  --text-d:#F3E9E1; --muted-d:#C4B2A8; --soft-d:#98877D;
  --text-l:#241814; --muted-l:#685955;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#A69388; --fill-l:#6E5E5A;
  --ink-rgb:26,18,16; --gold-rgb:210,121,90; --gold-deep-rgb:150,66,31; --ivory-rgb:250,243,234; --text-l-rgb:36,24,20;
}
```

נמדד: 15.43 / 8.49 / 7.32 / 6.16 / 6.06 / 6.03. הגרוע ביותר 4.51.

**גרפיט ואבן.** בפלטה הזאת המבטא אינו צבעוני, הוא ניגוד. לכן היא הבטוחה ביותר לנישות עיצוביות שבהן צבע חזק נראה זול.

```css
:root{
  --ink:#101010; --ink-2:#171717; --ink-3:#202020; --ink-4:#2B2B2B;
  --gold:#B8B0A2; --gold-2:#D6D0C6; --gold-deep:#5C554A; --gold-ink:#121110;
  --ivory:#F4F2EE; --ivory-2:#FCFBF9; --paper:#E9E5DD;
  --text-d:#EFEDE8; --muted-d:#B6B3AC; --soft-d:#8A8881;
  --text-l:#161614; --muted-l:#595956;
  --ok:#2F9C6C; --bad:#C6494B; --wa:#25D366;
  --fill-d:#98948D; --fill-l:#5E5E5B;
  --ink-rgb:16,16,16; --gold-rgb:184,176,162; --gold-deep-rgb:92,85,74; --ivory-rgb:244,242,238; --text-l-rgb:22,22,20;
}
```

נמדד: 16.26 / 8.57 / 10.63 / 6.58 / 6.29 / 8.78. הגרוע ביותר 4.59.

### בדיקת הניגודיות, לפני שמאמצים ולא אחרי

**כל פלטה נבדקת לפני שהיא נכנסת לדף.** גם אחת מהשמונה שלמעלה, כשמשנים בה ערך. 24 הצירופים שבשימוש, כולם חייבים 4.5 ומעלה:

- טקסט גוף על רקע: `text-d` ו-`muted-d` מול `ink`, `ink-2` ו-`ink-3`. `text-l` מול `ivory` ו-`ivory-2`.
- טקסט מעומעם על רקע: `soft-d` מול שלוש דרגות הכהה, `muted-l` מול שתי דרגות הבהיר.
- צבע המבטא כטקסט: `gold-2` מול שלוש דרגות הכהה, `gold-deep` מול שתי דרגות הבהיר.
- הכפתור: `gold-ink` בתוך `gold`.
- סימוני `[למלא]`: `fill-d` מול שלוש הכהות, `fill-l` מול שתי הבהירות.

הפקודה. `$PC` הוא נתיב הסקריפט, ואיך מאתרים אותו כתוב בשלב ב של `lp-build`:

```bash
PC="${CLAUDE_PLUGIN_ROOT:-/nonexistent}/skills/lp-build/scripts/palette-check.mjs"
[ -f "$PC" ] || PC="$(find "$HOME/.claude/plugins" "$HOME/.claude/skills" -type f -name palette-check.mjs -path '*lp-build*' 2>/dev/null | head -1)"

node "$PC" palette.json            # 12 טוקנים נבחרים -> 18 טוקנים + טבלת מדידה
node "$PC" --accent '#E8A9BE'      # צבע אחד שהמשתמש אמר. אפשר להוסיף --dark '#170E1C'
node "$PC" assets/harvest/palette.json   # קציר. יוצא בקוד 2 אם הקציר אינו מותג
node "$PC" index.html              # בודק פלטה של דף בנוי
node "$PC" palette.json --css      # רק בלוק ה-:root, להדבקה
```

הסקריפט יוצא בקוד 1 כשצירוף נופל. **כשהוא נופל, מכהים את צבע הטקסט על רקע בהיר או מבהירים אותו על רקע כהה, ומריצים שוב. לא מוותרים על הבדיקה, ולא מורידים את הרף.**

אין נוד בסביבה? מחשבים ביד: `L = 0.2126*R' + 0.7152*G' + 0.0722*B'` כשכל ערוץ מנורמל ל-0 עד 1 ואז `c/12.92` אם `c<=0.04045` ואחרת `((c+0.055)/1.055)^2.4`. היחס הוא `(L_בהיר+0.05)/(L_כהה+0.05)`. אם גם זה לא אפשרי, לוקחים פלטה מהשמונה כמו שהיא, בלי לשנות בה ערך, ומדווחים שהבדיקה לא רצה.

### מצב ניגודיות גבוהה לא משתנה בין פלטות

השורה של `html.a11y-contrast` נשארת בדיוק כמו שהיא בכל פלטה. היא דורסת את כל הטוקנים לשחור, לבן וצהוב, ומגיעה ל-21 לאחד. זו הנקודה של עבודה בטוקנים: **מצב הנגישות מחליף טוקנים, הוא לא מחליף כללים, ולכן הוא עובד על כל פלטה בלי שורה אחת נוספת.**


---

## 2. הבסיס הגלובלי

```css
*{margin:0;padding:0;box-sizing:border-box}
html{overflow-x:hidden;-webkit-text-size-adjust:100%}
body{
  font-family:var(--sans);font-size:1.0625rem;line-height:1.8;
  color:var(--text-l);background:var(--ink);text-align:center;
  -webkit-font-smoothing:antialiased;
}
[hidden]{display:none!important}
img{max-width:100%;height:auto;display:block}
a{color:inherit}
strong{font-weight:800}
h1,h2,h3{text-wrap:balance;font-family:var(--serif);line-height:1.38}
p,li,figcaption{text-wrap:pretty}
.lg{display:block;text-wrap:balance}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
```

חמש החלטות קריטיות מוסתרות בבלוק הזה:

1. **`overflow-x:hidden` על `html` ולא על `body`.** על `body` זה הופך את `body` לאלמנט הגולל, `window.scrollY` קופא, וכל גלילה תוכניתית או שחזור מיקום נשברים.
2. **`text-align:center` על `body`.** כל הדף ממורכז מברירת מחדל. רק רכיבים שהם "מסך" או "רשימה עם אייקון" מחזירים `text-align:right` מקומית.
3. **`img{max-width:100%;height:auto}` גלובלי.** זה הביטוח שתמונה לא נמתחת גם אם נכתב לה `width` בלבד.
4. **`[hidden]{display:none!important}` חובה.** כל רכיב עם `display` מפורש (הודעת ההסכמה היא `flex`, הפאנל הוא `block`) מנצח את `[hidden]` בלי הכלל הזה, ואז הודעת ההסכמה לא נסגרת.
5. **`text-wrap:balance` על כותרות ו-`pretty` על גוף.** שתי השורות האלה מחסלות בערך 85 אחוז מהמילים הבודדות בשורה בעברית.

### פס הגרעין

```css
body::before{
  content:"";position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E");
}
.sec > *{position:relative;z-index:1}
```

overlay גרעין אחד קבוע על כל הדף, ב-7 אחוז אטימות, כ-SVG inline (אפס בקשות רשת). הוא מה שהופך את השטחים הכהים מ"שחור דיגיטלי" לנייר. `pointer-events:none` כדי שלא יחסום קליקים, ו-`.sec > *` מרים את התוכן מעליו. במצב ניגודיות גבוהה הוא נכבה: `html.a11y-contrast body::before{display:none}`.

---

## 3. טיפוגרפיה

### שני פונטים, חלוקת עבודה חדה

```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700;900&family=Heebo:wght@400;600;700;800;900&display=swap" onload="this.rel='stylesheet'">
```

* **Frank Ruhl Libre**, משקלים 700 ו-900 בלבד. סריף עברי. משמש ל: `h1`, `h2`, כל המספרים הגדולים (`.stats .n`, `.tiles .n`, `.feat-stat .num`, `.ledger .total b`), `.product`, `.gold-line`, `.sig`, מספור `.chain li::before`, `.quotes li`, `.compare q`, כותרת `.ledger header b`.
* **Heebo**, משקלים 400, 600, 700, 800, 900. סנס עברי. כל הגוף, כל ה-`h3`, כל הכפתורים, כל הצ'יפים, כל התוויות.

**הכלל:** סריף לרגש ולמספרים, סנס לקריאה ולממשק. `h3` הוא במפורש סנס למרות שהוא כותרת:

```css
h3{font-family:var(--sans);font-size:clamp(1.15rem,2.6vw,1.35rem);font-weight:800;margin:0 auto 12px}
```

### כל ה-clamp בדף, מדויק

```css
h1{font-size:clamp(1.5rem,4vw,2.35rem);font-weight:900;color:#fff;margin:0 auto 18px;max-width:var(--w)}
h2{font-size:clamp(1.5rem,3.6vw,2.15rem);font-weight:700;margin:0 auto 16px;max-width:var(--w)}
h3{font-size:clamp(1.15rem,2.6vw,1.35rem);font-weight:800}
.lead{font-size:clamp(1.1rem,2.4vw,1.28rem);font-weight:700;line-height:1.7;max-width:640px;margin:0 auto 20px}
.big{font-size:clamp(1.2rem,2.8vw,1.5rem);font-weight:800;line-height:1.6}
.gold-line{font-size:clamp(1.6rem,4vw,2.4rem);font-weight:900;font-family:var(--serif);margin:8px auto 0}
.eyebrow{font-size:clamp(14px,3.4vw,1.1rem);font-weight:600;line-height:1.55}
.cta{font-size:clamp(1.02rem,2.2vw,1.18rem)}
.cta.xl{font-size:clamp(1.08rem,2.5vw,1.3rem)}
.product{font-size:clamp(1.9rem,5.5vw,3rem);font-weight:900;line-height:1.2}
.sig{font-size:clamp(1.4rem,3.4vw,1.9rem);font-weight:700}
.stats .n{font-size:clamp(1.5rem,4.2vw,2.2rem);line-height:1.1}
.tiles .n{font-size:clamp(1.35rem,3.6vw,1.8rem);line-height:1.1}
.feat-stat .num{font-size:clamp(2rem,6vw,3rem);line-height:1.05}
.case-body h3{font-size:clamp(1.2rem,2.8vw,1.4rem)}
.compare q{font-size:clamp(1.1rem,2.6vw,1.35rem)}
```

### רצפת הגופן: 14px, בכל מקום, בלי חריג

**אף גודל גופן בדף לא יורד מתחת ל-14px.** זה חל על ההוק, על הקיקר, על האותיות הקטנות, על שורת ההסכמה, על כיתובי תמונה ועל **טקסט בתוך מוקאפים**. אין חריג, גם לא "רק במובייל" וגם לא "רק בתוך מוקאפ".

* כל `clamp` על `font-size` מקבל ערך מינימלי של `14px` או יותר. הערך הקטן ביותר במסמך הזה הוא `.9rem` שהם 14.4px, ו-`clamp(14px,3.4vw,1.1rem)` של `.eyebrow`.
* כל JS שמקטין פונט דינמית (`fitHook`) חייב רצפה של 14px בקוד, אחרת הוא עובר מתחתיה לבד במסכים צרים.
* הסיבה שזה נוקשה: הצהרת הנגישות שהסקיל מייצר מצהירה במפורש שהטקסט הקטן ביותר בדף הוא 14 פיקסלים. גופן של 11px הופך את המסמך המשפטי הזה לשקר שכל אחד מפריך בשלוש שניות עם כלי הפיתוח. שער ה-QA נופל על טקסט מתחת ל-14px, ולכן 11px הפיל **כל** דף, כולל דף הזהב עצמו.

**שים לב ש-h1 גדול מ-h2 רק ב-0.2rem.** הכותרת הראשית לא ענקית. מה שמבדיל אותה זה משקל 900 מול 700, וצבע לבן טהור מול צבע הכותרות של הסקשן. `.product` ו-`.feat-stat .num` דווקא גדולים מ-h1, כי הם המספר או שם המוצר, ושם מותר לצעוק.

### line-height

| אלמנט | ערך | למה |
|---|---|---|
| `body` | `1.8` | עברית צריכה אוויר. זה גבוה משמעותית מ-1.5 המקובל. |
| `h1,h2,h3` | `1.38` | כותרות נושמות פחות. |
| `.lead` | `1.7` | |
| `.big` | `1.6` | |
| `.cta` | `1.35` | הוגדר פעמיים בבלוק, הערך התקף הוא האחרון. |
| `.stats .n`, `.tiles .n` | `1.1` | מספר גדול לא צריך רווח בין שורות. |
| `.feat-stat .num` | `1.05` | |
| `.small` | `1.65` | |

### מדרגות הטקסט וצבעיהן

```css
.g{color:var(--gold-2)}
.light .g,.light h2 .g{color:var(--gold-deep)}
.dark h2{color:#fff}
.light h2{color:var(--text-l)}
.dark .lead{color:var(--text-d)}
p{margin:0 auto 14px;max-width:560px}
.dark p{color:var(--muted-d)}
.dark p strong,.dark li strong{color:var(--text-d)}
.light p{color:var(--muted-l)}
.light p strong,.light li strong{color:var(--text-l)}
.dark .big{color:#fff}
.light .big{color:var(--text-l)}
.dark .gold-line{color:var(--gold-2)}
.light .gold-line{color:var(--gold-deep)}
.small{font-size:.9rem;line-height:1.65}
```

**המנגנון:** `.g` הוא ה-span שצובע מילים בזהב בתוך כותרת. הוא יודע לבד באיזה סקשן הוא נמצא ומחליף בין `--gold-2` ל-`--gold-deep`. **הזהב הוא צבע אחיד, לא גרדיאנט טקסט.** אין `background-clip:text` בשום מקום בדף.

**רוחב הפסקה הוא 560px**, צר מ-`--w` שהוא 760. זה מכוון: שורה קצרה יותר, קריאה קלה יותר. `.lead` רחב יותר, 640px.

### `.fill`: סימון `[למלא]`, חלש מהקופי אבל עובר ניגודיות

```css
.fill{opacity:1;border:1.5px dashed currentColor;border-radius:8px;padding:.2em .5em;
      font-size:clamp(14px,2.6vw,1rem)!important;font-weight:600!important;
      display:inline-block;color:var(--fill-l);line-height:1.5;text-wrap:pretty}
.dark .fill{color:var(--fill-d)}
.light .fill{color:var(--fill-l)}
footer .fill{color:var(--fill-d)}
```

**אין כאן `opacity` ואין `color:inherit`.** שניהם היו בגרסה קודמת, שניהם היו באגים, ושניהם נמדדו.

`opacity:.55` מערבב את הטקסט עם הרקע שמאחוריו, והמרחק בין השניים מתכווץ. **נמדד על 13 משפחות סקשנים בדף אמיתי: יחסי ניגודיות של 2.26 עד 4.24 מול סף 4.5. שתים עשרה מתוך שלוש עשרה נכשלו.** `opacity:.75` גם היא לא פותרת, היא מגיעה ל-3.26 עד 3.49 בלבד על הרקעים הבהירים, ו-`.85` נותנת 3.98 על `--ivory`. **`opacity` היא הכלי הלא נכון לבעיה הזאת בכל ערך.**

`color:inherit` היה הבאג השני: הסימון ירש פעם `--muted-d`, פעם `#fff` ופעם `--gold-2`, ואי אפשר לדעת מראש מה יוצא, כלומר אי אפשר למדוד את זה פעם אחת.

**הערכים שנמדדו** עם `--fill-d` ו-`--fill-l`:

| צבע | על הרקע | יחס |
|---|---|---|
| `--fill-d` `#8F96A6` | `--ink` `#0B0F19` | 6.46 |
| `--fill-d` `#8F96A6` | `--ink-2` `#121826` | 5.98 |
| `--fill-d` `#8F96A6` | `--ink-3` `#1A2236` וכרטיס לבן שקוף על כהה | 5.26 |
| `--fill-l` `#626A7D` | `--ivory` `#F7F2E9` | 4.86 |
| `--fill-l` `#626A7D` | `--ivory-2` `#FFFCF7` | 5.29 |
| `--fill-l` `#626A7D` | כרטיס לבן `#fff` | 5.42 |

הגרוע ביותר 4.86 מול סף 4.5, כלומר אין תא שעובר בקושי. ובמצב `a11y-contrast` הטוקנים מתחלפים ללבן ולשחור לבד, 21 לאחד.

**ומה משאיר את הסימון חלש מהקופי בלי שקיפות:** הגופן הקבוע עם `!important` שמוציא אותו מהיררכיית הכותרות גם בתוך `.product` או `h1`, המסגרת המקווקוות שאומרת "זה לא טקסט סופי", ומדרגת הצבע שכהה במעט מ-`--muted-d`/`--muted-l`. שלושתם נראים בעין ואף אחד לא מוריד את היחס מתחת לסף.

**וכשמודדים ניגודיות של `.fill`, חייבים לערבב את ה-`opacity` בחישוב:**

```js
let fg = px(getComputedStyle(el).color);
const op = parseFloat(getComputedStyle(el).opacity);
if (op < 1) fg = fg.map((v, i) => op * v + (1 - op) * bg[i]);
```

**בלי שלוש השורות האלה הבדיקה קוראת את הצבע המחושב, מתעלמת מהשקיפות ומחזירה PASS על דף שנכשל בעין.** זו בדיוק הטעות שהחביאה את הבאג הזה סבב שלם.

### שבירת שורות בכותרת: הכלל שמונע זיגזג

`text-wrap:balance` לא עובד עם `<br>` באותה כותרת. לכן כותרת שצריכה שבירה כפויה מתפצלת ל-spans עם `display:block`, וכל אחד מתאזן בנפרד:

```css
.lg{display:block;text-wrap:balance}
```

```html
<h2 class="reveal"><span class="lg">ברוך הבא לתקרת הזכוכית</span><span class="lg">של העסק <span class="g">שכבר הצליח.</span></span></h2>
```

---

## 4. דקדוק הסקשנים

### ארבעת המחלקות

```css
.sec{padding:clamp(44px,6vw,76px) 20px;position:relative;overflow:hidden;scroll-margin-top:0}
.dark{background:var(--ink-2);color:var(--text-d)}
.dark.deep{background:var(--ink)}
.light{background:var(--ivory);color:var(--text-l)}
.light.bright{background:var(--ivory-2)}
.wrap{max-width:var(--w);margin-inline:auto;position:relative}
.narrow{max-width:var(--w-card);margin-inline:auto}
```

| מחלקה | רקע | מתי משתמשים |
|---|---|---|
| `sec dark` | `#121826` | סקשן כהה רגיל. ברירת המחדל לסקשני הוכחה ותמחור. |
| `sec dark deep` | `#0B0F19` | הכי כהה. ההירו, וסקשן כהה שבא מיד אחרי `dark` אחר וצריך להיבדל ממנו. |
| `sec light` | `#F7F2E9` | סקשן קרם. סקשני כאב והתאמה. |
| `sec light bright` | `#FFFCF7` | קרם בוהק, כמעט לבן. סקשני "מי אני", ההצעה והסיום האישי. |

**כל סקשן זהה מבנית:**

```html
<section class="sec light">
  <div class="wrap">
    <h2 class="reveal">...</h2>
    ...
  </div>
</section>
```

`overflow:hidden` על `.sec` מונע שכל בליטה של כרטיס תיצור גלילה אופקית. `padding:clamp(44px,6vw,76px) 20px` הוא כל הריווח האנכי בדף: אין `margin` בין סקשנים, אין מפרידים. **ההפרדה בין סקשנים היא שינוי רקע וריווח בלבד.** אפס קווים.

### הרצף המדויק של הסקשנים בדף

11 בלוקים בסך הכול: הירו בתוך `<header>`, עשרה `<section>` בתוך `<main id="main">`, ואחריהם פוטר.

| # | תגית ומחלקות | id | הכותרת בפועל |
|---|---|---|---|
| 1 | `<header class="sec dark deep hero">` | h1 עם `id="top"` | `הגיע הזמן להפסיק לנהל "קמפיינים", ולהתחיל לבנות מנגנון צמיחה אמיתי לעסק.` (h1) |
| 2 | `<section class="sec light">` | | `האמת היא, שהעסק שלך כנראה לא באמת "תקוע".` |
| 3 | `<section class="sec dark">` | | `ברוך הבא לתקרת הזכוכית של העסק שכבר הצליח.` |
| 4 | `<section class="sec dark deep">` | | `סקייל לא מתחיל בעוד לידים. הוא מתחיל במערכת.` |
| 5 | `<section class="sec light bright">` | | `נעים מאוד, אני דור עמוס.` |
| 6 | `<section class="sec dark">` | | `אל תקשיבו לי. תקשיבו למי שכבר עבר את זה:` |
| 7 | `<section class="sec light bright" id="offer">` | `offer` | `אבל הנה העניין: אני לא בא להיות "עוד קמפיינר" שלך.` ואחריה h2 שני: `אז מה זה Dor Digital Growth Partner?` |
| 8 | `<section class="sec dark" id="fit">` | `fit` | `עכשיו, בוא נדבר רגע דוגרי על האלטרנטיבה.` ואחריה h2 שני: `אז למה אין כאן כפתור תשלום או מחיר מפורש?` ואחריה h3: `השלב הבא שלך:` |
| 9 | `<section class="sec light">` | | `השירות מתאים לך בול אם:` ואחריה h2 שני: `השירות ממש לא בשבילך אם:` |
| 10 | `<section class="sec dark">` | | `אבל אל תקשיב רק לי… תראה מה קורה כשמחברים אסטרטגיה לביצוע של שותף צמיחה:` |
| 11 | `<section class="sec light bright">` | | `משהו קטן ממני, לפני שתחליט.` |
| | `<footer>` | | ללא כותרת. רקע `--ink`. |

**קצב הרקעים לאורך הדף:**

```
deep → light → dark → deep → bright → dark → bright → dark → light → dark → bright → footer(ink)
```

שתי תצפיות חשובות:
1. **התחלופה כהה-בהיר היא חוק.** אין שני בלוקים מאותה משפחה זה אחר זה, למעט צמד אחד.
2. **הצמד היחיד הוא 3 ו-4**, שניהם כהים: `dark` ואחריו `dark deep`. ההפרדה ביניהם היא המדרגה `#121826` מול `#0B0F19` בלבד. זה עובד, וזאת הדרך הנכונה לשים שני סקשנים כהים עוקבים כשהקופי דורש רצף רגשי כהה.
3. **הדף נפתח כהה ונסגר בהיר**, ואז הפוטר חוזר לכהה. הסיום האישי יושב על הבהיר ביותר בדף.

**המבנה שהסקשנים מתפרשים עליו מבחינת קופי:** הכאב, תקרת הזכוכית, הפתרון כמערכת, מי אני, הוכחה, ההצעה, האלטרנטיבה והתמחור, למי זה מתאים ולמי לא, הוכחה שנייה, סגירה אישית.

### סידור הרקעים מחדש כשמספר הסקשנים משתנה

הרצף שלמעלה הוא של דף בן 11 בלוקים. **דף אמיתי מקבל מספר אחר, ואחרי מחיקת סקשן בלי חומר הוא מקבל מספר שלישי.** אל תנסה למחוק סקשן מתוך הרצף הקיים ולקוות שהתחלופה נשמרה, כי היא לא נשמרת: מחיקת סקשן אחד באמצע מדביקה שני סקשנים מאותה משפחה. **מחשבים את הרצף מחדש מאפס, בארבעה צעדים.** הצעדים, המספרים והאילוצים נמצאים בסקיל, בשלב ג, תחת "סידור קצב הרקעים מחדש". הטבלה שאומרת איזה רכיב חוקי על איזו משפחה היא 6.32, והיא זו שקובעת שסקשן הסגירה חייב להיות בהיר.

---

## 5. ההירו, שורה אחר שורה

זה המבנה המדויק. הסדר הוא חלק מהנוסחה ולא נתון לשינוי.

```html
<header class="sec dark deep hero">
  <div class="wrap">
    <p class="eyebrow hero-in" style="--i:0">
      <span class="ln">מיוחד לעסקי ידע ושירות שכבר מכניסים 20-30K ש"ח בחודש וצפונה,</span>
      <span class="ln">אבל תקועים בתקרת זכוכית ורעבים לעשות סקייל:</span>
    </p>
    <span class="brand hero-in" style="--i:1"><b>dor digital</b> · Growth Partner</span>

    <h1 id="top" class="hero-in" style="--i:2">
      <span class="lg">הגיע הזמן להפסיק לנהל "קמפיינים",</span>
      <span class="lg">ולהתחיל לבנות <span class="g">מנגנון צמיחה אמיתי לעסק.</span></span>
    </h1>

    <figure class="hero-img hero-in" style="--i:3">
      <img src="assets/img/hero-dor.webp?v4" srcset="..." sizes="(max-width:680px) 100vw, 640px"
           alt="[תיאור אמיתי של מה שרואים בתמונה]" width="1200" height="675"
           fetchpriority="high" decoding="async">
    </figure>

    <p class="lead hero-in" style="--i:4">[משפט המעבר, מדרגה אחת מתחת לכותרת]</p>
    <p class="hero-in" style="--i:5">[פסקת הסבר]</p>

    <div class="cta-wrap hero-in" style="--i:6">
      <a class="cta" href="#offer">
        <span>[טקסט ההנעה]</span>
        <svg ...חץ למטה...></svg>
      </a>
    </div>

    <ul class="beli hero-in" style="--i:7">...שלושה כרטיסי "בלי"...</ul>

    <ul class="stats" aria-label="מספרים">...שלושה מספרים...</ul>

    <p class="proof-title">הודעות אמיתיות מלקוחות:</p>
    <div class="proofs" aria-label="הודעות אמיתיות מלקוחות">...שתי תמונות הוכחה...</div>
  </div>
</header>
```

**הסדר, במילים:**
1. **הוק** (`.eyebrow`), שתי שורות, משקל 600, לבן, מוקטן. לא מתחרה בכותרת.
2. **המותג** (`.brand`), קטן, זהב, שורה אחת, 1.05rem. אין header נפרד ואין לוגו גדול.
3. **h1**, משקל 900, לבן עם מילות מפתח בזהב דרך `.g`, מפוצל ל-`.lg`.
4. **התמונה, מתחת לכותרת ולא מעליה.** `width:min(640px,100%)`.
5. **`.lead`**, משפט מעבר במשקל 700, מדרגה אחת מתחת לכותרת.
6. **פסקת הסבר** רגילה.
7. **CTA ראשון**, וכאן העיקר: **הכפתור בהירו גולל ל-`#offer`**, לא לוואטסאפ. קודם נותנים את ההצעה, ואז מבקשים פנייה. כל שאר ה-CTA בדף פונים לוואטסאפ.
8. **שלושה כרטיסי "בלי"** עם איקס אדום. **אחרי הכפתור, לא לפניו.** ראה "קו הקיפול" מיד למטה.
9. **שלושה מספרים** (`.stats`).
10. **פס הוכחה**: כותרת קטנה ושתי תמונות.

**גדלים וצבעים בהירו:**

```css
.hero{padding-top:clamp(12px,2.5vw,24px)}
.hero-img{width:min(640px,100%);margin:2px auto 14px}
.hero-img img{width:100%;height:auto;filter:drop-shadow(0 26px 40px rgba(0,0,0,.55))}
.eyebrow,.dark .eyebrow{font-size:clamp(14px,3.4vw,1.1rem);font-weight:600;line-height:1.55;color:#fff;max-width:none;width:min(680px,calc(100% + 16px));margin:0 auto 16px;text-align:center;text-shadow:0 1px 12px rgba(0,0,0,.35)}
.eyebrow .ln{display:block;white-space:nowrap;color:#fff;text-align:center}
.brand{display:block;text-align:center;font-weight:800;font-size:1.05rem;color:var(--gold-2);margin:0 auto 18px;text-wrap:balance;text-decoration:none}
.brand b{font-weight:900;color:var(--gold-2)}
.proof-title,.dark .proof-title{color:#fff;font-weight:800;font-size:clamp(1.08rem,2.4vw,1.25rem);margin:26px auto 10px}
```

`padding-top` של ההירו קטן במיוחד (12 עד 24 פיקסלים) כדי שההוק יהיה גבוה על המסך. שאר הסקשנים מקבלים 44 עד 76.

### קו הקיפול: ה-CTA הראשון בתוך 640 הפיקסלים הראשונים

**מתחת ל-720px, ההירו חייב להביא את ה-CTA הראשון לתוך 640 הפיקסלים הראשונים של הדף.** זה מספר שמודדים, לא מעריכים.

**למה 640 ולא 844.** הגובה הרשום של אייפון 14 הוא 844, אבל סרגל הכתובת וסרגל הכלים אוכלים ממנו, ובטלפון אמיתי נשארים כ-700 פיקסלים שימושיים. הכפתור גבוה 60 פיקסלים, ו-640 הוא הערך שמכניס אותו במלואו גם בדפדפן הצר ביותר.

**מה נמדד לפני התיקון**, על דף שנבנה לפי הנוסחה עם `.beli` לפני הכפתור:

| רוחב | `ctaTop` לפני | `ctaTop` אחרי |
|---|---|---|
| 320px | 902 | 555 |
| 360px | 819 | 525 |
| 390px | 819 | 525 |
| 430px | 757 | 462 |

ב-390x844 הכפתור היה ב-`top:819`, כלומר **25 פיקסלים נראים מתוך 60 במסך התיאורטי, ואפס בטלפון אמיתי.**

**הפס הדביק לא מפצה על זה.** הוא נדלק רק אחרי שההירו יוצא מהמסך, כלומר אחרי גלילה. בטעינה הוא לא קיים, ומי שלא גולל לא רואה שום כפתור בדף.

**שלוש הדרכים, בסדר העדפה קשיח:**

1. **להעביר את שלושת כרטיסי ה"בלי" אחרי ה-CTA.** הראשונה, ובדרך כלל היחידה שצריך. `.beli` הוא הבלוק הגבוה בהירו, כ-280 פיקסלים בשלושה כרטיסים, והוא כל הפער. **הכפתור בהירו הוא רמז גלילה אל `#offer`, לא הבקשה עצמה**, ולכן הוא לא מפסיד מזה שהניגוד של ה"בלי" קורא אחריו. נמדד: 819 יורד ל-525, ו-60 מתוך 60 פיקסלים נראים.
2. **לצמצם את הריווח בהירו.** `margin-bottom` של `.brand` מ-18px ל-12px, ושל `h1` מ-18px ל-14px. מרוויחים כ-10 פיקסלים בלבד, לכן זו לא הדרך הראשונה.
3. **לקצר את ההוק לשורה אחת.** חוסך כ-21 פיקסלים אבל פוגע בקופי, ולכן אחרון.

**איך בודקים.** מודדים את `getBoundingClientRect().top` של ה-CTA הראשון בהירו ב-390x844, וגם ב-320 וב-360 שבהם ההירו גבוה יותר:

```js
const c = document.querySelector('header.hero a.cta').getBoundingClientRect();
console.log('ctaTop=' + Math.round(c.top), c.top <= 640 ? 'OK' : 'FAIL');
```

**וכשמזיזים את `.beli` אחרי ה-CTA, מחליפים גם את ה-`--i` של שניהם**, אחרת ההירו נכנס במדורג בסדר הפוך.

**האיסורים בהירו:** בלי שם המוצר בפתיחה (חושפים אותו רק בסקשן ההצעה, שם דרך `.product`), בלי תמונת פרזנטור גדולה בראש הדף, בלי קו מתחת לקיקר.

### שורות ההוק תמיד בשורה אחת: fitHook

`.eyebrow .ln` הוא `white-space:nowrap`. כדי שזה לא יגלוש, יש JS שמקטין את הפונט עד שהשורה נכנסת:

```js
function fitHook(){
  document.querySelectorAll('.eyebrow .ln').forEach(function(el){
    el.style.fontSize = '';
    for (var i = 0; i < 3; i++) {
      var base = parseFloat(getComputedStyle(el).fontSize);
      var r = document.createRange(); r.selectNodeContents(el);
      var need = r.getBoundingClientRect().width, avail = el.clientWidth;
      if (need <= avail) break;
      var next = base * avail / need * 0.98;
      /* רצפה של 14px. מתחת לזה מבטלים את ה-nowrap ומרשים לשורה להישבר, ולא מקטינים עוד. */
      if (next < 14) { el.style.fontSize = '14px'; el.style.whiteSpace = 'normal'; break; }
      el.style.fontSize = next + 'px';
    }
  });
}
fitHook(); window.addEventListener('resize', fitHook); window.addEventListener('load', fitHook);
if (document.fonts) { if (document.fonts.ready) document.fonts.ready.then(fitHook); document.fonts.addEventListener('loadingdone', fitHook); }
setTimeout(fitHook, 1200); setTimeout(fitHook, 3000);
```

חשוב: הוא רץ שוב אחרי טעינת הפונט (`document.fonts.ready` וגם `loadingdone`) וגם בשני timeout, כי המידה משתנה כשהפונט מתחלף. במצב הגדלת טקסט מבטלים את ה-nowrap כדי שלא ייצא טקסט זעיר:

```css
html[class*="a11y-font-"] .eyebrow .ln{white-space:normal}
html[class*="a11y-font-"] .eyebrow{font-size:1rem}
```

---

## 6. קטלוג הרכיבים

29 רכיבים. לכל אחד: CSS מלא, HTML אמיתי, ומתי להשתמש.

### 6.1 כפתור CTA

```css
.cta{
  display:inline-flex;align-items:center;justify-content:center;gap:12px;
  background:linear-gradient(135deg,#D8B56F 0%,#EFD68F 45%,#C9A251 100%);
  color:var(--gold-ink);font-weight:900;font-size:clamp(1.02rem,2.2vw,1.18rem);line-height:1.3;
  padding:18px 30px;min-height:60px;border-radius:12px;text-decoration:none;
  box-shadow:0 12px 26px -12px rgba(0,0,0,.55),0 1px 0 rgba(255,255,255,.35) inset;
  transition:transform .18s var(--ease),box-shadow .18s var(--ease);
  max-width:100%;text-wrap:balance;line-height:1.35;
}
.cta svg{width:22px;height:22px;flex:none}
.cta .wa{width:24px;height:24px}
@media (hover:hover) and (pointer:fine){.cta:hover{transform:translateY(-2px);box-shadow:0 16px 32px -12px rgba(0,0,0,.6),0 1px 0 rgba(255,255,255,.35) inset}}
.cta:active{transform:translateY(1px) scale(.985);transition-duration:.08s}
.cta:focus-visible{outline:3px solid #fff;outline-offset:3px}
.cta.xl{padding:22px 38px;font-size:clamp(1.08rem,2.5vw,1.3rem)}
.cta-wrap{margin:20px auto 0}
.consent{font-size:.9rem;color:var(--soft-d);margin:14px auto 0;max-width:520px;line-height:1.6}
.consent a{color:var(--muted-d);text-decoration:underline;text-underline-offset:3px}
.light .consent{color:var(--muted-l)}
.light .consent a{color:var(--text-l)}
```

```html
<div class="cta-wrap reveal">
  <a class="cta xl" id="main-cta" href="https://wa.me/972528788498?text=%D7%94%D7%99%D7%99..." target="_blank" rel="noopener">
    <svg class="wa" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
    <span>שלח לי הודעת וואטסאפ, ובוא נתאם שיחת בדיקה ללא עלות</span>
  </a>
  <p class="consent">לחיצה על הכפתור פותחת שיחת וואטסאפ איתי ומהווה הסכמה ל<a href="legal.html#terms">תקנון</a> ול<a href="legal.html#privacy">מדיניות הפרטיות</a>.</p>
</div>
```

**מתי:** `.cta` לכפתור רגיל, `.cta.xl` לכפתור הראשי של סקשן ההצעה והסגירה. `min-height:60px` עובר בנוחות את סף 44 הפיקסלים. **הגרדיאנט הוא על הרקע של הכפתור בלבד, לא על טקסט.** הטקסט ב-`--gold-ink`.

**ההסכמה היא חלק מהרכיב.** כל `.cta-wrap` שמוביל לפנייה נושא `.consent` מתחתיו עם שני קישורים ל-legal. בקישור חיצוני חובה `target="_blank" rel="noopener"`.

הודעת הוואטסאפ מקודדת ב-URL בפרמטר `text=`, כך שהלקוח פותח שיחה עם הודעה כתובה מראש.

### 6.2 פס CTA דביק במובייל

```css
.sticky{
  position:fixed;left:0;right:0;bottom:0;z-index:40;padding:10px 14px calc(10px + env(safe-area-inset-bottom));
  background:rgba(var(--ink-rgb),.92);backdrop-filter:blur(10px);border-top:1px solid rgba(var(--gold-rgb),.25);
  transform:translateY(110%);transition:transform .3s ease;display:none;
}
.sticky.show{transform:none}
.sticky .cta{width:100%;min-height:56px;padding:14px 18px;font-size:1.02rem;border-radius:12px}
@media (max-width:720px){.sticky{display:block;padding-left:56px}}
```

`padding-left` פיזי של 56 פיקסלים שומר את קצה הפס פנוי לכפתור הנגישות, שנעוץ ל-`left:0` מתחת ל-880px. שני האלמנטים האלה הם שכבת העגינה היחידה בדף, וההסבר המלא בפרק 6.4.

```html
<div class="sticky" id="sticky">
  <a class="cta" href="https://wa.me/972528788498?text=..." target="_blank" rel="noopener">
    <svg class="wa" ...></svg>
    <span>שלח לי הודעת וואטסאפ לבדיקת התאמה</span>
  </a>
</div>
```

**הופעה בלי מאזין גלילה.** IntersectionObserver על ההירו:

```js
var sticky = document.getElementById('sticky'), hero = document.querySelector('header.hero');
if ('IntersectionObserver' in window && hero) {
  new IntersectionObserver(function(en){ sticky.classList.toggle('show', !en[0].isIntersecting); }, {rootMargin:'-40% 0px 0px 0px'}).observe(hero);
} else { sticky.classList.add('show'); }
```

**מתי:** בכל דף. קיים רק מתחת ל-720px. שים לב ל-`env(safe-area-inset-bottom)` בשביל אייפונים עם notch, ול-fallback שמציג את הפס תמיד אם אין IntersectionObserver.

**הפס מוסתר ב-`transform` ולא ב-`display:none`, וזה מכוון.** `transform` לא תופס גובה במסמך ולא משנה אותו כשהפס נדלק, ולכן הגובה השמור בפוטר (`--dock`, פרק 6.4) נכון גם לפני שהפס מופיע וגם אחרי. כל דרך אחרת להסתיר אותו מחזירה את הבאג של גובה מסמך שזז באמצע הקריאה.

### 6.3 הודעת ההסכמה: בזרימה, לא צפה

**הודעת העוגיות היא הבלוק הראשון בתוך `<footer>`, מעל הקישורים המשפטיים, והיא לא `position:fixed`.** זו הכרעה מבנית שהחליפה באנר צף, והיא נמדדה.

```css
.consent-note{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px 14px;
  max-width:560px;margin:0 auto 18px;padding:14px 16px;border-radius:var(--r);
  background:rgba(255,255,255,.05);border:1px solid rgba(var(--gold-rgb),.35);
  color:var(--text-d);font-size:.92rem;line-height:1.5;text-align:center;
}
.consent-note a{color:var(--text-d);text-decoration:underline;text-underline-offset:3px}
.consent-note button{
  min-height:44px;padding:8px 22px;border-radius:12px;border:0;
  background:var(--gold-2);color:var(--gold-ink);font-weight:800;font-family:inherit;font-size:.95rem;cursor:pointer;
}
```

```html
<footer>
  <span class="brand"><b>[שם המותג]</b> · [שם הלקוח]</span>

  <div class="consent-note" id="cookie" role="region" aria-label="הודעת עוגיות">
    <span>האתר משתמש בעוגיות לצורך תפעול ומדידה. <a href="legal.html#privacy">למדיניות הפרטיות</a></span>
    <button type="button" id="cookie-ok">הבנתי</button>
  </div>

  <nav aria-label="מידע משפטי">...הקישורים המשפטיים...</nav>
  <p class="rights">...שורת הזכויות...</p>
</footer>
```

וה-JS, שש שורות. אין observer, אין מחלקה על ה-body, אין `showBar`:

```js
var bar = document.getElementById('cookie');
try { if (localStorage.getItem('lp_cookie_ok') && bar) bar.hidden = true; } catch(err){}
var okBtn = document.getElementById('cookie-ok');
if (okBtn) okBtn.addEventListener('click', function(){
  try { localStorage.setItem('lp_cookie_ok','1'); } catch(err){}
  if (bar) bar.hidden = true;
});
```

**ההודעה צבועה למשפחה הכהה** כי הפוטר הוא `--ink`. זה אותו כלל של פרק 6.32: רכיב כבול לצבע הסקשן שהוא יושב בו, והפוטר כהה תמיד. כרטיס לבן בתוך הפוטר היה הופך לכתם הבהיר היחיד בתחתית הדף.

#### למה ההודעה ירדה מהצפה לזרימה

**שלושה סבבים ניסו לתקן באנר צף בעזרת `padding-bottom` על הפוטר, וכל תיקון ייצר מקרה חדש.** אלה המדידות שסגרו את הדיון, על דף שנבנה לפי הנוסחה, ב-844 פיקסלים גובה:

| מה נמדד | באנר צף | הודעה בזרימה |
|---|---|---|
| גובה המסמך כשהבאנר נדלק, 320 עד 430 | **גדל ב-148px** באמצע הקריאה | לא משתנה |
| `gapToBottom` אחרי מקש End מטעינה נקייה, 390 | **148** | **0** |
| מה מכוסה באותו רגע, 390 | **"תקנון" 31x17, "מדיניות פרטיות" 90x17, "הצהרת נגישות" 87x17, "יצירת קשר" 63x17, שורת הזכויות 194x16** | אפס |
| מה מכוסה בתחתית הדף ב-1280 | שורת הזכויות, 194x16 ועוד 72x16, **קבוע** | אפס |
| מה מכוסה באמצע הדף ב-1280 | כותרת הסגירה 397x26 ופסקה 458x19 | אפס |
| מה מכוסה באמצע הדף ב-390 | פריט ברשימת ההתאמה 350x8, וכותרת 277x27 | אפס |

**השורש היה אחד:** `body.has-cookiebar footer{padding-bottom:calc(2.2rem + 236px)}` הוסיף 148 פיקסלים לגובה המסמך **אחרי** שהקוראת כבר הגיעה לתחתית. הדפדפן שומר על מיקום הגלילה, ולכן היא נשארת 148 פיקסלים מעל התחתית החדשה, והבאנר יושב בדיוק על הקישורים. `padding-bottom` שנוסף אחרי הגלילה לא מזיז את מי שכבר גלל.

**וכיסוי של "הצהרת נגישות" ושל "מדיניות פרטיות" הוא חשיפה רגולטורית, לא פגם קוסמטי.** שני הקישורים האלה הם בדיוק מה שהחוק מחייב להיות נגיש, והבאנר כיסה אותם, כולל את הקישור שהוא עצמו מפנה אליו.

**שלוש נקודות בקוד שאסור לפספס:**

1. **`[hidden]{display:none!important}` הגלובלי עדיין חובה.** `.consent-note` הוא `display:flex`, ובלי הכלל הגלובלי הוא לא נסגר גם אחרי `hidden = true`.
2. **ההודעה גלויה מהפריסה הראשונה, ולא תלויה בשום observer.** לכן גובה המסמך לא משתנה באמצע הקריאה, וזה כל התיקון.
3. **הסגירה מקטינה את המסמך בתחתיתו בלבד, וזה נמדד כלא מורגש.** ב-390 וב-1280, לפני הלחיצה ואחריה, הקישורים המשפטיים נשארו באותה נקודה בדיוק במסך (`top:637` ב-390, `top:712` ב-1280) ו-`gapToBottom` נשאר 0. הדפדפן מקצר את המסמך מלמטה ומצמיד מחדש, והקוראת לא רואה קפיצה.

**מה הכלל הזה לא קובע:** הוא קובע מקום והתנהגות. **הנוסח המשפטי, הכפתורים שבתוך ההודעה והצהרת הנגישות הם עבודה של `/lp-legal`.** ואם בעתיד הדף יטעין סקריפט שכותב עוגייה או מודד אנשים לפני ההסכמה, הודעה פסיבית בפוטר לא מספיקה, וזו הכרעה של `/lp-legal` ולא שלך. אל תכתוב בדף שום הצהרה על מה ההודעה עושה.

### 6.4 חוק שכבת העגינה האחת

**בדף מותר לצוף רק לפקד שנעוץ לקצה התחתון של המסך, שגובהו שמור בסוף המסמך מהפריסה הראשונה. כל דבר שיש בו טקסט לקרוא או קישור ללחוץ יושב בזרימה.**

זה החוק שמחליף את שריון הפוטר הישן, והוא הכלל היחיד בדף שמדבר על אלמנטים צפים.

שני פקדים עומדים בתנאי: הפס הדביק (`.sticky`) וכפתור הנגישות (`.a11y-btn`) מתחת ל-880 פיקסלים. שניהם `bottom:0`, ושניהם נכנסים לאותו שריון אחד:

```css
:root{--dock:calc(56px + env(safe-area-inset-bottom))}  /* רק כפתור הנגישות נעוץ */
@media (min-width:880px){:root{--dock:0px}}             /* הכפתור עולה לאמצע הצד, אין מה לשמור */
@media (max-width:720px){:root{--dock:calc(76px + env(safe-area-inset-bottom))}}  /* גם הפס הדביק */
footer{padding-bottom:calc(2.2rem + var(--dock))}
@media (max-width:720px){.sticky{padding-left:56px}}    /* מקום לכפתור הנגישות בקצה הפס */
```

**שורת שריון אחת, בלי מדיה קוורי על הפוטר ובלי מחלקה על ה-body.** `--dock` הוא גובה השכבה הנעוצה הגבוהה ביותר שיכולה להופיע באותו רוחב, והוא **לא משתנה אף פעם**: הפס הדביק מוסתר ב-`transform:translateY(110%)` ולא ב-`display`, כלומר הוא לא תופס גובה במסמך בשום מצב, והודעת ההסכמה כבר לא צפה.

**`padding-left` פיזי ולא `padding-inline-start`**, כי `.a11y-btn` נעוץ ל-`left:0` פיזי. השניים חייבים לדבר באותה שפה, אחרת בדף RTL הכפתור יושב בצד אחד וההזזה בצד השני.

**מה נמחק, ולמה אסור להחזיר אותו:**

```css
/* המצב שנמחק. אל תחזיר אותו. */
@media (max-width:720px){
  footer{padding-bottom:calc(2.2rem + 88px + env(safe-area-inset-bottom))}
  body.has-cookiebar footer{padding-bottom:calc(2.2rem + 236px + env(safe-area-inset-bottom))}
}
```

שלושה כשלים נמדדו בו, וכולם ממקור אחד: **הגובה השמור השתנה אחרי הפריסה הראשונה, והיה חסר בדסקטופ לגמרי.**

1. השורה השנייה נכנסה לתוקף רק כשה-JS הוסיף `has-cookiebar`, כלומר אחרי גלילה, והוסיפה 148 פיקסלים לגובה המסמך מתחת לקוראת. `gapToBottom=148` ב-320, 360, 390 ו-430.
2. שתי השורות יושבות בתוך `@media (max-width:720px)`, ולכן **בדסקטופ אין פיצוי בכלל.** ב-768 וב-1280 הכרטיס הצף כיסה את שורת הזכויות באופן קבוע.
3. הפיצוי שמר מקום לגובה של שכבה שאולי לא תופיע, ולא שמר מקום לרוחב שבו הכפתור נעוץ בפינה בלי פס דביק (721 עד 879).

**מה מותר וממה נשמרים, בשורה אחת כל אחד:**

| סוג | דוגמה | הכלל |
|---|---|---|
| **נעוץ** | `.sticky`, `.a11y-btn` מתחת ל-880 | `bottom:0`, הגובה בתוך `--dock`, והשריון בפוטר. מותר. |
| **צף באוויר** | באנר שיושב `bottom:88px`, טוסט, כרטיס הסכמה | אסור. מכסה פס אופקי באמצע המסך בכל גלילה. |
| **בזרימה** | הודעת ההסכמה, כל טקסט, כל קישור | ברירת המחדל. |
| **שכבה שהמשתמשת פתחה** | `.a11y-panel` | מותר לכסות, כי היא פתחה אותה ו-Escape סוגר. |

**למה זה לא מייצר מקרה חמישי.** שלושת הסבבים הקודמים נכשלו כי כל תיקון היה `padding` נוסף על עוד תנאי: עוד מדיה קוורי, עוד מחלקה, עוד גובה. החוק הזה מוריד את מספר המשתנים לאחד. **יש בדיוק מספר אחד בדף שמתאר את השכבה הצפה (`--dock`), הוא מוגדר לכל רוחב, הוא לא תלוי במחלקה ולא ב-JS, והוא נקרא בדיוק במקום אחד.** מקרה חמישי יכול להיווצר רק אם מוסיפים אלמנט צף חמישי, ובשביל זה יש שער מדידה שרץ על שש רחבויות ושלוש נקודות גלילה, והוא מפיל כל אלמנט צף שלא נעוץ לקצה. הוא נמצא בפרק 12.

### 6.5 קישור דילוג

```css
.skip{position:fixed;top:-200px;left:16px;z-index:100;background:#fff;color:var(--text-l);padding:12px 18px;border-radius:12px;font-weight:800;text-decoration:none;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.skip:focus{top:16px;outline:3px solid var(--gold)}
```

```html
<a class="skip" href="#main">דלג לתוכן הראשי</a>
```

האלמנט הראשון בתוך `<body>`, עוד לפני ההירו. היעד הוא `<main id="main">`.

### 6.6 ההוק הרב שורתי

ראה 5 למעלה. `.eyebrow` עם `.ln` פנימיים, `white-space:nowrap`, וסקריפט `fitHook`.

**מתי:** בראש כל דף, כשורה שממקדת למי הדף מיועד. לא כ-h1.

### 6.7 שורת המותג

```css
.brand{display:block;text-align:center;font-weight:800;font-size:1.05rem;color:var(--gold-2);margin:0 auto 18px;text-wrap:balance;text-decoration:none}
.brand b{font-weight:900;color:var(--gold-2)}
footer .brand{margin-bottom:12px}
```

```html
<span class="brand hero-in" style="--i:1"><b>dor digital</b> · Growth Partner</span>
```

בפוטר אותו רכיב מופיע שוב: `<span class="brand"><b>dor digital</b> · דור עמוס</span>`. אם יש לוגו קובץ, הוא נכנס כאן במקום הטקסט, בגובה כ-26 פיקסלים. אם אין לוגו, שורת הטקסט הזאת היא התחליף המלא, בלי סלוט ריק.

**`.brand` אינו `white-space:nowrap`, ואסור להחזיר לו את ה-nowrap.** בדף של דור התוכן הוא `dor digital · Growth Partner`, שתי מילים קצרות שנכנסות בכל מסך. הקיקר שהנוסחה מחייבת הוא `[שם], [תואר], מגלה:`, והוא ארוך בהרבה. עם nowrap הוא גולש מהמסך ב-320 עד 360 פיקסלים ושובר את הדף בשורה השנייה שלו. `text-wrap:balance` נותן לשורה להישבר בצורה מאוזנת במקום לגלוש, והקיקר נראה טוב גם בשתי שורות.

### 6.8 תמונת ההירו

```css
.hero-img{width:min(640px,100%);margin:2px auto 14px}
.hero-img img{width:100%;height:auto;filter:drop-shadow(0 26px 40px rgba(0,0,0,.55))}
.hero-img img{transition:transform .2s var(--ease);will-change:transform}
```

הטיה עדינה אחרי העכבר, בדסקטופ בלבד, עם requestAnimationFrame ובלי מאזין גלילה:

```js
var heroImg = document.querySelector('.hero-img img');
if (heroImg && !reduced && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  var raf = null;
  hero.addEventListener('pointermove', function(e){
    if (raf) return;
    raf = requestAnimationFrame(function(){
      raf = null; var r = heroImg.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width/2)) / r.width, dy = (e.clientY - (r.top + r.height/2)) / r.height;
      heroImg.style.transform = 'perspective(900px) rotateY(' + (dx*5).toFixed(2) + 'deg) rotateX(' + (-dy*4).toFixed(2) + 'deg) translateY(-2px)';
    });
  });
  hero.addEventListener('pointerleave', function(){ heroImg.style.transform = ''; });
}
```

5 מעלות מקסימום ב-Y, 4 ב-X. כמעט בלתי מורגש, וזה הפואנטה.

### 6.9 פס הוכחה זוגי

```css
.proof-title,.dark .proof-title{color:#fff;font-weight:800;font-size:clamp(1.08rem,2.4vw,1.25rem);margin:26px auto 10px}
.proofs{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:720px;margin:0 auto;list-style:none}
.proofs figure{margin:0}
.proofs img{width:100%;height:auto;filter:drop-shadow(0 18px 30px rgba(0,0,0,.5))}
@media (max-width:640px){.proofs{grid-template-columns:1fr;max-width:400px;gap:6px}}
```

```html
<p class="proof-title">הודעות אמיתיות מלקוחות:</p>
<div class="proofs" aria-label="הודעות אמיתיות מלקוחות">
  <figure><img src="assets/img/proof-1.webp?v4" srcset="assets/img/proof-1-400.webp?v4 400w, assets/img/proof-1.webp?v4 720w" sizes="(max-width:640px) 92vw, 353px" alt="[תיאור אמיתי של ההודעות שבתמונה]" width="720" height="1067" loading="lazy" decoding="async"></figure>
  <figure><img src="assets/img/proof-2.webp?v4" ... ></figure>
</div>
```

**מתי:** בהירו, מיד אחרי המספרים, כשיש קולאז' צילומי מסך אמיתיים. שני טורים בדסקטופ, טור אחד במובייל.

### 6.10 פורטרט עגול

```css
.portrait{
  width:min(220px,58vw);aspect-ratio:1;border-radius:50%;overflow:hidden;margin:6px auto 22px;
  border:3px solid rgba(var(--gold-rgb),.85);box-shadow:0 24px 48px -20px rgba(0,0,0,.7);
  position:relative;z-index:1;
}
.portrait img{width:100%;height:100%;object-fit:cover;object-position:52% 30%;display:block}
.portrait.sm img{object-position:45% 42%}
.portrait.sm{width:min(150px,44vw);margin-bottom:14px;border-color:rgba(var(--gold-deep-rgb),.7);box-shadow:0 14px 30px -16px rgba(var(--text-l-rgb),.45)}
```

```html
<div class="portrait sm reveal">
  <img src="assets/img/dor-crop.webp?v4" alt="דור עמוס" width="480" height="285" loading="lazy" decoding="async">
</div>
```

**מתי:** `.portrait.sm` בסקשן הסגירה האישית, מעל "משהו קטן ממני". שימו לב ש-`.sm` מחליף את מסגרת הזהב הבהיר ל-`--gold-deep` שקוף, כי הוא יושב על רקע בהיר. `object-position` מכויל פר תמונה כדי שהפנים יהיו במרכז העיגול.

### 6.11 רשימת "בלי"

```css
.beli{list-style:none;max-width:var(--w-card);margin:4px auto 22px;display:grid;gap:10px}
.beli li{
  display:flex;align-items:flex-start;gap:14px;text-align:right;
  background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:var(--r-s);
  padding:16px 18px;color:var(--text-d);line-height:1.6;font-size:1.02rem;
}
.beli .x{flex:none;width:26px;height:26px;display:grid;place-items:center;margin-top:3px}
.beli .x svg{width:22px;height:22px;stroke:#E36B6D;stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
.beli b{color:#fff;font-weight:900}
```

```html
<ul class="beli hero-in" style="--i:7">
  <li><span class="x" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span><span><b>בלי</b> לרדוף אחרי מנהלי קמפיינים שמסתכלים רק על ה-Ads Manager.</span></li>
  <li>...</li>
  <li>...</li>
</ul>
```

**מתי:** בהירו, שלושה פריטים, כל אחד מתחיל ב"בלי" מודגש. זה הרכיב שהופך את ההבטחה לניגוד. `text-align:right` מקומי כי זו רשימה עם אייקון בתחילת השורה, וטקסט ממורכז לצד אייקון נראה שבור.

**המקום שלו בהירו הוא אחרי ה-CTA, לא לפניו.** שלושה כרטיסים הם כ-280 פיקסלים, וזה בדיוק מה שדוחף את הכפתור מתחת לקו הקיפול במובייל. ראה "קו הקיפול" בפרק 5.

### 6.12 שלושת המספרים

```css
.stats{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:var(--w-card);margin:6px auto 0}
.stats li{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:var(--r-s);padding:18px 10px 14px}
.stats .n{display:block;font-family:var(--serif);font-weight:900;font-size:clamp(1.5rem,4.2vw,2.2rem);line-height:1.1;color:var(--gold-2);font-variant-numeric:tabular-nums;direction:ltr}
.stats .l{display:block;font-size:.92rem;color:var(--muted-d);margin-top:6px;line-height:1.45}
.stats-note{color:var(--soft-d);font-size:.95rem;margin:12px auto 0}
```

```html
<ul class="stats" aria-label="מספרים">
  <li><span class="n">100+</span><span class="l">בעלי עסקים שעבדתי איתם</span></li>
  <li><span class="n">400+</span><span class="l">משפכי שיווק מלאים שבניתי בעצמי ללקוחות</span></li>
  <li><span class="n">10,000,000</span><span class="l">ש"ח בהכנסות בזכות מהלכים, משפכים וקמפיינים שלקחתי בהם חלק</span></li>
</ul>
```

**שני פרטים קריטיים על מספרים בעברית:** `direction:ltr` על תא המספר (לא בירושה מלמעלה), ו-`font-variant-numeric:tabular-nums` כדי שהספירה למעלה לא תרעיד את הרוחב.

**כשאין שלושה מספרים אמיתיים, לא מציגים גריד של שלושה.** זה החור הנפוץ ביותר בבריף: הלקוח מסר מספר אחד אמיתי ("120 לקוחות") ושני האחרים חסרים. **אסור** להציג גריד של שלושה שבו שני תאים הם `[למלא]`. גריד שכולו פלייסהולדרים חוץ ממספר אחד הורג את האמינות של המספר האמיתי היחיד, וזה בדיוק המספר שאמור לשכנע.

הכלל, לפי מה שנמסר:

| מספרים אמיתיים בבריף | מה עושים |
|---|---|
| שלושה | `.stats` כרגיל, גריד של שלושה |
| שניים | `.stats` עם שני תאים. `grid-template-columns:repeat(2,1fr)` |
| אחד | **לא `.stats`.** או `.chips` עם עובדה אחת, או המספר לבד בשורת `.gold-line` מתחת לכותרת |
| אפס | הרכיב לא נכנס לדף בכלל, והשורה נרשמת ברשימת "מה נשאר לך" |

```css
/* .stats עם שני תאים במקום שלושה */
.stats.two{grid-template-columns:repeat(2,1fr)}
```

מספר בודד בלי גריד:

```html
<p class="gold-line reveal">120 לקוחות</p>
<p class="small reveal">[מה המספר אומר, במילים של הקופי]</p>
```

**המספר נשאר חזק כשהוא לבד. הוא נחלש כשהוא מוקף בחורים.**

במובייל השלישי נמתח על כל הרוחב:

```css
@media (max-width:640px){
  .stats{grid-template-columns:1fr 1fr;gap:8px}
  .stats li:nth-child(3){grid-column:1/-1}
}
```

**ספירה למעלה, פעם אחת, כשנכנס לתצוגה:**

```js
if (!reduced && 'IntersectionObserver' in window) {
  var nums = document.querySelectorAll('.stats .n, .tiles .n');
  var nio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return; nio.unobserve(e.target);
      var el = e.target, m = el.textContent.match(/^([\d,]+)(.*)$/); if (!m) return;
      var target = parseInt(m[1].replace(/,/g,''),10), suffix = m[2], t0 = null;
      function fmt(v){ return v.toLocaleString('en-US'); }
      function step(ts){ if (!t0) t0 = ts; var p = Math.min(1,(ts-t0)/900); var k = 1-Math.pow(1-p,3); el.textContent = fmt(Math.round(target*k)) + suffix; if (p < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }, {threshold:0.6});
  nums.forEach(function(n){ nio.observe(n); });
}
```

הרגקס מפריד מספר מסיומת, כך ש-"100+" מסתפר ל-100 ומחזיר את הפלוס. 900 מילישניות, easing `1-(1-p)^3`, `unobserve` מיד כדי שירוץ פעם אחת. לא רץ כלל תחת `prefers-reduced-motion`.

### 6.13 מוקאפ צ'אט

```css
.chat{
  max-width:520px;margin:6px auto 22px;background:#0E1A14;border-radius:var(--r);padding:14px 12px 16px;
  border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 60px -30px rgba(0,0,0,.6);
  text-align:right;position:relative;
}
.light .chat{background:#E9F3E8;border-color:rgba(var(--text-l-rgb),.08)}
.chat .top{display:flex;align-items:center;gap:10px;padding:2px 6px 12px;color:#9BB0A4;font-size:.9rem;font-weight:700}
.light .chat .top{color:#4E6A58}
.chat .top i{width:30px;height:30px;border-radius:50%;background:#2A3F33;flex:none}
.light .chat .top i{background:#BFD6C3}
.bub{display:grid;gap:10px}
.bub div{
  background:#1F2C25;color:#EAF2EC;border-radius:14px 14px 14px 4px;padding:11px 14px;
  max-width:88%;line-height:1.55;font-size:1rem;position:relative;
}
.light .bub div{background:#fff;color:var(--text-l);box-shadow:0 1px 0 rgba(0,0,0,.06)}
.bub div span{display:block;font-size:.9rem;font-weight:800;margin-bottom:3px}
.bub div:nth-child(1) span{color:#E4A35A}
.bub div:nth-child(2) span{color:#7FB5F0}
.bub div:nth-child(3) span{color:#C58BE0}
.bub div:nth-child(4) span{color:#D9776B}
.bub div:nth-child(2){margin-inline-start:auto;border-radius:14px 14px 4px 14px;background:#1E3B2C}
.light .bub div:nth-child(2){background:#DDF7C8}
.bub em{font-style:normal;display:block;font-size:.9rem;color:#56685C;text-align:left;margin-top:3px}
```

```html
<div class="chat reveal" role="group" aria-label="מה אומרים לך אנשי המקצוע">
  <div class="top"><i aria-hidden="true"></i>הצוות שמסביב לעסק שלך</div>
  <div class="bub">
    <div><span>מנהל הקמפיינים אומר לך:</span>"הלידים דווקא פצצה, הבעיה אצלך במכירות."<em>10:14</em></div>
    <div><span>איש המכירות אומר לך:</span>"אי אפשר לסגור את הלידים האלה."<em>10:31</em></div>
    <div><span>היועץ העסקי אומר לך:</span>"הבעיה היא בכלל בהצעה, צריך לשנות אותה."<em>11:02</em></div>
    <div><span>העורך אומר:</span>"צריך לצלם עוד סרטונים."<em>11:20</em></div>
  </div>
</div>
```

**מתי:** לספר כאב בדיאלוג. **זה החריג היחיד ל`text-align:center`** בכל הדף, כי המוקאפ הוא "מסך" ולא טקסט. הרדיוס האסימטרי (`14px 14px 14px 4px`) יוצר את הזנב. הבועה השנייה הופכת צד עם `margin-inline-start:auto` ורדיוס הפוך. הזמן ב-`<em>` עם `font-style:normal`, מיושר שמאל.

**קפדנות:** כל שורה בצ'אט היא ציטוט אמיתי מהקופי. אסור להמציא דיאלוג.

### 6.14 צ'יפים

```css
.chips{list-style:none;display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:4px auto 16px}
.chips li{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;font-weight:800;font-size:1rem}
.light .chips li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);color:var(--text-l)}
.dark .chips li{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#fff}
.chips svg{width:18px;height:18px;stroke:var(--ok);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round}
```

```html
<ul class="chips reveal">
  <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5l10 -10" /></svg>יש לקוחות</li>
  <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5l10 -10" /></svg>יש מוצר מצוין</li>
  <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5l10 -10" /></svg>יש קהל</li>
</ul>
```

**מתי:** רשימת דברים קצרים שכבר עובדים בעסק, כמוליך אל הכאב. שלוש עד חמש מילים לצ'יפ. `border-radius:999px` הוא הרדיוס השלישי והיחיד מלבד 16 ו-12.

### 6.15 סילואים בשני טורים

```css
.silos{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:10px;max-width:var(--w-card);margin:4px auto 16px}
.silos li{padding:16px 12px;border-radius:var(--r-s);line-height:1.5}
.light .silos li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1)}
.dark .silos li{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.silos b{display:block;font-size:1.02rem;color:var(--text-l)}
.dark .silos b{color:#fff}
.silos span{display:block;color:var(--gold-deep);font-weight:800;font-size:.95rem;margin-top:4px}
.dark .silos span{color:var(--gold-2)}
```

```html
<ul class="silos reveal">
  <li><b>מנהל הקמפיינים</b><span>רואה רק את ה-CPL (עלות לליד)</span></li>
  <li><b>איש המכירות</b><span>רואה רק את אחוזי הסגירה</span></li>
  <li><b>המעצב</b><span>רואה רק מודעה</span></li>
  <li><b>היועץ</b><span>רואה רק אסטרטגיה</span></li>
</ul>
```

**מתי:** ארבעה פריטים בזוגות, כל פריט הוא "מי" ו"מה הוא רואה". שימו לב שזה הרכיב היחיד עם שני טורים בסקשן טקסט. הוא קורס לטור אחד מתחת ל-400px.

### 6.16 שרשרת ממוספרת

```css
.chain{list-style:none;max-width:420px;margin:4px auto 20px;display:grid;gap:8px;counter-reset:c}
.chain li{
  counter-increment:c;display:flex;align-items:center;gap:14px;text-align:right;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:var(--r-s);padding:12px 16px;color:#fff;font-weight:700;
}
.chain li::before{content:counter(c);flex:none;width:34px;height:34px;border-radius:50%;background:rgba(var(--gold-rgb),.16);color:var(--gold-2);display:grid;place-items:center;font-weight:900;font-family:var(--serif);font-size:1.05rem}
```

```html
<ol class="chain reveal">
  <li>מערכת שיודעת לזהות מה באמת עובד.</li>
  <li>מערכת שיודעת לעצור מהר מה ששורף כסף.</li>
  <li>מערכת שיודעת לקחת קריאייטיב מנצח ולייצר ממנו אוטומטית עוד וריאציות.</li>
</ol>
```

**מתי:** רשימת יכולות או שלבים. `<ol>` אמיתי, המספור דרך `counter-reset` ו-`counter-increment` בעיגול זהב שקוף. רוחב 420px בלבד, צר בכוונה.

### 6.17 רשימת התאמה

```css
.fit{list-style:none;max-width:var(--w-card);margin:4px auto 22px;display:grid;gap:8px}
.fit li{display:flex;align-items:flex-start;gap:14px;text-align:right;padding:14px 18px;border-radius:var(--r-s);background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);line-height:1.6;color:var(--text-l)}
.fit i{flex:none;width:32px;height:32px;border-radius:9px;display:grid;place-items:center;margin-top:2px}
.fit.yes i{background:rgba(47,156,108,.13)}
.fit.no i{background:rgba(198,73,75,.12)}
.fit.gold i{background:rgba(var(--gold-rgb),.16)}
.fit svg{width:17px;height:17px;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.fit.yes svg{stroke:var(--ok)}
.fit.no svg{stroke:var(--bad)}
.fit.gold svg{stroke:var(--gold-deep)}
```

```html
<ul class="fit yes reveal">
  <li><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5l10 -10" /></svg></i><span>אתה יועץ, מאמן, מומחה, נותן שירות, או בעל תוכנית ליווי / קורס דיגיטלי.</span></li>
</ul>

<ul class="fit no reveal">
  <li><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></i><span>העסק עדיין בשלב הרעיון, או שטרם ביצעת מכירות מוכחות של המוצר.</span></li>
</ul>

<ul class="fit gold reveal">
  <li><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg></i><span>אם ה-CTR נמוך, אני לא אומר "זה האלגוריתם", אני מייצר וריאציה חדשה לפרסומת.</span></li>
</ul>
```

**מתי:** שלוש וריאציות של אותו רכיב. `.yes` לסקשן "מתאים לך אם", `.no` ל"לא בשבילך אם", `.gold` לרשימת "אם קורה X אז אני עושה Y" בסקשן ההצעה. האייקון בריבוע מעוגל 32 פיקסלים עם רדיוס 9, על רקע בצבע האייקון ב-12 עד 16 אחוז שקיפות. אייקונים מספריית קו (Tabler), לא אמוג'י ולא אייקונים מצוירים ביד.

### 6.18 תמונת About

```css
.about-img{
  width:min(440px,92vw);border-radius:var(--r);overflow:hidden;margin:0 auto 20px;
  box-shadow:0 30px 60px -24px rgba(var(--text-l-rgb),.45);border:6px solid #fff;
}
.about-img img{width:100%;height:auto;display:block}
```

```html
<div class="about-img reveal">
  <img src="assets/img/dor-crop.webp?v4" alt="דור עמוס על רקע קו הרקיע של תל אביב" width="480" height="285" loading="lazy" decoding="async">
</div>
```

**מתי:** בראש סקשן "מי אני", מעל הכותרת. מסגרת לבנה של 6 פיקסלים נותנת מראה של תמונה מודפסת.

### 6.19 אריחי נתונים

```css
.tiles{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;max-width:var(--w-card);margin:6px auto 0}
.tiles li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);border-radius:var(--r);padding:18px 14px 16px;display:grid;justify-items:center;gap:6px}
.tiles .ic{margin-bottom:2px}
.ic{width:26px;height:26px;color:var(--gold-deep);flex:none}
.dark .ic{color:var(--gold-2)}
.tiles .n{font-family:var(--serif);font-weight:900;font-size:clamp(1.35rem,3.6vw,1.8rem);color:var(--text-l);line-height:1.1;font-variant-numeric:tabular-nums}
.tiles .l{font-size:.95rem;color:var(--muted-l);line-height:1.45}
```

```html
<ul class="tiles reveal" aria-label="בקצרה">
  <li><svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /></svg><span class="n">4 שנים</span><span class="l">יזם ומשווק מאחורי הקלעים</span></li>
  <li>...<span class="n" dir="ltr">10M+ ₪</span><span class="l">במערכי שיווק שהייתי מעורב בהם</span></li>
</ul>
```

**מתי:** 2 על 2 בסקשן "מי אני". אייקון, מספר, תווית. `dir="ltr"` על תא עם מספר וסימן מטבע. `.ic` הוא **מחלקת האייקון הכללית בדף** ברוחב 26 פיקסלים, שיודעת לבד להתחלף בין `--gold-deep` ל-`--gold-2` לפי הסקשן, דרך `currentColor`.

### 6.20 שם המוצר

```css
.product{font-family:var(--serif);font-weight:900;font-size:clamp(1.9rem,5.5vw,3rem);line-height:1.2;margin:4px auto 14px;direction:ltr}
.light .product{color:var(--gold-deep)}
```

```html
<p class="product reveal">Dor Digital<br>Growth Partner</p>
```

**מתי:** פעם אחת בדף, בסקשן ההצעה. זה הרגע שבו שם המוצר נחשף (אסור בהירו). `direction:ltr` כי השם באנגלית. זה האלמנט הגדול ביותר בדף, גדול מ-h1.

### 6.21 כרטיסי תוצרים

```css
.deliv{list-style:none;display:grid;gap:10px;max-width:var(--w-card);margin:4px auto 24px}
.deliv li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);border-radius:var(--r);padding:20px 20px 18px;display:grid;justify-items:center;gap:8px}
.deliv h3{margin:0;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
.deliv p{margin:0;font-size:1rem;max-width:540px}
.deliv .tag{display:inline-block;font-size:.9rem;font-weight:800;color:var(--gold-deep);background:rgba(var(--gold-rgb),.16);padding:5px 12px;border-radius:999px;line-height:1.4}
.deliv.bonus li{border-color:rgba(var(--gold-rgb),.5);background:linear-gradient(180deg,#FFFDF8,#FBF5E8)}
```

```html
<ul class="deliv reveal">
  <li>
    <h3><svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3" /></svg><span>1. נעבוד כדי לשפר את העלות לכל לקוח משלם (CAC)</span></h3>
    <p>[הסבר, פסקה אחת]</p>
  </li>
</ul>

<ul class="deliv bonus reveal">
  <li>
    <h3><svg class="ic" ...></svg><span>בונוס מיוחד: פנקס הספקים השחור שלי</span></h3>
    <p>[הסבר]</p>
  </li>
</ul>
```

**מתי:** כל רשימת תוצרים, שירותים או שיעורים. **האייקון יושב ליד הכותרת בתוך ה-h3**, לא כריבוע נפרד מעל הכותרת. `.deliv.bonus` היא אותה ערימה עם מסגרת זהב וגרדיאנט קרם עדין, לבונוסים. `.tag` הוא צ'יפ זהב בתוך כרטיס לתגיות כמו "כלול" או "שווי".

בדף הזה יש שלוש ערימות `.deliv` רצופות: שלושת הדברים המרכזיים, השירותים השוטפים, והבונוס.

### 6.22 כרטיס האלטרנטיבה והמחיר

זה הרכיב שמחליף "כרטיס מחיר" בדף שאין בו מחיר מפורש. שני חלקים: הספר הישן (העלות של לעשות את זה לבד) והחדש (ההצעה).

```css
.ledger{max-width:var(--w-card);margin:4px auto 12px;border-radius:var(--r);text-align:right;overflow:hidden}
.ledger.old{background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.1)}
.ledger.new{background:rgba(var(--gold-rgb),.09);border:1px solid rgba(var(--gold-rgb),.5)}
.ledger header{padding:18px 22px 10px;text-align:center}
.ledger header b{font-family:var(--serif);font-size:1.3rem;color:#fff;font-weight:700}
.ledger ul{list-style:none;padding:0 22px}
.ledger li{display:flex;justify-content:space-between;gap:12px;align-items:baseline;padding:11px 0;border-top:1px solid rgba(255,255,255,.08);color:var(--muted-d);line-height:1.5}
.ledger li span:last-child{white-space:nowrap;font-weight:800;color:var(--text-d);font-variant-numeric:tabular-nums}
.ledger .total{padding:16px 22px 20px;border-top:1px solid rgba(255,255,255,.12);text-align:center;color:#fff;font-weight:800;line-height:1.55}
.ledger .total b{display:block;font-family:var(--serif);font-size:1.8rem;color:var(--gold-2);font-weight:900}
.ledger.new .body{padding:6px 22px 22px;text-align:center;color:var(--text-d);line-height:1.7}
.ledger.new .body b{color:#fff}
.note{max-width:var(--w-card);margin:18px auto 0;font-size:.92rem;color:var(--soft-d);line-height:1.6}
```

```html
<div class="ledger old reveal">
  <header><b>כדי לבנות מערך כזה בנפרד, עסק בדרך כלל צריך לשכור:</b></header>
  <ul>
    <li><span>מנהל קמפיינים שינהל את הפרסום הממומן.</span></li>
    <li><span>איש אסטרטגיה או יועץ עסקי להכוונה ויעדים.</span></li>
  </ul>
  <div class="total">ההוצאה החודשית שלך?<b>העלות הכוללת יכולה לעבור בקלות את ה-10,000 ₪ בחודש</b>עוד לפני תקציב הממומן...</div>
</div>

<div class="ledger new reveal">
  <div class="body" style="padding-top:22px">ב-Growth Partnership יש לך <b>כתובת אחת מרכזית.</b><br>מישהו שלוקח אחריות ביצועית ואסטרטגית בתוך המערכת שלך, בעלות חודשית קבועה והגיונית.</div>
</div>

<p class="note reveal">* אני מוגבל בכמות העסקים שאני עובד איתם במודל הזה בכל רגע נתון...</p>
```

**מתי:** בסקשן התמחור. ה-`old` מונה את העלות של האלטרנטיבה, ה-`new` נותן את ההצעה במסגרת זהב. שים לב:
* הגבולות בין השורות הם `1px` **ניטרלי לבן שקוף, לא זהב.** גבול מבני מותר, אבל מעולם לא בזהב.
* `justify-content:space-between` עם `align-items:baseline` מיישר פריט ומחיר בשורה אחת, ו-`white-space:nowrap` על תא המחיר.
* במובייל השורה נשברת לשתי שורות: `.ledger li{flex-direction:column}`.
* `.note` היא שורת הכוכבית מחוץ לכרטיס, בצבע החלש ביותר.

**כשיש מחיר מפורש:** אותו רכיב, `.ledger.new`, עם המחיר הישן מחוק ומחיר חדש בזהב ב-`.total b`.

### 6.23 כרטיס הוכחה מודגש

```css
.feat{max-width:var(--w-card);margin:0 auto 14px;border-radius:var(--r);overflow:hidden;background:var(--ink-3);border:1px solid rgba(255,255,255,.1)}
.feat-stat{padding:22px 20px 14px}
.feat-stat .num{display:block;font-family:var(--serif);font-weight:900;font-size:clamp(2rem,6vw,3rem);line-height:1.05;color:var(--gold-2);font-variant-numeric:tabular-nums}
.feat-stat .lbl{display:block;color:var(--muted-d);margin-top:8px;line-height:1.55;font-size:1rem;max-width:520px;margin-inline:auto}
.shot{display:block;width:100%;position:relative}
.shot img{width:100%;height:auto;display:block}
.feat .shot{padding:0 16px 0}
.feat .shot img{border-radius:10px 10px 0 0}
.feat figcaption{font-size:.9rem;color:var(--soft-d);padding:10px 16px 14px;background:rgba(0,0,0,.25)}
```

```html
<figure class="feat reveal">
  <div class="feat-stat"><span class="num">120,000 ₪</span><span class="lbl">"[ציטוט אמיתי מההודעה]"</span></div>
  <span class="shot"><img src="assets/img/feat-4240.webp?v4" alt="[תיאור אמיתי של מה שכתוב בצילום המסך]" width="640" height="138" loading="lazy" decoding="async"></span>
  <figcaption>מתוך שיחת וואטסאפ עם לקוחה.</figcaption>
</figure>
```

**מתי:** ההוכחה החזקה ביותר. מספר גדול בזהב, הציטוט מתחתיו, ואז **צילום המסך האמיתי** שמאמת את המספר. הצילום נכנס מלמעלה עם רדיוס `10px 10px 0 0` ונדבק לכיתוב, מה שיוצר תחושה שהוא "נכנס לתוך" הכרטיס. הכיתוב על רקע שחור ב-25 אחוז.

**כלל קשיח:** המספר ב-`.num` והציטוט ב-`.lbl` חייבים להופיע בפועל בצילום המסך. אסור להמציא מספר ואסור לתאר ב-alt מה שלא כתוב בתמונה.

### 6.24 קרוסלת הוכחות

```css
.reel-wrap{margin:4px auto 0;max-width:1100px}
.reel{
  display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 20px 14px;
  -webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(var(--gold-rgb),.5) transparent;
}
.reel::-webkit-scrollbar{height:6px}
.reel::-webkit-scrollbar-thumb{background:rgba(var(--gold-rgb),.45);border-radius:3px}
.reel-card{
  flex:none;width:min(300px,76vw);scroll-snap-align:center;border-radius:16px;overflow:hidden;
  background:var(--ink-3);border:1px solid rgba(255,255,255,.1);align-self:flex-start;
}
.reel-nav{display:flex;align-items:center;justify-content:center;gap:14px;margin:8px auto 0}
.reel-hint{font-size:.9rem;color:var(--soft-d)}
.reel-btn{width:46px;height:46px;border-radius:50%;border:1.5px solid rgba(var(--gold-rgb),.55);background:rgba(var(--gold-rgb),.08);cursor:pointer;display:grid;place-items:center;transition:background .18s ease}
@media (hover:hover) and (pointer:fine){.reel-btn:hover{background:rgba(var(--gold-rgb),.2)}}
.reel-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}
.reel-btn svg{width:20px;height:20px;stroke:var(--gold-2);stroke-width:2.2;fill:none;stroke-linecap:round;stroke-linejoin:round}
```

```html
<div class="reel-wrap reveal">
  <div class="reel" aria-label="עוד הודעות מלקוחות">
    <article class="reel-card"><span class="shot"><img src="..." alt="[תיאור אמיתי]" width="640" height="226" loading="lazy" decoding="async"></span></article>
    ...
  </div>
  <div class="reel-nav">
    <button type="button" class="reel-btn" data-dir="prev" aria-label="ההודעה הקודמת"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6l-6 6" /></svg></button>
    <span class="reel-hint">החלק לצפייה בעוד הודעות</span>
    <button type="button" class="reel-btn" data-dir="next" aria-label="ההודעה הבאה"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6l6 6" /></svg></button>
  </div>
</div>
```

```js
document.querySelectorAll('.reel-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    var reel = btn.closest('.reel-wrap').querySelector('.reel');
    var card = reel.querySelector('.reel-card');
    var step = (card ? card.getBoundingClientRect().width : 300) + 14;
    var dir = btn.getAttribute('data-dir') === 'next' ? -1 : 1; /* RTL: next moves left */
    reel.scrollBy({left: dir * step, behavior: reduced ? 'auto' : 'smooth'});
  });
});
```

**מתי:** כשיש 12 עד 15 צילומי מסך שכולם טובים אבל אין להם מקום בערימה אנכית. שני פרטים חשובים:
* **ב-RTL הכיוון הפוך:** "הבא" גולל שמאלה, כלומר `left` שלילי. זה ה-`dir = -1`.
* `.reel-wrap` הוא הרכיב היחיד בדף שרחב מ-`--w` (1100px), כי הוא נחתך בגלילה בכל מקרה.
* `align-self:flex-start` על הכרטיסים כדי שכרטיסים בגבהים שונים לא ימתחו.
* הגלילה מקבלת `behavior:'auto'` תחת reduced motion.

### 6.25 כרטיס לקוח

```css
.cases{display:grid;gap:18px;max-width:var(--w-card);margin:6px auto 0}
.case{background:var(--ink-3);border:1px solid rgba(255,255,255,.1);border-radius:var(--r);padding:18px 18px 20px;display:grid;gap:14px;justify-items:center}
.case-ig{width:100%;max-width:440px;border-radius:12px;overflow:hidden;background:#fff}
.case-ig img{width:100%;height:auto;display:block}
.case-body h3{color:#fff;margin:2px 0 4px;font-size:clamp(1.2rem,2.8vw,1.4rem)}
.case-who{color:var(--muted-d);margin:0 auto 10px;max-width:540px}
.case-res{color:var(--text-d);font-weight:700;margin:0 auto;max-width:540px;line-height:1.7}
.case-res b{color:var(--gold-2);font-weight:800}
.case-media{width:100%;max-width:440px;display:grid;gap:8px;justify-items:center}
.case-media-title{color:var(--gold-2);font-weight:800;font-size:.95rem;margin:0}
.case-media audio{width:100%;height:44px;border-radius:12px}
.case-media video{width:100%;max-width:320px;border-radius:12px;background:#000;display:block}
.case-media [hidden]{display:none!important}
```

```html
<article class="case reveal" id="case-noya">
  <div class="case-ig"><img src="assets/img/ig-noya.webp?v4" alt="[תיאור אמיתי של הפרופיל: מספר עוקבים ותחום]" width="439" height="222" loading="lazy" decoding="async"></div>
  <div class="case-body">
    <h3>הכירו את נויה בן שושן</h3>
    <p class="case-who">[מי היא, במשפט אחד עובדתי]</p>
  </div>
  <div class="case-media">
    <!-- כשיש קובץ: <video controls playsinline preload="none" poster="assets/videos/noya.webp" src="assets/videos/noya.mp4"></video> -->
  </div>
</article>
```

**מתי:** ארבעה כרטיסים בסקשן ההוכחה, כל אחד: צילום פרופיל אינסטגרם אמיתי, שם, משפט "מי זה", ומקום לעדות וידאו. `.case-res` הוא השורה של התוצאה עם מספר בזהב. וידאו תמיד `preload="none" playsinline controls`, ותמיד מקומי ב-`assets/videos`, לא hotlink.

### 6.26 סלוט וידאו ריק

```css
.vslot{width:min(240px,70vw);aspect-ratio:9/16;border-radius:12px;background:linear-gradient(180deg,#232D45,#141A2A);border:1.5px dashed rgba(var(--gold-rgb),.55);display:grid;place-items:center;align-content:center;gap:8px;color:var(--gold-2);padding:16px;text-align:center}
.vslot svg{width:44px;height:44px;opacity:.9}
.vslot span{font-weight:800;font-size:1rem;line-height:1.4}
.vslot small{font-size:.9rem;color:var(--muted-d);font-weight:700}
```

```html
<div class="vslot" role="img" aria-label="מקום לסרטון עדות של נויה">
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16l13 -8l-13 -8" /></svg>
  <span>עדות וידאו של נויה</span>
  <small>בקרוב</small>
</div>
<!-- כשיש קובץ: להחליף את ה-vslot ב-<video controls playsinline preload="none" poster="assets/videos/noya.webp" src="assets/videos/noya.mp4"></video> -->
```

**מתי:** כשהקופי מבטיח נכס שעדיין לא הגיע. הסלוט **אומר מה יהיה שם**, ביחס 9:16 של סרטון אמיתי, במסגרת מקווקוות. **הערת HTML ליד הסלוט אומרת בדיוק איזה קוד להדביק במקומו.** זה עדיף אלף מונים על placeholder מומצא, ואסור להמציא תמונה או עדות כדי לסתום את החור.

### 6.27 חתימה

```css
.sig{font-family:var(--serif);font-weight:700;font-size:clamp(1.4rem,3.4vw,1.9rem);color:var(--gold-deep);margin:6px auto 18px}
.sig-sub{font-size:.95rem;font-weight:700;color:var(--muted-l);margin:-10px auto 18px;direction:ltr}
```

```html
<p class="sig reveal">מחכה לשמוע ממך, דור עמוס</p>
<p class="sig-sub reveal">Dor Digital | Growth Partner</p>
```

**מתי:** בסוף הסקשן האישי, לפני ה-CTA האחרון. ה-margin השלילי (`-10px`) מקרב את שורת המשנה לחתימה.

### 6.28 פוטר

```css
footer{background:var(--ink);color:var(--muted-d);padding:2.4rem 20px calc(2.2rem + var(--dock));font-size:.92rem;line-height:1.7}
footer .brand{margin-bottom:12px}
footer nav a{color:var(--muted-d);text-decoration:underline;text-underline-offset:3px;margin:0 7px;display:inline-block}
footer p{color:var(--muted-d);margin-bottom:6px}
```

```html
<footer>
  <span class="brand"><b>dor digital</b> · דור עמוס</span>

  <div class="consent-note" id="cookie" role="region" aria-label="הודעת עוגיות">...פרק 6.3...</div>

  <nav aria-label="מידע משפטי">
    <a href="legal.html#terms">תקנון ותנאי שימוש</a>
    <a href="legal.html#refunds">מדיניות ביטולים</a>
    <a href="legal.html#privacy">מדיניות פרטיות</a>
    <a href="legal.html#accessibility">הצהרת נגישות</a>
  </nav>
  <p>יצירת קשר: <a href="mailto:amosdor2@gmail.com">amosdor2@gmail.com</a> · <a href="https://wa.me/972528788498" target="_blank" rel="noopener">וואטסאפ</a></p>
  <p>© 2026 dor digital | דור עמוס | ח.פ. 206664401 | כל הזכויות שמורות</p>
</footer>
```

**חובה בכל דף:** מותג, **הודעת ההסכמה (פרק 6.3)**, ארבעה קישורים לעוגני legal בתוך `<nav aria-label>`, יצירת קשר אמיתית, שורת זכויות עם ח.פ. פרט חסר מסומן `[למלא]`. **אסור להמציא ח.פ., מייל או כתובת.**

**ה-`padding-bottom` של הפוטר הוא השריון של שכבת העגינה**, `calc(2.2rem + var(--dock))`, בלי מדיה קוורי ובלי מחלקה. זה מה ששומר את הקישורים המשפטיים ואת שורת הזכויות גלויים בכל רוחב, כולל בדסקטופ. הפירוט בפרק 6.4.

**הודעת ההסכמה נמצאת מעל ה-`nav` ולא מתחתיו**, כי היא מפנה לאותה מדיניות פרטיות שבקישורים, וקוראת שמגיעה לפוטר פוגשת קודם את ההודעה ואז את הקישורים.

### 6.29 תפריט הנגישות

הרכיב הכי גדול בדף. כפתור צף בצד שמאל, פאנל, 11 מצבים, שמירה ב-localStorage.

```css
/* ברירת המחדל: נעוץ לפינה התחתונה, כי מתחת ל-880px אין שולי גיליון פנויים */
.a11y-btn{
  position:fixed;left:0;bottom:0;z-index:60;width:44px;
  height:calc(44px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);
  border:2px solid var(--gold);border-left:0;border-radius:0 14px 0 0;background:var(--text-l);color:#fff;cursor:pointer;
  display:grid;place-items:center;box-shadow:0 10px 30px rgba(0,0,0,.4);
}
/* מ-880px ומעלה יש לפחות 60 פיקסלים פנויים בכל צד, ואז הלשונית עולה לאמצע הצד */
@media (min-width:880px){
  .a11y-btn{top:50%;bottom:auto;transform:translateY(-50%);width:50px;height:54px;padding-bottom:0;border-radius:0 16px 16px 0}
}
.a11y-btn svg{width:30px;height:30px;fill:none;stroke:currentColor}
@media (hover:hover) and (pointer:fine){.a11y-btn:hover{background:#26314d}}
.a11y-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}
.a11y-panel{
  position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:61;width:min(340px,94vw);max-height:92vh;overflow:auto;
  background:#fff;color:var(--text-l);border-radius:0 16px 16px 0;padding:16px 16px 18px;box-shadow:0 24px 60px rgba(0,0,0,.45);
  text-align:right;font-size:1rem;line-height:1.5;
}
.a11y-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
.a11y-head b{font-size:1.15rem;font-weight:900}
.a11y-close{width:44px;height:44px;border-radius:50%;border:1.5px solid #cfd3dc;background:#fff;color:var(--text-l);font-size:1.1rem;font-weight:900;cursor:pointer}
.a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.a11y-grid button,.a11y-reset{
  min-height:48px;padding:8px 10px;border-radius:12px;border:1.5px solid #cfd3dc;background:#F7F2E9;color:var(--text-l);
  font-family:inherit;font-size:.95rem;font-weight:700;cursor:pointer;line-height:1.3;text-align:center;
}
.a11y-grid button[aria-pressed="true"]{background:var(--text-l);color:#fff;border-color:var(--text-l)}
.a11y-grid button:focus-visible,.a11y-reset:focus-visible,.a11y-close:focus-visible{outline:3px solid #8F6E2E;outline-offset:2px}
.a11y-reset{width:100%;margin-top:10px;background:#fff}
.a11y-foot{margin-top:12px;font-size:.92rem;text-align:center}
.a11y-foot a{color:var(--text-l);text-decoration:underline;text-underline-offset:3px}
```

```html
<button type="button" class="a11y-btn" id="a11yBtn" aria-label="פתיחת תפריט נגישות" aria-expanded="false" aria-controls="a11yPanel">
  <svg class="a11y-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" /><path d="M11.5 7.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" /></svg>
</button>
<div class="a11y-panel" id="a11yPanel" role="dialog" aria-modal="false" aria-label="תפריט נגישות" hidden>
  <div class="a11y-head"><b>תפריט נגישות</b><button type="button" class="a11y-close" id="a11yClose" aria-label="סגירת תפריט הנגישות">✕</button></div>
  <div class="a11y-grid">
    <button type="button" data-a11y="font+">הגדלת טקסט</button>
    <button type="button" data-a11y="font-">הקטנת טקסט</button>
    <button type="button" data-a11y="contrast" aria-pressed="false">ניגודיות גבוהה</button>
    <button type="button" data-a11y="gray" aria-pressed="false">שחור לבן</button>
    <button type="button" data-a11y="invert" aria-pressed="false">היפוך צבעים</button>
    <button type="button" data-a11y="links" aria-pressed="false">הדגשת קישורים</button>
    <button type="button" data-a11y="readable" aria-pressed="false">גופן קריא</button>
    <button type="button" data-a11y="motion" aria-pressed="false">עצירת אנימציות</button>
    <button type="button" data-a11y="cursor" aria-pressed="false">סמן גדול</button>
    <button type="button" data-a11y="lines" aria-pressed="false">ריווח שורות</button>
    <button type="button" data-a11y="heads" aria-pressed="false">הדגשת כותרות</button>
  </div>
  <button type="button" class="a11y-reset" data-a11y="reset">איפוס כל ההגדרות</button>
  <p class="a11y-foot"><a href="legal.html#accessibility">להצהרת הנגישות המלאה</a></p>
</div>
```

**11 המצבים, כל אחד מחלקה על `html`:**

```css
html.a11y-font-1{font-size:112%}
html.a11y-font-2{font-size:125%}
html.a11y-font-3{font-size:140%}
html.a11y-contrast{/* החלפת טוקנים, ראה סעיף 1 */}
html.a11y-contrast .cta{background:#ffd400;color:#000;box-shadow:none}
html.a11y-contrast body::before{display:none}
html.a11y-gray header.hero,html.a11y-gray main,html.a11y-gray footer,html.a11y-gray .sticky,html.a11y-gray .a11y-btn,html.a11y-gray .a11y-panel{filter:grayscale(1)}
html.a11y-invert header.hero,html.a11y-invert main,html.a11y-invert footer,html.a11y-invert .sticky,html.a11y-invert .a11y-btn,html.a11y-invert .a11y-panel{filter:invert(1) hue-rotate(180deg)}
html.a11y-invert img{filter:invert(1) hue-rotate(180deg)}
/* רקע ה-body מתחלף עם המצב, בלי filter. ראה ההסבר המלא מיד אחרי הבלוק */
html.a11y-invert body{background:#ECF0FA}
html.a11y-gray body{background:#0F0F0F}
html.a11y-links a{text-decoration:underline!important;text-underline-offset:3px;font-weight:800!important}
html.a11y-links .cta{outline:3px solid #000;outline-offset:2px}
html.a11y-readable body,html.a11y-readable h1,html.a11y-readable h2,html.a11y-readable h3,html.a11y-readable .product,html.a11y-readable .sig,html.a11y-readable .stats .n,html.a11y-readable .tiles .n,html.a11y-readable .feat-stat .num,html.a11y-readable .gold-line,html.a11y-readable .compare q,html.a11y-readable .quotes li{font-family:Arial,Helvetica,sans-serif!important}
html.a11y-motion *,html.a11y-motion *::before,html.a11y-motion *::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}
html.a11y-motion .reveal{opacity:1!important;transform:none!important}
html.a11y-cursor,html.a11y-cursor *{cursor:url("data:image/svg+xml,...") 4 2,auto!important}
html.a11y-lines p,html.a11y-lines li,html.a11y-lines figcaption{line-height:2.2!important}
html.a11y-lines h1,html.a11y-lines h2,html.a11y-lines h3{line-height:1.8!important}
html.a11y-heads h1,html.a11y-heads h2,html.a11y-heads h3{outline:3px solid #ffd400;outline-offset:6px}
```

#### רשימת ה-filter חייבת למנות גם את הלשונית ואת הפאנל

**`.a11y-btn` ו-`.a11y-panel` נמצאים בשתי הרשימות, ולא במקרה.** במצב "שחור לבן" כל הדף הופך למונוכרום, ולשונית שלא נכנסת לרשימה נשארת זהובה, כלומר **האלמנט הצבעוני היחיד בדף שאמור להיות חסר צבע, ובדיוק זה שמפעיל את המצב.** אותו דבר בהיפוך צבעים: הדף מתבהר והלשונית נשארת כהה.

**`filter` על `.a11y-btn` עצמו לא שובר את המיקום שלו.** נמדד ב-390x844, אחרי גלילה לתחתית, עם `grayscale(1)` על הלשונית: `top:800`, `left:0`, נעוצה לקצה התחתון בדיוק כמו לפניה, והפס הדביק נשאר נעוץ גם הוא. הכלל שאוסר `filter` נוגע ל**אב** של אלמנט `fixed`, לא לאלמנט ה-`fixed` עצמו, ולשונית הנגישות ופאנל הנגישות לא מכילים אף צאצא `fixed`.

**`.cookie` ירד מהרשימות** כי הודעת ההסכמה כבר לא צפה. היא בתוך `<footer>`, ולכן `footer` מטפל בה. ראה פרק 6.3.

#### `body` לא נכנס לרשימת ה-filter. אף פעם. זו מלכודת נמדדת.

יש פה שאלה שנראית תמימה: רשימת ה-filter של `a11y-gray` ו-`a11y-invert` מונה `header.hero`, `main`, `footer`, `.sticky`, `.a11y-btn` ו-`.a11y-panel`. **למה לא פשוט `body`, ונגמר?**

כי `body` היה שובר את הדף. **בעיה אמיתית ופתרון שגוי, שניהם נמדדו.**

**הבעיה שכן קיימת:** ב-iOS, ברגע שמותחים את הדף מעל הקצה (rubber band), נחשף הרקע של הקנבס, והוא בא מ-`body{background:var(--ink)}`. במצב היפוך צבעים כל התוכן הופך לבהיר, **והפס שנחשף נשאר נייבי כהה.** פס כהה מול תוכן לבן, בדיוק במצב שנועד לעזור למי שמתקשה לקרוא.

**הפתרון השגוי, שנבדק ונפל:** להוסיף `body` לרשימת ה-filter. **`filter` שהוא לא `none` הופך את האלמנט לבלוק מכיל של כל צאצא `position:fixed`.** ברגע שיש `filter` על `body`, כל האלמנטים הצפים בדף ממוקמים מול ה-body, שגובהו גובה המסמך, ולא מול המסך.

מדידה ב-390x844, אחרי גלילה של 2500 פיקסלים, עם `body` בתוך רשימת ה-filter:

| אלמנט | לפני (תקין) | אחרי הוספת `body` |
|---|---|---|
| `.sticky` | `top:767`, תחתית המסך | **`top:6202`** |
| `.cookie` (הבאנר הצף, לפני שהוא ירד לזרימה) | `top:630` | **`top:6065`** |
| `.a11y-btn` | `top:554` | **`top:5989`** |

השורה השלישית היא הקריטית. **כפתור הנגישות עצמו עף מהמסך, ולכן המשתמש לא יכול לכבות את המצב שהוא הדליק.** הדף לא נראה שבור, הוא באמת שבור.

**הפתרון הנכון: `background-color` על `body` שמתחלף יחד עם המצב, בלי `filter`.** אלה שתי השורות שמופיעות בבלוק למעלה מיד אחרי שורת ה-`img`.

```css
html.a11y-invert body{background:#ECF0FA}
html.a11y-gray body{background:#0F0F0F}
```

**מאיפה שני המספרים האלה.** הם לא נבחרו בעין, הם נמדדו: `#ECF0FA` הוא בדיוק מה ש-`#0B0F19` (הערך של `--ink`) הופך להיות תחת `invert(1) hue-rotate(180deg)`, ו-`#0F0F0F` הוא בדיוק מה שהוא הופך להיות תחת `grayscale(1)`. לכן הפס שנחשף בקצה זהה לרקע של התוכן שמעליו, ואף אחד לא רואה מדרגה.

**איך מודדים את הערך במקום לנחש אותו,** אם מחליפים את `--ink` לפלטה אחרת. שמים `div` בצבע המקורי בתוך `main`, מדליקים את המצב, מצלמים את האלמנט ומוציאים פיקסל:

```js
// בתוך הדף, עם הצבע שרוצים להמיר
const c = document.createElement('canvas'); c.width = c.height = 10;
const x = c.getContext('2d');
x.filter = 'invert(1) hue-rotate(180deg)';     // או 'grayscale(1)'
x.fillStyle = '#0B0F19'; x.fillRect(0, 0, 10, 10);
const d = x.getImageData(5, 5, 1, 1).data;
console.log('#' + [d[0],d[1],d[2]].map(v => v.toString(16).padStart(2,'0')).join(''));
```

`ctx.filter` בקנבס מחזיר **בדיוק** את מה שה-`filter` ב-CSS מחזיר על אלמנט. זה נבדק בשתי הדרכים על אותו דף וקיבלנו את אותם שני הערכים, `#ECF0FA` ו-`#110C03` עבור הקרם.

**ארבע שורות אימות אחרי כל שינוי במצבי הנגישות:**

```bash
# body לא בתוך רשימת filter
grep -o 'html\.a11y-\(invert\|gray\)[^{]*body[^{]*{filter' index.html   # חייב לחזור ריק
# הרקע כן מתחלף
grep -c 'a11y-invert body{background' index.html                          # לפחות 1
# הלשונית והפאנל כן בתוך שתי רשימות ה-filter
grep -c 'a11y-gray .a11y-btn' index.html                                 # לפחות 1
grep -c 'a11y-invert .a11y-btn' index.html                               # לפחות 1
```

ובדפדפן: להדליק את המצב ולאמת ש-`.sticky` עדיין נוגע בתחתית המסך. **חובה ברוחב 720 ומטה ואחרי גלילה מעבר להירו**, כי מעל 720 הפס הוא `display:none`, ובלי `.show` הוא מוסט ב-`translateY(110%)` ואז המדידה חסרת משמעות:

```js
// רוחב 390, אחרי גלילה מעבר להירו, כשהפס כבר נושא את המחלקה show
document.documentElement.classList.add('a11y-invert');
const el = document.getElementById('sticky');
const r = el.getBoundingClientRect();
console.log(
  !el.classList.contains('show') ? 'גלול קודם מעבר להירו' :
  Math.abs(r.bottom - innerHeight) < 2 ? 'OK' : 'FAIL, filter שבר את ה-fixed'
);
```

**ההכללה, והיא חלה על כל הסקיל:** `filter`, `transform`, `perspective`, `backdrop-filter`, `will-change` ו-`contain` על אב כלשהו כולם יוצרים בלוק מכיל ל-`position:fixed`. **אף אחד מהם לא נוגע ב-`body` וב-`html` בדף הזה.** על האלמנט ה-`fixed` עצמו הם מותרים, וזה בדיוק המקרה של `.a11y-btn`. אם בכל זאת יש צורך במצב ויזואלי גורף, הוא נעשה בהחלפת טוקנים או בהחלפת `background-color`, לא ב-`filter` על אב.

**ה-JS, מלא:**

```js
(function(){
  var root = document.documentElement, btn = document.getElementById('a11yBtn'), panel = document.getElementById('a11yPanel');
  var toggles = ['contrast','gray','invert','links','readable','motion','cursor','lines','heads'];
  var state = {font:0};
  try { state = Object.assign(state, JSON.parse(localStorage.getItem('gp_a11y') || '{}')); } catch(err){}
  function apply(){
    root.classList.remove('a11y-font-1','a11y-font-2','a11y-font-3');
    if (state.font > 0) root.classList.add('a11y-font-' + state.font);
    toggles.forEach(function(k){
      root.classList.toggle('a11y-' + k, !!state[k]);
      var b = panel.querySelector('[data-a11y="' + k + '"]'); if (b) b.setAttribute('aria-pressed', state[k] ? 'true' : 'false');
    });
    try { localStorage.setItem('gp_a11y', JSON.stringify(state)); } catch(err){}
  }
  function open(){ panel.hidden = false; btn.setAttribute('aria-expanded','true'); var f = panel.querySelector('button'); if (f) f.focus(); }
  function close(){ panel.hidden = true; btn.setAttribute('aria-expanded','false'); btn.focus(); }
  btn.addEventListener('click', function(){ panel.hidden ? open() : close(); });
  document.getElementById('a11yClose').addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !panel.hidden) close(); });
  document.addEventListener('click', function(e){ if (!panel.hidden && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) close(); });
  panel.addEventListener('click', function(e){
    var b = e.target.closest('[data-a11y]'); if (!b) return;
    var k = b.getAttribute('data-a11y');
    if (k === 'font+') state.font = Math.min(3, (state.font||0) + 1);
    else if (k === 'font-') state.font = Math.max(0, (state.font||0) - 1);
    else if (k === 'reset') state = {font:0};
    else state[k] = !state[k];
    apply();
  });
  apply();
})();
```

**מה עושה אותו נגיש בפועל:** `aria-expanded` על הכפתור, `aria-controls` שמצביע על הפאנל, `aria-pressed` שמתעדכן על כל מתג, מיקוד עובר לכפתור הראשון בפתיחה וחוזר לכפתור הפותח בסגירה, Escape סוגר, קליק בחוץ סוגר, וכל כפתור לפחות 44 פיקסלים (בפועל 48). האזנה אחת מואצלת על הפאנל במקום 12 מאזינים.

### 6.30 רכיבי מלאי בגיליון, לא בשימוש בדף

שלושה רכיבים קיימים ב-CSS אבל לא במארקאפ של הדף הזה. הם חלק מהמערכת וזמינים כשהקופי מצריך אותם:

```css
.quotes{list-style:none;display:grid;gap:10px;max-width:var(--w-card);margin:4px auto 20px}
.quotes li{
  font-weight:800;font-size:1.05rem;line-height:1.6;padding:16px 20px;border-radius:var(--r-s);
  font-family:var(--serif);
}
.light .quotes li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);color:var(--text-l)}
.dark .quotes li{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:#fff}

.compare{list-style:none;display:grid;gap:10px;max-width:var(--w-card);margin:4px auto 20px}
.compare li{padding:20px 22px;border-radius:var(--r);text-align:center;line-height:1.6}
.compare li:nth-child(1){background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:var(--muted-d)}
.compare li:nth-child(2){background:rgba(var(--gold-rgb),.1);border:1px solid rgba(var(--gold-rgb),.45);color:#fff}
.compare b{display:block;font-size:.95rem;font-weight:800;margin-bottom:6px;color:var(--gold-2)}
.compare li:nth-child(1) b{color:var(--muted-d)}
.compare q{font-family:var(--serif);font-weight:700;font-size:clamp(1.1rem,2.6vw,1.35rem);quotes:"\201C" "\201D"}
```

* `.quotes` לערימת ציטוטים קצרים בסריף.
* `.compare` לזוג "לפני ואחרי" או "מה אומרים מול מה נכון". פריט ראשון אפור, שני בזהב.
* `.deliv .tag` ו-`.small` זמינים גם הם.

### 6.31 מה **אין** בדף הזה, ומה לעשות כשצריך

הדף הוא Lead Gen שמוביל לוואטסאפ, ולכן:

* **אין טופס בכלל.** אין רב מסר, אין שדה מייל, אין כפתור שליחה. ה-CTA היחיד הוא קישור `wa.me`.
* **אין FAQ עם `details`/`summary`.**
* **אין מוקאפ לפטופ**, כי אין מוצר דיגיטלי להציג.
* **אין טיימר ספירה לאחור**, אין מחיר מפורש, אין סליקה.

כשהקופי של הלקוח **כן** דורש טופס או FAQ, הכללים הם:

* **טופס:** מסגרת `2px dashed` בצבע ניטרלי בכ-30 אחוז שקיפות, שעוטפת גם את הכפתור, אותיות קטנות מחוץ למסגרת. שורת `.consent` מתחת לכפתור, בדיוק כמו ב-6.1. אם משתמשים ברב מסר: `https://` מפורש ולא `//`, סלקטורים מבוססי ID לדריסת העיצוב שלהם, הסתרת `.multytext`, תבנית fallback מוסתרת שנחשפת אחרי 1.8 ו-6 שניות אם הסקריפט לא הזריק תוכן, ו-id נפרד לכל slot. **לעולם לא לכתוב `textContent` על אלמנט שיש לו ילדים אלמנטיים**, כי מבנה הכפתור הוא `<a class="submitButton">` שעוטף `<button type="submit">` וכתיבה על העוטף מוחקת את הכפתור והטופס מפסיק לשלוח בשקט.
* **FAQ:** `<details>`/`<summary>` סמנטי, `summary` במשקל 800 בצבע הכותרות של הסקשן, בלי `letter-spacing`, בלי קו מפריד מתפוגג.

#### טופס בלי קוד הטמעה: שדות אמיתיים, submit חסום, ושורת `.pending` דיסקרטית מתחת לטופס

`/lp-connect` הוא שלב 5. `lp-build` הוא שלב 3, ולכן ברוב המקרים **אין עוד קוד הטמעה של רב מסר בזמן הבנייה.** אסור בגלל זה להשאיר מסגרת ריקה, ואסור להשאיר כפתור שנראה עובד ובלחיצה עליו לא קורה כלום. **טופס ששותק בשקט הוא הגרוע מכול:** המבקר חושב שנרשם, הלקוח חושב שהדף עובד, ואף ליד לא נכנס.

שלושה דברים, חובה:

1. **שדות אמיתיים**, עם `label` אמיתי, `name`, `type`, `autocomplete` ו-`required`. אלה גם השדות שהטופס האמיתי יחליף, כך שהמידות והפריסה נבדקות עכשיו ולא אחר כך.
2. **ה-submit חסום בקוד**, לא רק ריק. `preventDefault` ועוד `disabled` על הכפתור, כדי שלא תהיה שום לחיצה שנראית כמו הצלחה.
3. **שורת `.pending` דיסקרטית מתחת לטופס**, מחוץ למסגרת ואחרי ה-`.consent`: טקסט קטן ומעומעם, "הטופס יחובר בשלב הבא". לא קופסת אזהרה צבועה בתוך הטופס: על מסך מול לקוח או מול קהל היא נראית כמו דף שבור. ההסבר המלא נשאר בהערת HTML בתוך ה-`.formbox` ובשורה ב-`legal-todo.md`.

```css
.formbox{max-width:var(--w-card);margin:4px auto 10px;padding:22px 20px;border-radius:var(--r);
         border:2px dashed rgba(255,255,255,.3);display:grid;gap:12px;text-align:right}
.light .formbox{border-color:rgba(var(--text-l-rgb),.28)}
.formbox label{font-weight:800;font-size:1rem;display:block;margin-bottom:6px}
.light .formbox label{color:var(--text-l)}
.dark .formbox label{color:#fff}
.formbox input{width:100%;min-height:48px;padding:12px 14px;border-radius:var(--r-s);
               font-family:var(--sans);font-size:1rem;background:#fff;color:var(--text-l);
               border:1px solid rgba(var(--text-l-rgb),.18);text-align:right}
.formbox input:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.formbox .cta{width:100%}
.formbox .cta[disabled]{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}
.pending{font-size:.9rem;font-weight:600;line-height:1.6;color:var(--soft-d);margin:8px auto 0;max-width:520px;text-align:center}
.dark .pending{color:var(--soft-d)}
.light .pending{color:var(--muted-l)}
```

```html
<form class="formbox reveal" id="lead-form" novalidate>
  <!-- הטופס עוד לא חובר למערכת: הכפתור disabled וה-submit חסום ב-JS. החיבור נעשה ב-/lp-connect, ואז מסירים גם את שורת ה-.pending שמתחת לטופס. -->
  <div>
    <label for="f-name">השם שלך</label>
    <input id="f-name" name="name" type="text" autocomplete="name" required>
  </div>
  <div>
    <label for="f-phone">טלפון</label>
    <input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>
  </div>
  <div>
    <label for="f-email">אימייל</label>
    <input id="f-email" name="email" type="email" autocomplete="email" required>
  </div>
  <button class="cta" type="submit" disabled aria-describedby="lead-form-note">
    <span>[טקסט הכפתור מהקופי]</span>
  </button>
</form>
<p class="consent" id="lead-form-note">בשליחת הפרטים אני מאשר את <a href="legal.html#terms">התקנון</a> ואת <a href="legal.html#privacy">מדיניות הפרטיות</a>.</p>
<p class="pending" role="status">הטופס יחובר בשלב הבא</p>
```

```js
var lf = document.getElementById('lead-form');
if (lf) { lf.addEventListener('submit', function(e){ e.preventDefault(); }); }
```

**כשהטופס מחובר**, `/lp-connect` מסיר את `.pending`, מסיר את `disabled`, מסיר את חוסם ה-submit ומחליף את השדות בקוד ההטמעה בתוך אותה `.formbox`. שורת ה-`.consent` נשארת מחוץ למסגרת בכל מקרה. שורת ה-`.pending` נכנסת לרשימת "מה נשאר לך".

---

### 6.32 באילו סקשנים מותר להשתמש בכל רכיב

**רוב הרכיבים במערכת כבולים לצבע הסקשן שהם נבנו בו.** זה הבאג השקט הנפוץ ביותר, כי הוא לא מפיל grep ולא מפיל את שער ה-QA, הוא רק מייצר סקשן שנראה זול. שתי הדוגמאות שקרו בפועל:

* `.deliv` ו-`.fit` הם `background:#fff` עם `color:var(--text-l)`. בתוך סקשן כהה הכרטיס נשאר לבן, אבל הפסקאות שבתוכו נשלטות על ידי `.dark p{color:var(--muted-d)}`, והתוצאה היא **אפור בהיר על לבן.** בלתי קריא.
* `.ledger`, `.chain` ו-`.faq` הפוכים: `color:#fff` קבוע. בתוך סקשן בהיר זה **לבן שנשרף על קרם.** בלתי קריא לגמרי.

לכן כל רכיב מסומן כאן באיזו משפחת סקשנים הוא חוקי כמו שהוא:

| רכיב | חוקי ב-`dark` | חוקי ב-`light` | הערה |
|---|---|---|---|
| `.cta`, `.consent` | כן | כן | `.light .consent` מוגדר |
| `.eyebrow`, `.brand` | כן | ההירו תמיד כהה | |
| `.chips` | כן | כן | שני וריאנטים מוגדרים |
| `.silos` | כן | כן | שני וריאנטים מוגדרים |
| `.quotes` | כן | כן | שני וריאנטים מוגדרים |
| `.chat` + `.bub` | כן | כן | `.light .chat` מוגדר |
| `.slot`, `.vslot` | כן | `.light .slot` מוגדר | `.vslot` כהה בלבד |
| `.beli` | כן | **לא בלי הווריאנט למטה** | `b{color:#fff}` |
| `.stats` | כן | **לא.** על רקע בהיר משתמשים ב-`.tiles` | |
| `.tiles` | **לא בלי וריאנט** | כן | `#fff` + `--text-l` |
| `.chain` | כן | **לא בלי הווריאנט למטה** | `color:#fff` |
| `.fit` | **לא בלי הווריאנט למטה** | כן | `#fff` + `--text-l` |
| `.deliv`, `.deliv.bonus` | **לא בלי הווריאנט למטה** | כן | `#fff` + `--text-l` |
| `.ledger`, `.note` | כן | **לא בלי הווריאנט למטה** | `color:#fff` |
| `.compare` | כן | **לא בלי הווריאנט למטה** | |
| `.feat`, `.reel-card`, `.case` | כן | לא. רקע `--ink-3` קבוע | |
| `.product` | כן, עם הווריאנט למטה | כן | ראה למטה |
| `.sig` | **לא.** `--gold-deep` על כהה לא עובר ניגודיות | כן | |
| `.faq` | כן, עם ה-CSS למטה | כן, עם ה-CSS למטה | לא היה בדף המקור בכלל |

**הווריאנטים החסרים, להעתקה.** מוסיפים רק את מה שבאמת בשימוש בדף:

```css
/* .product: זהב בשני הכיוונים. הווריאנט הכהה היה חסר לגמרי */
.dark .product{color:var(--gold-2)}
.light .product{color:var(--gold-deep)}

/* .chain בסקשן בהיר. הווריאנט הזה היה חסר לגמרי */
.light .chain li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);color:var(--text-l)}
.light .chain li::before{background:rgba(var(--gold-deep-rgb),.14);color:var(--gold-deep)}

/* .ledger ו-.note בסקשן בהיר */
.light .ledger.old{background:rgba(var(--text-l-rgb),.03);border:1px solid rgba(var(--text-l-rgb),.12)}
.light .ledger.new{background:rgba(var(--gold-rgb),.12);border:1px solid rgba(var(--gold-deep-rgb),.45)}
.light .ledger header b{color:var(--text-l)}
.light .ledger li{border-top:1px solid rgba(var(--text-l-rgb),.1);color:var(--muted-l)}
.light .ledger li span:last-child{color:var(--text-l)}
.light .ledger .total{border-top:1px solid rgba(var(--text-l-rgb),.14);color:var(--text-l)}
.light .ledger .total b{color:var(--gold-deep)}
.light .ledger.new .body{color:var(--muted-l)}
.light .ledger.new .body b{color:var(--text-l)}
.light .note{color:var(--muted-l)}

/* .deliv בסקשן כהה */
.dark .deliv li{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.dark .deliv h3{color:#fff}
.dark .deliv p{color:var(--muted-d)}
.dark .deliv .tag{color:var(--gold-2);background:rgba(var(--gold-rgb),.18)}
.dark .deliv.bonus li{border-color:rgba(var(--gold-rgb),.5);background:rgba(var(--gold-rgb),.08)}

/* .fit בסקשן כהה */
.dark .fit li{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);color:var(--text-d)}
.dark .fit.gold svg{stroke:var(--gold-2)}

/* .beli בסקשן בהיר */
.light .beli li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);color:var(--text-l)}
.light .beli b{color:var(--text-l)}

/* .stats בסקשן בהיר, אם לא עוברים ל-.tiles */
.light .stats li{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1)}
.light .stats .n{color:var(--gold-deep)}
.light .stats .l{color:var(--muted-l)}
.light .stats-note{color:var(--muted-l)}

/* .tiles בסקשן כהה */
.dark .tiles li{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.dark .tiles .n{color:var(--gold-2)}
.dark .tiles .l{color:var(--muted-d)}

/* .compare בסקשן בהיר */
.light .compare li:nth-child(1){background:#fff;border:1px solid rgba(var(--text-l-rgb),.1);color:var(--muted-l)}
.light .compare li:nth-child(2){background:rgba(var(--gold-rgb),.12);border:1px solid rgba(var(--gold-deep-rgb),.45);color:var(--text-l)}
.light .compare b{color:var(--gold-deep)}
.light .compare li:nth-child(1) b{color:var(--muted-l)}

/* .sig בסקשן כהה */
.dark .sig{color:var(--gold-2)}
.dark .sig-sub{color:var(--muted-d)}
```

**`.faq`, הרכיב שלא היה בדף המקור.** כשהקופי מבקש שאלות ותשובות, זה ה-CSS, והוא נולד עם שני הווריאנטים:

```css
.faq{max-width:var(--w-card);margin:4px auto 20px;display:grid;gap:8px;text-align:right}
.faq details{border-radius:var(--r-s);padding:14px 18px}
.light .faq details{background:#fff;border:1px solid rgba(var(--text-l-rgb),.1)}
.dark .faq details{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
.faq summary{text-wrap:balance;font-weight:800;font-size:1.05rem;line-height:1.5;cursor:pointer;list-style:none;
             display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:44px}
.faq summary::-webkit-details-marker{display:none}
.light .faq summary{color:var(--text-l)}
.dark .faq summary{color:#fff}
.faq summary::after{content:"+";flex:none;font-family:var(--serif);font-weight:700;font-size:1.4rem;color:var(--gold-deep)}
.dark .faq summary::after{color:var(--gold-2)}
.faq details[open] summary::after{content:"\2212"}
.faq summary:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
.faq .ans{text-wrap:balance;margin:10px auto 0;max-width:none;text-align:right;font-size:1rem}
.light .faq .ans{color:var(--muted-l)}
.dark .faq .ans{color:var(--muted-d)}
```

```html
<div class="faq reveal">
  <details>
    <summary>[השאלה מהקופי]</summary>
    <p class="ans">[התשובה מהקופי]</p>
  </details>
</div>
```

`\2212` הוא סימן המינוס, לא מקף ארוך. אזור הלחיצה של ה-`summary` הוא 44px כנדרש, בלי `letter-spacing` ובלי קו מפריד מתפוגג.

**`text-wrap:balance` בשתי השורות האלה הוא חובה, לא נוי.** `summary` הוא התג היחיד בדף שנושא טקסט ולא מכוסה בשום כלל גלובלי של `text-wrap`: הבסיס מטפל ב-`h1,h2,h3` וב-`p,li,figcaption`, ו-`summary` לא נמצא באף רשימה. נמדד בדפדפן: `getComputedStyle(summary).textWrap` החזיר `wrap`, כלומר ברירת המחדל, בזמן ש-`h2` החזיר `balance` ו-`p` החזיר `pretty`.

התוצאה בפועל: שאלה של שבע או שמונה מילים נשברה עם מילה אחת בשורה השנייה, ושער ה-QA נפל על `orphans` בשלושה רוחבים:

```
FAIL 360px orphans=1    "אני לא יכולה להיות זמינה בכל שש / השעות."
FAIL 390px orphans=2    "אני לא יכולה להיות זמינה בכל שש / השעות."
                        "אני לא רוצה לדבר מול אנשים שאני לא / מכירה."
FAIL 430px orphans=1    "אני לא רוצה לדבר מול אנשים שאני לא / מכירה."
```

אחרי שתי השורות: PASS על כל ששת הרוחבים, 320 עד 1280. **נמדד, לא הוערך.**

**`balance` ולא `pretty`**, בשני הרכיבים. `pretty` מטפל בשורה האחרונה של פסקה ארוכה, ושאלת FAQ ותשובת FAQ הן שתי שורות בסך הכול. `balance` מחלק את המילים שווה בשווה בין השורות, וזה מה שמחסל את המילה הבודדת.

**וכשגם `balance` לא מספיק ברוחב מסוים, מרתכים את שתי המילים האחרונות ב-`&nbsp;`:**

```html
<summary>"אני לא רוצה לדבר מול אנשים שאני&nbsp;לא&nbsp;מכירה."</summary>
```

זה נמדד גם הוא, ולבד הוא מעביר את השער אפילו בלי `balance`. **הסדר קשיח: קודם `balance` על הרכיב, ורק אם רוחב מסוים עדיין נופל, `&nbsp;` בטקסט הספציפי שנפל.** `&nbsp;` הוא תיקון נקודתי ולא מערכתי, ולכן הוא שני.

**והכלל הכללי:** כל תג שנושא טקסט ואינו `h1`, `h2`, `h3`, `p`, `li` או `figcaption` **לא מקבל `text-wrap` בכלל**, וצריך לתת לו אותו במפורש. הבדיקה היא שורה אחת: `getComputedStyle(el).textWrap`, ואם חוזר `wrap` הכלל חסר.

**הדרך הבטוחה למי שלא רוצה לחשוב על זה בכלל:** לבחור לכל סקשן רכיב שחוקי בשתי המשפחות (`.chips`, `.silos`, `.quotes`, `.chat`, `.faq`), או לשים את הרכיב בסקשן שהוא נבנה בו. כשמעבירים רכיב בין משפחות, **חובה לפתוח את הדף ולהסתכל.** גריפ לא רואה אפור על לבן.

## 7. רספונסיביות

ארבע שאילתות רוחב בדף (`max-width:720`, `max-width:640`, `max-width:400` ו-`min-width:880`), ועוד שאילתות `hover`. `min-width:880` היא היחידה שנכתבת כלפי מעלה, והיא קיימת בשביל דבר אחד: מ-880 ומעלה יש לפחות 60 פיקסלים פנויים בכל צד של עמודת התוכן, ולכן לשונית הנגישות יכולה לעלות לאמצע הצד בלי לכסות שום דבר. החשבון: העמודה היא 760, הלשונית 50, ומתחת ל-860 היא נכנסת לתוך העמודה.

### 7.1 מתחת ל-720px: שכבת העגינה

```css
@media (max-width:720px){
  :root{--dock:calc(76px + env(safe-area-inset-bottom))}
  .sticky{display:block;padding-left:56px}
  .a11y-panel{top:auto;bottom:0;transform:none;width:100vw;border-radius:16px 16px 0 0;max-height:80vh;padding-bottom:calc(18px + env(safe-area-inset-bottom))}
}
footer{padding-bottom:calc(2.2rem + var(--dock))}   /* בלי מדיה קוורי. ראה 6.4 */
```

זה הסף שבו הדף הופך למובייל: ה-CTA הדביק נדלק בקצה התחתון, כפתור הנגישות יושב בקצה השמאלי של אותו קצה, הפוטר שומר את הגובה של שניהם דרך `--dock`, והפאנל הופך לגיליון תחתון ברוחב מלא.

**שכבה נעוצה אחת, גובה אחד שמור, ואפס מחלקות שמשנות אותו באמצע הקריאה.** הגרסה הקודמת החזיקה שלוש שכבות בתחתית המסך (פס דביק, באנר עוגיות צף וכפתור נגישות מעל שניהם), כל אחת עם `bottom` משלה, וגובה פוטר שהשתנה לפי מחלקה על ה-body. **שלושת הכשלים שזה ייצר נמדדו והם מרוכזים בפרק 6.4.** הכלל שהחליף אותם הוא: מה שיש בו טקסט לקרוא יושב בזרימה, ומה שצף נעוץ ל-`bottom:0` וגובהו בתוך `--dock`.

**כפתור הנגישות לא זז בין מצבים.** אין `body.has-cookiebar .a11y-btn`, אין שני מיקומים ואין מעבר. פקד שמחליף מקום כשמשהו אחר נדלק הוא פקד שאי אפשר למצוא אותו פעמיים באותו מקום.

### 7.2 מתחת ל-640px: הפריסה

```css
@media (max-width:640px){
  body{font-size:1rem}
  .sec{padding:40px 18px}
  .stats{grid-template-columns:1fr 1fr;gap:8px}
  .stats li:nth-child(3){grid-column:1/-1}
  .silos,.tiles{grid-template-columns:1fr 1fr}
  .cta{padding:16px 22px;width:100%}
  .feat .shot{padding:0 10px}
  .ledger li{flex-direction:column;gap:2px;align-items:flex-start}
  .ledger li span:last-child{white-space:normal}
}
@media (max-width:640px){.proofs{grid-template-columns:1fr;max-width:400px;gap:6px}}
```

* גוף הטקסט יורד מ-1.0625rem ל-1rem.
* ריווח הסקשן קבוע על 40 ו-18 במקום clamp.
* שלושת המספרים הופכים ל-2 ועוד 1 מלא.
* **`.cta{width:100%}`**: הכפתור נמתח על כל הרוחב. זה קריטי להמרה במובייל.
* שורת ledger נשברת לשתי שורות, והמחיר מקבל רשות לשבור שורה.
* פס ההוכחה הזוגי הופך לטור אחד ברוחב מקסימלי 400.

### 7.3 מתחת ל-400px: הקריסה האחרונה

```css
@media (max-width:400px){
  .silos,.tiles{grid-template-columns:1fr}
}
```

מסכים של 320 עד 400 פיקסלים מקבלים טור אחד גם ברשימות שהיו זוגות.

### 7.4 hover רק היכן שיש עכבר אמיתי

```css
@media (hover:hover) and (pointer:fine){.cta:hover{...}}
@media (hover:hover) and (pointer:fine){.reel-btn:hover{...}}
@media (hover:hover) and (pointer:fine){.a11y-btn:hover{...}}
```

**כל אפקט hover בדף עטוף בשאילתה הזאת.** במגע, hover נדבק אחרי לחיצה ונראה כתקלה.

### 7.5 מה מתוכנן להיות רספונסיבי בלי שאילתה

השיטה המועדפת היא `min()` ו-`clamp()` ולא breakpoint:

```css
.hero-img{width:min(640px,100%)}
.portrait{width:min(220px,58vw)}
.portrait.sm{width:min(150px,44vw)}
.about-img{width:min(440px,92vw)}
.reel-card{width:min(300px,76vw)}
.vslot{width:min(240px,70vw)}
.a11y-panel{width:min(340px,94vw)}
.eyebrow{width:min(680px,calc(100% + 16px))}
```

**דסקטופ שווה מובייל.** עמודה אחת ממורכזת לכל הדף, בלי פריסות טור מול טור. לכן אין צורך בשאילתות מבניות.

---

## 8. תנועה

### 8.1 המערכת בשלוש שורות

* **easing אחד:** `cubic-bezier(.16,1,.3,1)`, שהוא `--ease`. ease-out חד. אין easing אחר בדף.
* **`transform` ו-`opacity` בלבד.** אין אנימציה על גובה, רוחב, צבע או מיקום.
* **אפס `window.addEventListener('scroll')`.** כל מה שתלוי בגלילה משתמש ב-IntersectionObserver.

### 8.2 `.reveal`, הרכיב המרכזי

```css
.js .reveal{opacity:0;transform:translateY(12px);transition:opacity .5s var(--ease),transform .5s var(--ease)}
.js .reveal.in{opacity:1;transform:none}
.js .reveal>li{opacity:0;transform:translateY(10px);transition:opacity .45s var(--ease),transform .45s var(--ease)}
.js .reveal.in>li{opacity:1;transform:none}
.js .reveal>li:nth-child(2){transition-delay:60ms}
.js .reveal>li:nth-child(3){transition-delay:120ms}
.js .reveal>li:nth-child(4){transition-delay:180ms}
.js .reveal>li:nth-child(5){transition-delay:240ms}
.js .reveal>li:nth-child(n+6){transition-delay:300ms}
```

**הגארד `.js` הוא חובה ולא קוסמטיקה.** בראש ה-`<head>`, לפני הכול:

```html
<script>document.documentElement.classList.add('js')</script>
```

בלי הגארד, גולש עם JS חסום או תקלה בטעינה רואה **דף לבן לגמרי**, כי `.reveal{opacity:0}` יחול לנצח. כל כלל ההסתרה מתחיל ב-`.js `, כך שברירת המחדל היא תוכן נראה.

**stagger 60 מילישניות**, עד פריט חמישי, ואז כולם ב-300 כדי שרשימה של 14 פריטים לא תיקח שנייה שלמה.

**האובזרבר:**

```js
var els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduced) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {rootMargin:'0px 0px -8% 0px', threshold:0.05});
  els.forEach(function(el){ io.observe(el); });
} else { els.forEach(function(el){ el.classList.add('in'); }); }
setTimeout(function(){ els.forEach(function(el){ el.classList.add('in'); }); }, 2500);
```

ארבעה פרטים שכל אחד מהם מציל דף:
1. `rootMargin:'0px 0px -8% 0px'` מפעיל את ההופעה קצת לפני שהאלמנט באמת נכנס, כך שהוא נראה בזמן ולא "קופץ".
2. `threshold:0.05`, חמישה אחוזים מהאלמנט מספיקים.
3. `io.unobserve` מיד, כדי שההופעה תהיה חד פעמית ולא תשחק ביצועים.
4. **רשת ביטחון של 2500 מילישניות** שמדליקה את הכול בכל מקרה. אם האובזרבר נכשל, אם יש קריסה, אם משהו מסתיר, התוכן נראה תוך שנייה ורבע. יש 103 אלמנטי `.reveal` בדף, ואף אחד מהם לא יכול להיעלם.

**`<noscript>` נוסף:** הדף גם טוען את גיליון הפונטים דרך `<noscript>` כדי שגולש בלי JS יקבל טיפוגרפיה תקינה.

### 8.3 כניסת ההירו

```css
.js .hero-in{opacity:0;transform:translateY(10px);animation:heroIn .55s var(--ease) both;animation-delay:calc(var(--i,0)*70ms)}
@keyframes heroIn{to{opacity:1;transform:none}}
```

```html
<p class="eyebrow hero-in" style="--i:0">
<span class="brand hero-in" style="--i:1">
<h1 class="hero-in" style="--i:2">
<figure class="hero-img hero-in" style="--i:3">
<p class="lead hero-in" style="--i:4">
<p class="hero-in" style="--i:5">
<div class="cta-wrap hero-in" style="--i:6">
<ul class="beli hero-in" style="--i:7">
```

ההירו לא מחכה לגלילה, הוא נכנס בטעינה. **stagger דרך משתנה CSS inline** (`--i`), 70 מילישניות לכל שלב, סך הכול 560 מילישניות לשמונת האלמנטים. `animation` ולא `transition`, כי אין כאן שינוי מחלקה.

**ה-`--i` עולה לפי הסדר בקובץ, תמיד.** כשמזיזים רכיב בהירו מזיזים איתו את המספר, אחרת האנימציה נכנסת בסדר אחד והעין קוראת בסדר אחר. ה-CTA מקבל 6 וה-`.beli` מקבל 7, כי הכפתור קודם.

### 8.4 משכי הזמן, כולם

| מה | משך |
|---|---|
| `.reveal` (מיכל) | 500ms |
| `.reveal > li` | 450ms |
| כניסת הירו | 550ms |
| hover של CTA | 180ms |
| `:active` של CTA | 80ms |
| hover של כפתור קרוסלה | 180ms |
| הטיית תמונת ההירו | 200ms |
| החלקת ה-CTA הדביק | 300ms |
| ספירת מספרים | 900ms |

הכול מתחת ל-300 מילישניות מלבד רכיבי כניסה לתצוגה, שמותר להם להיות איטיים יותר כי הם חד פעמיים וגדולים.

### 8.5 prefers-reduced-motion

```css
@media (prefers-reduced-motion:reduce){
  .js .reveal,.js .reveal>li{transform:none;transition:opacity .3s ease}
  .js .hero-in{transform:none;animation:heroIn .3s ease both;animation-delay:0s}
  .cta,.hero-img img{transition:none}
}
```

**העיקרון: fade נשאר, תזוזה נעלמת.** התוכן עדיין מופיע בעדינות, אבל אין `translateY`, אין stagger, ומשכי הזמן מתקצרים ל-300.

ב-JS, המשתנה נקרא פעם אחת בראש ומשמש בכל מקום:

```js
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

הוא מכבה את האובזרבר של reveal, את ספירת המספרים, את הטיית תמונת ההירו, והופך כל גלילה חלקה ל-`'auto'`.

### 8.6 גלילה חלקה ב-JS בלבד

```js
document.addEventListener('click', function(e){
  var a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return; var t = document.querySelector(a.getAttribute('href'));
  if (!t) return; e.preventDefault();
  t.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
  history.pushState(null,'',a.getAttribute('href'));
});
```

**אסור `scroll-behavior:smooth` על `html`.** זה שובר כל גלילה תוכניתית: כל `window.scrollTo` הופך לאנימציה שהקריאה הבאה קוטעת, שער ה-QA לא מצליח לגלול את הדף, ורכיבי `.reveal` נשארים שקופים. הגלילה החלקה חיה רק כאן, על קליקים בעוגן, ומכובדת ל-`auto` תחת reduced motion. הערה בקוד המקור אומרת זאת במפורש: `/* smooth anchors (JS only, never CSS) */`.

---

## 9. נגישות

מה בדף עושה נגישות בפועל, לא בהצהרה.

**סמנטיקה**
* `<html lang="he" dir="rtl">`.
* `<header class="sec dark deep hero">` להירו, `<main id="main">` לגוף, `<footer>` לפוטר, `<section>` לכל בלוק, `<article>` לכל כרטיס לקוח וכרטיס בקרוסלה, `<figure>` ו-`<figcaption>` לכל תמונה עם כיתוב, `<nav aria-label="מידע משפטי">` לקישורים בפוטר.
* `<ol class="chain">` כשיש סדר, `<ul>` כשאין.
* h1 אחד בדיוק. h2 לכל סקשן. h3 לכותרות כרטיס. אין דילוג בהיררכיה.

**alt**
44 תגיות `<img>` בדף, לכל אחת `alt` תיאורי ומפורט. דוגמה אמיתית:

```html
alt="קולאז' הודעות וואטסאפ מלקוחות: פי 3-4 על הכסף עם 140 אלף שקל מקורסים דיגיטליים, עקפנו את ה-300 להשקה, מעל 15 רכישות היום, 20,000 הכנסות מהקורס הראשון, כמעט 20 סליקות"
```

**ה-alt מספר מה כתוב בצילום המסך, לא "צילום מסך".** זה מה שהופך את ההוכחה לנגישה. **אסור להמציא alt.** חייבים לפתוח את התמונה ולקרוא מה כתוב בה. כל אייקון דקורטיבי מקבל `aria-hidden="true"`, וכל עוטף אייקון גם הוא (`<span class="x" aria-hidden="true">`, `<i aria-hidden="true">`).

**מיקוד**
```css
.cta:focus-visible{outline:3px solid #fff;outline-offset:3px}
.reel-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}
.a11y-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}
.a11y-grid button:focus-visible,.a11y-reset:focus-visible,.a11y-close:focus-visible{outline:3px solid #8F6E2E;outline-offset:2px}
.skip:focus{top:16px;outline:3px solid var(--gold)}
```
`:focus-visible` ולא `:focus`, `3px` ולא `1px`, ועם `outline-offset` כדי שהמסגרת לא תיגע בכפתור. לבן על כהה, זהב כהה על בהיר.

**קישור דילוג**
האלמנט הראשון ב-body, מוסתר ב-`top:-200px`, קופץ ל-`top:16px` ב-focus.

**aria**
* `aria-label` על 19 אלמנטים: כל רשימה בלי כותרת נראית (`aria-label="מספרים"`, `aria-label="בקצרה"`), כל קרוסלה, כל כפתור אייקון (`aria-label="ההודעה הקודמת"`), הודעת ההסכמה, הפאנל.
* `role="group"` על מוקאפ הצ'אט עם `aria-label` שמסביר מה רואים.
* `role="img"` עם `aria-label` על סלוט הווידאו, שהוא div ולא תמונה.
* `role="region"` על הודעת ההסכמה שבפוטר.
* `role="dialog" aria-modal="false"` על פאנל הנגישות (לא modal, כי הוא לא חוסם את הדף).
* `aria-expanded` ו-`aria-controls` על כפתור הנגישות, `aria-pressed` על כל מתג, ושניהם מתעדכנים ב-JS.
* `<bdi>` סביב מונח לטיני בתוך משפט עברי: `פגישת צמיחה אסטרטגית (<bdi>Growth Review</bdi> חודשי)`.
* `dir="ltr"` על תא עם מספר ומטבע: `<span class="n" dir="ltr">10M+ ₪</span>`.

**מידות מגע**
`.cta{min-height:60px}`, `.sticky .cta{min-height:56px}`, `.consent-note button{min-height:44px}`, `.a11y-btn{44x44}`, `.a11y-grid button{min-height:48px}`, `.a11y-close{44x44}`, `.reel-btn{46x46}`. אף אזור לחיצה לא מתחת ל-44.

**גודל טקסט**
הקטן ביותר בדף הוא `.9rem` שהוא כ-14.4 פיקסלים. **אין טקסט מתחת ל-14 פיקסלים, גם לא בתוך מוקאפ.** טקסט מוקאפ הוא לא חריג.

**מקלדת**
Escape סוגר את פאנל הנגישות, קליק בחוץ סוגר, המיקוד נכנס לפאנל בפתיחה וחוזר לכפתור בסגירה. כל כפתור הוא `<button type="button">` אמיתי, לא div.

**עברית**
* `text-align:center` על כל הדף, עם `text-align:right` מקומי רק ברשימות אייקון ובמוקאפ הצ'אט.
* **אפס `letter-spacing` על עברית, חיובי או שלילי.** grep מאמת אפס מופעים בדף.
* `margin-inline`, `padding-inline`, `border-inline-start`, `margin-inline-start` במקום left ו-right לוגיים.
* הכיוון ההפוך של הקרוסלה מטופל במפורש ב-JS.

---

## 10. ביצועים

### 10.1 טעינת הפונט הלא חוסמת, מדויק

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700;900&family=Heebo:wght@400;600;700;800;900&display=swap" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@700;900&family=Heebo:wght@400;600;700;800;900&display=swap"></noscript>
```

ארבע שורות, ולכל אחת תפקיד:
1. שני `preconnect`, אחד לגיליון ואחד לקבצי הפונט (`crossorigin` חובה על השני).
2. `rel="preload" as="style"` מוריד את הגיליון **בלי לחסום את הרינדור**, ו-`onload="this.rel='stylesheet'"` מחיל אותו כשהוא מוכן.
3. `<noscript>` עם `rel="stylesheet"` רגיל, כי בלי JS ה-onload לא ירוץ.
4. `display=swap` בסוף ה-URL.

**המעבר מ-`rel=stylesheet` רגיל למנגנון הזה הוריד FCP מ-728 ל-332 מילישניות ו-LCP מ-1000 ל-700.**

**מלכודת חובה לבדוק:** כל משקל שבשימוש ב-CSS חייב להיות ב-URL. אם יש `font-weight:600` בקוד אבל 600 חסר ברשימה, הדפדפן מסנתז אותו והוא נראה שגוי. בדף הזה: Heebo `400;600;700;800;900` ו-Frank Ruhl Libre `700;900`, בדיוק המשקלים שבשימוש.

### 10.2 תמונת ה-LCP

```html
<link rel="preload" as="image" href="assets/img/hero-dor.webp?v4"
      imagesrcset="assets/img/hero-dor-640.webp?v4 640w, assets/img/hero-dor.webp?v4 1200w"
      imagesizes="(max-width:680px) 100vw, 640px" fetchpriority="high">
```

```html
<img src="assets/img/hero-dor.webp?v4"
     srcset="assets/img/hero-dor-640.webp?v4 640w, assets/img/hero-dor.webp?v4 1200w"
     sizes="(max-width:680px) 100vw, 640px"
     alt="..." width="1200" height="675" fetchpriority="high" decoding="async">
```

ה-`preload` מכיל `imagesrcset` ו-`imagesizes` **זהים** ל-`srcset` ו-`sizes` שעל התגית, אחרת הדפדפן יוריד שתי תמונות. `fetchpriority="high"` בשני המקומות. אין `loading="lazy"` על תמונת ההירו.

### 10.3 שאר 43 התמונות

```html
<img src="..." alt="..." width="640" height="391" loading="lazy" decoding="async">
```

* **`loading="lazy"` על כל תמונה שאינה ההירו.** 43 מתוך 44.
* **`decoding="async"` על כל 44.**
* **`width` ו-`height` מסונכרנים למידות האמיתיות של כל קובץ.** ראה בקוד: `640x138`, `640x391`, `640x278`, `439x222`, `437x254`. **המידות שונות מתמונה לתמונה**, כי כל אחת נמדדה. זה מה שנותן CLS אפס.
* `height:auto` דרך הכלל הגלובלי, יחד עם ה-`width` המוצהר, כך שהדפדפן שומר מקום לפי היחס ואז נותן לתמונה להתאים לעצמה.
* כל התמונות ב-webp.
* `?v4` בסוף כל נתיב הוא cache busting ידני.

### 10.4 אפס תלויות חיצוניות

* **קובץ HTML אחד.** כל ה-CSS ב-`<style>` inline, כל ה-JS ב-`<script>` אחד בסוף ה-body.
* **בלי Tailwind CDN, בלי jQuery, בלי ספריית אנימציה.** הבקשות היחידות לצד שלישי הן גיליון הפונט וקבצי הפונט.
* **הגרעין הוא SVG inline** ב-data URI, לא קובץ.
* **כל האייקונים SVG inline**, לא ספריית אייקונים ולא פונט אייקונים.
* **סמן הנגישות הגדול** הוא SVG ב-data URI.
* Favicon אחד SVG.

### 10.5 כותרות מטא ו-og

```html
<title>Growth Partner | דור עמוס, dor digital</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://dor-growth-partner.vercel.app/assets/img/hero-dor.webp?v4">
<meta property="og:type" content="website">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
```

`og:image` **בכתובת מוחלטת**, כי פייסבוק ווואטסאפ לא פותרים נתיב יחסי.

### 10.6 מקום הפיקסל

```html
<!-- META PIXEL: אין עדיין מזהה פיקסל של dor digital. להוסיף כאן את קוד הפיקסל כשיש. -->
```

**אין פיקסל בדף הזה.** ההערה יושבת במקום המדויק שבו הוא נכנס, ואומרת מה חסר. זו הדרך הנכונה: מסמנים את החור ולא ממציאים מזהה.

### 10.7 כותרות מהשרת

`vercel.json` בשורש:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    { "source": "/assets/(.*)", "headers": [ { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" } ] },
    { "source": "/(.*)\\.html", "headers": [ { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" } ] }
  ]
}
```

נכסים לשנה ב-immutable (לכן ה-`?v4`), HTML בלי cache בכלל.

---

## 11. עמודי הלוואי

### 11.1 `legal.html`

עמוד אחד ממותג, 4 עוגנים, `<meta name="robots" content="noindex">`, גיליון CSS עצמאי וקטן שמשתמש באותה פלטה בגרסה מצומצמת:

```css
:root{--ink:#0B0F19;--ink-2:#121826;--gold:#C9A96E;--gold-deep:#8F6E2E;--ivory:#F7F2E9;--text:var(--text-l);--muted:#59627A;--soft:#AEB5C4}
```

**מבנה:**
* `<header class="topbar">` כהה עם `.brand` (עיגול זהב קטן, שם המותג).
* `<main class="wrap">` ברוחב 780px, `text-align` ברירת מחדל (**לא ממורכז**, כי זה טקסט משפטי ארוך).
* `h1` "מידע משפטי" ואחריה `.updated` עם השם המלא, ח.פ. ותאריך עדכון.
* `<nav class="toc" aria-label="ניווט מהיר">` עם ארבעה קישורים לעוגנים.
* ארבעה `h2` עם id: `#terms`, `#refunds`, `#privacy`, `#accessibility`, כל אחד עם `scroll-margin-top:1.5rem`.
* `.note` להבלטה, עם `border-inline-start:4px solid var(--gold)` ו-`border-radius:0 12px 12px 0` (לוגי ל-RTL).
* פוטר זהה לפוטר של הדף הראשי.

**מה חייב להיות בתוכן:**
* **תקנון:** מי אנחנו (שם מלא, ח.פ., מייל), מה השירות, קניין רוחני, **פסקת "עדויות ותוצאות" בתוך `.note`** שאומרת במפורש שהעדויות אמיתיות ומוצגות ברשות ו"אינן מהוות התחייבות לתוצאה עסקית כלשהי", שימוש הוגן, שינויים, דין וסמכות שיפוט.
* **ביטולים:** הפניה לחוק הגנת הצרכן, אופי ההתקשרות, איך מבטלים, לוח זמנים להחזר, ומה לא כלול (בדף הזה: תקציב הפרסום משולם ישירות לפלטפורמות).
* **פרטיות:** איזה מידע נאסף, למה, **רשימת כל צדדי ג' בשמם** (בדף הזה: WhatsApp, Meta Pixel, Vercel, Google Fonts), עוגיות ואחסון מקומי, אבטחה, זכויות לפי חוק הגנת הפרטיות.
* **נגישות:** WCAG 2.0 AA, רשימת מה נעשה בפועל, **מגבלות ידועות** (כאן: הפנייה עוברת דרך WhatsApp שרמת הנגישות שלו לא בשליטתנו), רכז נגישות בשם ובמייל, ותאריך עדכון ההצהרה.

**כלל ברזל:** מה שההצהרה אומרת חייב להיות נכון בקוד. אם מדיניות הפרטיות מצהירה שיש פיקסל, או שמתקינים פיקסל או שמוחקים את השורה.

### 11.2 `404.html`

עמוד עצמאי לחלוטין, 50 שורות, בלי הגיליון הראשי:

```css
body{
  font-family:'Heebo',-apple-system,'Segoe UI',Arial,sans-serif;
  background:#0B0F19;color:#fff;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:2rem 1.35rem;line-height:1.7;-webkit-font-smoothing:antialiased;
}
.code{font-family:'Frank Ruhl Libre',Georgia,serif;font-size:clamp(3.4rem,14vw,5.5rem);font-weight:900;color:#E9CC82;line-height:1}
.btn{
  display:inline-block;background:linear-gradient(135deg,#D8B56F,#EFD68F 45%,#C9A251);
  color:#1A1408;font-weight:900;font-size:1.05rem;padding:16px 40px;border-radius:14px;text-decoration:none;
  box-shadow:0 14px 40px -10px rgba(var(--gold-rgb),.45);min-height:44px;
}
```

```html
<a class="brand" href="/"><i></i><b>dor digital</b><span>· דור עמוס</span></a>
<p class="code">404</p>
<h1>הדף שחיפשת לא נמצא</h1>
<p>יכול להיות שהקישור השתנה, או שנפלה טעות בכתובת. בוא נחזיר אותך למקום הנכון.</p>
<a class="btn" href="/">חזרה לעמוד הראשי</a>
<p class="links"><a href="/legal.html#terms">תקנון</a>·<a href="/legal.html#privacy">פרטיות</a>·<a href="mailto:amosdor2@gmail.com">יצירת קשר</a></p>
```

ממורכז אנכית עם flex ו-`min-height:100vh`, `robots noindex`, כפתור זהב אחד חזרה לבית, וקישורים משפטיים בתחתית. **כל הנתיבים בעמוד הזה מוחלטים** (`/legal.html`), כי הוא נטען מכל כתובת שגויה באתר.

---

## 12. רשימת האיסורים כצ'קליסט בדיק

כל שורה כאן ניתנת לאימות עם grep או עם שער ה-QA. הערכים בטור "בדף הזה" נמדדו בפועל.

| # | איסור | איך בודקים | בדף הזה |
|---|---|---|---|
| 1 | **אפס מקפים ארוכים** (em dash, en dash) בכל קובץ. משתמשים בפסיק, בנקודה או בסוגריים | `perl -CSD -ne 'print "$ARGV:$.: $_" if /[\x{2014}\x{2013}]/' index.html` (בקודי יוניקוד, כדי שהפקודה עצמה לא תכיל את התו. perl ולא `grep -P`, שלא קיים ב-grep של macOS ומחזיר `invalid option -- P`. שקט הוא מעבר, כל שורה שמודפסת היא כשל. את `legal.html` ו-`404.html` מוסיפים לפקודה רק אחרי ש-`/lp-legal` יצר אותם) | אפס מופעים בשלושת הקבצים |
| 2 | **אפס `<hr>`** | `grep -c '<hr' index.html` | `0` |
| 3 | **אפס קווים דקורטיביים מתפוגגים.** בלי `linear-gradient(90deg, transparent...)`, בלי GoldDivider, בלי קו מתחת לקיקר, בלי קווים משני צדי כותרת ממורכזת. קו שמתפוגג בקצוות הוא הסימן המובהק ביותר לדף AI | `grep -c '90deg' index.html` | `0` |
| 4 | **אפס `letter-spacing` על עברית**, חיובי או שלילי | `grep -c 'letter-spacing' index.html` | `0` |
| 5 | **אפס גרדיאנט טקסט.** הזהב אחיד. בלי `background-clip:text` | `grep -c 'background-clip' index.html` | `0` |
| 6 | **אפס `addEventListener('scroll')`.** IntersectionObserver בלבד | `grep -c "addEventListener('scroll'" index.html` | `0` |
| 7 | **`overflow-x:hidden` על `html`, לא על `body`** | לאמת ש-`body{...}` לא מכיל overflow | `html{overflow-x:hidden}` |
| 8 | **`[hidden]{display:none!important}` גלובלי קיים** | `grep '\[hidden\]' index.html` | קיים |
| 9 | **לא לכתוב `textContent` על אלמנט שיש לו ילדים אלמנטיים.** בטופס רב מסר זה מוחק את כפתור השליחה בשקט | סקירת כל JS שנוגע ב-`textContent`. הדרך הבטוחה: `if (b.children.length) return;` | השימוש היחיד הוא על `.stats .n` ו-`.tiles .n`, שהם עלים |
| 10 | **`height:auto` תמיד כשקובעים `width`** | `img{max-width:100%;height:auto}` גלובלי, ובכל `<img>` גם `width` וגם `height` אמיתיים | 44 מתוך 44 |
| 11 | **אפס `scroll-behavior:smooth` ב-CSS** | `grep -c 'scroll-behavior' index.html` יחזיר 1 בלבד, בתוך `a11y-motion` עם `auto` | הגלילה החלקה ב-JS |
| 12 | **בלי `.reveal{opacity:0}` ללא גארד `.js`** | לאמת `<script>document.documentElement.classList.add('js')</script>` ב-head וש-כל כלל ההסתרה מתחיל ב-`.js ` | קיים, וגם timeout של 2500 |
| 13 | **בלי טקסט מתחת ל-14px. אין חריג.** כולל הוק, קיקר, אותיות קטנות, כיתובי תמונה וטקסט בתוך מוקאפים. גם `fitHook` חייב רצפה של 14px בקוד | שער ה-QA, ועוד `grep -o 'font-size:clamp([0-9.]*px' index.html` שכל ערך שהוא מחזיר חייב להיות 14px או יותר (רק `font-size`, כי `clamp` על `padding` מותר לו להיות קטן) | הקטן הוא `.9rem` (14.4px), וה-`.eyebrow` הוא `clamp(14px,3.4vw,1.1rem)` |
| 14 | **בלי אזור לחיצה מתחת ל-44px** | שער ה-QA | הקטן הוא 44 |
| 15 | **בלי מילה בודדת בשורה** (כותרות, פסקאות **וגם `summary`**) | שער ה-QA על 6 רוחבים. הפתרון: `text-wrap:balance` על כותרות ועל `.faq summary` ו-`.faq .ans`, `pretty` על גוף, `.lg` במקום `<br>`, ו-`&nbsp;` כתיקון נקודתי | `grep -c 'faq summary{text-wrap:balance' index.html` |
| 16 | **בלי גלישה אופקית** בשום רוחב | שער ה-QA על 320/360/390/430/768/1280 | |
| 17 | **בלי `<img>` בלי `width`+`height`** | שער ה-QA | |
| 18 | **בלי hover בלי `(hover:hover) and (pointer:fine)`** | `grep 'hover' index.html` ולוודא שכל אחד עטוף | 3 מתוך 3 |
| 19 | **בלי אמוג'י כאייקון.** SVG קו מספרייה | סקירה ויזואלית | כל האייקונים SVG inline |
| 20 | **בלי גבול זהב על גבול מבני.** שורות בטבלה ומסגרות כרטיס בצבע ניטרלי שקוף. זהב רק על מסגרת שהיא הצהרה (`.ledger.new`, `.deliv.bonus`, `.vslot`) | סקירה | |
| 21 | **בלי להמציא alt, כיתוב, עדות, מספר או פרט עסק.** פותחים את התמונה וקוראים מה כתוב בה. מה שחסר מסומן `[למלא]` | סקירה אנושית | |
| 22 | **בלי לרדוף אחרי גרדיאנטים והילות צבעוניות.** הצללים ניטרליים, `rgba(0,0,0,...)` | `grep 'box-shadow' index.html` | כל הצללים שחורים שקופים |
| 23 | **בלי סלוט ריק כשאין נכס.** או סלוט מוצהר שאומר מה יהיה שם (כמו `.vslot`), או הירו מוביל טיפוגרפיה בלי סלוטים בכלל. לא placeholder מומצא | סקירה | |
| 24 | **בלי להוסיף סקשנים שהקופי לא ביקש.** אורך הדף שווה לאורך הקופי | השוואה ל-`copy.md` | 11 בלוקים |
| 25 | **בלי סקשן ריק.** בריף שמסמן `הוכחות: אין` או `סיפור אישי: אין` או `בונוסים: אין` מוביל למחיקת הסקשן, לא לסקשן עם מסגרת מקווקוות שמודה שאין תוכן. **גובר גם על קופי שהגיע עם סקשן הוכחות ריק** | השוואה ל-`brief.md`, וסקירה ויזואלית | |
| 26 | **בלי `[למלא]` חשוף.** כל `[למלא]` שמוצג בדף עטוף ב-`.fill`, אף אחד מהם לא בתוך `<strong>`, אף אחד לא יורש את גודל הגופן של האלמנט המארח, **ואין `opacity` על `.fill` בשום ערך** | `perl -ne 's{<span class="fill">\[למלא[^]]*\]</span>}{}g; print "$.: $_" if /\[למלא/' index.html` (מנקה את העטופים ומדפיס את מה שנשאר חשוף) | |
| 27 | **בלי `white-space:nowrap` על `.brand`.** הקיקר העברי `[שם], [תואר], מגלה:` גולש ב-320px | `grep -n 'brand{' index.html` ולאמת שאין `nowrap` | `text-wrap:balance` |
| 28 | **בלי שורה בראש הדף שמצביעה על קובץ שלא קיים.** במצב "אין נכסים" אין `preload as=image` ואין `assets/favicon.svg`, אלא פייביקון data-URI inline | `perl -ne 'while (/"(assets\/[^"]+)"/g) { print "חסר: $1\n" unless -e $1 }' index.html` | אפס 404 בקונסול |
| 29 | **בלי רכיב בסקשן שהוא לא חוקי בו.** `.deliv`/`.fit` בסקשן כהה יוצאים אפור בהיר על לבן, `.ledger`/`.chain`/`.faq` בסקשן בהיר יוצאים לבן על קרם | טבלת 6.32, ואז **לפתוח את הדף ולהסתכל.** גריפ לא רואה את זה | |
| 30 | **בלי טופס ששותק בשקט.** טופס בלי קוד הטמעה מקבל שדות אמיתיים, `disabled` על הכפתור, `preventDefault` על ה-submit ושורת `.pending` דיסקרטית מתחת לטופס ("הטופס יחובר בשלב הבא"), לא קופסת אזהרה צבועה בתוכו | `grep -c 'class="pending"' index.html` יחזיר 1 לכל טופס שטרם חובר | |

| 31 | **בלי `filter` על `body` או על `html`.** `filter` על אב הופך אותו לבלוק מכיל של כל `position:fixed`, והפס הדביק וכפתור הנגישות עפים מהמסך. מצבי `a11y-gray` ו-`a11y-invert` מחילים `filter` על `header.hero`, `main`, `footer`, `.sticky`, `.a11y-btn` ו-`.a11y-panel`, ומחליפים ל-`body` **רק `background-color`** | `grep -o 'html\.a11y-\(invert\|gray\)[^{]*body[^{]*{filter' index.html` חייב לחזור ריק, ו-`grep -c 'a11y-gray .a11y-btn' index.html` לפחות 1 | |
| 32 | **בלי CTA מתחת לקו הקיפול.** מתחת ל-720px ה-CTA הראשון בהירו נמצא בתוך 640 הפיקסלים הראשונים. הדרך הראשונה: `.beli` אחרי הכפתור | `getBoundingClientRect().top` של ה-CTA ב-390x844, 320 ו-360. ערך מעל 640 הוא כשל | |
| 33 | **בלי אלמנט צף שאינו נעוץ לקצה התחתון.** הודעת ההסכמה יושבת בזרימה בתוך הפוטר. הפס הדביק וכפתור הנגישות נעוצים ל-`bottom:0`, וגובהם שמור ב-`--dock` | `grep -c 'position:fixed' index.html` ולוודא ידנית שכל מופע הוא `.skip`, `.sticky`, `.a11y-btn`, `.a11y-panel` או `body::before`. ועוד: `grep -c 'has-cookiebar' index.html` חייב להחזיר `0` | |
| 34 | **בלי גובה מסמך שזז אחרי הפריסה הראשונה.** אין כלל שמוסיף `padding` כשמחלקה נדלקת, ואין אלמנט שעובר מ-`display:none` ל-גלוי בתוך הזרימה | שער הצפים: `node floaters-qa.mjs` על שש רחבויות. הבדיקה הראשונה שלו משווה `scrollHeight` לפני ואחרי שכל הצפים נדלקים | |
| 35 | **בלי כיסוי של טקסט, קישור או אייקון בתחתית המסמך.** אחרי מקש End מטעינה נקייה, `gapToBottom` הוא 0 ואפס אלמנטים מכוסים, בכל אחת משש הרחבויות | שער הצפים, שלב "End מטעינה נקייה" | |

### שער ה-QA

```bash
node landing-qa.mjs "file:///נתיב/מלא/index.html"
npx -y impeccable@latest detect <url>
```

`landing-qa.mjs` בודק 11 בדיקות על 6 רוחבים ומדפיס `RESULT: PASS` או `FAIL`. שלושת הקבצים (`landing-qa.mjs`, `orphanLines.mjs`, `visibleBox.mjs`) נוסעים יחד. חייב `file://` מלא, נתיב יחסי לא עובד.

### שער הצפים: `floaters-qa.mjs`

`landing-qa.mjs` בודק את הפריסה. **הוא לא בודק מה מכסה מה, והוא לא בודק שגובה המסמך לא זז.** שני הפערים האלה הם שהחביאו את הבאג של באנר העוגיות שלושה סבבים, כי **לולאת הגלילה של `landing-qa.mjs` מייצבת את הפריסה לפני שהיא מודדת**, ואחרי הייצוב הגובה כבר לא זז והכיסוי כבר לא קיים. לכן יש שער שני, קטן, שרץ אחריו:

```bash
node floaters-qa.mjs "file://$PWD/index.html" 320,360,390,430,768,1280
```

```js
// floaters-qa.mjs
import { chromium } from 'playwright';

const probe = () => {
  const clamp = r => ({left:Math.max(0,r.left),right:Math.min(innerWidth,r.right),top:Math.max(0,r.top),bottom:Math.min(innerHeight,r.bottom)});
  const area = r => Math.max(0,r.right-r.left)*Math.max(0,r.bottom-r.top);
  const floats = [...document.querySelectorAll('body *')].filter(e=>{
    const cs=getComputedStyle(e);
    if(cs.position!=='fixed'||cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) return false;
    return area(clamp(e.getBoundingClientRect()))>100;
  }).map(e=>{const r=clamp(e.getBoundingClientRect());
    return {r,name:(e.id||String(e.className).split(' ')[0]||e.tagName),docked:Math.abs(r.bottom-innerHeight)<=1};});
  const inFixed = n => { for(let e=n.nodeType===1?n:n.parentElement;e;e=e.parentElement){ if(getComputedStyle(e).position==='fixed') return true; } return false; };
  const cands=[]; const push=(kind,rect,txt,tag)=>{ if(rect.width>1&&rect.height>1) cands.push({kind,rect,txt,tag}); };
  const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let t;
  while((t=tw.nextNode())){
    if(!t.textContent.trim()||inFixed(t)) continue;
    const host=t.parentElement; if(!host||!host.offsetParent) continue;
    const rg=document.createRange(); rg.selectNodeContents(t);
    for(const r of rg.getClientRects()) push('טקסט',r,t.textContent.trim().slice(0,32),host.tagName.toLowerCase());
  }
  for(const el of document.querySelectorAll('a,button,summary,input,select,textarea')){
    if(inFixed(el)||!el.offsetParent) continue;
    push('פקד',el.getBoundingClientRect(),(el.textContent||el.name||'').trim().slice(0,32),el.tagName.toLowerCase());
  }
  for(const el of document.querySelectorAll('svg,img')){
    if(inFixed(el)||!el.offsetParent) continue;
    push('סמל',el.getBoundingClientRect(),(el.getAttribute('alt')||el.getAttribute('aria-label')||'').slice(0,32),el.tagName.toLowerCase());
  }
  const hits=[]; const seen=new Set();
  for(const f of floats) for(const c of cands){
    const i={left:Math.max(f.r.left,c.rect.left),right:Math.min(f.r.right,c.rect.right),
             top:Math.max(f.r.top,c.rect.top),bottom:Math.min(f.r.bottom,c.rect.bottom)};
    if(area(i)<9) continue;
    const h={by:f.name,docked:f.docked,kind:c.kind,tag:c.tag,txt:c.txt,
             w:Math.round(i.right-i.left),h:Math.round(i.bottom-i.top)};
    const k=JSON.stringify(h); if(seen.has(k))continue; seen.add(k); hits.push(h);
  }
  return {hits, floats:floats.map(f=>`${f.name}${f.docked?'(נעוץ)':'(צף)'} top:${Math.round(f.r.top)}`),
          gap: Math.round(document.documentElement.scrollHeight - Math.round(window.scrollY) - innerHeight)};
};

const url=process.argv[2]; const widths=(process.argv[3]||'320,360,390,430,768,1280').split(',').map(Number);
const b=await chromium.launch(); let fails=0;
const say=(ok,msg)=>{ if(!ok) fails++; console.log((ok?'OK   ':'FAIL ')+msg); };
for(const w of widths){
  const ctx=await b.newContext({viewport:{width:w,height:844}});
  const fresh=async()=>{const p=await ctx.newPage(); await p.goto(url,{waitUntil:'load'}); await p.waitForTimeout(400); return p;};
  /* 1. גובה המסמך לא זז כשכל מה שיכול לצוף נדלק */
  const p=await fresh();
  const h0=await p.evaluate(()=>document.documentElement.scrollHeight);
  const h1=await p.evaluate(()=>{
    const s=document.getElementById('sticky'); if(s)s.classList.add('show');
    const c=document.getElementById('cookie'); if(c&&c.hidden){c.hidden=false;document.body.classList.add('has-cookiebar');}
    return document.documentElement.scrollHeight;});
  say(h0===h1,`${w}px גובה המסמך ${h0===h1?'קבוע ('+h0+')':'זז ב-'+(h1-h0)+'px'}`);
  await p.close();
  /* 2. כיסוי בשלוש נקודות, כל אחת מטעינה נקייה */
  const phases=[
    ['טעינה', async()=>await fresh(), 'mid'],
    ['אמצע',  async()=>{const q=await fresh(); await q.evaluate(()=>{
        const t=document.getElementById('fit')||document.getElementById('offer');
        if(t) t.scrollIntoView({block:'center'}); else window.scrollTo(0,document.documentElement.scrollHeight/2);
      }); await q.waitForTimeout(600); return q;}, 'mid'],
    ['End מטעינה נקייה', async()=>{const q=await fresh(); await q.keyboard.press('End'); await q.waitForTimeout(900); return q;}, 'end'],
  ];
  for(const [name,open,mode] of phases){
    const q=await open(); const r=await q.evaluate(probe); await q.close();
    if(mode==='end') say(r.gap===0, `${w}px ${name} gapToBottom=${r.gap}`);
    const hard=r.hits.filter(h=>mode==='end' ? true : (!h.docked || h.kind==='פקד'));
    say(hard.length===0, `${w}px ${name} ${hard.length?'כיסוי '+hard.length+' פריטים':'אפס כיסוי'} | ${r.floats.join(', ')||'אין צפים'}`);
    hard.slice(0,6).forEach(h=>console.log(`       ${h.by} מכסה ${h.w}x${h.h}px ${h.kind} <${h.tag}> "${h.txt}"`));
    /* דיווח רך: מה שהנעוצים גוזרים באמצע המסמך. לא מפיל, אבל צריך לראות אותו */
    r.hits.filter(h=>!hard.includes(h)).slice(0,3)
      .forEach(h=>console.log(`  note  ${h.by} (נעוץ) מכסה ${h.w}x${h.h}px ${h.kind} <${h.tag}> "${h.txt}"`));
  }
  await ctx.close();
}
await b.close(); console.log(fails?`\nFAIL ${fails}`:'\nPASS');
process.exit(fails?1:0);
```

**שלוש החלטות בשער הזה שהן כל הערך שלו:**

1. **כל שלב נמדד מטעינה נקייה, בעמוד חדש, בלי גלילה מקדימה ובלי `reload`.** זה קריטי. בגרסה ראשונה של השער השלב האחרון רץ אחרי `reload` על אותו עמוד, הדפדפן שיחזר את מיקום הגלילה, הבאנר נדלק לפני המדידה, גובה המסמך התייצב, **והשער החזיר PASS על בדיוק הבאג שהוא נכתב לתפוס.** מדידה שמתחילה ממצב מיוצב לא מודדת את מה שהקוראת חווה.
2. **מקש End, לא `scrollTo`.** End הוא מה שקורה בפועל: קפיצה אחת לתחתית, ואז האלמנט הצף נדלק ומגדיל את המסמך מתחת לקוראת. `scrollTo(0, 1e7)` אחרי שהמסמך כבר גדל מגיע לתחתית האמיתית ומחמיץ את הפער.
3. **מי שנעוץ לקצה התחתון פטור מכיסוי טקסט באמצע המסמך, אבל לא מכיסוי פקד ולא בתחתית.** זו ההגדרה המדויקת של "חוקי": אלמנט שנעוץ ל-`bottom:0` מכסה פס צפוי בקצה המסך שהקוראת גוללת ממנו והלאה, וגובהו שמור בסוף המסמך, ולכן אין שום תוכן שאי אפשר להגיע אליו. אלמנט שצף באוויר מכסה פס באמצע המסך, וזה נכשל תמיד.

**מה השער מדפיס כ-`note` ולא כ-FAIL:** מה שאלמנט נעוץ גוזר מטקסט באמצע המסמך. נמדד על הדף החדש: הפס הדביק גוזר 19 פיקסלים מפסקה שעוברת מתחתיו, וכפתור הנגישות גוזר עד 21x27 פיקסלים מקצה שורה ב-430. **זה מותר, כי בקצה התחתון זה צפוי, התוכן נגלל ממנו והלאה, ובסוף המסמך הגובה שמור.** כיסוי של קישור, כפתור או שדה, לעומת זאת, מפיל את השער גם כשהוא בא מאלמנט נעוץ.

**מה השער הזה תפס בפועל, על דף שנבנה לפי הנוסחה הקודמת:** גובה מסמך שזז ב-148 פיקסלים ב-320, 360, 390 ו-430; `gapToBottom=148` אחרי End ב-390; כיסוי של ארבעת הקישורים המשפטיים ושורת הזכויות באותו רגע; כיסוי קבוע של שורת הזכויות ב-768 וב-1280; וכיסוי של פריט ברשימת ההתאמה ושל כותרת הסגירה באמצע הדף. **אחרי המעבר להודעה בזרימה ולשכבת עגינה אחת: PASS על כל שש הרחבויות, ועוד על 721, 860, 879, 880, 900 ו-1024.**

### שני השערים רצים אחרי כל תיקון

**ומריצים אותו שוב אחרי כל שינוי גודל גופן.** זו לא בדיקה אופציונלית. בסבב אחד הגדלנו טקסט בתוך מוקאפ מ-11px ל-14px כדי לעבור `smalltext`, ההגדלה עברה, **והגופן הגדול האריך שורות וייצר שני כשלי `orphans` חדשים ב-360, 390 ו-430 שלא היו קיימים לפני התיקון.** אותו דבר קורה בשינוי `line-height`, `padding`, `max-width`, החלפת פונט, הזזת רכיב בין סקשן כהה לבהיר או הוספת מילה לכותרת. **כל דבר שמשנה את רוחב השורה הזמין מחייב הרצה חדשה על כל ששת הרוחבים, וגם אחרי התיקון האחרון.**

---

## 13. סדר הקובץ: שלד להעתקה

זה הסדר המדויק בדף, והוא גם הסדר הנכון לכתיבה:

```
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  charset, viewport
  title, description
  og:title, og:description, og:image (מוחלט), og:type
  favicon
  <script>document.documentElement.classList.add('js')</script>   ← לפני כל דבר אחר
  preconnect x2
  preload as=image לתמונת ההירו (עם imagesrcset + imagesizes + fetchpriority)
  preload as=style לפונט + onload
  <noscript> לפונט
  הערת מקום הפיקסל
  <style>
    :root                     טוקנים
    reset + html + body       בסיס
    [hidden], img, a, strong  גלובלי
    h1,h2,h3 + p,li           text-wrap
    .sec / .dark / .light     דקדוק הסקשנים + body::before
    טיפוגרפיה                 h1..h3, .g, .lead, .big, .gold-line, .eyebrow, .brand, .fill
    .cta                      CTA + .consent
    הירו                      .hero, .hero-img, .proofs, .portrait, .beli, .stats
    מוקאפים                   .chat, .bub
    רשימות                    .chips, .quotes, .silos, .compare, .chain, .fit
    about                     .about-img, .tiles, .ic
    הצעה                      .product, .deliv
    תמחור                     .ledger, .note
    הוכחות                    .feat, .shot, .reel
    טופס ו-FAQ                .formbox, .pending, .faq (רק אם הקופי ביקש)
    כרטיסי לקוח               .cases, .case, .vslot
    סגירה                     .sig
    footer                    כולל .consent-note
    .sticky + .a11y-btn         שכבת העגינה: --dock והשריון בפוטר
    נגישות                    .skip, .a11y-*, 11 המצבים
    .reveal + .hero-in + prefers-reduced-motion
    media queries             720 / 640 / 400
  </style>
</head>
<body>
  <a class="skip" href="#main">
  <header class="sec dark deep hero">   ← ההירו הוא header, לא section
  <main id="main">
    ...הסקשנים...
  </main>
  <footer>                              ← בתוכו: .brand, .consent-note, nav משפטי, שורת זכויות
  <div class="sticky" id="sticky">
  <button class="a11y-btn"> + <div class="a11y-panel" hidden>
  <script>
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    reveal (IO + timeout 2500)
    smooth anchors
    fitHook
    sticky (IO על ההירו)
    count up (IO)
    hero tilt (pointermove)
    consent note (שש שורות, בלי observer)
    reel arrows
    a11y widget (IIFE)
  </script>
</body>
</html>
```

**שתי שורות בראש הזה תלויות בנכסים:** `favicon` ו-`preload as=image`. כשאין תמונת הירו, שורת ה-preload **נמחקת** (preload לקובץ שלא קיים הוא 404 בקונסול, וגם אזהרת "preloaded but not used"). כשאין לוגו, הפייביקון הוא data-URI inline ולא `assets/favicon.svg`. הקוד המלא בסקיל, בשלב ד. **אין שורה בראש הדף שמצביעה על קובץ שלא קיים בתיקייה.**

**ה-CSS מסודר לפי מסלול הקריאה של הדף**, לא לפי אלפבית. מי שקורא את הגיליון מלמעלה למטה עובר על הדף מלמעלה למטה. זה מה שמאפשר לתחזק 400 שורות CSS בקובץ אחד.

---

## 14. סיכום המערכת בעשר שורות

1. שלושה טוקני רקע כהה, שני בהירים, שלוש דרגות טקסט לכל צד, שני רדיוסים ועוד צ'יפ, easing אחד.
2. סריף למספרים ולרגש, סנס לקריאה ולממשק. שני פונטים, לא שלושה.
3. הזהב תמיד אחיד, ומחליף בין `--gold-2` על כהה ל-`--gold-deep` על בהיר דרך מחלקת הסקשן.
4. כהה ובהיר מתחלפים לאורך כל הדף. אין מפרידים, יש שינוי רקע וריווח.
5. עמודה אחת ממורכזת, דסקטופ שווה מובייל, `min()` ו-`clamp()` במקום breakpoints.
6. `overlay` גרעין אחד קבוע ב-7 אחוז הופך שחור לנייר.
7. כל תנועה היא `opacity` ו-`transform` דרך IntersectionObserver, עם רשת ביטחון של 2500 מילישניות.
8. תמונה אחת eager עם preload מקביל, 43 lazy, כולן עם width ו-height אמיתיים.
9. הנגישות היא קוד: 44 alt, focus-visible של 3px, קישור דילוג, aria שמתעדכן, ו-11 מצבים שמחליפים טוקנים.
10. קובץ אחד. אפס תלויות. אפס מקפים ארוכים. אפס קווים.
