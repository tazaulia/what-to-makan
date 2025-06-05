import React, { useEffect } from 'react';
import { UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { getIconByOption } from './icons/AnswerIcons';
import { MatchResults } from '../utils/foodMatcher';
import { questions } from '../data/questions';

interface ResultsScreenProps {
  matchResults: MatchResults;
  answers: UserAnswers;
  onStartOver: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ matchResults, answers, onStartOver }) => {
  useEffect(() => {
    // Ensure we start at the top of the results page
    window.scrollTo(0, 0);
  }, []);

  const randomCopyOptions = [
    "We read your taste, now you just pick.",
    "Aiyah, don't stress. Just pick one of these.",
    "Hungry liao right? Faster choose.",
    "So picky ah. Ok bo here's your list.",
    "Here you go, options confirm shiok.",
    "Scroll no more — whack one already.",
    "Wah, your appetite today quite solid hor.",
    "The faster you pick, the faster you eat.",
    "Walao. You pick so slow, later stall close liao!",
    "Got noodle, got rice, got everything lah.",
    "Confirm got something you like inside.",
    "Got taste sia. These picks all confirm sedap.",
    "This list, your ahma also approve one.",
    "This one? Solid. That one? Also can."
  ];

  const getRandomCopy = () => {
    return randomCopyOptions[Math.floor(Math.random() * randomCopyOptions.length)];
  };

  const getCondensedPreferences = () => {
    const preferences: Array<{ option: string; icon: React.FC<any> }> = [];
    
    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      if (selectedOptions && selectedOptions.length > 0) {
        // Find the question to get all possible options
        const question = questions.find(q => q.id === questionId);
        if (question) {
          // Only show if user didn't select all options (equivalent to don't care)
          if (selectedOptions.length < question.options.length) {
            selectedOptions.forEach(option => {
              const IconComponent = getIconByOption(option);
              preferences.push({
                option,
                icon: IconComponent
              });
            });
          }
        }
      }
    });

    return preferences;
  };

  const condensedPreferences = getCondensedPreferences();
  const { perfectMatches, closeMatches } = matchResults;

  const showCloseMatches = perfectMatches.length < 3 && closeMatches.length > 0;
  const showNoMatchesMessage = perfectMatches.length === 0;

  return (
    <div className="min-h-screen bg-[#fff5ec] flex flex-col">
      <div className="flex flex-col h-full">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            🍽️ What to Makan SG
          </h1>
          <p className="text-sm md:text-base text-gray-600">{getRandomCopy()}</p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">Your Preferences:</h3>
          {condensedPreferences.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {condensedPreferences.map(({ option, icon: IconComponent }, index) => (
                <div key={`${option}-${index}`} className="flex items-center gap-2 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                  <IconComponent className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center" />
                  <span className="text-xs md:text-sm text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="font-bold text-gray-600 text-sm md:text-base">
                You like... everything? Wah, so chill one.
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                Hope you're ready for some random food magic.
              </p>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">
            Perfect Matches ({perfectMatches.length})
          </h2>
          
          {showNoMatchesMessage && (
            <div className="mb-6 text-center">
              {closeMatches.length > 0 ? (
                <>
                  <p className="font-bold italic text-gray-600 text-sm md:text-base">
                    Wah…your taste very unique sia.
                  </p>
                  <p className="italic text-gray-600 text-sm md:text-base">
                    No perfect matches, but these ones come pretty close!
                  </p>
                </>
              ) : (
                <>
                  <p className="italic text-gray-600 text-sm md:text-base">
                    This combo so weird, even AI also give up.
                  </p>
                  <p className="italic text-gray-600 text-sm md:text-base">
                    You beat the makan algorithm. Power lah. Now try again but change your answer!
                  </p>
                </>
              )}
            </div>
          )}
          
          {perfectMatches.length > 0 && (
            <div className="space-y-3 mb-6">
              {perfectMatches.map((dish, index) => (
                <div
                  key={`${dish.name}-${index}`}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">{dish.name}</h3>
                </div>
              ))}
            </div>
          )}

          {showCloseMatches && (
            <>
              <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4">
                Close Matches ({closeMatches.length})
              </h2>
              <div className="space-y-3 pb-6">
                {closeMatches.map((dish, index) => (
                  <div
                    key={`${dish.name}-${index}`}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">{dish.name}</h3>
                  </div>
                ))}
              </div>
            </>
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
