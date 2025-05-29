
import { Question } from '../types/food';

export const questions: Question[] = [
  {
    id: 'moisture',
    text: 'How would you like your food today?',
    options: ['Dry', 'Wet', 'Soupy'],
    category: 'moisture'
  },
  {
    id: 'protein',
    text: 'How protein-heavy should it be?',
    options: ['Light', 'Balanced', 'Meaty'],
    category: 'protein'
  },
  {
    id: 'carb',
    text: 'Which carb base should it be?',
    options: ['Rice', 'Noodle', 'Bread', 'No Carb'],
    category: 'carb'
  },
  {
    id: 'fried',
    text: 'Do you want fried or not fried?',
    options: ['Fried', 'Not Fried'],
    category: 'fried'
  },
  {
    id: 'spiciness',
    text: 'How spicy should it be?',
    options: ['Low', 'Mild', 'Spicy'],
    category: 'spiciness'
  },
  {
    id: 'appetite',
    text: 'How big of a meal should it be?',
    options: ['Snack', 'Light', 'Heavy'],
    category: 'appetite'
  }
];
