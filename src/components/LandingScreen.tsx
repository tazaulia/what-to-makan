
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full justify-center items-center text-center px-4 pt-16 pb-16">
      <div className="flex-1 flex flex-col justify-center items-center max-w-sm mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
          🍽️ What to Makan SG
        </h1>

        <div className="mb-5 md:mb-6 space-y-1.5">
          <p className="text-base md:text-lg text-gray-700">
            Hungry but brain cannot decide?
          </p>
          <p className="text-sm md:text-base text-gray-600">
            Answer 6 questions, then can go makan already.
          </p>
        </div>

        <Button
          onClick={onStart}
          className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold bg-[#ed2a3a] text-white hover:bg-[#d12532] transition-colors rounded-lg"
        >
          Let's start!
        </Button>
      </div>

      <div className="mt-auto pb-12 md:pb-16">
        <p className="text-xs text-gray-500">
          Built when hungry by{' '}
          <a
            href="https://www.instagram.com/yaboitaza"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700 transition-colors"
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
