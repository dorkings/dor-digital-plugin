---
name: dashboard-builder
version: 1.0.0
description: Build a customized SaaS dashboard for managing Meta Ads campaigns. Use this skill whenever the user wants to create a new client dashboard, build a real-time ads performance dashboard, scaffold a campaign management tool, set up a Meta Ads dashboard with Cardcom or Rav Messer integration, or says "בנה לי דשבורד", "צור דשבורד", "dashboard לקמפיינים", or "dashboard ללקוח". Always invoke this skill before writing any dashboard code.
---

# Dashboard Builder — Real-Time Ads Dashboard

<!-- Skill by dor digital | v1.0 -->

You are building a **customized SaaS dashboard** for managing Meta Ads campaigns.
The dashboard aggregates spend, revenue, and purchases into one real-time view.

This skill walks you through **discovery → scaffold → delivery**.
Do not skip the discovery phase. The output quality depends on it.

---

## Phase 1 — Discovery

Ask these questions **one at a time**. Wait for each answer before moving on.
If the user has existing code, read it before asking — you may already have answers.

### 1.1 Business context

Ask:
> "מה שם העסק ומה הוא מוכר? (מוצרים / קורסים / שירותים)"

Use the answer to:
- Name the project folder: `{business-name}-dashboard`
- Set the default `vertical` in Settings (beauty / fashion / food / health / home / courses / services / general)
- Decide default KPI labels (e.g. "מכירות" vs "רישומים" vs "לידים")

### 1.2 Ad platform

Ask:
> "באיזה פלטפורמות פרסום אתה עובד? (Meta / Google / TikTok / כולם?)"

Current skill covers **Meta Ads only**. Note other platforms for future phases — scaffold stubs for them but don't wire them up yet.

### 1.3 Revenue / payment system

Ask:
> "איפה אתה גובה תשלום מלקוחות? (קארדקום / Stripe / PayPal / אחר)"

Map their answer to the revenue data source:
- Cardcom → PDF upload crossref (backend already built, include it)
- Stripe / other → add stub API connection in the data store

### 1.4 Email / CRM / subscriber system

Ask:
> "איזה מערכת שיווק אימייל / רשימת מנויים אתה משתמש? (רב מסר / ActiveCampaign / Mailchimp / אחר)"

This is the "purchases by ref" source. Used to match which campaign drove each sale.
- Rav Messer → CSV export crossref (backend included, `global_ref` column)
- Other → add stub with column mapping instructions in comments

### 1.5 Campaigns

Ask:
> "כמה קמפיינים פעילים יש לך במטא? תן להם שמות קצרים — למשל: 'מכירות ראשי', 'רימרקטינג', 'UGC'"

This defines the campaign structure. The dashboard expects:
- 2–6 campaigns per client
- Each with an ID like `{clientId}-main`, `{clientId}-rm`, `{clientId}-ugc`, etc.

### 1.6 Key metrics and targets

Ask:
> "מהם היעדים שלך? (ROAS יעד / CPA מקסימלי / יעד הכנסה חודשי / תקציב חודשי)"

These become the defaults in `SettingsContext`.

### 1.7 Users / clients

Ask:
> "מי ישתמש בדשבורד? רק אתה, או גם אנשי צוות / לקוחות שלך?"

- Solo use → single admin account is enough
- Team / clients → define client accounts per person/brand

### 1.8 Language

Ask:
> "האם הדשבורד בעברית, אנגלית, או שניים?"

Default is Hebrew RTL. If English: swap Heebo font for Inter, remove `dir="rtl"`, translate all labels.

### 1.9 Branding (optional)

Ask:
> "יש לך צבעי מותג? תן לי hex קוד ראשי ומשני (אם אין — אשתמש בצבעי ברירת המחדל)"

Default palette: gold (`#D4AF37`) + dark sidebar (`#0E0E11`).

---

## Phase 2 — Project Scaffold

After discovery, build the following. Use the exact stack:

### 2.1 Init

```bash
npm create vite@latest {project-name} -- --template react-ts
cd {project-name}
npm install
npm install react-router-dom recharts date-fns lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2.2 File structure to create

```
src/
├── types/index.ts
├── contexts/
│   ├── AuthContext.tsx
│   └── SettingsContext.tsx
├── data/
│   └── mockData.ts
├── utils/
│   └── realDataStore.ts
├── components/
│   └── Layout.tsx
└── pages/
    ├── Login.tsx
    ├── Dashboard.tsx
    ├── AdPerformance.tsx
    ├── Summaries.tsx
    ├── Crossref.tsx        (if using Cardcom + Rav Messer)
    ├── MetaSpend.tsx
    └── Settings.tsx
