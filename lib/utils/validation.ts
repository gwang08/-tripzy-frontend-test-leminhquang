/**
 * Form validation utilities
 */

import { FormData, FormErrors } from '@/types';

/**
 * Validates the search form data
 * @param formData - Form data to validate
 * @param isRoundTrip - Whether round trip is selected
 * @returns Object containing validation errors
 */
export function validateSearchForm(
  formData: FormData,
  isRoundTrip: boolean
): FormErrors {
  const errors: FormErrors = {};

  if (!formData.from.trim()) {
    errors.from = "Please select departure location";
  }

  if (!formData.to.trim()) {
    errors.to = "Please select destination location";
  }

  if (!formData.departureDate) {
    errors.departureDate = "Please select departure date";
  }

  if (isRoundTrip && !formData.returnDate) {
    errors.returnDate = "Please select return date";
  }

  if (
    isRoundTrip &&
    formData.departureDate &&
    formData.returnDate &&
    new Date(formData.returnDate) < new Date(formData.departureDate)
  ) {
    errors.returnDate = "Return date must be after departure date";
  }

  if (formData.passengers < 1) {
    errors.passengers = "At least 1 passenger is required";
  }

  return errors;
}

/**
 * Checks if form has any errors
 * @param errors - Errors object
 * @returns True if form is valid (no errors)
 */
export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0;
}
