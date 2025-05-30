
import React from 'react';

interface IconProps {
  className?: string;
}

// Moisture icons
export const DryIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="1"/>
  </svg>
);

export const WetIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1"/>
    <path d="M20 8H4V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2z"/>
    <path d="M4 8v8c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V8"/>
    <path d="m8 12 2 2 2-2"/>
    <path d="m10 14 2 2 2-2"/>
  </svg>
);

export const SoupyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1"/>
    <path d="M20 8H4V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2z"/>
    <path d="M4 8v8c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V8"/>
    <path d="M7 4v2"/>
    <path d="M12 4v2"/>
    <path d="M17 4v2"/>
  </svg>
);

// Protein icons
export const LightIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

export const BalancedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    <path d="m16 14 2 2-2 2"/>
  </svg>
);

export const MeatyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"/>
    <path d="M17 17h3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"/>
    <path d="M7 7v10"/>
    <path d="M17 7v10"/>
    <path d="M9 7h6"/>
    <path d="M9 17h6"/>
  </svg>
);

// Carb icons
export const RiceIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
  </svg>
);

export const NoodleIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h18"/>
    <path d="M3 6h18"/>
    <path d="M3 18h18"/>
    <path d="m6 9 3 3-3 3"/>
    <path d="m18 9-3 3 3 3"/>
    <circle cx="8" cy="12" r="1"/>
    <circle cx="16" cy="12" r="1"/>
  </svg>
);

export const BreadIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <path d="M13 12h3"/>
    <path d="M8 12h1"/>
  </svg>
);

export const NoCarbIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    <path d="m15 9-6 6"/>
    <path d="m9 9 6 6"/>
  </svg>
);

// Fried icons
export const FriedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 22h18"/>
    <path d="M4 6h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"/>
    <path d="M6 4V2"/>
    <path d="M10 4V2"/>
    <path d="M14 4V2"/>
    <path d="M18 4V2"/>
    <circle cx="12" cy="11" r="2"/>
  </svg>
);

export const NotFriedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12h20"/>
    <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/>
    <path d="m4 8 4-4 4 4 4-4 4 4"/>
    <path d="M16 4h.01"/>
    <path d="M11 4h.01"/>
    <path d="M6 4h.01"/>
  </svg>
);

// Spiciness icons
export const LowIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    <path d="m15 9-6 6"/>
    <path d="m9 9 6 6"/>
  </svg>
);

export const MildIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

export const SpicyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.5 14.5A2.5 2.5 0 0 0 5 12c0-1.38-.5-2-1-3C2.928 6.857 3.776 4.946 6 3c.5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    <path d="M14.5 14.5A2.5 2.5 0 0 0 17 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

// Appetite icons
export const SnackIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
    <circle cx="12" cy="11" r="2"/>
    <circle cx="8" cy="15" r="1"/>
    <circle cx="16" cy="15" r="1"/>
  </svg>
);

export const LightMealIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    <circle cx="12" cy="12" r="8"/>
  </svg>
);

export const HeavyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
    <path d="M3 6h18"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
    <path d="M8 14h8"/>
    <path d="M10 18h4"/>
  </svg>
);

// Helper function to get icon by option text
export const getIconByOption = (option: string) => {
  const iconMap: { [key: string]: React.FC<IconProps> } = {
    'Dry': DryIcon,
    'Wet': WetIcon,
    'Soupy': SoupyIcon,
    'Light': LightMealIcon,
    'Balanced': BalancedIcon,
    'Meaty': MeatyIcon,
    'Rice': RiceIcon,
    'Noodle': NoodleIcon,
    'Bread': BreadIcon,
    'No Carb': NoCarbIcon,
    'Fried': FriedIcon,
    'Not Fried': NotFriedIcon,
    'Low': LowIcon,
    'Mild': MildIcon,
    'Spicy': SpicyIcon,
    'Snack': SnackIcon,
    'Heavy': HeavyIcon
  };
  
  return iconMap[option] || LowIcon;
};
