/**
 * SearchSkeleton Component
 * Loading skeleton for search results page
 */
export default function SearchSkeleton() {
  return (
    <div className="relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-16">
          <div className="space-y-12 animate-pulse">
            {/* Skeleton items */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-7 bg-gray-200 rounded-lg w-3/4"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
