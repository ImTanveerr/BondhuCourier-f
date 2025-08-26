import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaBoxOpen } from "react-icons/fa";

export default function Track() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/tracking/${trackingId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 flex justify-center items-start">
      <div className="max-w-xl w-full text-center">
        {/* Icon */}
        <div className="text-orange-500 text-6xl mb-4">
          <FaBoxOpen />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Track Your Parcel
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your tracking ID below to see the latest updates on your shipment.
        </p>

        {/* Tracking Bar */}
        <div className="p-6 rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="flex-1 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-transparent dark:text-gray-100 bg-transparent text-gray-900"
            />
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Track
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
