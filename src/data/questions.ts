
import { Question } from '../types/food';

export const questions: Question[] = [
  {
    id: 'moisture',
    text: 'How much sauce/soup do you want?',
    options: ['🍽️ Dry', '🍝 Wet', '🍲 Soupy'],
    category: 'moisture'
  },
  {
    id: 'protein',
    text: 'How much protein do you want?',
    options: ['🥚 Light Protein', '🍛 Medium Protein', '🥩 Protein-Dense'],
    category: 'protein'
  },
  {
    id: 'carb',
    text: 'What kind of carb do you want?',
    options: ['🍚 Rice', '🍜 Noodle', '🥖 Bread', '🚫🍞 Low Carb'],
    category: 'carb'
  },
  {
    id: 'fried',
    text: 'Do you want it fried?',
    options: ['🍳 Fried', '🥣 Not Fried'],
    category: 'fried'
  },
  {
    id: 'spiciness',
    text: 'How spicy do you want it?',
    options: ['🚫🌶️ Mild', '🌶️ Medium', '🔥 Spicy'],
    category: 'spiciness'
  },
  {
    id: 'appetite',
    text: 'How hungry are you?',
    options: ['🍢 Snack', '🍔 Light Meal', '🍱 Heavy Meal'],
    category: 'appetite'
  }
];
