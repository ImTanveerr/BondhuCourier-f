// import Analytics from "@/pages/Admin/Analytics";
import parcels from "@/pages/Admin/parcels";
import users from "@/pages/Admin/users";
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
    
      
    ],
  },
];
