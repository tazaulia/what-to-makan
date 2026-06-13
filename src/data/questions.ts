
import { Question } from '../types/food';

export const questions: Question[] = [
  {
    id: 'cuisine',
    category: 'cuisine',
    kind: 'craving',
    text: 'Craving any cuisine in particular?',
    helper: 'Pick one, a few, or just tap "anything".',
    options: [
      { label: 'Chinese', value: 'Chinese' },
      { label: 'Malay', value: 'Malay' },
      { label: 'Indonesian', value: 'Indonesian' },
      { label: 'Indian', value: 'Indian' },
      { label: 'Japanese', value: 'Japanese' },
      { label: 'Korean', value: 'Korean' },
      { label: 'Thai', value: 'Thai' },
      { label: 'Vietnamese', value: 'Vietnamese' },
      { label: 'Western', value: 'Western' },
    ],
  },
  {
    id: 'moisture',
    category: 'moisture',
    kind: 'craving',
    text: 'Dry, saucy, or soupy?',
    options: [
      { label: 'Dry', value: 'Dry' },
      { label: 'Saucy', value: 'Saucy' },
      { label: 'Soupy', value: 'Soupy' },
    ],
  },
  {
    id: 'carb',
    category: 'carb',
    kind: 'craving',
    text: "What's the base?",
    options: [
      { label: 'Rice', value: 'Rice' },
      { label: 'Noodles', value: 'Noodle' },
      { label: 'Bread', value: 'Bread' },
      { label: 'Low carb', value: 'Low Carb' },
    ],
  },
  {
    id: 'spiciness',
    category: 'spiciness',
    kind: 'craving',
    text: 'How much heat?',
    options: [
      { label: 'Mild', value: 'Mild' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Spicy', value: 'Spicy' },
    ],
  },
  {
    id: 'appetite',
    category: 'appetite',
    kind: 'craving',
    text: 'How hungry are you?',
    options: [
      { label: 'Snack', value: 'Snack' },
      { label: 'Light meal', value: 'Light Meal' },
      { label: 'Full meal', value: 'Heavy Meal' },
    ],
  },
  {
    id: 'constraints',
    category: 'constraints',
    kind: 'constraints',
    text: 'Any food rules today?',
    helper: 'Pick any that apply — or just skip.',
    options: [
      { label: 'No fried', value: 'No Fried' },
      { label: 'High protein', value: 'High Protein' },
      { label: 'No pork', value: 'No Pork' },
    ],
  },
];
