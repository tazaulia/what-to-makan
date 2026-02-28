import React from 'react';
import QuestionScreen from '../components/QuestionScreen';
import ResultsScreen from '../components/ResultsScreen';
import LandingScreen from '../components/LandingScreen';
import DotStepper from '../components/DotStepper';
import { useMakanQuiz } from '../hooks/useMakanQuiz';

const Index = () => {
  const {
    showLanding,
    currentQuestion,
    currentQuestionIndex,
    answers,
    showResults,
    matchResults,
    loadingDishes,
    isAnimating,
    slideDirection,
    isFirst,
    isLast,
    handleStartQuiz,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleDontCare,
    handleStartOver,
    questionsCount
  } = useMakanQuiz();

  if (showLanding) {
    return (
      <div className="min-h-screen bg-cream p-4">
        <div className="max-w-md mx-auto h-screen flex flex-col py-4 md:py-6">
          <LandingScreen onStart={handleStartQuiz} />
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-cream p-4">
        <div className="max-w-md mx-auto min-h-screen flex flex-col py-6 md:py-8">
          <ResultsScreen
            matchResults={matchResults}
            answers={answers}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream p-4 pb-safe">
      <div className="max-w-md mx-auto flex flex-col py-4 md:py-6 min-h-screen">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            🍽️ What to Makan SG
          </h1>
        </div>

        <DotStepper
          current={currentQuestionIndex + 1}
          total={questionsCount}
        />

        <div className={`flex-1 pb-20 md:pb-8 relative transition-all duration-350 ease-in-out ${isAnimating && slideDirection === 'left' ? '-translate-x-full opacity-0' :
          isAnimating && slideDirection === 'right' ? 'translate-x-full opacity-0' :
            'translate-x-0 opacity-100'
          }`}>
          {loadingDishes && (
            <div className="absolute inset-0 bg-cream/70 flex items-center justify-center z-10 rounded-xl">
              <div className="text-gray-600 font-medium animate-pulse">Checking for fresh menu...</div>
            </div>
          )}
          <QuestionScreen
            question={currentQuestion}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDontCare={handleDontCare}
            isFirst={isFirst}
            isLast={isLast}
            isAnimating={isAnimating}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
