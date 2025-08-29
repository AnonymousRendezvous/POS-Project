import NavBar from "./Navbar.js";

// export default function Invoices() {
//   return (
//     <>
//       <NavBar />
//       <div id="root">
//         <ul>Invoices</ul>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface InvoiceItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: number;
  status: string;
  due_date: string;
  created_at: string;
  items?: InvoiceItem[];
  total_price?: number;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:4242/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  return (
    <>
      <NavBar />
      <Typography>Testing Invoice</Typography>
    </>
  );
};

export default Invoices;
