# CLAUDE.md — What to Makan SG

**Live app**: https://makansg.vercel.app

A food recommendation quiz for Singapore. Users answer 6 questions about what they're in the mood for, and the app matches them against a database of ~70 dishes.

---

## Architecture

```
User answers 6 questions
        ↓
useMakanQuiz (hook) — manages all quiz state
        ↓
findMatchingDishes(answers, dishes) — scoring algorithm
        ↓
ResultsScreen — shows perfect matches + close matches
```

**Page flow**: `LandingScreen` → `QuestionScreen` (×6 with slide transitions) → `ResultsScreen`

All quiz state lives in one hook: `src/hooks/useMakanQuiz.ts`. The page component (`src/pages/Index.tsx`) just reads from it.

---

## Key Files

| File | Role |
|------|------|
| `src/hooks/useMakanQuiz.ts` | All quiz state and navigation logic |
| `src/utils/foodMatcher.ts` | Dish scoring and matching algorithm |
| `src/data/dishes.ts` | Static dish database (69 dishes, fallback) |
| `src/data/questions.ts` | The 6 quiz questions |
| `src/types/food.ts` | TypeScript interfaces: `Dish`, `Question`, `UserAnswers` |
| `src/utils/googleSheets.ts` | Fetches live dish data from Google Sheets CSV |
| `src/components/DishFeedback.tsx` | "Missing a dish?" suggestion form → Google Apps Script |
| `src/utils/mapsUtils.ts` | Opens Google Maps search for a dish |
| `src/utils/sanitize.ts` | Strips HTML tags from user-submitted dish names |
| `src/pages/Index.tsx` | Main page — renders Landing / Quiz / Results |
| `src/components/DishCard.tsx` | Single dish result card with name + Google Maps button |
| `src/App.tsx` | Root — TooltipProvider, Router |

The `src/components/ui/` folder contains 7 shadcn-ui components: `button`, `checkbox`, `toaster`, `toast`, `sonner`, `tooltip`, `use-toast`.

---

## The Tag System

Every dish has tags across 6 categories. Each question maps to one category. Tags on a dish can be multi-value (e.g. `moisture: ["Dry", "Wet"]` means the dish works for both).

### Valid tag values per category

| Category | Valid values |
|----------|-------------|
| `moisture` | `"Dry"`, `"Wet"`, `"Soupy"` |
| `protein` | `"Light Protein"`, `"Medium Protein"`, `"Protein-Dense"` |
| `carb` | `"Rice"`, `"Noodle"`, `"Bread"`, `"Low Carb"` |
| `fried` | `"Fried"`, `"Not Fried"` |
| `spiciness` | `"Mild"`, `"Medium"`, `"Spicy"` |
| `appetite` | `"Snack"`, `"Light Meal"`, `"Heavy Meal"` |

These exact strings are shared between `questions.ts` (as `options`) and `dishes.ts` (as tag values). They must match exactly for the algorithm to work.

---

## How to Add a Dish

**Option A — Static data (instant, always works):**

Add an entry to `src/data/dishes.ts`:

```typescript
{
  name: "Bak Chor Mee",
  tags: {
    moisture: ["Dry", "Wet"],
    protein: ["Medium Protein"],
    carb: ["Noodle"],
    fried: ["Not Fried"],
    spiciness: ["Mild"],
    appetite: ["Light Meal"],
  },
},
```

Rules:
- All 6 tag categories must be present
- Use only the valid values listed in the tag system above
- A dish can have multiple tags per category (means "matches any of these")

**Option B — Google Sheet (live data, overrides static on app load):**

The app fetches from a public Google Sheet on startup. If the fetch succeeds, its data replaces the static dishes. To add a dish via the sheet, add a row with these columns (pipe-separated for multi-values):

```
name | moisture | protein | carb | fried | spiciness | appetite
Bak Chor Mee | Dry|Wet | Medium Protein | Noodle | Not Fried | Mild | Light Meal
```

---

## How to Add a Question

1. Add a new entry to `src/data/questions.ts` with a new `id` and `category`
2. Add the new `category` key to the `Dish.tags` interface in `src/types/food.ts`
3. Add the new tag array to every dish entry in `src/data/dishes.ts`
4. Add emoji icons for the new options in `src/components/icons/AnswerIcons.tsx`

The `category` field on a question must match a key in `Dish['tags']` — TypeScript enforces this.

---

## Matching Algorithm (`src/utils/foodMatcher.ts`)

```
For each dish:
  score = 0, total = 0
  For each answered question (category):
    total++
    if dish.tags[category] includes ANY of the user's selected options:
      score++
  mismatches = total - score

Perfect matches: mismatches === 0
Close matches:   mismatches === 1
```

Both result lists are shuffled randomly before display, so order varies each time.

The "I'm fine with anything" button (`handleDontCare`) selects all options for the current question and advances — guaranteeing a match for that category.

---

## External Integrations

### Google Sheets (live dish data)
- **URL**: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSkL_ckVhScJ-qTo39tKf_1OlujLlE2ycGFRDhPCBUS6c83_VnWTy8CVxVN6O-SoYWcnLt7OfuaT0us/pub?gid=0&single=true&output=csv`
- Defined in: `src/utils/googleSheets.ts` as `GOOGLE_SHEET_CSV_URL`
- Fetched once on app mount in `useMakanQuiz.ts`; falls back to `dishes.ts` if fetch fails

### Google Apps Script (dish suggestions)
- **URL**: `https://script.google.com/macros/s/AKfycbxh-QtR5bmJ4tu-NcedHpnfqNkby9Kf3IjakuUCol1V6vqNfrp7kjWIobjBpJaScYB6Sw/exec`
- Defined in: `src/components/DishFeedback.tsx` as `GOOGLE_APPS_SCRIPT_URL`
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
- **Dish tags are multi-value by design**: `moisture: ["Dry", "Wet"]` means the dish matches either preference, not that it's both simultaneously.
- **No routing beyond `/`**: The app is a single-page flow. `NotFound.tsx` exists but there are no other routes.
- **Data fetching is manual**: All fetching uses `useEffect` + `fetch` directly. No data-fetching library.
