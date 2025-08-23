import { useGetMyParcelsQuery } from "@/redux/apis/receiver.api";
import { IParcel } from "@/types/parcel.types";

export default function IncomingParcels() {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels found</p>;

  // Filter only PENDING or APPROVED parcels
  const filteredParcels = parcels.filter(
    (parcel: IParcel) => parcel.status === "PENDING" || parcel.status === "APPROVED"
  );

  if (filteredParcels.length === 0) return <p>No pending or approved parcels</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredParcels.map((parcel: IParcel) => (
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
              <span className="font-medium">Sender:</span>{" "}
              {typeof parcel.senderId === "object" && parcel.senderId !== null && "name" in parcel.senderId
                ? (parcel.senderId as { name: string }).name
                : parcel.senderId}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
