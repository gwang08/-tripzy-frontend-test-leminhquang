import { Suspense } from "react";
import SearchContent from "@/components/Searchpage/SearchContent";
import SearchSkeleton from "@/components/Searchpage/SearchSkeleton";

/**
 * Search Page
 * Displays search results based on URL parameters
 */
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}
