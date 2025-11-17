/**
 * Date formatting utilities
 */

/**
 * Formats a date object to DD / MM / YYYY - HH:MM format
 * @param date - Date object or null
 * @returns Formatted date string or empty string
 */
export function formatDateWithTime(date: Date | null): string {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day} / ${month} / ${year} - 00:00`;
}

/**
 * Formats a date string to DD/MM/YYYY format
 * @param dateString - ISO date string
 * @returns Formatted date string or empty string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Gets the number of days in a month
 * @param date - Date object
 * @returns Number of days in the month
 */
export function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Gets the first day of the month (0-6, Sunday-Saturday)
 * @param date - Date object
 * @returns Day of week (0-6)
 */
export function firstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

/**
 * Adjusts the start day for Monday-first week
 * JavaScript getDay() returns 0 for Sunday, but our calendar starts with Monday
 * @param startDay - Original start day from getDay()
 * @returns Adjusted start day for Monday-first calendar
 */
export function adjustStartDayForMondayFirst(startDay: number): number {
  return startDay === 0 ? 6 : startDay - 1;
}

/**
 * Month names array
 */
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Day abbreviations for calendar header
 */
export const DAY_ABBREVIATIONS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
