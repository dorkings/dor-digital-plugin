---
name: lp-connect
description: "Wire an existing Hebrew landing page to Meta Pixel (PageView + Lead), a Rav Messer (ravpage) mailing list form with a styled fallback, and a consent line, then verify end to end that the form really submits. Use when the user wants to connect tracking or a lead form to a page. English triggers: connect pixel, add meta pixel, install facebook pixel, embed signup form, mailing list form, connect lead form, form not submitting, consent line. Hebrew triggers: חבר פיקסל, להוסיף פיקסל מטא, פיקסל פייסבוק, לחבר טופס, טופס רב מסר, רב מסר, רשימת דיוור, הטמעת טופס, שורת הסכמה, הטופס לא נשלח, לחבר את הדף, /lp-connect."
version: 1.0.0
---

# lp-connect: חיבור הדף לפיקסל, לטופס ולשורת ההסכמה

אתה מחבר דף נחיתה קיים לשלושה דברים: **פיקסל מטא**, **טופס רשימת דיוור (רב מסר)** ו**שורת הסכמה**.
בסוף אתה **מאמת בפועל שהטופס נשלח**, לא רק שהוא נראה טוב.

## חוקי הפעלה (מעל הכול)

1. **לא לעצור ולא לשאול שאלות.** זה שלב בתוך צינור שרץ אחרי שהמשתמש כבר ענה על שאלון. כל מה שחסר מקבל `[למלא]` והעבודה ממשיכה.
2. **לא להמציא כלום.** לא מזהה פיקסל, לא קוד הטמעה, לא מזהה רשימה, לא alt, לא פרטי עסק.
3. **דרישת קדם חסרה לא מפילה את הסקיל.** אין כרום זמין? מדווח בעברית מה לא אומת ונותן למשתמש צ'קליסט של 4 צעדים. ממשיך.
4. **אפס מקפים ארוכים** בכל טקסט וקוד שאתה כותב לדף ולדיווח. פסיק, נקודה או סוגריים.
5. מדווח התקדמות בעברית פשוטה, שורה לכל שלב. בעל העסק קורא את זה, לא מפתח.
6. **אף פעם לא כותב `textContent` על אלמנט שיש לו ילדים אלמנטיים.** ראה את המלכודת הקריטית בסעיף 3.4. זו השגיאה שהרגה שליחה שלמה בעבר.

## שלב 0: אוסף קלט בלי לשאול

חפש בסדר הזה ועצור ברגע שמצאת:

| מה | איפה לחפש |
|---|---|
| נתיב הדף | ארגומנט הפקודה, אחרת `index.html` בתיקייה הנוכחית, אחרת החיפוש `find . -maxdepth 2 -name index.html` |
| מזהה פיקסל | ארגומנט (רצף של 15 או 16 ספרות), `brief.md`, `connect.txt` |
| קוד הטמעה של רב מסר | ארגומנט (מכיל `ravpage.co.il`), `brief.md`, `connect.txt` |
| טקסט כפתור ההנעה | `copy.md`, אחרת הכפתור הראשי שכבר בדף |

בדוק מה כבר קיים בדף לפני שאתה מוסיף, כדי לא לשתול פיקסל פעמיים:

```bash
grep -n "fbq('init'\|rm-slot\|ravpage\|class=\"consent" index.html
```

גבה את הדף לפני שינוי, והוצא את הגיבוי מהפרסום:

```bash
cp index.html index.html.bak-$(date +%Y%m%d)
grep -q 'bak-' .vercelignore 2>/dev/null || echo '*.bak-*' >> .vercelignore
```

---

## 1. פיקסל מטא

### 1.1 איפה בעל העסק משיג את המזהה

תן לו בדיוק את הצעדים האלה (בעברית, בהודעה שלך):

1. נכנסים ל-`business.facebook.com/events_manager2`.
2. בתפריט הימני לוחצים על **מקורות נתונים**.
3. בוחרים את הפיקסל של העסק מהרשימה.
4. **מזהה הפיקסל** הוא המספר שמופיע מתחת לשם, רצף של 15 או 16 ספרות. מעתיקים אותו.
5. אין פיקסל בחשבון? **מקורות נתונים** ואז **חיבור מקורות נתונים** ואז **אתר אינטרנט**, נותנים שם ומקבלים מזהה חדש.

