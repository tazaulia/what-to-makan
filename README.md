# What to Makan SG

**Live app → [makan.taza.me](https://makan.taza.me)**

Can't decide what to eat in Singapore? Answer a few quick questions about what you're craving and get matched with dishes — then find them nearby on Google Maps.

---

## How it works

1. **Five craving questions** — cuisine, moisture (dry / saucy / soupy), carb base, spiciness, and appetite. Each is a *soft* preference: the more a dish matches, the higher it ranks. Cravings nudge the results; they never rule a dish out.
2. **Optional food rules** — No pork, Not fried, High protein. These are hard filters layered on top, and the whole step is skippable.
3. **Results** — dishes that match all your cravings show up as perfect matches; when those are thin, the next-best dishes fill in so you always leave with options. Each result has a "Find nearby" button, and you can tweak a preference inline to re-rank without redoing the quiz.

---

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn-ui · deployed on Vercel

The dish data lives in a Google Sheet that the app reads live on load — so the menu can be updated without a redeploy.

---

## Local development

```sh
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5174
npm run build    # production build
npm run lint     # TypeScript type check (tsc --noEmit)
bun test         # run tests (requires Bun)
```

No environment variables required.

---

## Project layout

```
src/
├── pages/Index.tsx          # main page — renders Landing / Quiz / Results
├── hooks/useMakanQuiz.ts    # all quiz state and navigation
├── utils/foodMatcher.ts     # dish scoring and matching
├── data/questions.ts        # the craving questions + food-rules checklist
├── types/food.ts            # Dish / Question / UserAnswers interfaces
└── components/
    ├── screens/             # Landing, Question, Results
    ├── quiz/                # DishCard, DishFeedback, DotStepper
    ├── icons/               # answer icons
    └── ui/                  # shadcn-ui primitives
```

Architecture, data model, and the matching algorithm are documented in [CLAUDE.md](CLAUDE.md).
