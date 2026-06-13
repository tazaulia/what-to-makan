
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
        let className = "h-2.5 rounded-full transition-[background-color,border-color,width] duration-300";

        if (stepNumber < current) {
          // Past questions - solid red
          className += " w-2.5 bg-brand";
        } else if (stepNumber === current) {
          // Current question - elongated solid red so the active step reads at a glance
          className += " w-6 bg-brand";
        } else {
          // Future questions - light grey
          className += " w-2.5 bg-gray-300";
        }
        
        return <div key={index} className={className} />;
      })}
    </div>
  );
};

export default DotStepper;
