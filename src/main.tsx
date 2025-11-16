
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/sap_database_explorer">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:tableName" element={<App />} />
    </Routes>
  </BrowserRouter>
);
  