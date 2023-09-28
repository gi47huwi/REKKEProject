import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./index.css";
import App from "./App.js";





ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
);