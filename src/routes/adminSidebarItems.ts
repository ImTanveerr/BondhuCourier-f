// import Analytics from "@/pages/Admin/Analytics";
import parcels from "@/pages/Admin/parcels";
import users from "@/pages/Admin/users";
import parcelFilter from "@/pages/parcel/parcel.filter";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Management Pannel",
    items: [
     
      {
        title: "Manage Users",
        url: "/admin/users",
        component: users,
      },
      {
        title: "Manage Parcels",
        url: "/admin/parcels",
        component: parcels,
      },
      {
        title: "Filter Parcels",
        url: "/admin/filter-parcels",
        component: parcelFilter,
      },
      
    ],
  },
];
