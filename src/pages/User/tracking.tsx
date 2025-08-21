// src/components/Tracking.tsx
import React, { useState } from "react";
import { useTrackParcelQuery } from "@/redux/apis/track.api";
import { ITrackingEvent } from "@/types/parcel.types";

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const { data: trackingEvents, isLoading, isError, refetch } = useTrackParcelQuery(
    submittedId,
    { skip: !submittedId }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return alert("Please enter a tracking ID");
    setSubmittedId(trackingId.trim());
    refetch();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Track Your Parcel</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Track
        </button>
      </form>

      {isLoading && <p>Loading tracking info…</p>}

      {isError && <p className="text-red-600">Parcel not found or server error</p>}

      {!isLoading && !isError && submittedId && trackingEvents?.length === 0 && (
        <p>No tracking events found for {submittedId}</p>
      )}

      {trackingEvents && trackingEvents.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold text-lg mb-2">Tracking History</h2>
          <ul className="border rounded p-2 space-y-2">
            {trackingEvents.map((event: ITrackingEvent, idx: number) => (
              <li key={idx} className="border-b last:border-b-0 p-2">
                <p><strong>Status:</strong> {event.status}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Time:</strong> {new Date(event.timestamp).toLocaleString()}</p>
                {event.note && <p><strong>Note:</strong> {event.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
