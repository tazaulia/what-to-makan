
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Send } from 'lucide-react';

interface DishFeedbackProps {
  onSubmit: (dishName: string) => void;
}

const DishFeedback: React.FC<DishFeedbackProps> = ({ onSubmit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dishName, setDishName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dishName.trim()) {
      onSubmit(dishName.trim());
      setDishName('');
      setIsSubmitted(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsSubmitted(false);
      }, 2000);
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setDishName('');
      setIsSubmitted(false);
    }
  };

  return (
    <div className="mb-6">
      {!isExpanded ? (
        <Button
          onClick={handleToggle}
          variant="outline"
          className="w-full py-3 text-sm text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Missing a dish? Tell us about it
        </Button>
      ) : (
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-green-600 font-medium text-sm">Thanks for the suggestion!</p>
              <p className="text-gray-500 text-xs mt-1">We'll consider adding it to our list.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="dish-name" className="block text-sm font-medium text-gray-700 mb-2">
                  What dish were you looking for?
                </label>
                <input
                  type="text"
                  id="dish-name"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g., Wonton Mee, Bak Chor Mee..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ed2a3a] focus:border-transparent"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleToggle}
                  variant="outline"
                  className="flex-1 py-2 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!dishName.trim()}
                  className={`flex-1 py-2 text-xs ${
                    dishName.trim()
                      ? 'bg-[#ed2a3a] hover:bg-[#d12532] text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  <Send className="w-3 h-3 mr-1" />
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default DishFeedback;
