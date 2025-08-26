import { useState } from "react";
import {
  useGetAllParcelsQuery,
  useApproveParcelMutation,
  useCancelParcelMutation,
  useDeleteParcelMutation,
  useDeliverParcelMutation,
} from "@/redux/apis/admin.api";
import { IParcel } from "@/types/parcel.types";
import { useSearchParams } from "react-router-dom";
import ParcelFilters from "../parcel/parcel.filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

export default function AdminParcels() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const filters = {
    searchTerm: searchParams.get("searchTerm") || undefined,
    status: searchParams.get("status") || undefined,
    type: searchParams.get("type") || undefined,
    sort: searchParams.get("sort") || undefined,
    page: currentPage,
    limit,
  };

  const { data, isLoading, isError, refetch } = useGetAllParcelsQuery(filters);
  const parcels: IParcel[] = data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;

  const [approveParcel] = useApproveParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();
  const [deleteParcel] = useDeleteParcelMutation();
  const [deliverParcel] = useDeliverParcelMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveParcel(id).unwrap();
      toast.success("Parcel approved successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve parcel");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      toast.success("Parcel cancelled successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel parcel");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this parcel?")) return;
    try {
      await deleteParcel(id).unwrap();
      toast.success("Parcel deleted successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete parcel");
    }
  };

  const handleDeliver = async (id: string) => {
    try {
      await deliverParcel(id).unwrap();
      toast.success("Parcel delivered successfully");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to deliver parcel");
    }
  };

  return (
    <div className="">
      {/* Filter Panel */}
      <div className="">
        <ParcelFilters />
      </div>

      {/* Parcel List */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading && <p>Loading parcels…</p>}
        {isError && <p>Error fetching parcels</p>}

        {!isLoading && !isError && parcels.length === 0 && (
          <p>No parcels found</p>
        )}

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
                <span className="font-medium">Pickup:</span> {parcel.pickupAddress}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Delivery:</span> {parcel.deliveryAddress}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Sender:</span> {parcel.senderId}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Receiver:</span> {parcel.receiverId}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {parcel.status !== "APPROVED" && parcel.status !== "DELIVERED" && (
                <button
                  onClick={() => handleApprove(parcel._id)}
                  className="px-3 py-1 bg-green-600 text-white dark:bg-green-500 dark:hover:bg-green-600 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
              )}

              {parcel.status !== "CANCELLED" && parcel.status !== "DELIVERED" && (
                <button
                  onClick={() => handleCancel(parcel._id)}
                  className="px-3 py-1 bg-red-600 text-white dark:bg-red-500 dark:hover:bg-red-600 rounded hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              )}

              {parcel.status === "APPROVED" && (
                <button
                  onClick={() => handleDeliver(parcel._id)}
                  className="px-3 py-1 bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  Deliver
                </button>
              )}

              <button
                onClick={() => handleDelete(parcel._id)}
                className="px-3 py-1 bg-gray-600 text-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded hover:bg-gray-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="w-full bottom-0 left-0 p-4 flex justify-center bg-transparent">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
                  className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
        </div>
      )}
    </div>
  );
}
