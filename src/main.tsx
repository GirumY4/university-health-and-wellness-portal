import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppThemeProvider } from "./app/AppThemeProvider";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

createRoot(container).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