```

Build each file in this order. Do not skip types first.

---

## Phase 3 — Core Types

**`src/types/index.ts`** — always this exact shape:

```typescript
export interface AdRefData {
  ref: string           // e.g. "ugc_video_01" — matches RM global_ref
  displayName: string   // human label shown in UI
  purchases: number
  revenue: number
  spend: number
}

export interface DailyRecord {
  date: string          // YYYY-MM-DD
  campaignId: string    // e.g. "main", "rm", "ugc"
  campaignName: string  // display label
  totalPurchases: number
  totalRevenue: number
  totalSpend: number
  adRefs: AdRefData[]
}

export interface ClientData {
  id: string
  name: string
  username: string
  password: string
  campaigns: string[]
  dailyRecords: DailyRecord[]
}

export interface AuthUser {
  id: string
  name: string
  username: string
  isAdmin: boolean
  clientId: string | null
}

export type DatePreset = '7d' | '14d' | '30d' | '90d'
```

---

## Phase 4 — Mock Data

**`src/data/mockData.ts`** — generate 90 days of deterministic data using `Math.sin`.

### Pattern for each client

```typescript
// Build per client, per campaign, per ref
// Use Math.sin(seed + dayIndex * frequency) to vary values naturally
// Each client gets a different seed so charts look different

function generateDailyRecords(
  campaigns: CampaignConfig[],
  seed: number,
  days = 90
): DailyRecord[] {
  const records: DailyRecord[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    for (const campaign of campaigns) {
      const baseSpend = campaign.baseDailySpend
      const spendVariance = Math.sin(seed + i * 0.3) * 0.2 + 1
      const totalSpend = Math.round(baseSpend * spendVariance)

      const roasVariance = Math.sin(seed + i * 0.5 + campaign.roasSeed) * 0.5 + campaign.targetRoas
      const totalRevenue = Math.round(totalSpend * Math.max(roasVariance, 0.5))

      const aov = campaign.avgOrderValue
      const totalPurchases = Math.max(1, Math.round(totalRevenue / aov))

      const adRefs: AdRefData[] = campaign.refs.map((ref, ri) => {
        const refShare = Math.sin(seed + i * 0.7 + ri) * 0.15 + (1 / campaign.refs.length)
        const refPurchases = Math.max(0, Math.round(totalPurchases * refShare))
        return {
          ref: ref.ref,
          displayName: ref.displayName,
          purchases: refPurchases,
          revenue: Math.round(refPurchases * aov),
          spend: Math.round(totalSpend * refShare),
        }
      })

      records.push({ date: dateStr, campaignId: campaign.id, campaignName: campaign.name, totalSpend, totalRevenue, totalPurchases, adRefs })
    }
  }
  return records
}
```

### CampaignConfig shape (internal to mockData.ts)

```typescript
interface CampaignConfig {
  id: string
  name: string
  baseDailySpend: number     // ₪ per day baseline
  targetRoas: number          // e.g. 3.5
  roasSeed: number            // offset for variation
  avgOrderValue: number       // ₪
  refs: { ref: string; displayName: string }[]
}
```

### Populate with the client's actual campaigns from discovery

Example for a courses brand:
```typescript
const CLIENT_CAMPAIGNS: CampaignConfig[] = [
  {
    id: 'main',
    name: 'קמפיין מכירות',
    baseDailySpend: 500,
    targetRoas: 3.5,
    roasSeed: 1.2,
    avgOrderValue: 297,
    refs: [
      { ref: 'ugc_v1', displayName: 'UGC - Video 1' },
      { ref: 'static_01', displayName: 'Static Banner' },
      { ref: 'reel_01', displayName: 'Reel' },
    ],
  },
  {
    id: 'rm',
    name: 'רימרקטינג',
    baseDailySpend: 200,
    targetRoas: 5.0,
    roasSeed: 2.7,
    avgOrderValue: 297,
    refs: [
      { ref: 'rm_video', displayName: 'RM - Video' },
      { ref: 'rm_catalog', displayName: 'RM - Catalog' },
    ],
  },
]
```

---

## Phase 5 — Auth Context

**`src/contexts/AuthContext.tsx`**

```typescript
// Hardcoded users array — no backend needed for MVP
// isAdmin: true → sees all clients + admin panel
// isAdmin: false → sees only their own data

interface StoredUser extends AuthUser {
  password: string
}

const USERS: StoredUser[] = [
  { id: 'admin', name: 'מנהל', username: 'admin', password: 'admin', isAdmin: true, clientId: null },
  // Add one entry per client from discovery phase:
  { id: '{clientId}', name: '{clientName}', username: '{username}', password: '{password}', isAdmin: false, clientId: '{clientId}' },
]

