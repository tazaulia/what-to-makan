
import { Dish, UserAnswers } from '../types/food';
import { dishes } from '../data/dishes';

export interface MatchResults {
  perfectMatches: Dish[];
  closeMatches: Dish[];
}

export function findMatchingDishes(
  answers: UserAnswers,
  allDishes: Dish[] = dishes
): MatchResults {
  console.log('Finding matches with answers:', answers);
  
  // Calculate match score for each dish
  const dishScores = allDishes.map(dish => {
    let matchScore = 0;
    let totalQuestions = 0;

    // Check each answered question
    Object.entries(answers).forEach(([category, selectedOptions]) => {
      // Only process if there are actual selections (not empty array)
      if (selectedOptions && selectedOptions.length > 0) {
        totalQuestions++;
        
        // Check if dish has any of the selected options for this category
        const dishTags = dish.tags[category as keyof typeof dish.tags];
        const hasMatch = selectedOptions.some(option => dishTags.includes(option));
        
        console.log(`Dish: ${dish.name}, Category: ${category}, User selected: [${selectedOptions.join(', ')}], Dish has: [${dishTags.join(', ')}], Match: ${hasMatch}`);
        
        if (hasMatch) {
          matchScore++;
        }
      }
    });

    return {
      dish,
      score: matchScore,
      total: totalQuestions,
      mismatches: totalQuestions - matchScore
    };
  });

  console.log('Dish scores:', dishScores.map(d => ({ name: d.dish.name, score: d.score, total: d.total, mismatches: d.mismatches })));

  // Find perfect matches (score equals total questions)
  const perfectMatches = dishScores.filter(item => item.score === item.total && item.total > 0);
  
  // Find close matches (exactly 1 mismatch)
  const closeMatches = dishScores.filter(item => item.mismatches === 1 && item.total > 0);
  
  console.log('Perfect matches found:', perfectMatches.map(m => m.dish.name));
  console.log('Close matches found:', closeMatches.map(m => m.dish.name));

  return {
    perfectMatches: shuffleArray(perfectMatches.map(item => item.dish)),
    closeMatches: shuffleArray(closeMatches.map(item => item.dish))
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
