"use client";

import type { PassengerSelectorProps } from "@/types";

/**
 * PassengerSelector Component
 * Input component for selecting number of passengers
 */
export default function PassengerSelector({
  value,
  onChange,
  error,
}: PassengerSelectorProps) {
  const increment = () => {
    if (value < 10) onChange(value + 1);
  };

  const decrement = () => {
    if (value > 1) onChange(value - 1);
  };

  return (
    <div className="relative flex-1">
      <label className="block text-xs text-gray-600 mb-1 uppercase tracking-wide">
        No. of Passenger
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          readOnly
          className={`w-full pl-10 pr-16 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            type="button"
            onClick={increment}
            disabled={value >= 10}
            className="px-2 py-0.5 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed rounded"
          >
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={value <= 1}
            className="px-2 py-0.5 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed rounded"
          >
            <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1 absolute">{error}</p>}
    </div>
  );
}
