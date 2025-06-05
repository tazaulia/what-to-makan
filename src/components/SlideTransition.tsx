
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
    const offscreen = direction === 'left'
      ? 'translate-x-[100vw]'
      : '-translate-x-[100vw]';

    switch (animationPhase) {
      case 'exit':
        return direction === 'left'
          ? '-translate-x-[100vw] opacity-0'
          : 'translate-x-[100vw] opacity-0';
      case 'enter-start':
        return offscreen + ' opacity-0';
      case 'enter':
        return 'translate-x-0 opacity-100';
      default:
        return 'translate-x-0 opacity-100';
    }
  };

  return (
    <div className="relative overflow-hidden h-full w-full">
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out ${getTransformClass()}`}
        style={{ pointerEvents: isAnimating ? 'none' : 'auto' }}
      >
        {currentContent}
      </div>
    </div>
  );
};

export default SlideTransition;
