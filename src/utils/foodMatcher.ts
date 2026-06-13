
import { Dish, UserAnswers } from '../types/food';
import { questions } from '../data/questions';

export interface MatchResults {
  perfectMatches: Dish[];
  closeMatches: Dish[];
}

/** Craving questions are scored softly; every one the user answers nudges the ranking. */
const CRAVING_CATEGORIES: Array<keyof Dish['tags']> = [
  'cuisine',
  'moisture',
  'carb',
  'spiciness',
  'appetite',
];

/**
 * How many options each craving offers. Used to tell a real preference apart from
 * "Anything works" (every option selected) — picking all options is no preference at
 * all, since every dish then matches that category.
 */
const CRAVING_OPTION_COUNTS: Partial<Record<keyof Dish['tags'], number>> = {};
questions
  .filter(q => q.kind === 'craving')
  .forEach(q => {
    CRAVING_OPTION_COUNTS[q.category as keyof Dish['tags']] = q.options.length;
  });

/** Constraint values (see questions.ts) applied as hard filters on top of the cravings. */
const CONSTRAINTS_KEY = 'constraints';
const NO_FRIED = 'No Fried';
const NO_PORK = 'No Pork';
const HIGH_PROTEIN = 'High Protein';

/**
 * Show every perfect match when the user expressed real preference — but only then.
 * "Real preference" = at least this many cravings narrowed (picked some-but-not-all
 * options). Below it, the answers barely discriminate (e.g. "Anything works" on
 * everything makes the whole menu perfect), so we fall back to MAX_PERFECT to avoid
 * dumping the entire catalog.
 */
const MIN_DISCRIMINATING_CRAVINGS = 3;
/** Fallback cap on perfect matches when the user didn't really narrow things down. */
const MAX_PERFECT = 8;
/** When perfect matches are thin, top up with this many next-best dishes at most. */
const MAX_CLOSE = 10;

export function findMatchingDishes(
  answers: UserAnswers,
  allDishes: Dish[]
): MatchResults {
  const constraints = answers[CONSTRAINTS_KEY] || [];
  const noFried = constraints.includes(NO_FRIED);
  const noPork = constraints.includes(NO_PORK);
  const highProtein = constraints.includes(HIGH_PROTEIN);

  // 1. Hard filter on the food rules the user picked. fried/protein are multi-value,
  //    so "either way" dishes survive: a dish that *can* be non-fried passes "No fried",
  //    and a dish that *can* be protein-dense passes "High protein".
  const pool = allDishes.filter(dish => {
    if (noPork && dish.pork) return false;
    if (noFried && !dish.tags.fried.includes('Not Fried')) return false;
    if (highProtein && !dish.tags.protein.includes('Protein-Dense')) return false;
    return true;
  });

  // 2. Soft-score the cravings.
  const scored = pool.map(dish => {
    let score = 0;
    let total = 0;

    CRAVING_CATEGORIES.forEach(category => {
      const selected = answers[category];
      if (selected && selected.length > 0) {
        total++;
        const dishTags = dish.tags[category] || [];
        if (selected.some(option => dishTags.includes(option))) {
          score++;
        }
      }
    });

    return { dish, score, total, shuffle: Math.random() };
  });

  // 3. Rank: best craving score first, then random for variety within a tier.
  scored.sort((a, b) => b.score - a.score || a.shuffle - b.shuffle);

  const isPerfect = (item: typeof scored[number]) =>
    item.total > 0 && item.score === item.total;

  const perfect = scored.filter(isPerfect);

  // Count cravings that actually narrowed the field: picked at least one option but
  // not all of them. "Anything works" (all options) doesn't count — it matches every
  // dish, so it's no preference at all.
  const discriminatingCravings = CRAVING_CATEGORIES.filter(category => {
    const selected = answers[category];
    const optionCount = CRAVING_OPTION_COUNTS[category];
    return (
      selected &&
      selected.length > 0 &&
      (!optionCount || selected.length < optionCount)
    );
  }).length;

  // Show every perfect match when the user gave us real signal; otherwise cap it so a
  // no-preference run doesn't dump the whole menu.
  const showAllPerfect = discriminatingCravings >= MIN_DISCRIMINATING_CRAVINGS;
  const perfectMatches = (showAllPerfect ? perfect : perfect.slice(0, MAX_PERFECT))
    .map(item => item.dish);

  // Fill out the list with the next-best dishes when perfect matches are thin,
  // so the user always leaves with options instead of an empty screen.
  let closeMatches: Dish[] = [];
  if (perfect.length < 3) {
    closeMatches = scored
      .filter(item => !isPerfect(item))
      .slice(0, MAX_CLOSE)
      .map(item => item.dish);
  }

  return { perfectMatches, closeMatches };
}
