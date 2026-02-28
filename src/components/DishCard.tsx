import React from 'react';
import { MapPin } from 'lucide-react';
import { Dish } from '../types/food';

interface DishCardProps {
  dish: Dish;
  onLocationClick: (dishName: string) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onLocationClick }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">{dish.name}</h3>
        <button
          onClick={() => onLocationClick(dish.name)}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors"
          aria-label={`Find ${dish.name} nearby`}
          title={`Find ${dish.name} nearby`}
        >
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DishCard;
