import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "hsl(0, 0%, 100%)",
    },
    secondary: {
      main: "hsl(0, 0%, 52%)",
    },
    background: {
      default: "hsl(0, 0%, 98%)", // Very Light Gray
      paper: "hsl(0, 0%, 100%)", // White
    },
    text: {
      primary: "hsl(200, 15%, 8%)", // Very Dark Blue (Light Mode Text)
      secondary: "hsl(0, 0%, 52%)", // Dark Gray
    },
  },
  typography: {
    fontFamily: "Nunito Sans",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 600,
    fontWeightBold: 800,
  },
});
