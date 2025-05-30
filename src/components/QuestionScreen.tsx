
import React from 'react';
import { Question, UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
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

  const toggleOption = (option: string) => {
    if (isAnimating) return; // Prevent changes during animation
    
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    
    onAnswerChange(question.id, newAnswers);
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
        
        <div className="space-y-3 mb-4 md:mb-6">
          {question.options.map((option) => {
            const IconComponent = getIconByOption(option);
            return (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                disabled={isAnimating}
                className={`w-full p-3 md:p-4 rounded-xl border-2 text-sm md:text-base font-medium transition-all duration-200 flex items-center ${
                  currentAnswers.includes(option)
                    ? 'bg-[#fef3f2] text-gray-700 border-[#ed2a3a]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${isAnimating ? 'pointer-events-none' : ''}`}
              >
                <IconComponent className="w-4 h-4 md:w-5 md:h-5 mr-3 flex-shrink-0" />
                {option}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleDontCare}
          disabled={isAnimating}
          variant="outline"
          className="w-full mb-4 md:mb-6 py-2.5 md:py-3 text-xs md:text-sm text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Don't care
        </Button>
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
