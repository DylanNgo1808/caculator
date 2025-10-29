
import React, { useState } from 'react';
import { CalculatorInputs, CalculatedResults } from '../types';

interface FooterProps {
    inputs: CalculatorInputs;
    results: CalculatedResults;
}

const Footer: React.FC<FooterProps> = ({ inputs, results }) => {
  const [copied, setCopied] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  const handleCopyReport = () => {
    const summary = `
AOV.AI ROI Calculator Summary

== INPUTS ==
Current AOV: ${formatCurrency(inputs.currentAov)}
Monthly Orders: ${inputs.monthlyOrders.toLocaleString()}
AOV Increase: ${inputs.aovIncreasePercent}%
Holiday Multiplier: ${inputs.holidayMultiplier}x

== RESULTS ==
Projected Profit Boost: ${formatCurrency(results.projectedProfitBoost)}
ROI: ${results.roi.toFixed(0)}%
Payback Period: ${results.paybackPeriod.toFixed(0)} Days
Additional Monthly Revenue: ${formatCurrency(results.additionalMonthlyRevenue)}
Total Gift Cost: ${formatCurrency(results.totalGiftCost)}
Projected AOV: ${formatCurrency(results.projectedAov)}
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-gray-medium p-6 rounded-lg shadow-lg flex flex-col sm:flex-row justify-center items-center gap-4">
      <button className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md">
        Start Free Trial
      </button>
      <button 
        onClick={handleCopyReport}
        className="w-full sm:w-auto bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
      >
        {copied ? 'Copied to Clipboard!' : 'Copy Summary'}
      </button>
    </footer>
  );
};

export default Footer;
