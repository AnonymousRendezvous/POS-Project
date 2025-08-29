import { Button, Typography, Grid, Box } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";

import CartCard from "./components/CartCard.js";

interface CartItem {
  id: number;
  quantity: number;
  cost: number;
  title: string;
}

type Props = {
  cart: CartItem[];
  removeFromCart: (id: number, removeAll?: boolean) => void;
};

export default function Cart({ cart, removeFromCart }: Props) {
  // Calculate total cost
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (item) {
      total += item.cost * item.quantity;
      total = Math.round(total * 100) / 100;
    }
  }

  async function checkout() {
    toast.success(
      <Typography
        variant="body1"
        sx={{ fontWeight: 750, color: "#1e1e1e", display: "inline" }}
      >
        Request sent to Backend
      </Typography>,
      { duration: 4000 } // 👈 auto-dismiss after 2s
    );
  }

  function CheckDiscount() {
    const discount = cart.find((item) => item.id === 7);

    if (discount && total >= 100) {
      return (
        <Typography
          sx={{ paddingTop: "20px", paddingBottom: "10px", color: "green" }}
        >
          ${Math.round(((total * 9) / 10) * 100) / 100}
        </Typography>
      );
    } else if (discount && total < 100) {
      return (
        <Typography
          sx={{ paddingTop: "20px", paddingBottom: "10px", color: "red" }}
        >
          ${Math.round(total * 100) / 100}
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ paddingTop: "20px", paddingBottom: "10px" }}>
          ${Math.round(total * 100) / 100}
        </Typography>
      );
    }
  }
  return (
    <Grid
      size={4}
      sx={{ borderLeft: 1, paddingLeft: "25px", borderColor: "white" }}
    >
      <Typography
        variant="h6"
        sx={{ paddingBottom: "10px", fontWeight: 750, marginBotton: "10px" }}
      >
        Cart
      </Typography>
      {cart.length === 0 && (
        <Typography sx={{ fontWeight: 500 }}>Your cart is empty</Typography>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)", // exactly 3 columns
          gap: 2,
          flex: "0 0 35%", // BodyText = 65% width
          minWidth: 0,
        }}
      >
        {cart.map((product) => (
          <CartCard
            key={product.id}
            id={product.id}
            cost={product.cost}
            quantity={product.quantity}
            title={product.title}
            removeFromCart={removeFromCart}
          />
        ))}
      </Box>

      <CheckDiscount />
      <Button
        variant="outlined"
        onClick={checkout}
        disabled={cart.length === 0}
        sx={{
          color: "#6f41c3",
          fontWeight: 750,
          borderWidth: 4,
          borderColor: " #6f41c3",
        }}
      >
        Checkout
      </Button>
    </Grid>
  );
}
