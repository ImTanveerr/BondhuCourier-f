import App from "@/App";
import { createBrowserRouter } from "react-router";

export const router =createBrowserRouter([
    {
        //element: <App/>,
        Component:App,
        path: "/",
        children: [{
          
        }]
    }
])