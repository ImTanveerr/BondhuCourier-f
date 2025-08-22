// src/components/parcel/ParcelFilters.tsx
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ParcelType, ParcelStatus } from "@/types/parcel.types";

interface ParcelFiltersProps {
  // optional callback if needed
  // onApply?: (filters: { searchTerm?: string; status?: string; type?: string; sort?: string }) => void;
}

export default function ParcelFilters({}: ParcelFiltersProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const handleGo = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (status) params.set("status", status);
    if (type) params.set("type", type);
    if (sort) params.set("sort", sort);

    navigate(`/admin/parcels?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchTerm("");
    setStatus("");
    setType("");
    setSort("");
    navigate("/admin/parcels");
  };

  return (
    <div className="w-60 border p-4 rounded-md space-y-4">
      <h2 className="font-semibold mb-2">Filters</h2>

      <div>
        <Label>Search</Label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search description, pickup..."
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <Label>Status</Label>
        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {Object.values(ParcelStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Type</Label>
        <Select onValueChange={setType} value={type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Parcel Type</SelectLabel>
              {Object.values(ParcelType).map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sort</Label>
        <Select onValueChange={setSort} value={sort}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pickupAddress">Pickup Address</SelectItem>
              <SelectItem value="deliveryAddress">Delivery Address</SelectItem>
              <SelectItem value="createdAt">Created At</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between mt-4">
        <Button size="sm" variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Button size="sm" onClick={handleGo}>
          Go
        </Button>
      </div>
    </div>
  );
}
