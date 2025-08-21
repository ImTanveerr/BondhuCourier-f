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
import Success from "@/pages/Payment/Success";
import Fail from "@/pages/Payment/Fail";
import parcel from "@/pages/parcel";
import CreateParcel from "@/pages/parcel/addParcel";
import tracking from "@/pages/User/tracking";

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
        Component: tracking,
        path: "track",
      },
     
      {
        Component: withAuth(parcel),
        path: "parcel",
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
    Component: withAuth(CreateParcel, role.SENDER as TRole),
    path: "/Parcel",
    children: [
      { index: true, element: <Navigate to="Sender/addParcel" /> },
      {
        Component: CreateParcel,  }
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
  {
    Component: Success,
    path: "/payment/success",
  },
  {
    Component: Fail,
    path: "/payment/fail",
  },
 
]);