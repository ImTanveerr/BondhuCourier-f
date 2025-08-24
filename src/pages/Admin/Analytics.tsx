// src/pages/AdminAnalytics.tsx
import { 
  useGetAllUsersQuery, 
  useGetAllParcelsQuery 
} from "@/redux/apis/admin.api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  LineChart, Line, Legend 
} from "recharts";

// Use your enum values explicitly
const parcelTypes = ["DOCUMENT", "BOX", "FRAGILE", "OTHER"];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF4444"];

export default function AdminAnalytics() {
  // fetch with big limit to get all parcels
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: parcelsData, isLoading: parcelsLoading } = useGetAllParcelsQuery({ limit: 9999 });

  if (usersLoading || parcelsLoading) {
    return <div className="text-center py-10">Loading analytics...</div>;
  }

  const users = usersData?.data || [];
  const parcels = parcelsData?.data || [];

  // --- Users by role ---
  const roleCounts = users.reduce(
    (acc: any, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    {}
  );
  const roleChartData = Object.keys(roleCounts).map((role) => ({ name: role, value: roleCounts[role] }));



// --- User status distribution (enum-based, like roles/parcel types) ---
const userCounts: any={ ACTIVE: 0, INACTIVE: 0, BLOCKED: 0, BANNED: 0 };
users.forEach((u: any) => {
  if (userCounts[u.Status] !== undefined) {
    userCounts[u.Status]++;
  }
});


 // --- Parcel type distribution (using enum values) ---
const typeCounts: any = { DOCUMENT: 0, BOX: 0, FRAGILE: 0, OTHER: 0 };
parcels.forEach((p: any) => {
  if (typeCounts[p.parcelType] !== undefined) {
    typeCounts[p.parcelType]++;
  } else {
    typeCounts["OTHER"]++;
  }
});
const parcelTypeData = parcelTypes.map((t) => ({ name: t, value: typeCounts[t] }));


  // --- Parcel status distribution (multi-bar) ---
  const statusKeys = ["PENDING", "CANCELLED","APPROVED", "DISPATCHED", "IN_TRANSIT", "DELIVERED",  "RECEIVED", "RETURNED"];
  const statusCounts: any = {};
  statusKeys.forEach((key) => (statusCounts[key] = 0));
  parcels.forEach((p: any) => {
    if (statusCounts[p.status] !== undefined) {
      statusCounts[p.status]++;
    }
  });
  const parcelStatusData = statusKeys.map((s) => ({ status: s, count: statusCounts[s] }));

  // --- Parcel trend (daily, sorted ascending) ---
  const dailyCounts: Record<string, number> = {};
  parcels.forEach((p: any) => {
    if (p.createdAt) {
      const date = new Date(p.createdAt);
      const day = date.toISOString().split("T")[0]; // YYYY-MM-DD
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    }
  });

  // Sort by date ASC (old → new)
  const parcelTrendData = Object.keys(dailyCounts)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((d) => ({
      day: new Date(d).toLocaleDateString("default", { day: "2-digit", month: "short" }),
      parcels: dailyCounts[d],
    }));

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stats Cards */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
          <CardContent>{users.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Active Users</CardTitle></CardHeader>
          <CardContent>{userCounts["ACTIVE"]}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Blocked Users</CardTitle></CardHeader>
          <CardContent>{userCounts["BLOCKED"]}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Banned Users</CardTitle></CardHeader>
          <CardContent>{userCounts["BANNED"]}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Parcels</CardTitle></CardHeader>
          <CardContent>{parcels.length}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>APPROVED</CardTitle></CardHeader>
          <CardContent>{statusCounts["APPROVED"] || 0}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Returned</CardTitle></CardHeader>
          <CardContent>{statusCounts["RETURNED"] || 0}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Delivered</CardTitle></CardHeader>
          <CardContent>{statusCounts["DELIVERED"] || 0}</CardContent>
        </Card>
        
      </div>

      {/* Pie Chart - Users by Role */}
      <Card>
        <CardHeader><CardTitle>Users by Role</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={roleChartData} dataKey="value" nameKey="name" outerRadius={100} label>
                {roleChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Parcel Types */}
      <Card>
        <CardHeader><CardTitle>Parcel Types</CardTitle></CardHeader>
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

      {/* Bar Chart - Parcel Status */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader><CardTitle>Parcel Status Distribution</CardTitle></CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer>
            <BarChart data={parcelStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart - Parcel Trend (Daily, sorted ASC) */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader><CardTitle>Parcel Trend (Daily)</CardTitle></CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer>
            <LineChart data={parcelTrendData}>
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
