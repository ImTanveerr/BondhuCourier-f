import {
  useGetMyParcelsQuery,
  useReceiveParcelMutation,
  useReturnParcelMutation,
} from "@/redux/apis/receiver.api";
import { IParcel } from "@/types/parcel.types";

export default function DeliveredParcels() {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();
  const [receiveParcel, { isLoading: isReceiving }] = useReceiveParcelMutation();
  const [returnParcel, { isLoading: isReturning }] = useReturnParcelMutation();

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels found</p>;

  // Filter only DELIVERED parcels
  const deliveredParcels = parcels.filter((parcel: IParcel) => parcel.status === "DELIVERED");

  if (deliveredParcels.length === 0) return <p>No delivered parcels</p>;

  const handleReceive = async (id: string) => {
    try {
      await receiveParcel(id).unwrap();
      alert("Parcel marked as RECEIVED");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to receive parcel");
    }
  };

  const handleReturn = async (id: string) => {
    try {
      await returnParcel(id).unwrap();
      alert("Parcel marked as RETURNED");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to return parcel");
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deliveredParcels.map((parcel: IParcel) => (
        <div
          key={parcel._id}
          className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Tracking ID: {parcel.trackingId || "N/A"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Type:</span> {parcel.parcelType}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Status:</span>{" "}
              <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                {parcel.status}
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Pickup:</span> {parcel.pickupAddress}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Delivery:</span> {parcel.deliveryAddress}
            </p>
             <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Sender:</span>{" "}
              {typeof parcel.senderId === "object" && parcel.senderId !== null && "name" in parcel.senderId
                ? (parcel.senderId as { name: string }).name
                : parcel.senderId}
            </p>
          </div>

          {/* Actions for delivered parcels */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={() => handleReceive(parcel._id)}
              disabled={isReceiving}
              className="px-3 py-1 bg-green-600 text-white dark:bg-green-500 dark:hover:bg-green-600 rounded hover:bg-green-700 transition"
            >
              {isReceiving ? "Processing..." : "Receive"}
            </button>
            <button
              onClick={() => handleReturn(parcel._id)}
              disabled={isReturning}
              className="px-3 py-1 bg-red-600 text-white dark:bg-red-500 dark:hover:bg-red-600 rounded hover:bg-red-700 transition"
            >
              {isReturning ? "Processing..." : "Return"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