מה שנחוץ הוא **המזהה בלבד**. את קוד הפיקסל אתה כותב, לא הוא.

### 1.2 איפה בדיוק בקוד: תלוי אם יש בדף שער הסכמה

**קודם בודקים, לפני שכותבים שורה אחת:**

```bash
grep -c "loadTracking" index.html
```

**החזיר 0, אין שער הסכמה בדף:** הקוד הבסיסי נכנס **בתוך `<head>`, בשורה שלפני `</head>`**, וה-`noscript` צמוד אליו מיד אחריו. כך `PageView` יורה גם אם הדף נטען לאט. זה המצב שמתואר בהמשך הסעיף.

**החזיר 1 ומעלה, כלומר `/lp-legal` כבר בנה שער הסכמה:** הקוד הבסיסי נכנס **רק לתוך `loadTracking`, ולא ב-`head`**. זו דרישה של `lp-legal` ולא העדפה: שער שנטען לפני האישור הוא כפתור דחייה שלא עושה כלום, וזו הצהרה לא נכונה במסמך משפטי. ה-`noscript` **יורד לגמרי** במצב הזה, כי הוא יורה בלי תלות באישור.

**ובאותה הרצה, שלוש פעולות חובה שנכנסות גם לדיווח הסופי:**
1. מחליפים את נוסח ההודעה מנוסח א ("אין בדף מעקב") לנוסח ב ("כלי המדידה נטענים רק אם תאשרי"), לפי סעיף 6.1 של `lp-legal`.
2. מוסיפים את כפתור הדחייה (`id="cookie-no"`) ואת ה-JS של מצב ב.
3. מעדכנים את שלושת מקומות ההצהרה על מדידה: מדיניות הפרטיות, הצהרת הנגישות וכתב הוויתור (סעיף 2.1 של `lp-legal`).

**לאמת אחרי השינוי:** `grep -n "fbq(\|gtag(\|connect.facebook.net" index.html` וכל מופע חייב לשבת בתוך `loadTracking`.

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none" alt=""
src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1" /></noscript>
<!-- End Meta Pixel Code -->
```

חובה בקוד הזה:
- `alt=""` על תמונת הפיקסל ב-`noscript`. תמונה נסתרת בלי alt נופלת בצ'קליסט הנגישות.
- להחליף את **שני** המופעים של `PIXEL_ID`, גם ב-`init` וגם ב-`noscript`.
- לא להוסיף `async` או `defer` לסקריפט הזה.

### 1.3 אין מזהה פיקסל

**לא ממציא מספר ולא משאיר את הדף בלי סימן.** שותל את הבלוק עם `[למלא]` במקום המזהה, ומנטרל אותו כהערה כדי שהדף לא ישבור:

```html
<!-- Meta Pixel: חסר מזהה פיקסל. [למלא: מזהה פיקסל מטא, 15 עד 16 ספרות]
     כשיש מזהה: מבטלים את ההערה ומחליפים את שתי המופעים של PIXEL_ID למטה. -->
