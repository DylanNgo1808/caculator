
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { CalculatedResults, CalculatorInputs } from '../types';

interface ResultsPanelProps {
  results: CalculatedResults;
  inputs: CalculatorInputs;
}

const formatSimpleCurrency = (value: number) => `$${value.toFixed(2)}`;

const AOVComparisonChart: React.FC<{currentAov: number, projectedAov: number}> = ({ currentAov, projectedAov }) => {
  const data = [
    { name: 'Current AOV', value: currentAov },
    { name: 'Projected AOV', value: projectedAov },
  ];

  return (
    <div className="w-full h-48">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#D1D5DB" tickLine={false} axisLine={false} />
          <YAxis stroke="#D1D5DB" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} 
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
            formatter={(value: number) => [formatSimpleCurrency(value), null]}
          />
          <Bar dataKey="value" barSize={50} radius={[4, 4, 0, 0]}>
            <LabelList dataKey="value" position="top" formatter={formatSimpleCurrency} fill="#FFFFFF" fontSize={14} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#4338CA' : '#10B981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, inputs }) => {
    
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const costPercentOfRevenue = results.additionalMonthlyRevenue > 0 ? (results.totalGiftCost / results.additionalMonthlyRevenue) * 100 : 0;

  return (
    <div className="bg-gray-medium p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-white border-b border-gray-light pb-2">Projected results</h2>
      
      <div>
          <p className="text-sm text-gray-300">Projected monthly profit boost</p>
          <p className="text-5xl font-bold text-brand-primary">{formatCurrency(results.projectedProfitBoost)}</p>
      </div>
      <div>
          <p className="text-sm text-gray-300">Return on Investment (ROI)</p>
          <p className="text-5xl font-bold text-brand-primary">{results.roi.toFixed(0)}%</p>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-light">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Added revenue</span>
            <span className="font-semibold text-white">{formatCurrency(results.additionalMonthlyRevenue)}</span>
          </div>
          <div className="w-full bg-gray-light rounded-full h-4">
            <div className="bg-brand-primary h-4 rounded-full" style={{ width: `100%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-300">Gift cost</span>
            <span className="font-semibold text-white">{formatCurrency(results.totalGiftCost)}</span>
          </div>
          <div className="w-full bg-gray-light rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${Math.min(100, costPercentOfRevenue)}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-light">
          <h3 className="text-lg font-semibold text-white mb-2">AOV comparison</h3>
          <AOVComparisonChart currentAov={inputs.currentAov} projectedAov={results.projectedAov} />
      </div>

      {results.tierBreakdown.length > 0 && (
        <div className="pt-4 border-t border-gray-light">
          <h3 className="text-lg font-semibold text-white mb-2">Gift tier breakdown</h3>
          <div className="space-y-2 text-sm">
            {results.tierBreakdown.map((tier, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-dark p-3 rounded-md">
                <span className="text-gray-300">
                  Tier {index + 1}
                </span>
                <span className="font-semibold text-white text-right">
                  {formatCurrency(tier.costForTier)} total cost
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
