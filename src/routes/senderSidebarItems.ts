// import Analytics from "@/pages/Admin/Analytics";
import addParcel from "@/pages/parcel/addParcel";
import SenderParcels from "@/pages/parcel/sender.parcel";
import GetParcels from "@/pages/parcel/sender.parcel";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/Sender/Dashboard"));

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "Sender/dashboard",
        component: Dashboard,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
     
      {
        title: "Create Parcel",
        url: "createParcel",
        component: addParcel,
      },
      {
        title: "All Parcel",
        url: "AllParcels",
        component: SenderParcels,
      },
      
    ],
  },
];