```

ורושם את זה בדיווח הסופי תחת "מה נשאר לך".

### 1.4 אירוע Lead בשליחת טופס

`PageView` לבד לא מספיק. מטא צריכה לדעת מי השאיר פרטים, אחרת אי אפשר לבנות קהלים או לייעל לפי לידים.
הטופס של רב מסר מנווט לעמוד אחר בשליחה, לכן האירוע נורה על **הקליקה**, בשלב ה-capture, לפני שהדפדפן עוזב את הדף.

הבלוק הזה נכנס לסקריפט שבסוף ה-`body`:

```js
/* אירוע Lead: נורה פעם אחת, על קליקה בכפתור השליחה של כל טופס בדף */
(function(){
  var sent = false;
  document.addEventListener('click', function(e){
    if (sent || !e.target.closest) return;
    var hit = e.target.closest('.rm-slot button, .rm-slot input[type=submit], .rm-slot a.submitButton, .rm-fallback button[type=submit]');
    if (!hit) return;
    sent = true;
    if (typeof fbq === 'function') fbq('track', 'Lead');
  }, true);
})();
```

למה זה בנוי כך:
- `true` בסוף הוא capture. בלעדיו הניווט קורה לפני שהאירוע נשלח והליד נעלם.
- `sent` מונע ספירה כפולה כשיש שני טפסים בדף.
- `typeof fbq === 'function'` אומר שהקוד לא שובר כלום כשעדיין אין פיקסל.
- הקוד מאזין לקליקה ולא נוגע בתוכן הכפתור. **אסור לגעת בתוכן הכפתור**, ראה 3.4.

### 1.5 איך מאמתים שהפיקסל חי

שתי דרכים, שתיהן בלי לשנות שורת קוד:

1. **Meta Pixel Helper**, תוסף לכרום. פותחים את הדף, לוחצים על האייקון. צריך להופיע מזהה הפיקסל ואירוע `PageView` בירוק. אחרי שליחת טופס מופיע גם `Lead`.
2. **מנהל האירועים**, לשונית **בדיקת אירועים**. מדביקים את כתובת הדף, פותחים אותו, והאירועים מופיעים ברשימה תוך שניות.

בדיקה מהירה שאתה יכול לעשות בעצמך בכרום:
- בקונסול: `typeof fbq` מחזיר `"function"`.
- בלשונית Network: יש בקשה ל-`facebook.com/tr` עם `ev=PageView`.
- אין בקשה כזאת? הפיקסל לא נטען, בדרך כלל בגלל חוסם פרסומות בדפדפן. לבדוק בחלון פרטי בלי תוספים.

---

## 2. שורת ההסכמה

**ליד כל טופס וליד כל כפתור תשלום.** בלי יוצא מן הכלל. נוסח:

```html
<p class="consent">לחיצה על הכפתור מהווה הסכמה <a href="legal.html#terms">לתקנון</a> <a href="legal.html#privacy">ולמדיניות הפרטיות</a>, ולקבלת עדכונים ותכנים במייל (אפשר להסיר בכל עת)</p>
```

כפתור שמוביל לוואטסאפ ולא לטופס מקבל נוסח מותאם:

```html
<p class="consent">לחיצה על הכפתור פותחת שיחת וואטסאפ ומהווה הסכמה ל<a href="legal.html#terms">תקנון</a> ול<a href="legal.html#privacy">מדיניות הפרטיות</a>.</p>
```

CSS, אם המחלקה לא קיימת בדף:

```css
.consent{font-size:.9rem;color:var(--soft-d);margin:14px auto 0;max-width:520px;line-height:1.6}
.consent a{color:var(--muted-d);text-decoration:underline;text-underline-offset:3px}
.light .consent{color:var(--muted-l)}
.light .consent a{color:var(--text-l)}
```

אין `legal.html` בתיקייה? משאיר את הקישורים ורושם בדיווח שצריך להריץ `/lp-legal`. לא מוחק את השורה.

---

## 3. טופס רב מסר: כל המלכודות

כל סעיף כאן נלמד מדף חי שנשבר. אל תדלג על אף אחד מהם.

### 3.1 מבנה בסיסי: סלוט חי + טופס גיבוי

הסקריפט של רב מסר מזריק את הטופס **בדיוק במקום שבו הוא מופיע** (הוא משתמש ב-`document.write`), לכן:
- הוא נשאר תג `<script>` רגיל בתוך ה-`div`, **בלי `async` ובלי `defer`**, ולא עובר ל-`<head>`.
- `charset='UTF-8'` נשאר, אחרת העברית נשברת.

```html
<!-- טופס רב מסר החי. את טקסט הכפתור מגדירים במערכת רב מסר -->
<div class="rm-form rm-slot" id="rmLive" data-fb="rmFallback">
  <script type="text/javascript" src="https://form2.ravpage.co.il/[למלא: מזהה קוד ההטמעה]" charset="UTF-8"></script>
</div>

<!-- טופס גיבוי: מוצג רק כשטופס רב מסר לא נטען -->
<form class="order-form rm-fallback" id="rmFallback" action="#" method="post" novalidate hidden>
  <label for="fbEmail" class="sr">כתובת אימייל</label>
  <input type="email" id="fbEmail" name="email" placeholder="האימייל הכי טוב שלך" required autocomplete="email" inputmode="email" aria-describedby="fbErr">
  <p class="err" id="fbErr" role="alert" hidden>נא להזין כתובת אימייל תקינה</p>
  <button type="submit" class="btn btn-big">[טקסט הכפתור מהקופי]</button>
