import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext.js";
import "antd/dist/reset.css";
import { SearchProvider } from "./context/searchContext.js";
import { CartContexProvider } from "./context/cartContex.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartContexProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>

      </CartContexProvider>
    </SearchProvider>
  </AuthProvider>
);
