
import React, { useState, useEffect  } from 'react';
import { CalculatorInputs } from './types';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import CalculationDetails from './components/CalculationDetails';
import Footer from './components/Footer';
import { useRoiCalculator } from './hooks/useRoiCalculator';

// Make sure recharts is available if running locally
// For this environment, we assume it's globally available.
// In a real project: import { ... } from 'recharts';
declare const Recharts: any;

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentAov: 50,
    monthlyOrders: 1000,
    aovIncreasePercent: 53,
    holidayMultiplier: 2,
    tiers: [{ id: 1, thresholdPercent: 41, giftCost: 7 }],
  });

  const results = useRoiCalculator(inputs);

  useEffect(() => {
    const sendHeight = () => {
      window.parent.postMessage(
          {
            type: 'resize',
            height: document.body.scrollHeight
          },
          '*'
      );
    };
    sendHeight();
    window.addEventListener('resize', sendHeight);
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, []);

  return (
      <div className="min-h-screen bg-transparent p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8  rounded-[20px] border border-[#03221D] bg-[rgba(0,205,174,0.05)] py-[80px] px-[60px]">
          <Header/>
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InputPanel inputs={inputs} setInputs={setInputs}/>
            <ResultsPanel results={results} inputs={inputs}/>
          </main>

          <CalculationDetails/>

          <Footer inputs={inputs} results={results}/>
        </div>
      </div>
  );
};

export default App;