</form>
<p class="form-note js-note" hidden>בתצוגה מקדימה הטופס להמחשה בלבד. בדף החי הטופס שולח את הפרטים למערכת.</p>
<p class="consent">לחיצה על הכפתור מהווה הסכמה <a href="legal.html#terms">לתקנון</a> <a href="legal.html#privacy">ולמדיניות הפרטיות</a>, ולקבלת עדכונים ותכנים במייל (אפשר להסיר בכל עת)</p>
```

לפי הנוסחה של דור, הטופס והכפתור יושבים יחד בתוך **מסגרת `2px dashed` בצבע ניטרלי** כמו קופון, ושורת ההסכמה מחוץ למסגרת.

### 3.2 `https://` מפורש, לא `//`

קוד ההטמעה שרב מסר נותן מגיע לרוב עם פרוטוקול יחסי:

```html
<script src='//form2.ravpage.co.il/abc123'></script>   <!-- שבור בפתיחה מקומית -->
```

**חובה להמיר ל-`https://`.** עם `//` הדף נשבר כשפותחים אותו מהדיסק, והמשתמש חושב שהטופס לא עובד.

```bash
sed -i '' "s|src='//form2|src='https://form2|g; s|src=\"//form2|src=\"https://form2|g" index.html
```

### 3.3 העיצוב של רב מסר גובר עליך: חובה סלקטורים מבוססי ID

רב מסר טוען גיליון סגנונות חיצוני מ-`css.ravpages.co.il` עם `!important`. **סלקטורים של class לא מנצחים אותו.**
הדרך היחידה היא סלקטור שמתחיל במזהה הסלוט, ועם `!important` משלך.

שים את הבלוק הזה בתוך ה-`<style>` של הדף, והחלף את הערכים בטוקנים האמיתיים של הדף:

```css
/* טופס רב מסר החי: סלקטורים מבוססי ID כדי לגבור על הגיליון של רב מסר */
#rmLive form,#rmLive2 form{max-width:100%!important}

/* הכותרת הכחולה "השאירו פרטים ונחזור אליכם בהקדם": מסתירים את .multytext כולו */
#rmLive .multytext,#rmLive2 .multytext,#rmLive p,#rmLive2 p{display:none!important}

#rmLive input[type=text],#rmLive input[type=tel],#rmLive input[type=email],
#rmLive2 input[type=text],#rmLive2 input[type=tel],#rmLive2 input[type=email]{
  border-radius:999px!important;border:1.5px solid rgba(255,255,255,.28)!important;
  background:rgba(0,0,0,.35)!important;color:#fff!important;text-align:center!important;
  font-family:'Heebo',Arial,sans-serif!important;font-size:1.05rem!important;
  padding:.95rem 1.3rem!important;height:auto!important;box-shadow:none!important;
}
#rmLive input::placeholder,#rmLive2 input::placeholder{color:rgba(255,255,255,.55)!important;opacity:1!important}
#rmLive input:focus,#rmLive2 input:focus{
  border-color:var(--gold)!important;outline:2px solid var(--gold)!important;outline-offset:2px!important;
}
#rmLive .submitButtonContainer,#rmLive .submitButton,#rmLive .submitbuttonbox a,
#rmLive2 .submitButtonContainer,#rmLive2 .submitButton,#rmLive2 .submitbuttonbox a{
  background:linear-gradient(135deg,var(--gold-2),var(--gold) 55%,var(--gold-deep))!important;
  border:none!important;border-radius:999px!important;
  box-shadow:0 14px 40px -10px rgba(201,169,110,.5)!important;
  padding:.3rem 1rem!important;transition:transform .2s var(--ease),filter .2s var(--ease);
}
#rmLive .submitButton button,#rmLive button.submitButton,#rmLive .submitButtonContainer button,
#rmLive2 .submitButton button,#rmLive2 button.submitButton,#rmLive2 .submitButtonContainer button{
  color:var(--gold-ink)!important;background:transparent!important;
  font-family:'Heebo',Arial,sans-serif!important;font-weight:800!important;font-size:1.1rem!important;
}
#rmLive .fieldError,#rmLive .error,#rmLive2 .fieldError,#rmLive2 .error{
  color:#ffb3c6!important;font-family:'Heebo',Arial,sans-serif!important;
}
```

