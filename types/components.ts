/**
 * Component prop types
 */

import { Location } from './location';

export interface LocationInputProps {
  label: string;
  placeholder: string;
  locations: Location[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface DatePickerProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  error?: string;
}

export interface PassengerSelectorProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}
