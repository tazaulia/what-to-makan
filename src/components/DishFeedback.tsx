
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { UserAnswers } from '../types/food';

interface DishFeedbackProps {
  onSubmit: (dishName: string) => void;
  userPreferences?: UserAnswers;
}

const DishFeedback: React.FC<DishFeedbackProps> = ({ onSubmit, userPreferences }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dishName, setDishName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dishName.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Store in Supabase
        const { error } = await supabase
          .from('dish_submissions')
          .insert({
            dish_name: dishName.trim(),
            user_preferences: userPreferences || null
          });

        if (error) {
          console.error('Error submitting dish suggestion:', error);
        } else {
          console.log('Dish suggestion submitted successfully:', dishName.trim());
        }

        // Call the original onSubmit callback
        onSubmit(dishName.trim());
        
        setDishName('');
        setIsSubmitted(true);
        setTimeout(() => {
          setIsExpanded(false);
          setIsSubmitted(false);
        }, 2000);
      } catch (error) {
        console.error('Error submitting dish suggestion:', error);
      } finally {
        setIsSubmitting(false);
      }
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleToggle}
                  variant="outline"
                  className="flex-1 py-2 text-xs"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!dishName.trim() || isSubmitting}
                  className={`flex-1 py-2 text-xs ${
                    dishName.trim() && !isSubmitting
                      ? 'bg-[#ed2a3a] hover:bg-[#d12532] text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  <Send className="w-3 h-3 mr-1" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
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
