# CLAUDE.md — What to Makan SG

**Live app**: https://makan.taza.me

A food recommendation quiz for Singapore. Users answer 5 "craving" questions plus 1 "constraints" checklist about what they're in the mood for, and the app matches them against a database of ~98 dishes that lives **entirely in a Google Sheet** (no static fallback).

---

## Architecture

```
App mounts → fetch dishes from Google Sheet (single source of truth)
User answers 5 craving questions + 1 constraints checklist
        ↓
useMakanQuiz (hook) — manages all quiz state
        ↓
findMatchingDishes(answers, dishes) — ranked scoring + constraint filters
        ↓
ResultsScreen — shows perfect matches + close matches (always ≥1);
                preferences editable inline to re-rank in place (applyEdits)
```

**Page flow**: `LandingScreen` → `QuestionScreen` (×6 with slide transitions) → `ResultsScreen`

**Two kinds of question** (`Question.kind`):
- `craving` (cuisine, moisture, carb, spiciness, appetite) — softly scored; the more a dish matches, the higher it ranks. Never eliminates dishes.
- `constraints` (the last screen) — food-rule filters applied on top. Optional/skippable.

**Single source of truth:** dishes come only from the Google Sheet. The landing CTA does **not** wait on the fetch (it runs in the background); if the fetch fails, the results screen shows a "can't load the menu — retry" state instead of a broken quiz.

All quiz state lives in one hook: `src/hooks/useMakanQuiz.ts`. The page component (`src/pages/Index.tsx`) just reads from it.

---

## Key Files

| File | Role |
|------|------|
| `src/hooks/useMakanQuiz.ts` | All quiz state and navigation logic |
| `src/utils/foodMatcher.ts` | Dish scoring and matching algorithm |
| `src/data/questions.ts` | The 5 craving questions + 1 constraints checklist |
| `src/types/food.ts` | TypeScript interfaces: `Dish`, `Question`, `UserAnswers` |
| `src/utils/googleSheets.ts` | Fetches live dish data from Google Sheets CSV |
| `src/components/quiz/DishFeedback.tsx` | "Missing a dish?" suggestion form → Google Apps Script |
| `src/utils/mapsUtils.ts` | Opens Google Maps search for a dish |
| `src/utils/sanitize.ts` | Strips HTML tags from user-submitted dish names |
| `src/pages/Index.tsx` | Main page — renders Landing / Quiz / Results |
| `src/components/quiz/DishCard.tsx` | Single dish result card with name + Google Maps button |
| `src/App.tsx` | Root — TooltipProvider, Router |

`src/components/` is organized into subfolders: `screens/` (`LandingScreen`, `QuestionScreen`, `ResultsScreen`), `quiz/` (`DishCard`, `DishFeedback`, `DotStepper`), `icons/` (`AnswerIcons`), and `ui/` (3 shadcn-ui components: `button`, `checkbox`, `tooltip`).

---

## The Data Model (Google Sheet)

Every dish has 5 **craving** categories (drive the soft scoring) plus 2 **food-rule** multi-value categories and a `pork` boolean (drive the constraints checklist). All categories live in `Dish.tags` except `pork` (a top-level boolean). All are multi-value/pipe-separated so "either way" dishes are preserved. The sheet's "Legend" tab documents this for editors too.

### Categories (all multi-value, pipe-separated, in `Dish.tags`)

| Category | Valid values | Drives |
|----------|-------------|--------|
| `cuisine` | `"Chinese"`, `"Malay"`, `"Indonesian"`, `"Indian"`, `"Japanese"`, `"Korean"`, `"Thai"`, `"Vietnamese"`, `"Western"` | Cuisine question (craving) |
| `moisture` | `"Dry"`, `"Saucy"`, `"Soupy"` | Moisture question (craving) |
| `carb` | `"Rice"`, `"Noodle"`, `"Bread"`, `"Low Carb"` | Carb question (craving) |
| `spiciness` | `"Mild"`, `"Medium"`, `"Spicy"` | Spiciness question (craving) |
| `appetite` | `"Snack"`, `"Light Meal"`, `"Heavy Meal"` | Appetite question (craving) |
| `fried` | `"Fried"`, `"Not Fried"` (list both for either-way) | "No fried" → keeps dishes that include `"Not Fried"` |
| `protein` | `"Light Protein"`, `"Medium Protein"`, `"Protein-Dense"` (list a range) | "High protein" → keeps dishes that include `"Protein-Dense"` |

