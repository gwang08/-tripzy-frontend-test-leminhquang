/**
 * Form data and validation types
 */

export interface FormData {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
}

export interface FormErrors {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: string;
}

export type TabType = "bus" | "hotel" | "flight";
