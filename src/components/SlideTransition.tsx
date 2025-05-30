
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
  const [animationPhase, setAnimationPhase] = useState<'none' | 'exit' | 'enter'>('none');
  const [nextContent, setNextContent] = useState<React.ReactNode>(children);

  useEffect(() => {
    if (direction !== 'none' && isAnimating) {
      // Start exit animation
      setAnimationPhase('exit');
      
      const exitTimer = setTimeout(() => {
        // Update content and start enter animation
        setNextContent(children);
        setAnimationPhase('enter');
        
        const enterTimer = setTimeout(() => {
          // Animation complete
          setAnimationPhase('none');
          onAnimationComplete?.();
        }, 300);
        
        return () => clearTimeout(enterTimer);
      }, 300);
      
      return () => clearTimeout(exitTimer);
    } else {
      setNextContent(children);
      setAnimationPhase('none');
    }
  }, [direction, isAnimating, children, onAnimationComplete]);

  const getTransformClass = () => {
    if (animationPhase === 'none') return 'translate-x-0 opacity-100';
    
    if (animationPhase === 'exit') {
      // Current content exits in the direction of navigation
      if (direction === 'left') {
        return '-translate-x-full opacity-0'; // Exit left (going to next)
      } else {
        return 'translate-x-full opacity-0'; // Exit right (going to previous)
      }
    }
    
    if (animationPhase === 'enter') {
      // New content enters from opposite direction
      if (direction === 'left') {
        return 'translate-x-0 opacity-100'; // Enter from right (next question)
      } else {
        return 'translate-x-0 opacity-100'; // Enter from left (previous question)
      }
    }
    
    return 'translate-x-0 opacity-100';
  };

  const getInitialPosition = () => {
    if (animationPhase === 'enter') {
      if (direction === 'left') {
        return 'translate-x-full'; // Start from right (next question)
      } else {
        return '-translate-x-full'; // Start from left (previous question)
      }
    }
    return '';
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className={`transition-all duration-300 ease-in-out ${getInitialPosition()} ${getTransformClass()}`}
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        {animationPhase === 'exit' ? children : nextContent}
      </div>
    </div>
  );
};

export default SlideTransition;
