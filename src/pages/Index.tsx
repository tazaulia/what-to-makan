
import React, { useState } from 'react';
import { questions } from '../data/questions';
import { UserAnswers, Dish } from '../types/food';
import { findMatchingDishes } from '../utils/foodMatcher';
import QuestionScreen from '../components/QuestionScreen';
import ResultsScreen from '../components/ResultsScreen';
import LandingScreen from '../components/LandingScreen';
import ProgressBar from '../components/ProgressBar';

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedDishes, setMatchedDishes] = useState<Dish[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;

  const handleStartQuiz = () => {
    setShowLanding(false);
  };

  const handleAnswerChange = (questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  };

  const handleNext = () => {
    if (isLast) {
      // Find matching dishes and show results
      const matches = findMatchingDishes(answers);
      setMatchedDishes(matches);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleDontCare = () => {
    // Set all options for this question as selected (equivalent to don't care)
    handleAnswerChange(currentQuestion.id, currentQuestion.options);
    handleNext();
  };

  const handleStartOver = () => {
    setShowLanding(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setMatchedDishes([]);
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#fff5ec] p-4">
        <div className="max-w-md mx-auto h-screen flex flex-col py-8">
          <LandingScreen onStart={handleStartQuiz} />
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#fff5ec] p-4">
        <div className="max-w-md mx-auto min-h-screen flex flex-col py-8">
          <ResultsScreen
            dishes={matchedDishes}
            answers={answers}
            onStartOver={handleStartOver}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5ec] p-4">
      <div className="max-w-md mx-auto h-screen flex flex-col py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🍽️ What To Makan
          </h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>

        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={questions.length} 
        />

        <div className="flex-1">
          <QuestionScreen
            question={currentQuestion}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onDontCare={handleDontCare}
            isFirst={isFirst}
            isLast={isLast}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
