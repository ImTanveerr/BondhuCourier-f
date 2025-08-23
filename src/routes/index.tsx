import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import Homepage from "@/pages/Homepage";


import Track from "@/pages/User/Track";

import { receiverSidebarItems } from "./receiverSidebarItems";
import Tracking from "@/pages/User/tracking";
import Contact from "@/pages/Contact";


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Track,
        path: "track",
      },
      {
        Component: Tracking,
        path: "tracking/:trackingId",
      },
      {
        Component: Contact,
        path: "Contact",
      },


    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),

    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.SENDER as TRole),
    path: "/Sender",
    children: [
      { index: true, element: <Navigate to="Sender/dashboard" /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RECEIVER as TRole),
    path: "/Receiver",
    children: [
      { index: true, element: <Navigate to="/Receiver/dashboard" /> },
      ...generateRoutes(receiverSidebarItems),
    ],
  },
  
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  

]);