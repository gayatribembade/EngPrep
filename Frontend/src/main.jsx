import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Using createRoot()
root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
);
