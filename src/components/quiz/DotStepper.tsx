
import React from 'react';

interface DotStepperProps {
  current: number;
  total: number;
}

const DotStepper: React.FC<DotStepperProps> = ({ current, total }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-6">
      {Array.from({ length: total }, (_, index) => {
        const stepNumber = index + 1;
        let className = "w-2.5 h-2.5 rounded-full transition-all duration-300";
        
        if (stepNumber < current) {
          // Past questions - solid red
          className += " bg-brand";
        } else if (stepNumber === current) {
          // Current question - outlined red
          className += " border-2 border-brand bg-transparent";
        } else {
          // Future questions - light grey
          className += " bg-gray-300";
        }
        
        return <div key={index} className={className} />;
      })}
    </div>
  );
};

export default DotStepper;
