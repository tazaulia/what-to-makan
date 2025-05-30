
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
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(children);
  const [nextContent, setNextContent] = useState<React.ReactNode>(children);

  useEffect(() => {
    if (direction !== 'none' && isAnimating) {
      // Store the new content but don't show it yet
      setNextContent(children);
      
      // Start exit animation with current content
      setAnimationPhase('exit');
      
      const exitTimer = setTimeout(() => {
        // Switch to new content and start enter animation
        setCurrentContent(children);
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
      setCurrentContent(children);
      setNextContent(children);
      setAnimationPhase('none');
    }
  }, [direction, isAnimating, children, onAnimationComplete]);

  const getTransformClass = () => {
    if (animationPhase === 'none') return 'translate-x-0 opacity-100';
    
    if (animationPhase === 'exit') {
      // Current content exits in the direction of navigation
      if (direction === 'left') {
        return '-translate-x-full opacity-0'; // Exit left (going forward)
      } else {
        return 'translate-x-full opacity-0'; // Exit right (going backward)
      }
    }
    
    if (animationPhase === 'enter') {
      // New content enters from opposite direction and settles in center
      return 'translate-x-0 opacity-100';
    }
    
    return 'translate-x-0 opacity-100';
  };

  const getInitialPosition = () => {
    if (animationPhase === 'enter') {
      // New content starts from opposite side of exit direction
      if (direction === 'left') {
        return 'translate-x-full opacity-0'; // Start from right (going forward)
      } else {
        return '-translate-x-full opacity-0'; // Start from left (going backward)
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
        {currentContent}
      </div>
    </div>
  );
};

export default SlideTransition;
