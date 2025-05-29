
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
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          {question.text}
        </h2>
        
        <div className="space-y-3 mb-8">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`w-full p-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 ${
                currentAnswers.includes(option)
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white border-transparent shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <Button
          onClick={onDontCare}
          variant="outline"
          className="w-full mb-6 py-3 text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          Don't care
        </Button>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        {!isFirst && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="flex-1 py-3"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
        )}
        
        <Button
          onClick={onNext}
          disabled={!hasSelection}
          className={`py-3 ${isFirst ? 'w-full' : 'flex-1'} ${
            hasSelection 
              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' 
              : 'bg-gray-300'
          }`}
        >
          {isLast ? 'Find Food' : 'Next'}
          {!isLast && <ChevronRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
