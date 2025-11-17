/**
 * Custom hook for detecting clicks outside an element
 */

import { useEffect, RefObject } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 * @param ref - React ref object
 * @param handler - Callback function to execute on outside click
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}
