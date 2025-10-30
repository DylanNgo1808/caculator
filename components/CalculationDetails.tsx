
import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-gray-dark p-3 rounded-md text-center">
        <code className="text-gray-300">{children}</code>
    </div>
);


const CalculationDetails: React.FC = () => {
  return (
    <div className="rounded-[12px] border border-[#04443E] bg-white/5 backdrop-blur-[17.15px] p-6 rounded-lg shadow-lg text-gray-300 space-y-4">
        <h3 className="text-lg font-semibold text-white">Our model follows three simple steps:</h3>
        <ol className="list-decimal list-inside space-y-1">
            <li>We estimate how many orders will reach your gift threshold.</li>
            <li>We calculate the extra dollars those orders add to your revenue.</li>
            <li>We subtract what the gifts cost you to get your final profit.</li>
        </ol>
        
        <div className="space-y-3 pt-4 border-t border-gray-light/50">
            <CodeBlock>= Current AOV x (1 + AOV Increase %)</CodeBlock>
            <CodeBlock>= (Projected AOV – Current AOV) &times; Effective Orders</CodeBlock>
        </div>

        <p>
            We use a logistic curve to model how likely customers are to qualify for a gift based on how the projected AOV compares to the gift threshold. This provides a more realistic estimate than a simple linear model.
        </p>
        <p>
            For multiple tiers, costs are calculated sequentially from the highest value tier down. A customer is assumed to claim the most valuable gift they qualify for, preventing double-counting of costs.
        </p>

        <div className="space-y-3 pt-4 border-t border-gray-light/50">
             <CodeBlock>= Additional Monthly Revenue – Total Gift Cost</CodeBlock>
             <CodeBlock>= (Projected Profit Boost / Total Gift Cost) &times; 100</CodeBlock>
             <CodeBlock>= Total Gift Cost / (Additional Monthly Revenue / 30)</CodeBlock>
        </div>
    </div>
  );
};

export default CalculationDetails;
