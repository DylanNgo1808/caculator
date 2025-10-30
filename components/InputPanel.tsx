
import React from 'react';
import { CalculatorInputs, GiftTier } from '../types';
import SliderInput from './SliderInput';

interface InputPanelProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
}

const InputPanel: React.FC<InputPanelProps> = ({ inputs, setInputs }) => {
  const handleSliderChange = (field: keyof Omit<CalculatorInputs, 'tiers' | 'holidayMultiplier'>) => (value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };
  
  const handleMultiplierChange = (multiplier: number) => {
    setInputs(prev => ({ ...prev, holidayMultiplier: multiplier }));
  };

  const handleTierChange = (id: number, field: 'thresholdPercent' | 'giftCost', value: number) => {
    setInputs(prev => ({
      ...prev,
      tiers: prev.tiers.map(tier => 
        tier.id === id ? { ...tier, [field]: value } : tier
      ),
    }));
  };
  
  const addTier = () => {
    setInputs(prev => {
        if (prev.tiers.length >= 3) return prev;
        const lastTier = prev.tiers[prev.tiers.length - 1];
        const newTier: GiftTier = {
            id: Date.now(),
            thresholdPercent: (lastTier?.thresholdPercent || 25) + 15,
            giftCost: (lastTier?.giftCost || 5) + 5,
        };
        return { ...prev, tiers: [...prev.tiers, newTier] };
    });
  };

  const removeTier = (id: number) => {
    setInputs(prev => ({
        ...prev,
        tiers: prev.tiers.filter(tier => tier.id !== id),
    }));
  };

  return (
    <div className="rounded-[12px] border border-[#04443E] bg-white/5 backdrop-blur-[17.15px] p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-gray-light pb-2">Your store's numbers</h2>
      
      <SliderInput
        label="Current AOV"
        value={inputs.currentAov}
        min={10}
        max={200}
        step={1}
        unit="$"
        onChange={handleSliderChange('currentAov')}
      />
      <SliderInput
        label="Monthly Order"
        value={inputs.monthlyOrders}
        min={100}
        max={10000}
        step={100}
        onChange={handleSliderChange('monthlyOrders')}
      />
      <SliderInput
        label="AOV Increase"
        value={inputs.aovIncreasePercent}
        min={5}
        max={100}
        step={1}
        unit="%"
        onChange={handleSliderChange('aovIncreasePercent')}
      />

      <div className="space-y-4 pt-4 border-t border-gray-light">
         <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Gift tiers</h3>
         </div>
         {inputs.tiers.map((tier) => {
            const thresholdAmount = inputs.currentAov * (1 + tier.thresholdPercent / 100);

            return (
                <div key={tier.id} className="p-4 bg-gray-dark rounded-lg space-y-4 relative border border-gray-light">
                    {inputs.tiers.length > 1 && (
                        <button 
                          onClick={() => removeTier(tier.id)} 
                          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold leading-none"
                          aria-label="Remove tier"
                        >
                          &times;
                        </button>
                    )}
                    <p className="text-sm text-gray-300 pr-6">
                        Gift Threshold: 
                        <span className="font-bold text-white">
                            {" $"}{thresholdAmount.toFixed(2)}
                        </span>
                        <br/>({tier.thresholdPercent}% above current AOV)
                    </p>
                    <SliderInput 
                        label="Threshold % above AOV"
                        value={tier.thresholdPercent}
                        min={10} max={100} step={1} unit="%"
                        onChange={(value) => handleTierChange(tier.id, 'thresholdPercent', value)}
                    />
                    <SliderInput 
                        label="Gift cost"
                        value={tier.giftCost}
                        min={1} max={100} step={1} unit="$"
                        onChange={(value) => handleTierChange(tier.id, 'giftCost', value)}
                    />
                </div>
            )
         })}
         {inputs.tiers.length < 3 && (
            <button onClick={addTier} className="w-full text-center py-2 px-4 border-2 border-dashed border-gray-light text-gray-300 rounded-lg hover:bg-gray-light hover:text-white transition">
                + Add tier
            </button>
         )}
      </div>

      <div className="pt-4 space-y-3">
        <label className="font-medium text-white">Holiday traffic multiplier</label>
        <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleMultiplierChange(1)}
              className={`p-3 rounded-lg text-center font-semibold transition ${inputs.holidayMultiplier === 1 ? 'bg-gray-light text-white' : 'bg-gray-dark text-gray-300 hover:bg-gray-light/50'}`}
            >
                Normal
            </button>
            <button
              onClick={() => handleMultiplierChange(2)}
              className={`p-3 rounded-lg text-center font-semibold transition ${inputs.holidayMultiplier === 2 ? 'bg-brand-primary text-white' : 'bg-gray-dark text-gray-300 hover:bg-gray-light/50'}`}
            >
                BFCM (2x)
            </button>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
