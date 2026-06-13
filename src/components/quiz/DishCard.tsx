import React from 'react';
import { MapPin } from 'lucide-react';
import { Dish } from '../../types/food';

interface DishCardProps {
  dish: Dish;
  onLocationClick: (dishName: string) => void;
  /** Position in its list — used to stagger the enter animation. */
  index?: number;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onLocationClick, index = 0 }) => {
  return (
    <div
      className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out-strong fill-mode-both"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">{dish.name}</h3>
        <button
          onClick={() => onLocationClick(dish.name)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-gray-500 hover:text-brand hover:bg-gray-50 rounded-lg transition-[color,background-color,transform] active:scale-[0.96] motion-reduce:active:scale-100"
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
