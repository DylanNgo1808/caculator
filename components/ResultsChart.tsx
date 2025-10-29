import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { CalculatedResults, CalculatorInputs } from '../types';

interface ResultsChartProps {
  results: CalculatedResults;
  inputs: CalculatorInputs;
}

const formatCurrency = (value: number) => {
    if (value >= 1000 || value <= -1000) {
        return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
};
const formatSimpleCurrency = (value: number) => `$${value.toFixed(2)}`;

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        const type = payload[0].payload.type;
        return (
            <div className="bg-gray-dark p-2 border border-gray-light rounded-md shadow-lg">
                <p className="label text-white">{`${label} : ${type === 'AOV' ? formatSimpleCurrency(value) : formatCurrency(value)}`}</p>
            </div>
        );
    }
    return null;
};


const ResultsChart: React.FC<ResultsChartProps> = ({ results, inputs }) => {
  const { projectedAov, projectedRevenue, totalGiftCost } = results;
  const { currentAov } = inputs;
  
  const data = [
    { name: 'Current AOV', value: currentAov, type: 'AOV' },
    { name: 'Projected AOV', value: projectedAov, type: 'AOV' },
    { name: 'Projected Revenue', value: projectedRevenue, type: 'Finance' },
    { name: 'Gift Costs', value: totalGiftCost, type: 'Finance' },
  ];
  
  const renderCustomLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;

    if (value === undefined || value === null || index === undefined) {
      return null;
    }

    const item = data[index];
    if (!item) {
      return null;
    }

    const formattedValue = item.type === 'AOV' ? formatSimpleCurrency(value) : formatCurrency(value);

    return (
      <text
        x={x + width + 8}
        y={y + height / 2}
        fill="#FFFFFF"
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={12}
      >
        {formattedValue}
      </text>
    );
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart layout="vertical" data={data} margin={{ top: 5, right: 60, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#D1D5DB' }} width={120} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
          <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]} >
            <LabelList 
                dataKey="value"
                content={renderCustomLabel}
            />
            {data.map((_entry, index) => {
               const colors = ['#4F46E5', '#10B981', '#10B981', '#F97316'];
               return <Cell key={`cell-${index}`} fill={colors[index]} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;