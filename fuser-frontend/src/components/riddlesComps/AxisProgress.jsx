import { Box, Avatar } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// 🎯 ייבוא אייקון העיגול/נקודה החדש
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export const AxisProgress = ({
  isCurrent,
  isSolved,
  isLocked,
  isLeft,
  riddleColor,
  children,
  innerRef,
}) => {
  return (
    <Box
      ref={innerRef}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        position: "relative",
        zIndex: 2,
        flexDirection: { xs: "row", md: isLeft ? "row" : "row-reverse" },
        justifyContent: { xs: "flex-start", md: "center" },
        scrollMargin: { xs: "160px 0px", md: "200px 0px" },
      }}
    >
      {/* 1. כרטיס המשימה המוזרק פנימה */}
      <Box
        sx={{
          width: { xs: "calc(100% - 60px)", md: "calc(50% - 35px)" },
          display: "flex",
          justifyContent: {
            xs: "flex-start",
            md: isLeft ? "flex-start" : "flex-end",
          },
          order: { xs: 2, md: 1 },
        }}
      >
        {children}
      </Box>

      {/* 2. עיגול החיווי על גבי הציר */}
      <Box
        sx={{
          width: { xs: "50px", md: "70px" },
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
          order: { xs: 1, md: 2 },
        }}
      >
        <Avatar
          sx={{
            bgcolor: isCurrent ? "#060608" : isSolved ? "#0D1410" : "#0E0E12",
            border: isCurrent
              ? `2px solid ${riddleColor}`
              : isSolved
                ? "2px solid #4EEE6D"
                : "2px solid #222230",
            boxShadow: isCurrent ? `0 0 20px ${riddleColor}60` : "none",
            width: isCurrent ? { xs: 34, md: 40 } : { xs: 26, md: 32 },
            height: isCurrent ? { xs: 34, md: 40 } : { xs: 26, md: 32 },
            transition: "all 0.3s ease",
          }}
        >
          {/* 🔘 עיגול בתוך עיגול לחידה הנוכחית עם פולס ניאון */}
          {isCurrent && (
            <FiberManualRecordIcon
              sx={{
                fontSize: { xs: 12, md: 14 },
                color: riddleColor,
                animation: "radarPulse 2s infinite ease-in-out",
                "@keyframes radarPulse": {
                  "0%": { transform: "scale(0.8)", opacity: 0.6 },
                  "50%": { transform: "scale(1.2)", opacity: 1 },
                  "100%": { transform: "scale(0.8)", opacity: 0.6 },
                },
              }}
            />
          )}
          {isSolved && (
            <CheckCircleIcon
              sx={{ fontSize: { xs: 14, md: 16 }, color: "#4EEE6D" }}
            />
          )}
          {isLocked && (
            <LockIcon sx={{ fontSize: { xs: 10, md: 12 }, color: "#3E3E52" }} />
          )}
        </Avatar>
      </Box>

      {/* 3. עמודה נגדית ריקה לסימטריה במחשב */}
      <Box
        sx={{
          width: "calc(50% - 35px)",
          display: { xs: "none", md: "block" },
          order: 3,
        }}
      />
    </Box>
  );
};
