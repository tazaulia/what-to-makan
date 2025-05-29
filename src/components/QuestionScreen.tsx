
import React from 'react';
import { Question, UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  answers: UserAnswers;
  onAnswerChange: (questionId: string, selectedOptions: string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  onDontCare: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  onDontCare,
  isFirst,
  isLast
}) => {
  const currentAnswers = answers[question.id] || [];
  const hasSelection = currentAnswers.length > 0;

  const toggleOption = (option: string) => {
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option];
    
    onAnswerChange(question.id, newAnswers);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-2">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-8 leading-tight">
          {question.text}
        </h2>
        
        <div className="space-y-3 mb-6 md:mb-8">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`w-full p-3 md:p-4 rounded-xl border-2 text-base md:text-lg font-medium transition-all duration-200 ${
                currentAnswers.includes(option)
                  ? 'bg-[#fef3f2] text-gray-700 border-[#ed2a3a]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <Button
          onClick={onDontCare}
          variant="outline"
          className="w-full mb-4 md:mb-6 py-2.5 md:py-3 text-sm md:text-base text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Don't care
        </Button>
      </div>

      <div className="flex gap-3 md:gap-4 pt-4 border-t mt-auto mb-4 md:mb-0">
        {!isFirst && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="flex-1 py-2.5 md:py-3 text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Previous
          </Button>
        )}
        
        <Button
          onClick={onNext}
          disabled={!hasSelection}
          className={`py-2.5 md:py-3 text-sm md:text-base ${isFirst ? 'w-full' : 'flex-1'} ${
            hasSelection 
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
