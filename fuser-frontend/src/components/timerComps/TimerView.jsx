import { Paper, Typography } from "@mui/material";
import TimeDisplay from "./TimeDisplay";

export const TimerView = ({
  elapsedTime = 0,
  gameStatus = "IDLE",
  isPaused = false,
}) => {
  // קביעת צבע הטקסט לפי מצב המשחק שמתקבל ב-Props
  const getTimerColor = () => {
    if (gameStatus === "COMPLETED") return "success.main";
    if (isPaused) return "text.secondary";
    if (gameStatus === "RUNNING") return "primary.main";
    return "text.primary";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: "8px 0",
        textAlign: "center",
        bgcolor: "action.hover",
        borderRadius: 2,
      }}
    >
      <TimeDisplay
        seconds={elapsedTime}
        variant="h4"
        sx={{
          color: getTimerColor(),
        }}
      />

      {/* חיווי טקסט קטן על המצב הנוכחי מתחת לשעון */}
      <Typography
        color="text.secondary"
        sx={{ fontWeight: "300", fontSize: "14px" }}
      >
        {gameStatus === "IDLE" && "המשחק טרם החל"}
        {gameStatus === "RUNNING" && !isPaused && "משחק פעיל"}
        {gameStatus === "RUNNING" && isPaused && "משחק מושהה"}
        {gameStatus === "COMPLETED" && "המשחק הסתיים"}
      </Typography>
    </Paper>
  );
};

export default TimerView;
