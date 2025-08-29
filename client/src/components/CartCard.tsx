import { DeleteOutline } from "@mui/icons-material";
import { Grid, IconButton, Typography, Card, Stack } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import type { Cart } from "../Home.js";

type Props = Cart & {
  removeFromCart: (id: number, removeAll?: boolean) => void;
};
const CartCard = ({ id, title, quantity, removeFromCart }: Props) => {
  return (
    <Stack direction="row" sx={{ padding: "0px" }}>
      <Typography variant="h6" fontSize={16}>
        {title} → {quantity} pcs
      </Typography>
      <IconButton
        sx={{ paddingTop: "0px" }}
        color="error"
        onClick={() => removeFromCart(id, true)}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Stack>
  );
};

export default CartCard;
