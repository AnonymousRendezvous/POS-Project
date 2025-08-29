import { TypeSpecimen } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <>
      <div id="root">
        <Stack direction="row">
          <Link to="/">
            <Button
              variant="contained"
              sx={{ color: "white", marginTop: "10px", marginLeft: "10px" }}
            >
              Home
            </Button>
          </Link>{" "}
          <Link to="/invoices">
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: " #6f41c3",
                marginBottom: "20px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              Invoices
            </Button>
          </Link>
        </Stack>
      </div>
    </>
  );
}
