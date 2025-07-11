import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "hsl(209, 23%, 22%)",
    },
    secondary: {
      main: "hsl(0, 0%, 52%)",
    },
    background: {
      default: "hsl(207, 26%, 17%)", // Very Dark Blue (Dark Mode Background)
      paper: "hsl(209, 23%, 22%)", // Dark Blue (Dark Mode Elements)
    },
    text: {
      primary: "hsl(0, 0%, 100%)", // White
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
