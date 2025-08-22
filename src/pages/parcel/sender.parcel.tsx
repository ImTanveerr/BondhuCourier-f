import { useGetMyParcelsQuery, useCancelParcelMutation } from "@/redux/apis/sender.api";
import { IParcel } from "@/types/parcel.types";
import ParcelFilters from "../parcel/parcel.filter";
export default function SenderParcels() {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      alert("Parcel cancelled successfully");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to cancel parcel");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parcels.map((parcel: IParcel) => (
        <div key={parcel._id} className="border p-3 rounded-md shadow-sm">
          <p><strong>Sender:</strong> {parcel.senderId?.name || parcel.senderId}</p>
          <p><strong>Receiver:</strong> {parcel.receiverId?.name || parcel.receiverId}</p>
          <p><strong>Type:</strong> {parcel.parcelType}</p>
          <p><strong>Status:</strong> {parcel.status}</p>
          <p><strong>Pickup:</strong> {parcel.pickupAddress}</p>
          <p><strong>Tracking ID:</strong> {parcel.trackingId || "N/A"}</p>

          {/* Only show cancel button for sender */}
          {parcel.status !== "CANCELLED" && parcel.status !== "DELIVERED" && (
            <button
              onClick={() => handleCancel(parcel._id)}
              disabled={isCancelling}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
            >
              {isCancelling ? "Processing..." : "Cancel Parcel"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
