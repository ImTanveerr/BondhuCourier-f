// src/components/parcel/ParcelFilters.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParcelStatus } from "@/types/parcel.types";

export default function ParcelFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // update URL whenever any filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (status) params.set("status", status);
    if (type) params.set("type", type);
    if (sort) params.set("sort", sort);

    navigate(`/admin/parcels?${params.toString()}`, { replace: true });
  }, [searchTerm, status, type, sort, navigate]);

  const handleClear = () => {
    setSearchTerm("");
    setStatus("");
    setType("");
    setSort("");
    navigate("/admin/parcels", { replace: true });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 mb-4 flex-wrap">
      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search description, pickup..."
        className="flex-1 min-w-[150px] border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Status + Sort side by side */}
      <div className="flex gap-2 flex-1 min-w-[260px]">
        {/* Status */}
        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger className="flex-1 min-w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(ParcelStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select onValueChange={setSort} value={sort}>
          <SelectTrigger className="flex-1 min-w-[120px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pickupAddress">Pickup</SelectItem>
              <SelectItem value="deliveryAddress">Delivery</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Clear button */}
      <div className="flex gap-2 ml-auto">
        <Button size="sm" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
