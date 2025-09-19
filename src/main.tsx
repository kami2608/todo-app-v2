import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/Variables.css";
import "./styles/Global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
