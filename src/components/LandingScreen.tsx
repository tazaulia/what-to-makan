
import React from 'react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-full justify-between items-center text-center px-6">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          🍽️ What To Makan SG
        </h1>
        
        <div className="mb-12 space-y-3">
          <p className="text-lg md:text-xl text-gray-700">
            Hungry but brain cannot decide?
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Answer 6 questions, then can go makan already.
          </p>
        </div>

        <Button
          onClick={onStart}
          className="px-8 py-4 text-lg font-semibold bg-[#ed2a3a] text-white hover:bg-[#d12532] transition-colors rounded-xl"
        >
          Let's start!
        </Button>
      </div>

      <div className="pb-4">
        <p className="text-xs text-gray-500">
          Made by Taza in sunny Singapore ☀️
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;
