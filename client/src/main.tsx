import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
// import './index.css'
// import App from './App.tsx'
import App from "./App.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes/theme.js"; // import your custom theme

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
