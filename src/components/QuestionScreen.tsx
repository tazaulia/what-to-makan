
import React from 'react';
import { Question, UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
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
  isAnimating: boolean;
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
  isAnimating
}) => {
  const selectedOptions = answers[question.id] || [];
  const isAnswered = selectedOptions.length > 0;

  const handleOptionToggle = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];
    
    onAnswerChange(question.id, newSelectedOptions);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 mb-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center leading-tight">
            {question.text}
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option);
            const IconComponent = getIconByOption(option);
            
            return (
              <button
                key={option}
                onClick={() => handleOptionToggle(option)}
                disabled={isAnimating}
                className={`w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-[#ed2a3a] bg-[#ed2a3a] text-white shadow-md'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                } ${isAnimating ? 'pointer-events-none' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="font-medium text-sm md:text-base">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#fff5ec] p-4 border-t border-gray-200 md:relative md:bg-transparent md:border-t-0 md:p-0">
        <div className="max-w-md mx-auto space-y-3">
          <Button
            onClick={onDontCare}
            disabled={isAnimating}
            variant="outline"
            className="w-full py-3 text-gray-600 border-gray-300 hover:bg-gray-50 text-sm md:text-base"
          >
            <Shuffle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            I'm fine with anything
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={onPrevious}
              disabled={isFirst || isAnimating}
              variant="outline"
              className={`flex-1 py-3 text-sm md:text-base ${
                isFirst || isAnimating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!isAnswered || isAnimating}
              className={`flex-1 py-3 text-sm md:text-base ${
                isAnswered && !isAnimating
                  ? 'bg-[#ed2a3a] hover:bg-[#d12532] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLast ? 'Get Results' : 'Next'}
              {!isLast && <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
