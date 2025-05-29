
import { Dish, UserAnswers } from '../types/food';
import { dishes } from '../data/dishes';

export function findMatchingDishes(answers: UserAnswers): Dish[] {
  // Calculate match score for each dish
  const dishScores = dishes.map(dish => {
    let matchScore = 0;
    let totalQuestions = 0;

    // Check each answered question
    Object.entries(answers).forEach(([category, selectedOptions]) => {
      if (selectedOptions.length > 0) {
        totalQuestions++;
        
        // Check if dish has any of the selected options for this category
        const dishTags = dish.tags[category as keyof typeof dish.tags];
        const hasMatch = selectedOptions.some(option => dishTags.includes(option));
        
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

  // First try to find perfect matches
  const perfectMatches = dishScores.filter(item => item.score === item.total);
  
  if (perfectMatches.length > 0) {
    return shuffleArray(perfectMatches.map(item => item.dish));
  }

  // If no perfect matches, return dishes with highest scores
  const maxScore = Math.max(...dishScores.map(item => item.score));
  const bestMatches = dishScores.filter(item => item.score === maxScore);
  
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