שתי הדגשות:
- **להסתיר את `.multytext` כולו ולא רק את ה-`<p>` שבתוכו.** הסתרת ה-`p` לבד משאירה **72px רווח ריק** מעל הטופס.
- ה-`:focus` חייב outline נראה. זו דרישת נגישות, ורב מסר מבטל אותו בברירת המחדל.

### 3.4 טקסט הכפתור: המלכודת הקריטית

טקסט הכפתור מוגדר **במערכת רב מסר**, ברירת המחדל שלו היא "שליחה".
מותר להחליף אותו ב-JS **רק כל עוד הוא עדיין ברירת המחדל**, ובמקביל **חובה להגיד לבעל העסק לשנות אותו במערכת**, כי JS הוא תיקון זמני.

**המלכודת שהפילה שליחה שלמה:** מבנה הכפתור של רב מסר הוא `<a class="submitButton">` **שעוטף** `<button type="submit">`.
כתיבת `textContent` על ה-`<a>` **מוחקת את כפתור השליחה עצמו**, והטופס מפסיק לשלוח לגמרי, בלי שום שגיאה נראית בקונסול ובלי שינוי ויזואלי חשוד.

**הכלל הקשיח: לעולם לא כותבים `textContent` על אלמנט שיש לו ילדים אלמנטיים.** תמיד `if (b.children.length) return;`.

### 3.5 שני מקומות בדף = שני סלוטים

דף אופייני מציג את הטופס פעמיים, בכרטיס המחיר ובסוף. כל סלוט מקבל **id נפרד** (`rmLive`, `rmLive2`) ומצביע על הגיבוי שלו ב-`data-fb`.
הלוגיקה גנרית לפי `.rm-slot` ו-`.rm-fallback`, אחרת הטופס השני נשאר דמה.

### 3.6 ה-JS המלא

נכנס לסקריפט שבסוף ה-`body`:

```js
/* טופסי רב מסר: חושף גיבוי כשההטמעה לא נטענה, ומתייג את הכפתור בבטחה */
(function(){
  var CTA = '[טקסט הכפתור מהקופי]';
  var slots = document.querySelectorAll('.rm-slot');
  if (!slots.length) return;

  function live(slot){
    return slot.querySelector('iframe, form, table, [class*="rav"], [id*="rav"]');
  }
  function sync(){
    slots.forEach(function(slot){
      var fb = document.getElementById(slot.dataset.fb) || slot.parentNode.querySelector('.rm-fallback');
      if (fb) fb.hidden = !!live(slot);
    });
  }
  function label(){
    slots.forEach(function(slot){
      slot.querySelectorAll('button, input[type=submit], a.submitButton').forEach(function(b){
        if (b.tagName === 'INPUT'){
          if (b.value.trim() === 'שליחה') b.value = CTA;
          return;
        }
        if (b.children.length) return;                    /* יש לו ילדים: לא נוגעים בו */
        if (b.textContent.trim() === 'שליחה') b.textContent = CTA;
      });
    });
  }
  function tick(){ sync(); label(); }
  setTimeout(tick, 1800);   /* בדיקה ראשונה */
  setTimeout(tick, 4000);
  setTimeout(tick, 6000);   /* בדיקה אחרונה, לחיבור איטי */
})();
```

חובה בנוסף:

```css
[hidden]{display:none!important}
```

**כלל גלובלי, לא אופציונלי.** `[hidden]` מובס על ידי `display:flex` או `display:grid`, ואז הגיבוי והטופס החי מופיעים שניהם ונראה כאילו יש שני טפסים.

וכדי שהגיבוי ייראה גם אצל מי שכיבה JavaScript:

```html
<noscript><style>.rm-fallback[hidden]{display:flex!important}.rm-slot{display:none}</style></noscript>
```

### 3.7 שדות נסתרים לאבחון

