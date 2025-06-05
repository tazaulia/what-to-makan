
import React, { useState } from 'react';
import { Question, UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getIconByOption } from './icons/AnswerIcons';

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
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipTimeouts, setTooltipTimeouts] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const tooltipContent: { [key: string]: string } = {
    'Dry': 'No sauce, like fried rice or satay',
    'Wet': 'Saucy, like japanese curry or hokkien mee',
    'Soupy': 'Comes in soup (duh), like ramen or laksa',
    'Light Protein': 'Eggs, tofu, small portions of meat',
    'Medium Protein': 'Balanced protein, like nasi lemak',
    'Protein-Dense': 'Meat-heavy, like steak.',
    'Snack': 'Small, like popiah.',
    'Light Meal': 'Enough for one, like chicken rice',
    'Heavy Meal': 'Big, filling dish, like nasi padang'
  };

  const toggleOption = (option: string) => {
    if (isAnimating) return;
    
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    
    onAnswerChange(question.id, newAnswers);

    // Show tooltip only when selecting and if content exists
    if (!currentAnswers.includes(option) && tooltipContent[option]) {
      // Clear any existing timeout for this option
      if (tooltipTimeouts[option]) {
        clearTimeout(tooltipTimeouts[option]);
      }

      setActiveTooltip(option);
      
      const timeout = setTimeout(() => {
        setActiveTooltip(null);
      }, 1000);

      setTooltipTimeouts(prev => ({
        ...prev,
        [option]: timeout
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
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 text-center mb-4 md:mb-6 leading-tight">
          {question.text}
        </h2>
        
        {isFirst && (
          <p className="text-center text-xs md:text-sm text-gray-500 mb-4">
            You can pick more than one
          </p>
        )}
        
        <div className="space-y-3 mb-4 md:mb-6 relative">
          {question.options.map((option) => {
            const IconComponent = getIconByOption(option);
            const isSelected = currentAnswers.includes(option);
            const showTooltip = activeTooltip === option;
            
            return (
              <div key={option} className="relative">
                <button
                  onClick={() => toggleOption(option)}
                  disabled={isAnimating}
                  className={`w-full p-3 md:p-4 rounded-xl border-2 text-sm md:text-base font-medium transition-all duration-200 flex items-center ${
                    isSelected
                      ? 'bg-[#fef3f2] text-gray-700 border-[#ed2a3a]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isAnimating ? 'pointer-events-none' : ''}`}
                >
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 mr-3 flex-shrink-0 flex items-center justify-center" />
                  <span className="flex-1 text-left">{option}</span>
                  <Checkbox
                    checked={isSelected}
                    className={`ml-3 ${isSelected ? 'data-[state=checked]:bg-[#ed2a3a] data-[state=checked]:border-[#ed2a3a]' : ''}`}
                  />
                </button>
                
                {showTooltip && tooltipContent[option] && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg max-w-xs text-center animate-in fade-in-0 zoom-in-95">
                    {tooltipContent[option]}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4 md:mb-6">
          <Button
            onClick={handleDontCare}
            disabled={isAnimating}
            variant="outline"
            className="w-full py-2.5 md:py-3 text-xs md:text-sm text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            I'm fine with anything
          </Button>
        </div>
      </div>

      <div className="flex gap-3 md:gap-4 pt-4 border-t mt-auto mb-4 md:mb-0 pb-safe">
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
          disabled={!hasSelection || isAnimating}
          className={`py-2.5 md:py-3 text-xs md:text-sm ${isFirst ? 'w-full' : 'flex-1'} ${
            hasSelection && !isAnimating
              ? 'bg-[#ed2a3a] hover:bg-[#d12532] text-white' 
              : 'bg-gray-300 text-gray-500'
          } transition-colors`}
        >
          {isLast ? 'Find Food' : 'Next'}
          {!isLast && <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
