
import React, { useEffect } from 'react';
import { Dish, UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { getIconByOption } from './icons/AnswerIcons';

interface ResultsScreenProps {
  dishes: Dish[];
  answers: UserAnswers;
  onStartOver: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ dishes, answers, onStartOver }) => {
  useEffect(() => {
    // Ensure we start at the top of the results page
    window.scrollTo(0, 0);
  }, []);

  const randomCopyOptions = [
    "We read your taste, now you just makan.",
    "Aiyah, don't stress. Just pick from these.",
    "Hungry liao right? Faster choose.",
    "So picky ah. Ok lah here's your shortlist.",
    "Here you go, options confirm syiok.",
    "Scroll no more — whack one already.",
    "This one? Solid. That one? Also can."
  ];

  const getRandomCopy = () => {
    return randomCopyOptions[Math.floor(Math.random() * randomCopyOptions.length)];
  };

  const getCondensedPreferences = () => {
    const preferences: Array<{ option: string; icon: React.FC<any> }> = [];
    
    Object.entries(answers).forEach(([_, selectedOptions]) => {
      if (selectedOptions && selectedOptions.length > 0) {
        // For each category, show all selected options
        selectedOptions.forEach(option => {
          const IconComponent = getIconByOption(option);
          preferences.push({
            option,
            icon: IconComponent
          });
        });
      }
    });

    return preferences;
  };

  const condensedPreferences = getCondensedPreferences();

  return (
    <div className="min-h-screen bg-[#fff5ec] flex flex-col">
      <div className="flex flex-col h-full">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            🍽️ What to Makan SG
          </h1>
          <p className="text-sm md:text-base text-gray-600">{getRandomCopy()}</p>
        </div>

        {condensedPreferences.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Your Preferences:</h3>
            <div className="flex flex-wrap gap-2 items-center">
              {condensedPreferences.map(({ option, icon: IconComponent }, index) => (
                <React.Fragment key={`${option}-${index}`}>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                    <IconComponent className="w-3.5 h-3.5 text-gray-600" />
                    <span className="text-xs md:text-sm text-gray-700">{option}</span>
                  </div>
                  {index < condensedPreferences.length - 1 && (
                    <span className="text-gray-400 text-sm">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">
            Recommended Dishes ({dishes.length})
          </h2>
          
          {dishes.length > 0 ? (
            <div className="space-y-3 pb-6">
              {dishes.map((dish, index) => (
                <div
                  key={`${dish.name}-${index}`}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">{dish.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                No exact matches found. Try adjusting your preferences!
              </p>
            </div>
          )}
        </div>

        <div className="pt-6 border-t mt-6 mb-4 md:mb-0">
          <Button
            onClick={onStartOver}
            className="w-full py-3 bg-[#ed2a3a] hover:bg-[#d12532] text-white transition-colors text-sm md:text-base"
          >
            <RefreshCw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
