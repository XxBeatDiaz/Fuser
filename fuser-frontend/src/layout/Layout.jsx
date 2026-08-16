import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from "@mui/material";
import AppNavbar from "./AppNavbar";
import AppMain from "./AppMain";
import { ScrollToTopBtn } from "./ScrollToTopBtn";
import SettingsBtn from "../components/settingsComps/SettingsButton";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0A0E17",
      paper: "#161B26",
    },
    primary: { main: "#00E5FF" },
    secondary: { main: "#7C4DFF" },
    success: { main: "#00E676" },
    error: { main: "#FF5252" },
    text: {
      primary: "#FFFFFF",
      secondary: "#8A99AD",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
});

export const Layout = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SettingsBtn />

        <Box sx={{ minHeight: "100vh"}}>
            <AppNavbar />
            <AppMain>{children}</AppMain>
            <ScrollToTopBtn />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
