
import React from 'react';

// Simple emoji component wrapper
const EmojiIcon: React.FC<{ emoji: string; className?: string }> = ({ emoji, className }) => (
  <span className={`${className} flex items-center justify-center`} style={{ fontSize: '1em', lineHeight: '1' }}>{emoji}</span>
);

export const getIconByOption = (option: string): React.FC<{ className?: string }> => {
  const iconMap: { [key: string]: string } = {
    // Cuisine
    'Chinese': '🥢',
    'Malay': '🥥',
    'Indonesian': '🍢',
    'Indian': '🍛',
    'Japanese': '🍱',
    'Korean': '🍲',
    'Thai': '🍤',
    'Vietnamese': '🍜',
    'Western': '🍔',

    // Moisture
    'Dry': '🍽️',
    'Saucy': '🍝',
    'Soupy': '🥣',

    // Protein
    'Light Protein': '🥚',
    'Medium Protein': '🍗',
    'Protein-Dense': '🥩',

    // Carb
    'Rice': '🍚',
    'Noodle': '🍜',
    'Bread': '🥖',
    'Low Carb': '🥗',

    // Fried
    'Fried': '🍳',
    'Not Fried': '🍵',

    // Spiciness
    'Mild': '🙂',
    'Medium': '🌶️',
    'Spicy': '🔥',

    // Appetite
    'Snack': '🍢',
    'Light Meal': '🍙',
    'Heavy Meal': '🍱',

    // Constraints
    'No Fried': '🥗',
    'High Protein': '💪',
    'No Pork': '🚫',
  };

  const emoji = iconMap[option] || '❓';
  
  return ({ className }) => <EmojiIcon emoji={emoji} className={className} />;
};
