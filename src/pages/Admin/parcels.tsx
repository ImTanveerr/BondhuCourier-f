import React from "react";
import {
  useGetAllParcelsQuery,
  useApproveParcelMutation,
  useCancelParcelMutation,
  useDeleteParcelMutation,
} from "@/redux/apis/admin.api";
import { IParcel } from "@/types/parcel.types";
import { useSearchParams } from "react-router-dom";
import ParcelFilters from "../parcel/parcel.filter";

export default function AdminParcels() {
  const [searchParams] = useSearchParams();

  // Read filter values from URL params
  const filters = {
    searchTerm: searchParams.get("searchTerm") || undefined,
    status: searchParams.get("status") || undefined,
    type: searchParams.get("type") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  // Fetch parcels with filters
  const { data: parcels = [], isLoading, isError, refetch } = useGetAllParcelsQuery(filters);

  const [approveParcel] = useApproveParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();
  const [deleteParcel] = useDeleteParcelMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveParcel(id).unwrap();
      alert("Parcel approved successfully");
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to approve parcel");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      alert("Parcel cancelled successfully");
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to cancel parcel");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this parcel?")) return;
    try {
      await deleteParcel(id).unwrap();
      alert("Parcel deleted successfully");
      refetch();
    } catch (err: any) {
      alert(err?.data?.message || "Failed to delete parcel");
    }
  };

  if (isLoading) return <p>Loading parcels…</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels.length) return <p>No parcels found</p>;

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6 p-4">
      {/* Parcel List */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Filter Panel */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <ParcelFilters />
      </div>
    </div>
  );
}
