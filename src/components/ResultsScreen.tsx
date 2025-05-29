
import React from 'react';
import { Dish, UserAnswers } from '../types/food';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ResultsScreenProps {
  dishes: Dish[];
  answers: UserAnswers;
  onStartOver: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ dishes, answers, onStartOver }) => {
  const getSelectedAnswersText = () => {
    const categories = {
      moisture: 'Food style',
      protein: 'Protein level',
      carb: 'Carb base',
      fried: 'Preparation',
      spiciness: 'Spice level',
      appetite: 'Meal size'
    };

    return Object.entries(answers)
      .filter(([_, options]) => options.length > 0)
      .map(([category, options]) => ({
        category: categories[category as keyof typeof categories],
        options: options.join(', ')
      }));
  };

  const selectedAnswers = getSelectedAnswersText();

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          🍽️ What To Makan
        </h1>
        <p className="text-gray-600">Based on your preferences, here's what we recommend:</p>
      </div>

      {selectedAnswers.length > 0 && (
        <div className="bg-orange-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Your Preferences:</h3>
          <div className="space-y-2">
            {selectedAnswers.map(({ category, options }) => (
              <div key={category} className="text-sm">
                <span className="font-medium text-gray-700">{category}:</span>
                <span className="text-gray-600 ml-2">{options}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recommended Dishes ({dishes.length})
        </h2>
        
        {dishes.length > 0 ? (
          <div className="space-y-3">
            {dishes.map((dish, index) => (
              <div
                key={`${dish.name}-${index}`}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-800 text-lg">{dish.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              No exact matches found. Try adjusting your preferences!
            </p>
          </div>
        )}
      </div>

      <div className="pt-6 border-t mt-6">
        <Button
          onClick={onStartOver}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
