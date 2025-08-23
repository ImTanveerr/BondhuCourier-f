// src/pages/ReceiverDashboard.tsx
import { useGetMyParcelsQuery } from "@/redux/apis/receiver.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ParcelStatus, IParcel } from "@/types/parcel.types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4444", "#A020F0", "#FF69B4", "#FFA500"];

export default function ReceiverDashboard() {
  const { data: parcels = [], isLoading } = useGetMyParcelsQuery();

  if (isLoading) return <p>Loading dashboard...</p>;

  // --- Stats ---
  const totalParcels = parcels.length;
  const deliveredCount = parcels.filter((p) => p.status === ParcelStatus.DELIVERED).length;
  const returnedCount = parcels.filter((p) => p.status === ParcelStatus.RETURNED).length;
  const pendingCount = parcels.filter((p) => p.status == ParcelStatus.PENDING).length;

  // --- Status distribution (Pie chart) ---
  const statusCounts: Record<string, number> = {};
  parcels.forEach((parcel: IParcel) => {
    if (parcel.status) {
      const status = parcel.status as ParcelStatus;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    }
  });
  const statusData = Object.keys(statusCounts).map((s) => ({ name: s, value: statusCounts[s] }));

  // --- Daily trend (Line chart) ---
  const dailyCounts: Record<string, number> = {};
  parcels.forEach((p: IParcel) => {
    if (p.createdAt) {
      const day = new Date(p.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    }
  });
  const trendData = Object.keys(dailyCounts)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((d) => ({
      day: new Date(d).toLocaleDateString("default", { day: "2-digit", month: "short" }),
      parcels: dailyCounts[d],
    }));

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Total Parcels", value: totalParcels, color: "bg-blue-500" },
          { title: "Pending", value: pendingCount, color: "bg-yellow-500" },
          { title: "Delivered", value: deliveredCount, color: "bg-green-500" },
          { title: "Returned", value: returnedCount, color: "bg-purple-500" },
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

      {/* Pie Chart - Status */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>Parcel Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100} label>
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart - Daily Parcels */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader>
          <CardTitle>Parcels Trend (Daily)</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="parcels" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
