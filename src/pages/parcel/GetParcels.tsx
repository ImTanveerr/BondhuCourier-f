import { useGetMyParcelsQuery } from "@/redux/Api/sender.api";
import { IParcel } from "@/types/parcel.types";

export default function GetParcels() {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();

  if (isLoading) return <p>Loading parcels...</p>;
  if (isError) return <p>Error fetching parcels</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels found</p>;

  return (
    <div className="space-y-4">
      {parcels.map((parcel: IParcel) => (
        <div
          key={parcel._id}
          className="border p-4 rounded-md shadow-sm"
        >
            <p>
                <strong>Receiver Name: </strong>
            </p>
          
          <p>
            <strong>Type:</strong> {parcel.parcelType}
          </p>
          <p>
            <strong>Status:</strong> {parcel.status}
          </p>
          <p>
            <strong>Pickup:</strong> {parcel.pickupAddress}
          </p>
          <p>
            <strong>Delivery:</strong> {parcel.deliveryAddress}
          </p>
          <p>
            <strong>Weight:</strong> {parcel.weight} kg
          </p>
          <p>
            <strong>Cost:</strong> ৳{parcel.cost}
          </p>
          <p>
            <strong>Tracking ID:</strong> {parcel.trackingId || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}
