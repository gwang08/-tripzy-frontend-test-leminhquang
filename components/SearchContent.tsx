"use client";

import { useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TYPOGRAPHY } from "@/lib/constants";

/**
 * SearchContent Component
 * Displays search results summary with travel details
 */
export default function SearchContent() {
  const searchParams = useSearchParams();
  
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const dep = searchParams.get("dep") || "";
  const ret = searchParams.get("ret") || "";
  const pax = searchParams.get("pax") || "1";

  return (
    <div className="relative min-h-screen">
      {/* Search Summary Card */}
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-16">
          <div className="space-y-12">
            {/* From */}
            <div>
              <p className="text-gray-900" style={TYPOGRAPHY.searchCard}>
                From: {from || "Ben Thanh Market"}
              </p>
            </div>

            {/* To */}
            <div>
              <p className="text-gray-900" style={TYPOGRAPHY.searchCard}>
                To: {to}
              </p>
            </div>

            {/* Departure date */}
            <div>
              <p className="text-gray-900" style={TYPOGRAPHY.searchCard}>
                Departure date: {formatDate(dep)}
              </p>
            </div>

            {/* Return date */}
            <div>
              <p className="text-gray-900" style={TYPOGRAPHY.searchCard}>
                Return date: {ret ? formatDate(ret) : ""}
              </p>
            </div>

            {/* Passengers */}
            <div>
              <p className="text-gray-900" style={TYPOGRAPHY.searchCard}>
                No. of passenger: {pax}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
