// src/pages/Tracking.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ITrackingEvent } from "@/types/parcel.types";
import { useTrackParcelQuery } from "@/redux/apis/track.api";

export default function Tracking() {
  const { trackingId: paramId } = useParams<{ trackingId: string }>();
  const [trackingId, setTrackingId] = useState(paramId || "");
  const navigate = useNavigate();

  const { data: trackingEvents, isLoading, isError, refetch } = useTrackParcelQuery(
    trackingId || "",
    { skip: !trackingId }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/tracking/${trackingId.trim()}`);
      refetch();
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Tracking Input Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex-1">
            Track Your Parcel
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-1 gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="flex-1 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-900 dark:text-gray-100"
            />
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Track
            </Button>
          </form>
        </div>

        {/* Tracking Events */}
        {isLoading && (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading tracking info…</p>
        )}

        {isError && (
          <p className="text-center text-red-600">
            Parcel not found or server error for <strong>{trackingId}</strong>
          </p>
        )}

        {!isLoading && !isError && trackingEvents?.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No tracking events found for <strong>{trackingId}</strong>
          </p>
        )}

        {trackingEvents && trackingEvents.length > 0 && (
          <div className="mt-6 space-y-4">
            {trackingEvents.map((event: ITrackingEvent, idx: number) => (
              <div
                key={idx}
                className="border-l-4 border-orange-500 pl-4 py-3 rounded-lg"
              >
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {event.status}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}
                </p>
                {event.note && (
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Note:</strong> {event.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
