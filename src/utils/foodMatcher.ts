
import { Dish, UserAnswers } from '../types/food';
import { dishes } from '../data/dishes';

export function findMatchingDishes(answers: UserAnswers): Dish[] {
  console.log('Finding matches with answers:', answers);
  
  // Calculate match score for each dish
  const dishScores = dishes.map(dish => {
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
      total: totalQuestions
    };
  });

  console.log('Dish scores:', dishScores.map(d => ({ name: d.dish.name, score: d.score, total: d.total })));

  // First try to find perfect matches
  const perfectMatches = dishScores.filter(item => item.score === item.total && item.total > 0);
  
  if (perfectMatches.length > 0) {
    console.log('Perfect matches found:', perfectMatches.map(m => m.dish.name));
    return shuffleArray(perfectMatches.map(item => item.dish));
  }

  // If no perfect matches, return dishes with highest scores (but must have at least 1 match)
  const maxScore = Math.max(...dishScores.map(item => item.score));
  const bestMatches = dishScores.filter(item => item.score === maxScore && item.score > 0);
  
  console.log('Best matches found:', bestMatches.map(m => m.dish.name));
  return shuffleArray(bestMatches.map(item => item.dish));
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