רב מסר מזריק שדות נסתרים שמספרים לאן הליד הולך. הרץ את זה בקונסול של כרום כשהטופס חי:

```js
[...document.querySelectorAll('.rm-slot input[type=hidden]')].map(i => i.name + ' = ' + i.value)
```

מה מחפשים:

| שדה | מה הוא אומר |
|---|---|
| `form_id` | איזה טופס בדיוק הוטמע. מוודא שזה הטופס הנכון ולא טופס ישן |
| `fields[..._List:<id>]` | מזהה רשימת התפוצה שהליד ייכנס אליה |
| `ravxxc_passthrough_domain` | לאן הגולש מנותב אחרי שליחה. כשיש סליקה הערך אמור להיות `secure.cardcom.solutions` |

השדות האלה לא נראים, אז לרשום את הערכים בדיווח. אם `fields[..._List:...]` חסר, הליד עלול להיכנס לחשבון בלי רשימה. לרשום את זה תחת "מה נשאר לך".

### 3.8 טופס אופייני, וקופי שאומר משהו אחר

טופס רב מסר אופייני מבקש שם, מייל וטלפון. אם הקופי בדף מבטיח "רק מייל", **לציין את הפער בדיווח ולא לשנות את הטופס לבד.** שינוי שדות נעשה במערכת רב מסר, לא בקוד הדף.

---

## 4. אימות מקצה לקצה: הטופס באמת נשלח

**טופס שנראה מושלם ולא שולח הוא הכשל הכי יקר בדף.** הוא לא מייצר שום שגיאה, והלידים פשוט נעלמים.

### 4.1 הסימן היחיד לשליחה תקינה

בקשת **POST ל-`safe-subscriber.responder.live`** אחרי לחיצה על כפתור השליחה.
כשיש סליקה, מיד אחריה ניווט ל-`secure.cardcom.solutions/.../PaymentSP`.

**אין POST בכלל = הטופס לא נשלח.** לא משנה כמה הוא נראה טוב.

### 4.2 איך בודקים, וגם מה ייתן תשובה שקרית

```bash
cd <תיקיית הדף> && python3 -m http.server 8765
```

ואז פותחים `http://localhost:8765/index.html` **בכרום אמיתי**, דרך MCP של chrome-devtools אם הוא זמין, ומבצעים:
1. ממתינים 3 שניות ומאמתים שהטופס החי נראה ושהגיבוי מוסתר.
2. ממלאים את השדות בנתוני בדיקה (למשל `בדיקה`, `test@example.com`, `0500000000`).
3. לוחצים על כפתור השליחה.
4. קוראים את רשימת בקשות הרשת ומחפשים את ה-POST ל-`safe-subscriber.responder.live`.
5. בודקים שהקונסול נקי משגיאות.

**שתי דרכים שייתנו לך "הטופס לא נטען" גם כשהכול תקין לחלוטין:**
- **Playwright headless נחסם על ידי Cloudflare** של ravpage. לעולם לא להסיק מזה שההטמעה שבורה.
- **`file://` נחסם ב-CORS.** פתיחת הקובץ מהדיסק בקליק כפולה תראה סלוט ריק.

לכן: **שרת מקומי + כרום אמיתי, ואין תחליף.** אם כרום של האוטומציה תקוע עם "browser is already running", למצוא את ה-PID ולהרוג אותו.

### 4.3 אין כרום זמין

לא נופל ולא עוצר את הצינור. מדווח בעברית שהאימות לא הורץ, ומוסר למשתמש צ'קליסט של 4 צעדים שלוקח דקה:

> **בדיקת הטופס, 4 צעדים:**
> 1. פותחים את הדף החי בכרום.
> 2. מקישים F12 ובוחרים את הלשונית **Network**.
> 3. ממלאים את הטופס בפרטים שלכם ושולחים.
> 4. בשורת החיפוש כותבים `responder`. אם מופיעה שורה אחת לפחות, הטופס שולח. אם הרשימה ריקה, הטופס לא שולח וצריך לחזור למערכת רב מסר.
>
> ולראייה החזקה מכולן: **ליד הבדיקה מופיע בתוך הרשימה במערכת רב מסר.**

---

