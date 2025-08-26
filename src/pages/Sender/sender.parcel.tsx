import { useState } from "react";
import {
  useGetMyParcelsQuery,
  useCancelParcelMutation,
  useAcceptReturnMutation,
} from "@/redux/apis/sender.api";
import { IParcel } from "@/types/parcel.types";
import { toast } from "sonner";

export default function SenderParcels() {
  const [currentPage] = useState(1);

  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery({
    page: currentPage,
    limit: 8,
  });

  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();
  const [acceptReturn, { isLoading: isReturning }] = useAcceptReturnMutation();

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      toast.success("Parcel cancelled successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel parcel");
    }
  };

  const handleReturn = async (id: string) => {
    try {
      await acceptReturn(id).unwrap();
      toast.success("Return accepted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to accept return");
    }
  };

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels found</p>;

  return (
  <div className="flex flex-col gap-6 p-4">
    {/* Parcel List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {parcels.map((parcel: IParcel) => (
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
              <span
                className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                  parcel.status === "APPROVED"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : parcel.status === "CANCELLED"
                    ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    : parcel.status === "DELIVERED"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                }`}
              >
                {parcel.status}
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Pickup:</span>{" "}
              {parcel.pickupAddress}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Delivery:</span>{" "}
              {parcel.deliveryAddress}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Receiver:</span>{" "}
              {typeof parcel.receiverId === "object" &&
              parcel.receiverId !== null &&
              "name" in parcel.receiverId
                ? (parcel.receiverId as { name: string }).name
                : parcel.receiverId}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Weight:</span> {parcel.weight}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Cost:</span> {parcel.cost}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            {/* Cancel Button */}
            {parcel.status !== "CANCELLED" &&
              parcel.status !== "DELIVERED" &&
              parcel.status !== "RECEIVED" && (
                <button
                  onClick={() => handleCancel(parcel._id)}
                  disabled={isCancelling}
                  className="px-3 py-1 bg-red-600 text-white dark:bg-red-500 dark:hover:bg-red-600 rounded hover:bg-red-700 transition disabled:bg-gray-400"
                >
                  {isCancelling ? "Processing..." : "Cancel Parcel"}
                </button>
              )}

            {/* Accept Return Button */}
            {parcel.status === "RETURNED" && (
              <button
                onClick={() => handleReturn(parcel._id)}
                disabled={isReturning}
                className="px-3 py-1 bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {isReturning ? "Processing..." : "Accept Return"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
