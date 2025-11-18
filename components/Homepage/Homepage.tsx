"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LocationInput from "../LocationInput";
import DatePicker from "../DatePicker";
import PassengerSelector from "../PassengerSelector";
import locationsData from "@/data/locations.json";
import type { TabType, FormData, FormErrors } from "@/types";
import { validateSearchForm, isFormValid } from "@/lib/utils";
import { buildSearchParams } from "@/lib/utils";

export default function Homepage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("bus");
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form using utility function
    const newErrors = validateSearchForm(formData, isRoundTrip);
    setErrors(newErrors);

    if (!isFormValid(newErrors)) {
      return;
    }

    // Build URL params and navigate
    const queryString = buildSearchParams(formData, activeTab, isRoundTrip);
    router.push(`/search?${queryString}`);
  };

  const renderTabContent = () => {
    if (activeTab === "hotel" || activeTab === "flight") {
      return (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 text-lg">No data</p>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Single Row: All Fields */}
        <div className="flex gap-3 items-end mb-4 relative z-10">
          <LocationInput
            label="From"
            placeholder="Enter city, terminal..."
            locations={locationsData}
            value={formData.from}
            onChange={(value) => setFormData({ ...formData, from: value })}
            error={errors.from}
          />

          {/* Swap Button */}
          <div className="flex items-center pb-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  from: formData.to,
                  to: formData.from,
                })
              }
              className="p-2 text-cyan-500 hover:text-cyan-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>

          <LocationInput
            label="To"
            placeholder="Enter city, terminal..."
            locations={locationsData}
            value={formData.to}
            onChange={(value) => setFormData({ ...formData, to: value })}
            error={errors.to}
          />

          <DatePicker
            label="Departure date"
            value={formData.departureDate}
            onChange={(value) =>
              setFormData({ ...formData, departureDate: value })
            }
            minDate={new Date().toISOString().split("T")[0]}
            error={errors.departureDate}
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                id="roundTrip"
                checked={isRoundTrip}
                onChange={(e) => {
                  setIsRoundTrip(e.target.checked);
                  if (!e.target.checked) {
                    setFormData({ ...formData, returnDate: "" });
                  }
                }}
                className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
              />
              <label
                htmlFor="roundTrip"
                className="text-xs text-gray-600 uppercase tracking-wide"
              >
                Round trip?
              </label>
            </div>
            {isRoundTrip ? (
              <DatePicker
                label=""
                value={formData.returnDate}
                onChange={(value) =>
                  setFormData({ ...formData, returnDate: value })
                }
                minDate={
                  formData.departureDate ||
                  new Date().toISOString().split("T")[0]
                }
                error={errors.returnDate}
              />
            ) : (
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  disabled
                  placeholder="DD / MM / YYYY - HH:MM"
                  className="w-full pl-10 pr-4 py-4 text-base border border-gray-300 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed"
                />
              </div>
            )}
          </div>

          <PassengerSelector
            value={formData.passengers}
            onChange={(value) =>
              setFormData({ ...formData, passengers: value })
            }
            error={errors.passengers}
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-12 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-full transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="relative pt-24 py-16">
      {/* Hero Section */}
      <div className="text-center c">
        <h1
          className="text-gray-900 mb-3"
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "100%",
            letterSpacing: "0.89px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Travel Smarter, Not Harder
        </h1>
        <p
          className="text-gray-600"
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "100%",
            letterSpacing: "0px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Make every trip effortless. Tripzy lets you book rides and plan
          journeys with ease
        </p>
      </div>

      {/* Search Card */}
      <div className="max-w-7xl mx-auto px-4 pb-16      ">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          {/* Tabs */}
          <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("bus")}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-medium transition-colors rounded-xl ${
                activeTab === "bus"
                  ? "bg-cyan-100 text-cyan-700"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Homepage/Bus.png"
                  alt="Bus"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-base">Bus & Shuttle</span>
            </button>

            <div className="w-px h-8 bg-gray-300 mx-4"></div>

            <button
              onClick={() => setActiveTab("hotel")}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-medium transition-colors rounded-xl ${
                activeTab === "hotel"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Homepage/Hotel.png"
                  alt="Hotel"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-base">Hotel & Accommodation</span>
            </button>

            <div className="w-px h-8 bg-gray-300 mx-4"></div>

            <button
              onClick={() => setActiveTab("flight")}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 font-medium transition-colors rounded-xl ${
                activeTab === "flight"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/Homepage/Fight.png"
                  alt="Flight"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-base">Flight</span>
            </button>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
