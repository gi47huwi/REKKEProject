import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.js";
import Home from "./pages/Home";
import Menue from "./pages/Menue";
import { element } from "prop-types";
import Map from "./pages/Map";
import Info from "./pages/Info";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    errorElement: <div style={{justifyContent:"center"}}><h1>OOPS! Something went wrong</h1></div>,
    children:[
      {
        path:"home",
        element:<Home />
      },
      {
        path:"menue",
        element: <Menue />
      },
      {
        path:"map/:mapID",
        element:<Map />
      },
      {
        path:"info",
        element:<Info />
      }

    ]
    
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>
);