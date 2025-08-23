// src/pages/SenderDashboard.tsx
import { useGetMyParcelsQuery } from "@/redux/apis/sender.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ParcelStatus, ParcelType } from "@/types/parcel.types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SenderDashboard() {
  const { data: parcels = [], isLoading } = useGetMyParcelsQuery({ page: 1, limit: 100 });

  if (isLoading) return <p>Loading dashboard...</p>;

  // --- Stats ---
  const totalParcels = parcels.length;
  const cancelledCount = parcels.filter((p) => p.status === ParcelStatus.CANCELLED).length;
  const approvedCount = parcels.filter((p) => p.status === ParcelStatus.APPROVED).length;
  const deliveredCount = parcels.filter((p) => p.status === ParcelStatus.DELIVERED).length;
  const pendingCount = parcels.filter((p) => p.status == ParcelStatus.PENDING).length;
  const transCount = parcels.filter((p) => p.status == ParcelStatus.IN_TRANSIT).length;
  const receivedCount = parcels.filter((p) => p.status == ParcelStatus.RECEIVED).length;
  const returnedCount = parcels.filter((p) => p.status == ParcelStatus.RETURNED).length;

  // --- Parcel type distribution ---
  const typeCounts: Record<ParcelType, number> = {
    DOCUMENT: 0,
    BOX: 0,
    FRAGILE: 0,
    OTHER: 0,
  };
  parcels.forEach((p) => {
    if (p.parcelType) {
      typeCounts[p.parcelType] = (typeCounts[p.parcelType] || 0) + 1;
    }
  });
  const parcelTypeData = Object.keys(typeCounts).map((k) => ({
    name: k,
    value: typeCounts[k as ParcelType],
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {[
          { title: "Total Parcels", value: totalParcels, color: "bg-blue-500" },
          { title: "Pending", value: pendingCount, color: "bg-yellow-500" },
          { title: "Approved", value: approvedCount, color: "bg-green-500" },
          { title: "Cancelled", value: cancelledCount, color: "bg-red-500" },
          { title: "Transport", value: transCount, color: "bg-orange-500" },
          { title: "Delivered", value: deliveredCount, color: "bg-blue-600" },
          { title: "Received", value: receivedCount, color: "bg-teal-500" },
          { title: "Returned", value: returnedCount, color: "bg-purple-500" },
          // { title: "Total Cost", value: `$${totalCost.toFixed(2)}`, color: "bg-teal-500" },
        ].map((stat) => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition">
            <CardContent className="flex flex-col justify-center items-center text-center space-y-2 p-6">
              <div className={`${stat.color} w-12 h-12 rounded-full`} />
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pie Chart Card */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>Parcel Type Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={parcelTypeData} dataKey="value" nameKey="name" outerRadius={100} label>
                {parcelTypeData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
