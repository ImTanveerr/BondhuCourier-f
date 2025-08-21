import { useGetMyParcelsQuery } from "@/redux/apis/sender.api";

export default function SenderDashboardSummary() {
  const { data: parcels, isLoading, isError } = useGetMyParcelsQuery();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error loading dashboard</p>;
  if (!parcels || parcels.length === 0) return <p>No parcels found</p>;

  // Count parcels by status
  const statusCount: Record<string, number> = {};
  parcels.forEach(parcel => {
    const status = parcel.status ?? "Unknown";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sender Dashboard</h1>
      <p><strong>Total Parcels:</strong> {parcels.length}</p>

      <div className="mt-3">
        <h2 className="font-semibold mb-2">Parcels by Status:</h2>
        <ul>
          {Object.entries(statusCount).map(([status, count]) => (
            <li key={status}>
              {status}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
