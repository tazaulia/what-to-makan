
import React, { useState, useEffect } from 'react';

interface SlideTransitionProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'none';
  onAnimationComplete?: () => void;
  isAnimating?: boolean;
}

type Phase = 'none' | 'exit' | 'enter-start' | 'enter';

const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  direction,
  onAnimationComplete,
  isAnimating = false
}) => {
  const [animationPhase, setAnimationPhase] = useState<Phase>('none');
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(children);

  useEffect(() => {
    if (direction !== 'none' && isAnimating) {
      setAnimationPhase('exit');

      const exitTimer = setTimeout(() => {
        setCurrentContent(children);
        setAnimationPhase('enter-start');

        requestAnimationFrame(() => setAnimationPhase('enter'));

        const enterTimer = setTimeout(() => {
          setAnimationPhase('none');
          onAnimationComplete?.();
        }, 300);

        return () => clearTimeout(enterTimer);
      }, 300);

      return () => clearTimeout(exitTimer);
    } else {
      setCurrentContent(children);
      setAnimationPhase('none');
    }
  }, [direction, isAnimating, children, onAnimationComplete]);

  const getTransformClass = () => {
    switch (animationPhase) {
      case 'exit':
        return direction === 'left'
          ? '-translate-x-full opacity-0'
          : 'translate-x-full opacity-0';
      case 'enter-start':
        return direction === 'left'
          ? 'translate-x-full opacity-0'
          : '-translate-x-full opacity-0';
      case 'enter':
        return 'translate-x-0 opacity-100';
      default:
        return 'translate-x-0 opacity-100';
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${getTransformClass()}`}
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        {currentContent}
      </div>
    </div>
  );
};

export default SlideTransition;
