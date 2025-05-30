
import React from 'react';

interface IconProps {
  className?: string;
}

// Moisture icons
export const DryIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
    <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"/>
    <path d="m1 12 6 0m6 0 6 0"/>
    <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24"/>
  </svg>
);

export const WetIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
    <path d="M12.56 6.6A13.1 13.1 0 0 0 14 3.02c.5 2.5 2.04 4.6 4.14 5.93s3.73 2.85 3.86 4.657a6.61 6.61 0 0 1-2.218 5.123"/>
  </svg>
);

export const SoupyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1"/>
    <path d="M20 8H4V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2z"/>
    <path d="M4 8v8c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V8"/>
    <path d="m7 13 3-3 3 3"/>
  </svg>
);

// Protein icons
export const LightIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4"/>
    <path d="m12 2 3 10-3 10-3-10 3-10z"/>
  </svg>
);

export const BalancedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m9 12 2 2 4-4"/>
    <path d="M21 12c.552 0 1-.448 1-1V8a2 2 0 0 0-2-2h-3l-2-3H9L7 6H4a2 2 0 0 0-2 2v3c0 .552.448 1 1 1"/>
    <path d="M3 13v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"/>
  </svg>
);

export const MeatyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 12H7"/>
    <path d="M19 15c0 1.8-1.5 3-2 3s-2-1.2-2-3 .5-3 2-3 2 1.2 2 3z"/>
    <path d="M1 15c0 1.8 1.5 3 2 3s2-1.2 2-3-.5-3-2-3-2 1.2-2 3z"/>
    <path d="M9 12c0 1.8-1.5 3-2 3s-2-1.2-2-3 .5-3 2-3 2 1.2 2 3z"/>
    <path d="M19 9c0 1.8-1.5 3-2 3s-2-1.2-2-3 .5-3 2-3 2 1.2 2 3z"/>
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
    <circle cx="12" cy="12" r="10"/>
    <path d="m15 9-6 6"/>
    <path d="m9 9 6 6"/>
  </svg>
);

// Fried icons
export const FriedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

export const NotFriedIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
    <path d="M12.56 6.6A13.1 13.1 0 0 0 14 3.02c.5 2.5 2.04 4.6 4.14 5.93s3.73 2.85 3.86 4.657a6.61 6.61 0 0 1-2.218 5.123"/>
    <circle cx="12" cy="12" r="10"/>
    <path d="m15 9-6 6"/>
    <path d="m9 9 6 6"/>
  </svg>
);

// Spiciness icons
export const LowIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export const MildIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="6"/>
  </svg>
);

export const SpicyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    <path d="M8 12h8"/>
    <path d="M12 8v8"/>
  </svg>
);

// Appetite icons
export const SnackIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

export const LightMealIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

export const HeavyIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="3"/>
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
