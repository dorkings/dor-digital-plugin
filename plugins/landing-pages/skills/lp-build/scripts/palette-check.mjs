#!/usr/bin/env node
// palette-check.mjs: בודק ניגודיות לפלטה, וגוזר את ששת הטוקנים הנגזרים.
// שימוש:
//   node palette-check.mjs palette.json      12 טוקנים -> 18 טוקנים + טבלת ניגודיות
//   node palette-check.mjs index.html        שולף את :root מהדף ובודק אותו כמו שהוא
//   node palette-check.mjs palette.json --css   מדפיס רק את בלוק ה-:root המוכן להדבקה
// יוצא בקוד 1 אם צירוף בשימוש נפל מתחת ל-4.5.
import { readFileSync } from 'node:fs';

const CORE = ['ink','ink-2','ink-3','gold','gold-2','gold-deep','gold-ink',
              'ivory','ivory-2','text-d','muted-d','text-l'];
const DERIVED = ['ink-4','paper','soft-d','muted-l','fill-d','fill-l'];
const FIXED = { ok:'#2F9C6C', bad:'#C6494B', wa:'#25D366' };

const hx = h => { h = h.replace('#','').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [0,2,4].map(i => parseInt(h.slice(i,i+2),16)); };
const toHex = ([r,g,b]) => '#' + [r,g,b].map(v =>
  Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0').toUpperCase()).join('');
const lin = c => { c /= 255; return c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055) ** 2.4; };
const lum = h => { const [r,g,b] = hx(h); return .2126*lin(r) + .7152*lin(g) + .0722*lin(b); };
const cr = (a,b) => { const l = [lum(a),lum(b)].sort((x,y) => y-x);
  return (l[0]+.05) / (l[1]+.05); };
const r2 = v => Math.round(v*100)/100;

function toHsl(hex){ let [r,g,b] = hx(hex).map(v => v/255);
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b), l = (mx+mn)/2; let h = 0, s = 0;
  if (mx !== mn){ const d = mx-mn; s = l > .5 ? d/(2-mx-mn) : d/(mx+mn);
    h = mx === r ? (g-b)/d + (g < b ? 6 : 0) : mx === g ? (b-r)/d + 2 : (r-g)/d + 4; h /= 6; }
  return [h, s, l]; }
function toRgb(h,s,l){ if (s === 0) { const v = l*255; return toHex([v,v,v]); }
  const q = l < .5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
  const f = t => { t = (t+1)%1;
    if (t < 1/6) return p + (q-p)*6*t; if (t < .5) return q;
    if (t < 2/3) return p + (q-p)*(2/3-t)*6; return p; };
  return toHex([f(h+1/3)*255, f(h)*255, f(h-1/3)*255]); }
// pp = כמה נקודות בהירות להזיז, sMul = כמה להחליש את הרוויה.
// הרוויה יורדת ככל שהטקסט נחלש, אחרת פסקה בצבע מותג רווי נראית חובבנית.
const adj = (hex,pp,sMul=1) => { const [h,s,l] = toHsl(hex);
  return toRgb(h, Math.max(0, Math.min(1, s*sMul)), Math.max(0, Math.min(1, l + pp/100))); };
const shiftL = (hex,pp) => adj(hex,pp,1);

// מנקה טוקן לכיוון אחד עד שכל הצירופים שלו עוברים 4.5. עד 40 צעדים של נקודה.
function nudge(hex, dirPP, pairs){
  let cur = hex;
  for (let i = 0; i < 40; i++){
    if (pairs.every(bg => cr(cur,bg) >= 4.5)) return cur;
    cur = shiftL(cur, dirPP);
  }
  return cur;
}

function derive(p){
  const o = { ...p };
  o['ink-4'] = shiftL(p['ink-3'], +4.5);
  o['paper'] = shiftL(p['ivory'], -5.5);
  o['soft-d'] = nudge(adj(p['muted-d'], -17, 0.60), +1, [p.ink, p['ink-2'], p['ink-3']]);
  o['muted-l'] = nudge(adj(p['text-l'], +26, 0.36), -1, [p.ivory, p['ivory-2']]);
  o['fill-d'] = nudge(adj(p['muted-d'], -12, 0.75), +1, [p.ink, p['ink-2'], p['ink-3']]);
  o['fill-l'] = nudge(adj(o['muted-l'], +2, 1), -1, [p.ivory, p['ivory-2'], '#FFFFFF']);
  return o;
}

