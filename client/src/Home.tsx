import { Routes, Route } from "react-router";
import BodyText from "./body.js";
import NavBar from "./Navbar.js";
import Invoices from "./Invoices.js";
import Cart from "./cart.js";
import { toast, Toaster } from "react-hot-toast";
import { Box, Button, IconButton, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  cost: number;
  image: string;
}
export interface Cart {
  id: number;
  quantity: number;
  cost: number;
  title: string;
}
function Home() {
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:4242/");
        const data = await res.json();
        console.log("Fetched products:", data);
        updateProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  const [products, updateProducts] = useState<Product[]>([]);
  const [cart, updateCart] = useState<Cart[]>([]);
  function addToCart(id: number, cost: number, title: string) {
    let found = false;
    const currentCart = cart.map((product) => {
      if (product.id === id) {
        found = true;
        return {
          id: id,
          cost: product.cost,
          quantity: product.quantity + 1,
          title: product.title,
        };
      } else {
        return product;
      }
    });
    if (found == false) {
      currentCart.push({
        id: id,
        cost: cost,
        quantity: 1,
        title: title,
      });
    }
    // console.log("works")
    // const notify = () => toast('Here is your toast.');

    toast.success(
      <div>
        <Typography
          variant="body1"
          sx={{ fontWeight: 750, color: "green", display: "inline" }}
        >
          Added{" "}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 750, color: "#1e1e1e", display: "inline" }}
        >
          to Cart
        </Typography>
      </div>,
      { duration: 2000 } // 👈 auto-dismiss after 2s
    );
    updateCart(currentCart);
  }
  function removeFromCart(id: number, removeAll = false) {
    let newCart = [...cart];

    for (let i = 0; i < newCart.length; i++) {
      const item = newCart[i];
      if (item && item.id === id) {
        if (removeAll || item.quantity === 1) {
          // remove the item completely
          newCart.splice(i, 1);
          i--; // adjust index after removal
        } else {
          // decrement quantity by 1
          item.quantity -= 1;
        }
        break; // item found and handled, exit loop
      }
    }
    toast.error(
      <div>
        <Typography
          variant="body1"
          sx={{ fontWeight: 750, color: "red", display: "inline" }}
        >
          Removed{" "}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 750, color: "#1e1e1e", display: "inline" }}
        >
          from Cart
        </Typography>
      </div>,
      { duration: 2000 } // 👈 auto-dismiss after 2s
    );
    updateCart(newCart);
  }
  return (
    <>
      <Box aria-hidden="true">
        <NavBar />
        <Grid container spacing={2} marginX={20}>
          <BodyText
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
          <Toaster position="top-right" />
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </Grid>
      </Box>
    </>
  );
}

export default Home;
