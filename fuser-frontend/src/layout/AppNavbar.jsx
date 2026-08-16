import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

import { Box, Tabs, Tab, Divider, Typography } from "@mui/material";

import { selectIsConnected } from "../store/slices/roomSlice";

// איקונים לטאבים
import DashboardIcon from "@mui/icons-material/Dashboard";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SensorsIcon from "@mui/icons-material/Sensors";
import VideocamIcon from "@mui/icons-material/Videocam";

import Logo from "./Logo";
import ControlPanel from "../components/controlsComps/ControlPanel";

const serverIp = window.location.hostname;

export const AppNavbar = () => {
  const location = useLocation();

  const isConnected = useSelector(selectIsConnected);

  const getCurrentTabValue = () => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/sensors":
        return 1;
      case "/devices":
        return 2;
      case "/camera":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <>
      {/* שכבה 1: לוגו וקונטרול פאנל (זמן וכפתורים) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ margin: "30px 0 0 30px" }}>
          <Logo />
        </Box>

        <Box sx={{ direction: "rtl", mt: 4, p: 1 }}>
          <Typography
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              letterSpacing: "1px",
              fontSize: "20px",
            }}
          >
            HOST: {serverIp}
          </Typography>

          <Divider sx={{ my: 1, borderColor: "#64636071" }} />

          <Typography
            sx={{
              color: isConnected ? "success.main" : "error.main",
              fontSize: "20px",
              fontFamily: "monospace",
              letterSpacing: "1px",
            }}
          >
            סטטוס מערכת: {isConnected ? "מחובר " : "לא מחובר "}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            margin: "20px 30px 0 0",
            alignItems: "center",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <ControlPanel />
        </Box>
      </Box>

      {/* שכבה 2: טאבים מקובעים לחלק העליון בגלילה */}
      <Box
        sx={{
          position: "sticky",
          direction: "rtl",
          top: 0,
          zIndex: 1100,
          bgcolor: "background.default", // מבטיח שהתוכן הנגלל לא ייראה מאחורי הטקסט
          borderBottom: 1,
          borderColor: "#232D3F",
          mb: 4,
        }}
      >
        <Tabs
          value={getCurrentTabValue()}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontFamily: "JetBrains Mono, system-ui, sans-serif",
              fontWeight: 600,
            },
          }}
        >
          <Tab
            icon={<DashboardIcon />}
            iconPosition="start"
            label="חידות"
            component={Link}
            to="/"
          />
          <Tab
            icon={<SensorsIcon />}
            iconPosition="start"
            label="חיישנים"
            component={Link}
            to="/sensors"
          />
          <Tab
            icon={<TouchAppIcon />}
            iconPosition="start"
            label="בקרה"
            component={Link}
            to="/devices"
          />
          <Tab
            icon={<VideocamIcon />}
            iconPosition="start"
            label="מצלמות"
            component={Link}
            to="/camera"
          />
        </Tabs>
      </Box>
    </>
  );
};

export default AppNavbar;
