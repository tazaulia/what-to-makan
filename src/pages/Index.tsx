import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { UserAnswers, Dish } from '../types/food';
import { findMatchingDishes, MatchResults } from '../utils/foodMatcher';
import QuestionScreen from '../components/QuestionScreen';
import ResultsScreen from '../components/ResultsScreen';
import LandingScreen from '../components/LandingScreen';
import DotStepper from '../components/DotStepper';
import { fetchDishesFromSheets, FETCH_URL_PLACEHOLDER } from '../utils/googleSheets';
import { dishes as staticFallbackDishes } from '../data/dishes';

const GOOGLE_SHEET_CSV_URL = FETCH_URL_PLACEHOLDER;

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>(staticFallbackDishes);
  const [loadingDishes, setLoadingDishes] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResults>({ perfectMatches: [], closeMatches: [] });
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');

  useEffect(() => {
    async function loadDishes() {
      if (GOOGLE_SHEET_CSV_URL !== FETCH_URL_PLACEHOLDER) {
        setLoadingDishes(true);
        const fetchedDishes = await fetchDishesFromSheets(GOOGLE_SHEET_CSV_URL);
        if (fetchedDishes.length > 0) {
          setDishes(fetchedDishes);
        }
        setLoadingDishes(false);
      }
    }
    loadDishes();
  }, []);


  const currentQuestion = questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;

  const handleStartQuiz = () => {
    setShowLanding(false);
  };

  const handleAnswerChange = (questionId: string, selectedOptions: string[]) => {
    console.log(`Answer changed for ${questionId}:`, selectedOptions);
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  };

  const animateTransition = (direction: 'left' | 'right', callback: () => void) => {
    setIsAnimating(true);
    setSlideDirection(direction);

    setTimeout(() => {
      callback();
      setSlideDirection('none');
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 350);
  };

  const handleNext = () => {
    if (isAnimating) return;

    if (isLast) {
      // Find matching dishes and show results
      const matches = findMatchingDishes(answers, dishes);
      setMatchResults(matches);
      setShowResults(true);
      // Scroll to top when showing results
      window.scrollTo(0, 0);
    } else {
      animateTransition('left', () => {
        setCurrentQuestionIndex(prev => prev + 1);
      });
    }
  };

  const handlePrevious = () => {
    if (isAnimating || currentQuestionIndex === 0) return;

    animateTransition('right', () => {
      setCurrentQuestionIndex(prev => prev - 1);
    });
  };

  const handleDontCare = () => {
    if (isAnimating) return;

    // Set all options for this question as selected (equivalent to don't care)
    handleAnswerChange(currentQuestion.id, currentQuestion.options);
    handleNext();
  };

  const handleStartOver = () => {
    setShowLanding(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setMatchResults({ perfectMatches: [], closeMatches: [] });
    setIsAnimating(false);
    setSlideDirection('none');
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#fff5ec] p-4">
        <div className="max-w-md mx-auto h-screen flex flex-col py-4 md:py-6">
          <LandingScreen onStart={handleStartQuiz} />
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#fff5ec] p-4">
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
    <div className="min-h-screen bg-[#fff5ec] p-4 pb-safe">
      <div className="max-w-md mx-auto flex flex-col py-4 md:py-6 min-h-screen">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            🍽️ What to Makan SG
          </h1>
        </div>

        <DotStepper
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        <div className={`flex-1 pb-20 md:pb-8 relative transition-all duration-350 ease-in-out ${isAnimating && slideDirection === 'left' ? '-translate-x-full opacity-0' :
          isAnimating && slideDirection === 'right' ? 'translate-x-full opacity-0' :
            'translate-x-0 opacity-100'
          }`}>
          {loadingDishes && (
            <div className="absolute inset-0 bg-[#fff5ec]/70 flex items-center justify-center z-10 rounded-xl">
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
