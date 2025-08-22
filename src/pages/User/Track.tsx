// src/pages/Track.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Track() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      // Navigate to the tracking page with the entered ID
      navigate(`/tracking/${trackingId.trim()}`);
    }
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
        <Button type="submit" className="px-4 py-2">
          Track
        </Button>
      </form>
    </div>
  );
}
