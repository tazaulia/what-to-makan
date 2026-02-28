# What to Makan SG

**Live app → [makansg.vercel.app](https://makansg.vercel.app)**

A food recommendation quiz for Singapore. Answer 6 quick questions about what you're in the mood for, and get matched with a dish.

---

## How it works

1. **Answer 6 questions** — moisture level, protein amount, carb type, fried or not, spiciness, and meal size
2. **Matching** — your answers are compared against tags on ~70 dishes; dishes that match all your answers are "perfect matches", dishes with exactly one mismatch are "close matches"
3. **Results** — matched dishes are shown with a "Find nearby" button that opens Google Maps

---

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn-ui

---

## Local setup

```sh
# Install dependencies
npm install

# Start dev server (http://localhost:5174)
npm run dev

# Type check
npm run lint

# Run tests
bun test
```

No environment variables required — the app uses hardcoded Google Sheets and Google Apps Script URLs for live data and feedback collection.

---

## Adding dishes

Edit `src/data/dishes.ts` to add or modify dishes. The app also fetches from a live Google Sheet on startup, which overrides the static file if the fetch succeeds.

See `CLAUDE.md` for full details on the tag system, matching algorithm, and all external integrations.
