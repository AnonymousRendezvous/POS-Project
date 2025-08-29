import { useEffect } from "react";
import ProductCard from "./components/ProductCard.js";
import { Grid, Typography, Box } from "@mui/material";
import type { Product } from "./Home.js";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  products: Product[];
  addToCart: (id: number, cost: number, title: string) => void;
  removeFromCart: (id: number, removeAll?: boolean) => void;
};

export default function BodyText({
  products,
  addToCart,
  removeFromCart,
}: Props) {
  return (
    <>
      <Grid
        size={8}
        display="flex"
        direction="row"
        gap={2}
        flexWrap="wrap"
        // sx={{
        //   display: "grid",
        //   gridTemplateColumns: "repeat(3, 1fr)", // exactly 3 columns
        //   gap: 2, // spacing between items
        //   flex: "0 0 65%", // BodyText = 65% width
        //   minWidth: 0,
        // }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            cost={product.cost}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </Grid>
    </>
  );
}
