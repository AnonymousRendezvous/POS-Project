import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff", // all Typography text will be white by default
        },
      },
    },
  },
});

export default theme;