## 5. מי שלא ברב מסר

המבנה **זהה לחלוטין**, מחליפים רק את קוד ההטמעה שבתוך ה-`div class="rm-slot"`.
שאר הדף (הגיבוי, ה-JS, `[hidden]`, שורת ההסכמה, אירוע ה-Lead) נשאר כמו שהוא.

| מערכת | מה מדביקים בתוך הסלוט | הסימן לשליחה תקינה |
|---|---|---|
| smoove | סקריפט או iframe מאזור "טפסים ודפי נחיתה" | POST לדומיין של smoove |
| ActiveTrail | קוד הטמעת טופס מ"טפסים" | POST לדומיין של ActiveTrail |
| Mailchimp | ה-embed מ-Audience ואז Signup forms ואז Embedded form | POST ל-`list-manage.com` |
| GetResponse | קוד הטמעה מ-Forms and surveys | POST לדומיין של GetResponse |
| Google Forms | ה-`<iframe>` מכפתור השיתוף | הניווט לעמוד התודה של גוגל |

שלושה דברים לשמור בכל חלופה:
1. **הסלוט שומר את ה-id שלו** (`rmLive`, `rmLive2`), אחרת ה-CSS וה-JS מפסיקים לתפוס.
2. **`https://` מפורש** בכל כתובת שמגיעה עם `//`.
3. **הטופס המוטמע תמיד מנצח את ה-CSS שלך.** מעצבים דרך סלקטור שמתחיל במזהה הסלוט, עם `!important`.

מערכת עם iframe מזוהה כבר על ידי הבודק שב-JS, כי `live()` מחפש גם `iframe`. אין מה לשנות.

---

## 6. סדר העבודה ודיווח

עבוד בסדר הזה בריצה אחת:

1. אוסף קלט (שלב 0) ומגבה את הדף.
2. שותל את הפיקסל ב-`head` ואת ה-`noscript` אחריו. אין מזהה, שותל `[למלא]` מנוטרל.
3. ממיר `//` ל-`https://` בקוד ההטמעה.
4. מוסיף את הסלוט, את הגיבוי ואת ה-`noscript` שחושף אותו.
5. מוסיף את בלוק ה-CSS מבוסס ה-ID ואת `[hidden]{display:none!important}`.
6. מוסיף את ה-JS: הגיבוי, התיוג הבטוח ואירוע ה-Lead.
7. מוסיף שורת הסכמה ליד כל טופס וכל כפתור תשלום.
8. מאמת מקצה לקצה (שלב 4). לא ניתן לאמת, מדווח ועובר הלאה.
9. בדיקת מקפים ארוכים חייבת לחזור ריקה: `perl -CSD -ne 'print "$.: $_" if /[\x{2014}\x{2013}]/' index.html`. יש ממצא, מתקן. **הדגל `-CSD` הכרחי.** בלעדיו perl קורא בתים ולא מזהה כלום, הבדיקה תמיד חוזרת ריקה, והדף עולה לאוויר עם מקפים ארוכים.
10. מדפיס דיווח.

תבנית הדיווח (עברית, קצר):

```
חיברתי את הדף:
- פיקסל מטא <המזהה או "חסר">: PageView בטעינה, Lead בשליחת טופס
- הסכמה: <"אין שער בדף, הפיקסל ב-head" / "יש שער, הפיקסל נטען רק אחרי אישור, נוסח ההודעה עודכן וכפתור הדחייה נוסף">
- טופס רב מסר ב-<מספר> מקומות, עם טופס גיבוי מעוצב
- שורת הסכמה ליד <מספר> טפסים וכפתורי תשלום
- אימות: <נשלח POST ל-responder ✓ / לא אומת, הסיבה>

מה נשאר לך:
1. <למשל: לשלוח לי את מזהה הפיקסל ממנהל האירועים>
2. לשנות את טקסט כפתור השליחה במערכת רב מסר ל: "<טקסט ההנעה>"
3. <למשל: לאמת שהליד נכנס לרשימה הנכונה ברב מסר>
```

אם נשאר `[למלא]` בדף, **כל אחד מהם מופיע ברשימה** עם המשפט המדויק שצריך לעשות. אין `[למלא]` שקוף.
