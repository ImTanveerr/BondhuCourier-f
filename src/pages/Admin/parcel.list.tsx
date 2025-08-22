import React from "react";
import { IParcel } from "@/types/parcel.types";

interface ParcelListProps {
  parcels: IParcel[];
  onApprove: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ParcelList({ parcels, onApprove, onCancel, onDelete }: ParcelListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parcels.map((parcel) => (
        <div key={parcel._id} className="border p-3 rounded-md shadow-sm">
          <p><strong>Sender:</strong> {parcel.senderId}</p>
          <p><strong>Receiver:</strong> {parcel.receiverId}</p>
          <p><strong>Type:</strong> {parcel.parcelType}</p>
          <p><strong>Status:</strong> {parcel.status}</p>
          <p><strong>Pickup:</strong> {parcel.pickupAddress}</p>
          <p><strong>Tracking ID:</strong> {parcel.trackingId || "N/A"}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {parcel.status !== "APPROVED" && (
              <button
                onClick={() => onApprove(parcel._id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
            )}
            {parcel.status !== "CANCELLED" && parcel.status !== "DELIVERED" && (
              <button
                onClick={() => onCancel(parcel._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => onDelete(parcel._id)}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
