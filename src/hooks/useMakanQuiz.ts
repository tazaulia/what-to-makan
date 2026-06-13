
import { useState, useEffect, useCallback } from 'react';
import { UserAnswers, Dish } from '../types/food';
import { findMatchingDishes, MatchResults } from '../utils/foodMatcher';
import { fetchDishesFromSheets, GOOGLE_SHEET_CSV_URL } from '../utils/googleSheets';
import { questions } from '../data/questions';

const EMPTY_RESULTS: MatchResults = { perfectMatches: [], closeMatches: [] };

export const useMakanQuiz = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<UserAnswers>({});
    const [showResults, setShowResults] = useState(false);
    // The Google Sheet is the single source of truth — no static fallback.
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [loadingDishes, setLoadingDishes] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [matchResults, setMatchResults] = useState<MatchResults>(EMPTY_RESULTS);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
    const [disableTransition, setDisableTransition] = useState(false);
    // Brief pause after "Anything works (select all)" so the user sees every option tick before advancing.
    const [isSelectingAll, setIsSelectingAll] = useState(false);

    // Fetch the menu in the background. The landing CTA never waits on this — by the
    // time the user has answered the quiz it's long done; if it failed, results shows a retry.
    const loadDishes = useCallback(async () => {
        setLoadingDishes(true);
        setLoadError(false);
        const fetched = await fetchDishesFromSheets(GOOGLE_SHEET_CSV_URL);
        if (fetched.length > 0) {
            setDishes(fetched);
        } else {
            setLoadError(true);
        }
        setLoadingDishes(false);
    }, []);

    useEffect(() => { loadDishes(); }, [loadDishes]);

    // Compute matches once the menu is available (covers the rare case where the user
    // reaches the results screen before the background fetch has finished).
    useEffect(() => {
        if (showResults && dishes.length > 0 &&
            matchResults.perfectMatches.length === 0 && matchResults.closeMatches.length === 0) {
            setMatchResults(findMatchingDishes(answers, dishes));
        }
    }, [showResults, dishes, answers, matchResults]);

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
        const enterFrom = direction === 'left' ? 'right' : 'left';
        setIsAnimating(true);
        setSlideDirection(direction); // exit phase

        setTimeout(() => {
            callback(); // swap question
            setDisableTransition(true); // disable transition for instant snap
            setSlideDirection(enterFrom); // snap to opposite side (invisible)

            setTimeout(() => {
                setDisableTransition(false); // re-enable transition
                setSlideDirection('none'); // animate to center (enter phase)

                setTimeout(() => {
                    setIsAnimating(false);
                }, 350);
            }, 50);
        }, 350);
    };

    const handleNext = () => {
        if (isAnimating) return;

        if (isLast) {
            // Compute now if the menu is ready; otherwise the effect above does it on load.
            setMatchResults(dishes.length > 0 ? findMatchingDishes(answers, dishes) : EMPTY_RESULTS);
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
        if (isAnimating || isSelectingAll) return;
        handleAnswerChange(currentQuestion.id, currentQuestion.options.map(o => o.value));
        // Tick every option, hold for a beat so the user sees what happened, then move on.
        setIsSelectingAll(true);
        setTimeout(() => {
            setIsSelectingAll(false);
            handleNext();
        }, 500);
    };

    const handleStartOver = () => {
        setShowLanding(true);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setShowResults(false);
        setMatchResults(EMPTY_RESULTS);
        setIsAnimating(false);
        setSlideDirection('none');
        setDisableTransition(false);
        setIsSelectingAll(false);
    };

    return {
        showLanding,
        currentQuestion,
        currentQuestionIndex,
        answers,
        showResults,
        matchResults,
        loadingDishes,
        loadError,
        dishesLoaded: dishes.length > 0,
        retryLoadDishes: loadDishes,
        // Lock interactions during the slide animation AND the select-all pause.
        isAnimating: isAnimating || isSelectingAll,
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
        questionsCount: questions.length
    };
};
