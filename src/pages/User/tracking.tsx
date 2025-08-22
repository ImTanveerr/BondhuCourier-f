// src/pages/Tracking.tsx
import { useParams } from "react-router-dom";
import { ITrackingEvent } from "@/types/parcel.types";
import { useTrackParcelQuery } from "@/redux/apis/track.api";

export default function Tracking() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const { data: trackingEvents, isLoading, isError } = useTrackParcelQuery(
    trackingId || ""
  );

  if (!trackingId) return <p>No Tracking ID provided</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow-sm">
      <h1 className="text-2xl font-bold mb-4">Tracking Details</h1>

      {isLoading && <p>Loading tracking info…</p>}

      {isError && (
        <p className="text-red-600">
          Parcel not found or server error for {trackingId}
        </p>
      )}

      {!isLoading && !isError && trackingEvents?.length === 0 && (
        <p>No tracking events found for {trackingId}</p>
      )}

      {trackingEvents && trackingEvents.length > 0 && (
        <div className="mt-4">
          <ul className="border rounded p-2 space-y-2">
            {trackingEvents.map((event: ITrackingEvent, idx: number) => (
              <li key={idx} className="border-b last:border-b-0 p-2">
                <p>
                  <strong>Status:</strong> {event.status}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(event.timestamp).toLocaleString()}
                </p>
                {event.note && <p><strong>Note:</strong> {event.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
