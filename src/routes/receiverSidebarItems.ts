
import ReceiverParcels from "@/pages/parcel/receiver.parcel";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/Receiver/Dashboard"));

export const receiverSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/Receiver/Dashboard",
                component: Dashboard,
            },
        ],
    },
    {
        title: "Receiver Pannel",
        items: [

            {
                title: "Parcels History",
                url: "AllParcels",
                component: ReceiverParcels,
            },

        ],
    },
];
