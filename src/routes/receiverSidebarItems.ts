
import DeliveredParcels from "@/pages/Receiver/deliverd.parcel";
import IncomingParcels from "@/pages/Receiver/incoming.parcel";
import ReceiverParcels from "@/pages/Receiver/receiver.parcel";
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
                title: "All Parcels",
                url: "AllParcels",
                component: ReceiverParcels,
            },
            {
                title: "Incoming Parcels",
                url: "incomingParcels",
                component: IncomingParcels,
            },
            {
                title: "Delivered Parcels",
                url: "DeliveredParcels",
                component: DeliveredParcels,
            },

        ],
    },
];
