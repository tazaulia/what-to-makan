
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full px-6">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {/* Hero mark — leads the stagger */}
        <div
          className="text-6xl md:text-7xl mb-6 animate-in fade-in zoom-in-95 duration-700 ease-out-strong fill-mode-both"
          style={{ animationDelay: '40ms' }}
          aria-hidden="true"
        >
          🍽️
        </div>

        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out-strong fill-mode-both"
          style={{ animationDelay: '120ms' }}
        >
          What to Makan SG
        </h1>

        <p
          className="mt-4 max-w-[17rem] text-base md:text-lg leading-relaxed text-gray-500 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out-strong fill-mode-both"
          style={{ animationDelay: '220ms' }}
        >
          Answer 6 quick questions and we'll tell you what to eat — plus where to find it nearby.
        </p>

        <div
          className="mt-10 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out-strong fill-mode-both"
          style={{ animationDelay: '340ms' }}
        >
          <Button
            onClick={onStart}
            className="px-8 py-6 text-base font-semibold bg-brand text-white hover:bg-brand-dark transition-colors rounded-lg"
          >
            Tell me what to makan
          </Button>
        </div>
      </div>

      <div className="pb-8 text-center animate-in fade-in duration-1000 fill-mode-both" style={{ animationDelay: '500ms' }}>
        <p className="text-xs text-gray-400">
          Built when hungry by{' '}
          <a
            href="https://www.taza.me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gray-300 underline-offset-2 hover:text-gray-600 hover:decoration-gray-400 transition-colors"
          >
            Taza Aulia
          </a>
          {' '}in Singapore
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;
