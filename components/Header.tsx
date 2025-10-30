
import React from 'react';

const Header: React.FC = () => {
  return (
      <header className="py-4 px-4">
          <div
              className="inline-block mb-6 rounded-full border border-transparent bg-gradient-to-r from-green-400 to-blue-500 p-[1px]">
    <span className="block rounded-full bg-gray-900 px-4 py-1 text-sm font-medium text-white">
      ROI Calculator
    </span>
          </div>

          <h1 className="text-white text-[48px] not-italic font-semibold leading-[120%] tracking-[-0.96px] capitalize">
              Will A Free Gift Pay Off This BFCM?
          </h1>
          <p className="mt-4 text-lg text-gray-400">
              Try realistic numbers. See your break-even and best-case in seconds.
          </p>
      </header>
  );
};

export default Header;
