import { DeleteOutline } from "@mui/icons-material";
import {
  Stack,
  IconButton,
  Card,
  Button,
  Typography,
  Grid,
  Container,
  Divider,
  Box,
} from "@mui/material";
import type { Product } from "../Home.js";
import toast, { Toaster } from "react-hot-toast";

type Props = Product & {
  addToCart: (id: number, cost: number, title: string) => void;
  removeFromCart: (id: number, removeAll?: boolean) => void;
};

const ProductCard = ({
  id,
  title,
  description,
  image,
  cost,
  addToCart,
  removeFromCart,
}: Props) => {
  return (
    <Stack
      display="flex"
      width={150}
      spacing={2}
      sx={{ p: 2, borderRadius: "7px", backgroundColor: "#1e1e1e" }}
    >
      <Stack sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{title}</Typography>
        <Box component="img" src={image}></Box>
        <Typography variant="subtitle1">{description}</Typography>
      </Stack>
      <Typography>${cost}</Typography>
      <Stack direction="row">
        <Button onClick={() => removeFromCart(id)}>➖</Button>
        <Button onClick={() => addToCart(id, cost, title)}>➕</Button>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
