import React from "react";
import {
  useGetMyParcelsQuery,
  useReceiveParcelMutation,
  useReturnParcelMutation,
} from "@/redux/apis/receiver.api";
import { IParcel } from "@/types/parcel.types";
import ParcelFilters from "../parcel/parcel.filter";

export default function ReceiverParcels() {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();
  const [receiveParcel, { isLoading: isReceiving }] = useReceiveParcelMutation();
  const [returnParcel, { isLoading: isReturning }] = useReturnParcelMutation();

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

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels assigned to you</p>;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6 p-4">
      {/* Parcel List */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parcels.map((parcel: IParcel) => (
          <div key={parcel._id} className="border p-3 rounded-md shadow-sm flex flex-col justify-between">
            <div>
              <p><strong>Sender:</strong> {parcel.senderId?.name || parcel.senderId}</p>
              <p><strong>Receiver:</strong> {parcel.receiverId?.name || parcel.receiverId}</p>
              <p><strong>Type:</strong> {parcel.parcelType}</p>
              <p><strong>Status:</strong> {parcel.status}</p>
              <p><strong>Pickup:</strong> {parcel.pickupAddress}</p>
              <p><strong>Delivery:</strong> {parcel.deliveryAddress}</p>
              <p><strong>Tracking ID:</strong> {parcel.trackingId || "N/A"}</p>
            </div>

            {/* Receiver actions */}
            <div className="mt-3 flex gap-2 flex-wrap">
              {parcel.status === "DELIVERED" && (
                <button
                  onClick={() => handleReceive(parcel._id)}
                  disabled={isReceiving}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isReceiving ? "Processing..." : "Receive"}
                </button>
              )}
              {parcel.status === "DELIVERED" && (
                <button
                  onClick={() => handleReturn(parcel._id)}
                  disabled={isReturning}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                  {isReturning ? "Processing..." : "Return"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Panel on the right */}
      {/* <div className="w-full lg:w-64 flex-shrink-0">
        <ParcelFilters />
      </div> */}
    </div>
  );
}
