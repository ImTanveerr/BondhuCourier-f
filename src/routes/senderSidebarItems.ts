// import Analytics from "@/pages/Admin/Analytics";
import CreateParcelForm from "@/pages/parcel/addParcel";
import SenderParcels from "@/pages/Sender/sender.parcel";
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
        component: CreateParcelForm,
      },
      {
        title: "All Parcel",
        url: "AllParcels",
        component: SenderParcels,
      },
    ],
  },
];