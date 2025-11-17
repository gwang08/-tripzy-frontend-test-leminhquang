/**
 * URL and navigation utilities
 */

import { FormData, TabType } from '@/types';

/**
 * Builds search query parameters from form data
 * @param formData - Form data
 * @param activeTab - Active tab type
 * @param isRoundTrip - Whether round trip is selected
 * @returns URLSearchParams object
 */
export function buildSearchParams(
  formData: FormData,
  activeTab: TabType,
  isRoundTrip: boolean
): URLSearchParams {
  const params = new URLSearchParams({
    mode: activeTab,
    from: formData.from,
    to: formData.to,
    dep: formData.departureDate,
    pax: formData.passengers.toString(),
  });

  if (isRoundTrip && formData.returnDate) {
    params.append("ret", formData.returnDate);
  }

  return params;
}
