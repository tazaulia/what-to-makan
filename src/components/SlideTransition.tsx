
import React, { useState, useEffect } from 'react';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'none';
  onAnimationComplete?: () => void;
  isAnimating?: boolean;
}

const SlideTransition: React.FC<SlideTransitionProps> = ({ 
  children, 
  direction,
  onAnimationComplete,
  isAnimating = false
}) => {
  const [currentDirection, setCurrentDirection] = useState<'left' | 'right' | 'none'>('none');

  useEffect(() => {
    if (direction !== 'none' && isAnimating) {
      setCurrentDirection(direction);
      const timer = setTimeout(() => {
        setCurrentDirection('none');
        onAnimationComplete?.();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [direction, isAnimating, onAnimationComplete]);

  const getTransformClass = () => {
    if (!isAnimating || currentDirection === 'none') return 'translate-x-0 opacity-100';
    
    // Exit animation - current content slides out
    if (currentDirection === 'left') {
      return '-translate-x-full opacity-0';
    } else {
      return 'translate-x-full opacity-0';
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`transition-all duration-350 ease-in-out ${getTransformClass()}`}
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideTransition;