// Context provides: user, activeClientId, login(), logout(), setActiveClient()
// Persist to sessionStorage
```

---

## Phase 6 — Settings Context

**`src/contexts/SettingsContext.tsx`**

```typescript
interface AppSettings {
  theme: 'dark' | 'light'
  targetROAS: number           // from discovery 1.6
  maxCPA: number               // from discovery 1.6
  vatPct: number               // 17 (Israel default) or ask
  targetProfitPerOrder: number
  monthlyGoal: number          // from discovery 1.6
  monthlyBudget: number        // from discovery 1.6
  vertical: string             // from discovery 1.1
}

// Persist to localStorage key: `settings_{clientId}`
// Provide useSettings() hook
```

---

## Phase 7 — Real Data Store

**`src/utils/realDataStore.ts`**

```typescript
// localStorage bridge for manual data entry

export type SpendData = Record<string, Record<string, number>>
// { 'YYYY-MM-DD': { 'campaignId': spend_amount } }

export function getSpendData(clientId: string): SpendData { /* localStorage get */ }
export function setSpendData(clientId: string, data: SpendData): void { /* localStorage set */ }

export interface CrossrefDayResult {
  customers: number
  revenue: number
  refs: Record<string, number>
}
export type CrossrefData = Record<string, CrossrefDayResult>

export function getCrossrefData(clientId: string): CrossrefData { /* ... */ }
export function setCrossrefData(clientId: string, data: CrossrefData): void { /* ... */ }
export function hasRealData(clientId: string): boolean { /* ... */ }
```

---

## Phase 8 — Layout

**`src/components/Layout.tsx`**

```typescript
// NAV_ITEMS drives both sidebar AND mobile bottom nav
const NAV_ITEMS = [
  { path: '/dashboard',   label: 'דשבורד',           icon: LayoutDashboard },
  { path: '/ads',         label: 'ביצועי מודעות',     icon: TrendingUp },
  { path: '/summaries',   label: 'סיכומים',            icon: FileText },
  { path: '/meta-spend',  label: 'הוצאות Meta',        icon: Wallet },
  // Add /crossref if using Cardcom × RM
]

// Rules:
// - Sidebar always dark background (--sidebar-bg: #0E0E11)
// - Main content respects light/dark theme
// - Mobile: bottom nav with icon + shortened label
// - Admin gets client switcher dropdown above nav
```

---

## Phase 9 — Dashboard Page

**`src/pages/Dashboard.tsx`**

Must include these sections in order:

1. **Date preset selector** — 7d / 14d / 30d / 90d tabs
2. **ROAS alert banner** — red if below target, green if 30%+ above
3. **KPI row 1** (4 cards): Total Revenue | Total Spend | ROAS | Net Profit
4. **KPI row 2** (3 cards): Purchases | Avg CPA | Avg Order Value
5. **Revenue vs Spend chart** — AreaChart, last N days
6. **ROAS trend** — AreaChart with target line
7. **Top ads** — top 3 by ROAS (sidebar card)
8. **Bottom row** (3 cards):
   - Monthly goal progress bar
   - Budget allocation (70/20/10 rule by ROAS rank)
   - Industry benchmark BarChart

**Real data integration:**
```typescript
// Load real spend from localStorage
const realSpend = useMemo(() => getSpendData(clientId), [clientId])

// Overlay real spend on mock records
const applyReal = (recs: DailyRecord[]) =>
  Object.keys(realSpend).length === 0 ? recs :
  recs.map(r => {
    const spend = realSpend[r.date]?.[r.campaignId]
    return spend != null ? { ...r, totalSpend: spend } : r
  })

// Show "● נתונים אמיתיים" badge when hasRealData(clientId)
```

---

## Phase 10 — MetaSpend Page

**`src/pages/MetaSpend.tsx`** — manual spend entry

- Month navigator (prev/next arrows, shows month name in Hebrew)
- If admin: client selector dropdown
- Table: row per day, columns = campaigns from config
- Each cell: `<input type="text" inputMode="decimal">` with ₪ prefix
- Future dates disabled (opacity 35%)
- Save to `setSpendData(clientId, data)`
- Show totals row + summary chips at top
- Save/Discard buttons with "נשמר בהצלחה" confirmation

---

## Phase 11 — Crossref Page (optional)

**Include only if client uses Cardcom + Rav Messer.**

If they use a different payment system: scaffold the page with a "coming soon" placeholder.

If included, the page needs a matching **FastAPI backend**:

```
backend/
├── main.py         # FastAPI, CORS for localhost:5173
└── modules/
    └── crossref.py # Match RM CSV × payment PDF/CSV by email + 3-day window
