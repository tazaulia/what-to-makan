
import React, { useState, useEffect } from 'react';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'none';
  onAnimationComplete?: () => void;
}

const SlideTransition: React.FC<SlideTransitionProps> = ({ 
  children, 
  direction,
  onAnimationComplete 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (direction !== 'none') {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onAnimationComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [direction, onAnimationComplete]);

  const getTransformClass = () => {
    if (!isAnimating) return 'translate-x-0';
    return direction === 'left' ? '-translate-x-full' : 'translate-x-full';
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`transition-transform duration-300 ease-in-out ${getTransformClass()}`}
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideTransition;
