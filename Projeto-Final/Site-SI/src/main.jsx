// Módulo de entrada pro react

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Módulo principal da aplicação
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
