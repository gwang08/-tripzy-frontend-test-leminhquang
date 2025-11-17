"use client";

import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks";
import {
  formatDateWithTime,
  daysInMonth,
  firstDayOfMonth,
  adjustStartDayForMondayFirst,
  MONTH_NAMES,
  DAY_ABBREVIATIONS,
} from "@/lib/utils";
import type { DatePickerProps } from "@/types";

/**
 * DatePicker Component
 * Dual-month calendar picker with weekend highlighting
 */
export default function DatePicker({
  label,
  placeholder = "DD / MM / YYYY - HH:MM",
  value,
  onChange,
  minDate,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange(date.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderMonth = (monthDate: Date) => {
    const days = [];
    const totalDays = daysInMonth(monthDate);
    const startDay = firstDayOfMonth(monthDate);

    // Empty cells for days before month starts
    // Adjust startDay: JavaScript getDay() returns 0 for Sunday, but our week starts with Monday
    const adjustedStartDay = adjustStartDayForMondayFirst(startDay);
    
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-2 text-gray-300">
          {new Date(
            monthDate.getFullYear(),
            monthDate.getMonth(),
            -adjustedStartDay + i + 1
          ).getDate()}
        </div>
      );
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        day
      );
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === monthDate.getMonth() &&
        selectedDate.getFullYear() === monthDate.getFullYear();

      const isDisabled = minDate ? date < new Date(minDate) : false;
      // getDay() returns 0 for Sunday, 6 for Saturday
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
          className={`text-center py-2 rounded-lg transition-colors ${
            isSelected
              ? "bg-cyan-500 text-white hover:bg-cyan-600"
              : isDisabled
              ? "text-gray-300 bg-gray-50 cursor-not-allowed opacity-50"
              : isWeekend
              ? "text-red-500 hover:bg-cyan-50 cursor-pointer"
              : "text-gray-900 hover:bg-cyan-50 cursor-pointer"
          }`}
        >
          {day}
        </button>
      );
    }

    // Days from next month
    const remainingCells = 42 - (adjustedStartDay + totalDays);
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="text-center py-2 text-gray-300">
          {i}
        </div>
      );
    }

    return (
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          {monthDate.getTime() === currentMonth.getTime() && (
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {monthDate.getTime() !== currentMonth.getTime() && <div className="w-9"></div>}
          
          <div className="text-center font-semibold">
            {MONTH_NAMES[monthDate.getMonth()]} {monthDate.getFullYear()}
          </div>
          
          {monthDate.getTime() !== currentMonth.getTime() && (
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {monthDate.getTime() === currentMonth.getTime() && <div className="w-9"></div>}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_ABBREVIATIONS.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const renderCalendar = () => {
    const nextMonthDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    );

    return (
      <div className="p-4">
        <div className="flex gap-8">
          {renderMonth(currentMonth)}
          {renderMonth(nextMonthDate)}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      {label && (
        <label className="block text-xs text-gray-600 mb-1 uppercase tracking-wide">
          {label}
        </label>
      )}
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={formatDateWithTime(selectedDate)}
          onClick={() => setIsOpen(!isOpen)}
          placeholder={placeholder}
          readOnly
          className={`w-full pl-10 pr-4 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-100 left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[700px]">
          {renderCalendar()}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1 absolute">{error}</p>}
    </div>
  );
}
