import React, { useState } from 'react';
import { Question, UserAnswers } from '../../types/food';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { getIconByOption } from '../icons/AnswerIcons';

interface QuestionScreenProps {
  question: Question;
  answers: UserAnswers;
  onAnswerChange: (questionId: string, selectedOptions: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  onDontCare: () => void;
  isFirst: boolean;
  isLast: boolean;
  isAnimating?: boolean;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  onDontCare,
  isFirst,
  isLast,
  isAnimating = false
}) => {
  const currentAnswers = answers[question.id] || [];
  const hasSelection = currentAnswers.length > 0;
  const isConstraints = question.kind === 'constraints';
  // Constraints are optional — you can find food without picking any.
  const canAdvance = isConstraints || hasSelection;
  // Cuisine has many options; lay it out as a grid so it stays scannable.
  const useGrid = question.options.length >= 6;
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipTimeouts, setTooltipTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({});

  // Keyed by the option's underlying value (tag), not its display label.
  const tooltipContent: { [key: string]: string } = {
    'Dry': 'No gravy — think nasi goreng or satay',
    'Saucy': 'Got sauce or gravy — like hokkien mee or japanese curry',
    'Soupy': 'Comes swimming in soup — like laksa or ramen',
    'Snack': 'Small bite — like popiah or curry puff',
    'Light Meal': 'Enough for one — like chicken rice',
    'Heavy Meal': 'Big and filling — like nasi padang',
  };

  const toggleOption = (value: string) => {
    if (isAnimating) return;

    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(a => a !== value)
      : [...currentAnswers, value];

    onAnswerChange(question.id, newAnswers);

    // Show tooltip only when selecting and if content exists
    if (!currentAnswers.includes(value) && tooltipContent[value]) {
      if (tooltipTimeouts[value]) {
        clearTimeout(tooltipTimeouts[value]);
      }

      setActiveTooltip(value);

      const timeout = setTimeout(() => {
        setActiveTooltip(null);
      }, 1000);

      setTooltipTimeouts(prev => ({
        ...prev,
        [value]: timeout
      }));
    }
  };

  const handleNext = () => {
    if (isAnimating) return;
    onNext();
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    onPrevious();
  };

  const handleDontCare = () => {
    if (isAnimating) return;
    onDontCare();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-2">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 text-center mb-2 leading-tight">
          {question.text}
        </h2>
        {question.helper && (
          <p className="text-xs md:text-sm text-gray-500 text-center mb-4 md:mb-6">
            {question.helper}
          </p>
        )}

        <div className={`mb-4 md:mb-6 relative ${useGrid ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`}>
          {question.options.map(({ label, value }) => {
            const IconComponent = getIconByOption(value);
            const isSelected = currentAnswers.includes(value);
            const showTooltip = activeTooltip === value;

            return (
              <div key={value} className="relative">
                <button
                  onClick={() => toggleOption(value)}
                  disabled={isAnimating}
                  className={`w-full p-3 md:p-4 rounded-xl border-2 text-sm md:text-base font-medium transition-all duration-200 flex items-center ${
                    isSelected
                      ? 'bg-brand-light text-gray-700 border-brand'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isAnimating ? 'pointer-events-none' : ''}`}
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 mr-3 flex-shrink-0 flex items-center justify-center" />
                  <span className="flex-1 text-left">{label}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-2 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] border ${
                      isSelected ? 'bg-brand border-brand text-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                </button>

                {showTooltip && tooltipContent[value] && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg max-w-xs text-center animate-in fade-in-0 zoom-in-95">
                    {tooltipContent[value]}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4 mt-auto mb-4 md:mb-0 pb-safe">
          {!isConstraints && (
            <Button
              onClick={handleDontCare}
              disabled={isAnimating}
              variant="outline"
              className="w-full py-2.5 md:py-3 text-xs md:text-sm text-gray-600 border-gray-300 hover:bg-gray-50 mb-4 md:mb-6"
            >
              Anything works (select all)
            </Button>
          )}

          <div className="flex gap-3 md:gap-4">
            {!isFirst && (
              <Button
                onClick={handlePrevious}
                disabled={isAnimating}
                variant="outline"
                className="flex-1 py-2.5 md:py-3 text-xs md:text-sm"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                Previous
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={!canAdvance || isAnimating}
              className={`py-2.5 md:py-3 text-xs md:text-sm ${isFirst ? 'w-full' : 'flex-1'} ${
                canAdvance && !isAnimating
                  ? 'bg-brand hover:bg-brand-dark text-white'
                  : 'bg-gray-300 text-gray-500'
              } transition-colors`}
            >
              {isLast ? 'Find Food' : 'Next'}
              {!isLast && <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
