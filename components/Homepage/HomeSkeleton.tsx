/**
 * HomeSkeleton Component
 * Loading skeleton for homepage
 */
export default function HomeSkeleton() {
  return (
    <div className="relative min-h-screen">
      {/* Header Skeleton */}
      <div 
        className="relative overflow-hidden"
        style={{
          height: "495px",
          background: "linear-gradient(180deg, #F5F8FF 0%, #DBF5FF 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          {/* Title Skeleton */}
          <div className="h-12 bg-white/30 rounded-lg w-96 mb-4 animate-pulse"></div>
          
          {/* Subtitle Skeleton */}
          <div className="h-6 bg-white/20 rounded-lg w-80 mb-12 animate-pulse"></div>
          
          {/* Tabs Skeleton */}
          <div className="flex gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-48 bg-white/40 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          {/* Search Form Skeleton */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 w-full max-w-6xl animate-pulse">
            <div className="flex gap-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1 h-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-12 bg-cyan-300 rounded-lg w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