### Boolean flag (top-level `Dish.pork`)

| Flag | Meaning | Drives |
|------|---------|--------|
| `pork` | contains pork | "No pork" → hard filter (hide these) |

**Why multi-value for fried/protein:** many dishes can be had either way (Hor Fun fried *or* not; Sushi medium *or* protein-dense). Binary flags would wrongly exclude them, so these stay multi-value and the filters check for the *presence* of the qualifying value.

**Display labels are decoupled from tag values.** In `questions.ts`, options are `{ label, value }`. The user sees `label`; matching uses `value`, which must exactly match the sheet strings. `UserAnswers` always stores **values**.

---

## How to Add / Edit a Dish

**Edit the Google Sheet — it's the only source of truth.** There is no static fallback; the app reads the sheet live on every load. Sheet: `what-to-makan-dishes`, "Dishes" tab. Columns are in **quiz order** (`parseCSVDishes` maps by position — do not reorder without updating the parser):

```
name | cuisine | moisture | carb | spiciness | appetite | fried | protein | pork
Bak Chor Mee | Chinese | Dry|Saucy | Noodle | Mild | Light Meal | Not Fried | Medium Protein | TRUE
```

- Multi-value columns: pipe-separate (e.g. `Dry|Saucy`, `Not Fried|Fried`). Match the valid values above exactly.
- `pork`: checkbox (`TRUE`/`FALSE`).
- The "Legend" tab documents all of this for non-technical editors.
- Edit via the Sheets UI, or programmatically with the `gws` CLI (`gws sheets spreadsheets values ...`).

The CSV column order is positional — `googleSheets.ts` `parseCSVDishes` maps by index, so **don't reorder columns** without updating the parser.

---

## How to Add a Craving Question

1. Add an entry to `src/data/questions.ts` with `kind: 'craving'`, a new `id` and `category`, and `options: [{ label, value }]`
2. Add the new `category` key to the `Dish.tags` interface in `src/types/food.ts`
3. Add a column for it in the Google Sheet + the parser (`googleSheets.ts` `parseCSVDishes`) and the Legend tab
4. Add the category to `CRAVING_CATEGORIES` in `src/utils/foodMatcher.ts`
5. Add emoji icons (keyed by option **value**) in `src/components/icons/AnswerIcons.tsx`

The `category` field must match a key in `Dish['tags']` — TypeScript enforces this. To add a new **constraint** instead, add a value to the `constraints` question's options, a boolean column in the sheet + parser, and handle it in `foodMatcher.ts` (filter).

---

## Matching Algorithm (`src/utils/foodMatcher.ts`)

Ranked scoring, not strict AND — the old strict version returned **zero** dishes for ~78% of single-pick combos. The current version always surfaces ~6 dishes.

```
constraints = answers['constraints']   // optional checklist
1. Hard filter the pool (all three are exclusions/inclusions, not boosts):
     - "No Pork"      → drop dishes where dish.pork
     - "No Fried"     → drop dishes whose tags.fried lacks "Not Fried" (can't be had non-fried)
     - "High Protein" → keep only dishes whose tags.protein includes "Protein-Dense"
2. Soft-score each remaining dish over CRAVING_CATEGORIES:
     score++ per category whose tags intersect the user's selected values
3. Sort by (score desc, random)

Perfect matches: score === total (all answered cravings matched).
  - Show ALL perfect matches when the user gave real signal: ≥ MIN_DISCRIMINATING_CRAVINGS (3)
    cravings narrowed (picked some-but-not-all options). "Anything works" doesn't count —
    it matches every dish, so it's no preference.
  - Otherwise cap at MAX_PERFECT (8) so a no-preference run doesn't dump the whole menu.
Close matches:  only when perfect < 3 — the next-best dishes, capped at MAX_CLOSE (10).
```

Order is randomized within equal-score tiers, so it varies each time.

