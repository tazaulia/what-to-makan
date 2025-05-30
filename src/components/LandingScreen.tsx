
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full justify-between items-center text-center px-4">
      <div className="flex-1 flex flex-col justify-center items-center mt-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
          🍽️ What to Makan SG
        </h1>
        
        <div className="mb-6 md:mb-8 space-y-2">
          <p className="text-sm md:text-base text-gray-700">
            Hungry but brain cannot decide?
          </p>
          <p className="text-xs md:text-sm text-gray-600">
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

      <div className="pb-8 md:pb-12">
        <p className="text-xs md:text-sm text-gray-500">
          Made by{' '}
          <a 
            href="https://www.instagram.com/yaboitaza" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-gray-700 transition-colors"
          >
            Taza Aulia
          </a>
          {' '}in sunny Singapore ☀️
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;
