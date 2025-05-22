import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6f8",
      paper: "#ffffff", 
    },
    primary: {
      main: "#2563eb", 
    },
    secondary: {
      main: "#64748b", 
    },
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h4: {
      fontWeight: 600,
      fontSize: "1.8rem",
    },
    body2: {
      color: "#64748b",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
    },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
