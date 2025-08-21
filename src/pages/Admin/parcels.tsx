import React from "react";
import {
  useGetAllParcelsQuery,
  useApproveParcelMutation,
  useCancelParcelMutation,
  useDeleteParcelMutation,
  useUpdateParcelMutation,
} from "@/redux/apis/admin.api";
import { IParcel } from "@/types/parcel.types";

export default function AdminParcels() {
  const { data: resp, isLoading, isError } = useGetAllParcelsQuery();
  const parcels = resp ?? [];

  const [approveParcel] = useApproveParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();
  const [deleteParcel] = useDeleteParcelMutation();
  const [updateParcel] = useUpdateParcelMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveParcel(id).unwrap();
      alert("Parcel approved successfully");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to approve parcel");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      alert("Parcel cancelled successfully");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to cancel parcel");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this parcel?")) return;
    try {
      await deleteParcel(id).unwrap();
      alert("Parcel deleted successfully");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to delete parcel");
    }
  };

  const handleUpdate = async (id: string, patch: Partial<IParcel>) => {
    try {
      await updateParcel({ id, body: patch }).unwrap();
      alert("Parcel updated successfully");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to update parcel");
    }
  };

  if (isLoading) return <p>Loading parcels…</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels.length) return <p>No parcels found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parcels.map((parcel: IParcel) => (
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
                onClick={() => handleApprove(parcel._id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
            )}
            {parcel.status !== "CANCELLED" && parcel.status !== "DELIVERED" && (
              <button
                onClick={() => handleCancel(parcel._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => handleDelete(parcel._id)}
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
