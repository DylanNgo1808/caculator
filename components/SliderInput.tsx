
import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  tooltipText?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, min, max, step, unit, onChange, tooltipText }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
    onChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <div className="space-y-2">
      <label className="flex justify-between items-center text-sm font-medium text-gray-300">
        <div className="flex items-center">
          <span>{label}</span>
          {tooltipText && (
            <div className="group relative flex items-center">
              <span className="ml-2 cursor-pointer text-gray-400 hover:text-white" aria-label="More info">ⓘ</span>
              <div 
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-dark border border-gray-light text-white text-xs rounded py-1 px-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                {tooltipText}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center bg-gray-dark rounded-md border border-gray-light">
          {unit === '$' && <span className="pl-2 text-gray-400">$</span>}
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-24 bg-transparent text-white text-right p-1 focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-md"
          />
          {unit === '%' && <span className="pr-2 text-gray-400">%</span>}
        </div>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-light rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:rounded-full"
      />
    </div>
  );
};

export default SliderInput;
