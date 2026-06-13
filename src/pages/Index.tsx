import React from 'react';
import QuestionScreen from '../components/screens/QuestionScreen';
import ResultsScreen from '../components/screens/ResultsScreen';
import LandingScreen from '../components/screens/LandingScreen';
import DotStepper from '../components/quiz/DotStepper';
import { Button } from '@/components/ui/button';
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
    loadError,
    dishesLoaded,
    retryLoadDishes,
    isAnimating,
    slideDirection,
    disableTransition,
    isFirst,
    isLast,
    handleStartQuiz,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    handleDontCare,
    handleStartOver,
    applyEdits,
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
          {dishesLoaded ? (
            <ResultsScreen
              matchResults={matchResults}
              answers={answers}
              onStartOver={handleStartOver}
              onApplyEdits={applyEdits}
            />
          ) : loadError ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <p className="text-base md:text-lg font-bold text-gray-800 mb-2">
                Alamak, can't load the menu.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Check your connection and try again.
              </p>
              <Button
                onClick={retryLoadDishes}
                disabled={loadingDishes}
                className="px-6 py-3 bg-brand hover:bg-brand-dark text-white transition-colors"
              >
                {loadingDishes ? 'Loading…' : 'Try again'}
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-gray-600 font-medium animate-pulse">Finding your makan…</div>
            </div>
          )}
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

        <div className={`flex-1 pb-20 md:pb-8 relative transition-[transform,opacity] ease-drawer ${disableTransition ? 'duration-0' : 'duration-350'} ${isAnimating && slideDirection === 'left' ? '-translate-x-full opacity-0 motion-reduce:!translate-x-0' :
          isAnimating && slideDirection === 'right' ? 'translate-x-full opacity-0 motion-reduce:!translate-x-0' :
            'translate-x-0 opacity-100'
          }`}>
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
