import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Typography } from "@mui/material";

import {
  solveCurrentRiddle,
  moveToNextRiddle,
} from "../store/slices/riddlesSlice";
import {
  selectElapsedTime,
  selectGameStatus,
  selectIsPaused,
} from "../store/slices/roomSlice";
import RiddlesTimeline from "../components/riddlesComps/RiddlesTimeline"; // 🎯 ייבוא הקומפוננטה החדשה

export const ProgressPage = () => {
  const dispatch = useDispatch();

  // 1. מושכים את סטייט החידות
  const { riddles, currentRiddleId } = useSelector((state) => state.riddles);

  // 2. מושכים את נתוני החדר המרכזיים לצורך חסימות וזמנים
  const elapsedTime = useSelector(selectElapsedTime);
  const gameStatus = useSelector(selectGameStatus);
  const isPaused = useSelector(selectIsPaused);

  // 🕹️ סימולציית מעקף מפעיל לשחרור ידני בלחיצה
  const handleRiddleClick = (riddleId, isCurrent) => {
    // 🛑 חסימה מוחלטת: רק החידה הנוכחית, ורק כשהמשחק רץ בפועל ואינו מושהה
    if (!isCurrent || gameStatus !== "RUNNING" || isPaused) {
      console.warn(
        "⚠️ לא ניתן לפתור חידה: המשחק מושהה, לא הופעל או שזו אינה החידה הפעילה.",
      );
      return;
    }

    const currentTime = elapsedTime || 0;

    dispatch(
      solveCurrentRiddle({
        riddleId,
        currentElapsedTime: currentTime,
        isSkipped: false,
      }),
    );
    dispatch(moveToNextRiddle({ currentElapsedTime: currentTime }));
  };

  return (
    <Box
      sx={{
        bgcolor: "#060608",
        minHeight: "100vh",
        color: "#E2E2EC",
        direction: "rtl",
        fontFamily: "JetBrains Mono, system-ui, sans-serif",
        position: "relative",
        overflowX: "hidden",
        pb: { xs: 8, md: 12 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          left: "50%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(161,85,255,0.05) 0%, rgba(0,0,0,0) 70%)",
          transform: "translateX(-50%)",
          zIndex: 0,
        },
      }}
    >
      <Typography
        align="center"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontFamily: "JetBrains Mono, system-ui, sans-serif",
          color: "#A155FF",
        }}
      >
        עדיין בבנייה, בקרוב...
      </Typography>
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1, sm: 2 },
          mt: { xs: 4, md: 6 },
        }}
      >
        {/* 🎯 הזרקת ציר הזמן החכם ומסירת כל המצבים בפרופס */}
        <RiddlesTimeline
          riddles={riddles}
          elapsedTime={elapsedTime}
          currentRiddleId={currentRiddleId}
          gameStatus={gameStatus}
          isPaused={isPaused}
          onRiddleClick={handleRiddleClick}
        />
      </Container>
    </Box>
  );
};

export default ProgressPage;