// הצירופים שבשימוש בדף. כל אחד חייב 4.5 ומעלה.
const PAIRS = [
  ['text-d','ink'],['text-d','ink-2'],['text-d','ink-3'],
  ['muted-d','ink'],['muted-d','ink-2'],['muted-d','ink-3'],
  ['soft-d','ink'],['soft-d','ink-2'],['soft-d','ink-3'],
  ['gold-2','ink'],['gold-2','ink-2'],['gold-2','ink-3'],
  ['gold-deep','ivory'],['gold-deep','ivory-2'],
  ['text-l','ivory'],['text-l','ivory-2'],
  ['muted-l','ivory'],['muted-l','ivory-2'],
  ['gold-ink','gold'],
  ['fill-d','ink'],['fill-d','ink-2'],['fill-d','ink-3'],
  ['fill-l','ivory'],['fill-l','ivory-2'],
];

const rgbList = h => (h && h.startsWith('#')) ? hx(h).join(',') : '0,0,0';
function cssBlock(o){
  const g = k => o[k] || '(חסר)';
  return `:root{
  --ink:${g('ink')}; --ink-2:${g('ink-2')}; --ink-3:${g('ink-3')}; --ink-4:${g('ink-4')};
  --gold:${g('gold')}; --gold-2:${g('gold-2')}; --gold-deep:${g('gold-deep')}; --gold-ink:${g('gold-ink')};
  --ivory:${g('ivory')}; --ivory-2:${g('ivory-2')}; --paper:${g('paper')};
  --text-d:${g('text-d')}; --muted-d:${g('muted-d')}; --soft-d:${g('soft-d')};
  --text-l:${g('text-l')}; --muted-l:${g('muted-l')};
  --ok:${FIXED.ok}; --bad:${FIXED.bad}; --wa:${FIXED.wa};
  --fill-d:${g('fill-d')}; --fill-l:${g('fill-l')};
  --ink-rgb:${rgbList(g('ink'))}; --gold-rgb:${rgbList(g('gold'))}; --gold-deep-rgb:${rgbList(g('gold-deep'))}; --ivory-rgb:${rgbList(g('ivory'))};
}`;
}

function fromCss(txt){
  const m = txt.match(/:root\s*\{([\s\S]*?)\}/);
  if (!m) { console.error('לא נמצא בלוק :root בקובץ'); process.exit(1); }
  const o = {};
  for (const mm of m[1].matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,6})/g)) o[mm[1]] = mm[2];
  return o;
}

// ---- מסלול 2: גזירת 12 טוקנים מקציר הצבעים של האתר או הלוגו ----
// קלט: assets/harvest/palette.json ({"dominant_saturated":["#..", ...]}) או רשימת hex.
// מחזיר {tokens, log, fallback} כש-fallback=true אומר: הקציר הוא ערימת תצלומים, לא מותג. עבור למסלול 4.
export function fromHarvest(hexes){
  const log = [];
  const cand = hexes.map(h => ({ hex:h, hsl:toHsl(h) }));
  const skin = ([h,s,l]) => h*360 >= 12 && h*360 <= 48 && s >= .18 && s <= .62 && l >= .42 && l <= .88;
  const kept = [];
  for (const c of cand){
    const [h,s,l] = c.hsl;
    if (s < .18){ log.push(`נפסל ${c.hex}: אפור מדי`); continue; }
    if (l > .92 || l < .06){ log.push(`נפסל ${c.hex}: קצה בהירות`); continue; }
    if (skin(c.hsl)){ log.push(`נפסל ${c.hex}: גוון עור או עץ, לא צבע מותג`); continue; }
    kept.push(c);
  }
  if (kept.length === 0 || kept.length < hexes.length - 5){
    log.push('הקציר הוא ערימת תצלומים ולא מותג. עוברים למסלול 4.');
    return { tokens:null, log, fallback:true };
  }
  const acc = kept[0];                                  // הכי תדיר ששרד = צבע המבטא
  const dark = kept.find(c => c.hsl[2] < .28) || acc;   // הכהה ביותר, או המבטא אם אין
  const t = buildFrom(acc.hsl, dark.hsl);
  log.push(`מבטא ${acc.hex}, כהה ${dark.hex}`);
  return { tokens:t, log, fallback:false };
}

