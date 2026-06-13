import React, { useEffect, useState } from 'react';
import { UserAnswers } from '../../types/food';
import { Button } from '@/components/ui/button';
import { RefreshCw, Pencil, Check } from 'lucide-react';
import { getIconByOption } from '../icons/AnswerIcons';
import { MatchResults } from '../../utils/foodMatcher';
import { questions } from '../../data/questions';
import { openDishInMaps } from '../../utils/mapsUtils';
import DishFeedback from '../quiz/DishFeedback';
import DishCard from '../quiz/DishCard';

interface ResultsScreenProps {
  matchResults: MatchResults;
  answers: UserAnswers;
  onStartOver: () => void;
  /** Commit edited answers and re-rank the dishes, staying on the results screen. */
  onApplyEdits: (newAnswers: UserAnswers) => void;
}

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

const getRandomCopy = () => randomCopyOptions[Math.floor(Math.random() * randomCopyOptions.length)];

const ResultsScreen: React.FC<ResultsScreenProps> = ({ matchResults, answers, onStartOver, onApplyEdits }) => {
  useEffect(() => {
    // Ensure we start at the top of the results page
    window.scrollTo(0, 0);
  }, []);

  // Pick the Singlish subtitle once on mount; only re-roll when the user
  // commits an edit (not on every render, e.g. toggling a pill mid-edit).
  const [copy, setCopy] = useState(getRandomCopy);

  // Inline editing: tweak one preference without redoing the whole quiz.
  // `draft` is a working copy so "Cancel" can discard without touching results.
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<UserAnswers>(answers);

  const openEdit = () => {
    setDraft(answers);
    setIsEditing(true);
  };

  const cancelEdit = () => setIsEditing(false);

  const applyEdit = () => {
    onApplyEdits(draft);
    setCopy(getRandomCopy());
    setIsEditing(false);
    window.scrollTo(0, 0);
  };

  const toggleDraft = (questionId: string, value: string) => {
    setDraft(prev => {
      const current = prev[questionId] || [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [questionId]: next };
    });
  };

  const getCondensedPreferences = () => {
    const preferences: Array<{ option: string; icon: React.FC<any> }> = [];
    
    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      if (selectedOptions && selectedOptions.length > 0) {
        // Find the question to get all possible options
        const question = questions.find(q => q.id === questionId);
        if (question) {
          // For cravings, selecting every option means "don't care" — skip it.
          // Constraints are always meaningful, so always show them.
          const isDontCare = question.kind === 'craving' && selectedOptions.length === question.options.length;
          if (!isDontCare) {
            selectedOptions.forEach(value => {
              const matchedOption = question.options.find(o => o.value === value);
              preferences.push({
                option: matchedOption ? matchedOption.label : value,
                icon: getIconByOption(value)
              });
            });
          }
        }
      }
    });

    return preferences;
  };

  const handleDishSubmission = (_dishName: string) => {};

  const handleLocationClick = (dishName: string) => {
    openDishInMaps(dishName);
  };

  const condensedPreferences = getCondensedPreferences();
  const { perfectMatches, closeMatches } = matchResults;

  const showCloseMatches = perfectMatches.length < 3 && closeMatches.length > 0;
  const showNoMatchesMessage = perfectMatches.length === 0;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="flex flex-col h-full">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
            🍽️ What to Makan SG
          </h1>
          <p className="text-sm md:text-base text-gray-600">{copy}</p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Your Preferences:</h3>
            {!isEditing && (
              <button
                onClick={openEdit}
                className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-brand hover:text-brand-dark transition-colors"
                aria-label="Edit your preferences"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              {questions.map(question => (
                <div key={question.id}>
                  <p className="text-xs md:text-sm font-semibold text-gray-600 mb-2">{question.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {question.options.map(({ label, value }) => {
                      const IconComponent = getIconByOption(value);
                      const isSelected = (draft[question.id] || []).includes(value);
                      return (
                        <button
                          key={value}
                          onClick={() => toggleDraft(question.id, value)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs md:text-sm font-medium transition-colors ${
                            isSelected
                              ? 'bg-brand-light text-gray-800 border-brand'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
                          {label}
                          {isSelected && <Check className="w-3 h-3 text-brand" strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-1">
                <Button
                  onClick={cancelEdit}
                  variant="outline"
                  className="flex-1 py-2.5 text-xs md:text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={applyEdit}
                  className="flex-1 py-2.5 bg-brand hover:bg-brand-dark text-white transition-colors text-xs md:text-sm"
                >
                  Update results
                </Button>
              </div>
            </div>
          ) : condensedPreferences.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {condensedPreferences.map(({ option, icon: IconComponent }, index) => (
                <div key={`${option}-${index}`} className="flex items-center gap-2 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                  <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
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
                <DishCard key={`${dish.name}-${index}`} dish={dish} onLocationClick={handleLocationClick} />
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
                  <DishCard key={`${dish.name}-${index}`} dish={dish} onLocationClick={handleLocationClick} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pt-6 border-t mt-6">
          <DishFeedback onSubmit={handleDishSubmission} userPreferences={answers} />
          
          <div className="mb-4 md:mb-0">
            <Button
              onClick={onStartOver}
              className="w-full py-3 bg-brand hover:bg-brand-dark text-white transition-colors text-sm md:text-base"
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