**Inline editing on results (`applyEdits`):** the results screen's "Your Preferences" card lets the user toggle a craving/constraint pill and tap "Update results" to re-rank in place — no full re-quiz. `applyEdits(newAnswers)` (in `useMakanQuiz.ts`) takes the edited answers directly (state is async) and recomputes matches in one shot.

The "Anything works (select all)" button (`handleDontCare`) selects all option **values** for the current craving, holds ~0.5s so the user sees the ticks, then advances. The constraints screen has no such button — it's skippable (tap "Find Food" with nothing selected).

---

## External Integrations

### Google Sheets (live dish data)
- **URL**: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSkL_ckVhScJ-qTo39tKf_1OlujLlE2ycGFRDhPCBUS6c83_VnWTy8CVxVN6O-SoYWcnLt7OfuaT0us/pub?gid=0&single=true&output=csv`
- Defined in: `src/utils/googleSheets.ts` as `GOOGLE_SHEET_CSV_URL`
- Fetched once on app mount in `useMakanQuiz.ts` (background; landing CTA doesn't wait). **No static fallback** — if the fetch fails, the results screen shows a retry. Header row + "Legend" tab are frozen/documented for editors.

### Google Apps Script (dish suggestions)
- **URL**: `https://script.google.com/macros/s/AKfycbxh-QtR5bmJ4tu-NcedHpnfqNkby9Kf3IjakuUCol1V6vqNfrp7kjWIobjBpJaScYB6Sw/exec`
- Defined in: `src/components/quiz/DishFeedback.tsx` as `GOOGLE_APPS_SCRIPT_URL`
- Receives a POST with `{ dish_name, user_preferences }` — must use `mode: 'no-cors'` (Apps Script limitation)

### Google Maps (find nearby)
- URL pattern: `https://maps.google.com/?q={dishName}+near+me`
- Defined in: `src/utils/mapsUtils.ts`

### Vercel Analytics
- Imported in `src/main.tsx` via `@vercel/analytics`
- Tracks page views automatically; no configuration needed

---

## Development Commands

```sh
npm run dev      # Start dev server at http://localhost:5174
npm run build    # Production build
npm run lint     # TypeScript type check (tsc --noEmit)
bun test         # Run tests (requires Bun)
```

No `.env` file needed — all URLs are hardcoded constants.

---

## Brand Tokens

Defined in `tailwind.config.ts` and usable as Tailwind classes anywhere.

| Tailwind token | Hex | Where used |
|----------------|-----|------------|
| `brand` | `#ed2a3a` | Buttons, borders, focus rings, active states |
| `brand-dark` | `#d12532` | Hover state for brand elements |
| `brand-light` | `#fef3f2` | Selected option background (very light pink) |
| `cream` | `#fff5ec` | App background |
| Font | System default | No custom font set |

---

## Gotchas

- **TypeScript strict mode is off**: `tsconfig.json` has `"strict": false`. Don't rely on strict null checks.
- **Craving tags are multi-value by design**: `moisture: ["Dry", "Saucy"]` means the dish matches either preference, not that it's both simultaneously.
- **No static dish fallback**: the Google Sheet is the only source of truth. If it's unavailable the app shows a retry screen — there's nothing to fall back to. Don't reintroduce a `dishes.ts`; edit the sheet.
- **Sheet column order is positional**: `parseCSVDishes` maps CSV columns by index. Reordering sheet columns breaks parsing — update the parser if you do.
- **No routing beyond `/`**: The app is a single-page flow. `NotFound.tsx` exists but there are no other routes.
- **Data fetching is manual**: All fetching uses `useEffect` + `fetch` directly. No data-fetching library.
- **CSP will block new external domains**: `vercel.json` sets a strict Content-Security-Policy. If you add a fetch/script/image from a *new* domain, the browser silently blocks it until you add that domain to the matching directive (`connect-src`, `script-src`, `img-src`, etc.) in `vercel.json`.
- **Canonical domain is `makan.taza.me`**: `makansg.vercel.app` 308-redirects to it. Keep absolute URLs (canonical, og:url, og:image, sitemap, robots) pointing at `makan.taza.me`.
