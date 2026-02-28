
import { useState, useEffect } from 'react';
import { UserAnswers, Dish } from '../types/food';
import { findMatchingDishes, MatchResults } from '../utils/foodMatcher';
import { fetchDishesFromSheets, GOOGLE_SHEET_CSV_URL } from '../utils/googleSheets';
import { dishes as staticFallbackDishes } from '../data/dishes';
import { questions } from '../data/questions';

export const useMakanQuiz = () => {
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
            setLoadingDishes(true);
            const fetchedDishes = await fetchDishesFromSheets(GOOGLE_SHEET_CSV_URL);
            if (fetchedDishes.length > 0) {
                setDishes(fetchedDishes);
            }
            setLoadingDishes(false);
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
            const matches = findMatchingDishes(answers, dishes);
            setMatchResults(matches);
            setShowResults(true);
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

    return {
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
        questionsCount: questions.length
    };
};
