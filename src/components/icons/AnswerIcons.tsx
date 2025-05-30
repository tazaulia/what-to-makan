
import React from 'react';

// Simple emoji component wrapper
const EmojiIcon: React.FC<{ emoji: string; className?: string }> = ({ emoji, className }) => (
  <span className={className} style={{ fontSize: '1em' }}>{emoji}</span>
);

export const getIconByOption = (option: string): React.FC<{ className?: string }> => {
  const iconMap: { [key: string]: string } = {
    // Moisture
    'Dry': '🍽️',
    'Wet': '🍝', 
    'Soupy': '🍲',
    
    // Protein
    'Light Protein': '🥚',
    'Medium Protein': '🍛',
    'Protein-Dense': '🥩',
    
    // Carb
    'Rice': '🍚',
    'Noodle': '🍜',
    'Bread': '🥖',
    'Low Carb': '💨',
    
    // Fried
    'Fried': '🍳',
    'Not Fried': '🥣',
    
    // Spiciness
    'Mild': '🙂',
    'Medium': '🌶️',
    'Spicy': '🔥',
    
    // Appetite
    'Snack': '🍢',
    'Light Meal': '🍔',
    'Heavy Meal': '🍱'
  };

  const emoji = iconMap[option] || '❓';
  
  return ({ className }) => <EmojiIcon emoji={emoji} className={className} />;
};