```

**Core crossref logic:**
```python
# 1. Parse RM CSV: columns list_created, global_ref, email
# 2. Parse payment source: date, amount, email
# 3. Match: same email, payment within 3 days of list_created
# 4. Filter: 15 < amount <= 1500 (adjust thresholds for client)
# 5. Handle credits (negative amounts → skip)
# 6. Handle orderbumps (multiple invoices same email → 1 customer, sum)
# 7. Return: per-day { date, customers, revenue, refs: {ref_name: count} }
```

---

## Phase 12 — Settings Page

Simple form with all `AppSettings` fields:
- ROAS target, Max CPA, VAT %, Profit target
- Monthly revenue goal, Monthly ad budget
- Vertical dropdown
- Dark/light theme toggle

Save on every change (no submit button needed, use `onChange`).

---

## Phase 13 — Tailwind + CSS Setup

**`tailwind.config.js`:**
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { gold: '#D4AF37', dark: '#0E0E11' },
      fontFamily: { sans: ['Heebo', 'sans-serif'] },
    },
  },
}
```

**`src/index.css`** — CSS variables for both themes:
```css
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');

:root {
  --app-bg: #F8F8F6;
  --app-card: #FFFFFF;
  --app-border: #E8E5E0;
  --app-text: #1A1A1A;
  --app-subtle: #4A4A4A;
  --app-muted: #9A9A9A;
  --app-hover: #F0EDE8;
  --sidebar-bg: #0E0E11;
  --sidebar-border: #1E1E24;
  --sidebar-text: #A0A0B0;
  --sidebar-hover: #18181F;
  --chart-grid: #E8E5E0;
  --gold: #D4AF37;
}

.dark {
  --app-bg: #0E0E11;
  --app-card: #16161C;
  --app-border: #252530;
  --app-text: #F0F0F5;
  --app-subtle: #B0B0C0;
  --app-muted: #606070;
  --app-hover: #1C1C24;
  --chart-grid: #252530;
}

body { font-family: 'Heebo', sans-serif; }
[dir="rtl"] body { direction: rtl; }

.card {
  background: var(--app-card);
  border: 1px solid var(--app-border);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.text-gold { color: var(--gold); }
.bg-gold { background: var(--gold); }

@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.animate-fade-in { animation: fadeIn 0.2s ease-out; }
```

**`index.html`** — add RTL:
```html
<html lang="he" dir="rtl">
```

---

## Phase 14 — Customization by Discovery Answers

| Discovery answer | What changes |
|---|---|
| Business name | Project folder, page title, sidebar logo text |
| Vertical | Default vertical in Settings, benchmark data |
| Campaigns | mockData config, MetaSpend CLIENT_CAMPAIGNS, adRefs |
| ROAS / CPA targets | Default values in SettingsContext |
| Language English | Remove `dir="rtl"`, swap Heebo → Inter, translate all labels |
| Brand colors | Update `--gold` CSS var, `tailwind.config colors.gold` |
| No Cardcom | Skip Crossref page + backend entirely |
| Multiple clients | Add each to USERS array + mockData |
| Solo use | Single admin account only, no client switcher |

---

## Deliverables Checklist

When done, verify:

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Login works (admin + at least one client)
- [ ] Dashboard loads with mock data for all date presets (7d / 14d / 30d / 90d)
- [ ] MetaSpend: entering a value updates Dashboard spend on navigation
- [ ] "● נתונים אמיתיים" badge appears after entering any spend
- [ ] Settings persist across page refresh (localStorage)
- [ ] Dark mode toggle works
- [ ] Mobile layout — bottom nav shows all routes
- [ ] If Crossref included: file upload UI renders, error state shows when backend offline

---

## What This Does NOT Include

- Real API connections (Meta Marketing API, Cardcom webhook, RM API) — stubs only
- Production auth (no JWT, no tokens) — MVP sessionStorage only
- Database — localStorage only for MVP
- Email notifications
- PDF export

Tell the client: **this is a working MVP shell**. All the UI, logic, and data flow are built. The next step is connecting real data sources.

---

## Notes for Claude

- Always run `npm run build` at the end to confirm zero TypeScript errors before reporting done
- Never install packages not listed in Phase 2 without asking
- If the client shares existing code, read it first — adapt rather than replace
- The mock data generator should produce realistic-looking values (Math.sin with offset, not Math.random)
- Keep every file under 300 lines — split if needed
- All text in the UI must match the client's language choice from discovery 1.8
