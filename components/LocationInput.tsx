"use client";

import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks";
import type { Location, LocationInputProps } from "@/types";

/**
 * LocationInput Component
 * Autocomplete input for selecting travel locations
 */
export default function LocationInput({
  label,
  placeholder,
  locations,
  value,
  onChange,
  error,
}: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    const filtered = locations.filter(
      (loc) =>
        loc.english_name.toLowerCase().includes(inputValue.toLowerCase()) ||
        loc.short_code.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLocations(filtered);
    setIsOpen(true);
  };

  const handleSelectLocation = (location: Location) => {
    onChange(location.english_name);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <label className="block text-xs text-gray-600 mb-1 uppercase tracking-wide">
        {label}
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setFilteredLocations(locations);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-100 left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto min-w-[400px]">
          {filteredLocations.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              No locations found
            </div>
          ) : (
            filteredLocations.map((location) => (
              <div
                key={location.short_code}
                onClick={() => handleSelectLocation(location)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-lg">
                    {location.short_code}
                  </span>
                  <span className="text-gray-700">- {location.english_name}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {location.code_state}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1 absolute">{error}</p>}
    </div>
  );
}
