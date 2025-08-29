import { Routes, Route } from "react-router";
import BodyText from "./body.js";
import NavBar from "./Navbar.js";
import Invoices from "./Invoices.js";
import Cart from "./cart.js";

import {
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  CssBaseline,
  GlobalStyles,
  colors,
} from "@mui/material";
import { useState, useEffect } from "react";
import Home from "./Home.js";

export default function App() {
  return (
    <>
      {/* <Toaster /> */}
      {/* Resets browser margins and gives us control */}
      {/* <CssBaseline /> */}
      {/* Global styles so html/body/#root are full height and body is transparent */}
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            // backgroundImage:
            //   "linear-gradient(to bottom, #f3e8ff, #d8b4fe, #ffffff)",
            backgroundColor: "#121212",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/invoices" element={<><NavBar /> <Invoices /></>} /> */}
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </>
  );
}
