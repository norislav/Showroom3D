import { Provider } from "react-redux";
import Store from "./app/Store";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