// שני צבעים, מבטא וכהה, הופכים ל-12 טוקנים. זה הגרעין של מסלול 1 ומסלול 2.
export function buildFrom(accHsl, darkHsl){
  const [ha, sa] = accHsl, [hd, sd] = darkHsl;
  const cl = (v,a,b) => Math.max(a, Math.min(b, v));
  const t = {
    'ink':       toRgb(hd, cl(sd,.18,.42), .07),
    'ink-2':     toRgb(hd, cl(sd,.18,.42), .11),
    'ink-3':     toRgb(hd, cl(sd,.16,.38), .155),
    'gold':      toRgb(ha, cl(sa,.35,.80), .60),
    'gold-2':    toRgb(ha, cl(sa,.40,.85), .78),
    'gold-deep': toRgb(ha, cl(sa,.50,.90), .30),
    'gold-ink':  toRgb(ha, .60, .06),
    'ivory':     toRgb(ha, .22, .95),
    'ivory-2':   toRgb(ha, .30, .985),
    'text-d':    toRgb(ha, .18, .93),
    'muted-d':   toRgb(hd, .13, .73),
    'text-l':    toRgb(hd, .30, .15),
  };
  // שלושה תיקוני ניגודיות על הטוקנים שנגזרו, לפני שמאמצים משהו.
  t['gold-2']    = nudge(t['gold-2'],    +1, [t.ink, t['ink-2'], t['ink-3']]);
  t['gold-deep'] = nudge(t['gold-deep'], -1, [t.ivory, t['ivory-2']]);
  t['gold-ink']  = nudge(t['gold-ink'],  -1, [t.gold]);
  return t;
}

const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); return i < 0 ? null : args[i+1]; };
const accent = flag('--accent');
let tokens;

if (accent){
  // מסלול 1: המשתמש אמר צבע. --dark אופציונלי, ברירת המחדל היא אותו גוון מוכהה.
  const darkHex = flag('--dark') || accent;
  tokens = derive(buildFrom(toHsl(accent), toHsl(darkHex)));
} else {

const file = args.find(a => !a.startsWith('#') && !a.startsWith('--') && !/^[0-9a-fA-F]{6}$/.test(a));
if (!file) { console.error('שימוש: node palette-check.mjs <palette.json | index.html> [--css]   או   --accent #HEX [--dark #HEX]'); process.exit(1); }
const raw = readFileSync(file,'utf8');
if (/\.html?$/i.test(file)) tokens = fromCss(raw);
else {
  let p = JSON.parse(raw);
  if (Array.isArray(p.dominant_saturated) || Array.isArray(p)){
    const h = fromHarvest(Array.isArray(p) ? p : p.dominant_saturated);
    h.log.forEach(l => console.error('  ' + l));
    if (h.fallback) process.exit(2);
    p = h.tokens;
  }
  const miss = CORE.filter(k => !p[k]);
  if (miss.length) { console.error('חסרים טוקנים: ' + miss.join(', ')); process.exit(1); }
  tokens = derive(p);
}
}

if (args.includes('--css')) { console.log(cssBlock(tokens)); process.exit(0); }

let worst = Infinity, fails = 0;
const rows = [];
for (const [fg,bg] of PAIRS){
  if (!tokens[fg] || !tokens[bg]) continue;
  const v = cr(tokens[fg], tokens[bg]);
  worst = Math.min(worst, v);
  const ok = v >= 4.5;
  if (!ok) fails++;
  rows.push(`${ok ? 'OK  ' : 'FAIL'}  ${fg}/${bg}`.padEnd(30) + r2(v));
}
console.log(cssBlock(tokens));
console.log('');
console.log(rows.join('\n'));
console.log('');
console.log(`הגרוע ביותר: ${r2(worst)}   נכשלו: ${fails}`);
if (fails) {
  console.log('כשל ניגודיות. מכהים את צבע הטקסט על רקע בהיר, או מבהירים אותו על רקע כהה, ומריצים שוב. לא מוותרים על הבדיקה.');
  process.exit(1);
}
