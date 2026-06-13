
import { Dish, UserAnswers } from '../types/food';

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

/** Constraint values (see questions.ts) applied as hard filters on top of the cravings. */
const CONSTRAINTS_KEY = 'constraints';
const NO_FRIED = 'No Fried';
const NO_PORK = 'No Pork';
const HIGH_PROTEIN = 'High Protein';

/** Aim to always surface around this many dishes so the user never hits a dead end. */
const TARGET_RESULTS = 6;
/** Cap perfect matches so the list stays scannable when the user is easy to please. */
const MAX_PERFECT = 8;

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
  const perfectMatches = perfect.slice(0, MAX_PERFECT).map(item => item.dish);

  // Fill out the list with the next-best dishes when perfect matches are thin,
  // so the user always leaves with options instead of an empty screen.
  let closeMatches: Dish[] = [];
  if (perfect.length < 3) {
    const need = TARGET_RESULTS - perfectMatches.length;
    closeMatches = scored
      .filter(item => !isPerfect(item))
      .slice(0, Math.max(0, need))
      .map(item => item.dish);
  }

  return { perfectMatches, closeMatches };
}
