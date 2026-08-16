import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { AxisProgress } from "./AxisProgress";
import { RiddleCard } from "./RiddleCard";

export const RiddlesTimeline = ({
  riddles = [],
  currentRiddleId,
  gameStatus,
  elapsedTime = 0, // ⏱️ מקבלים את הזמן הגלובלי הנוכחי
  onRiddleClick,
}) => {
  const activeRiddleRef = useRef(null);
  const reversedRiddles = [...riddles].reverse();

  useEffect(() => {
    if (activeRiddleRef.current) {
      activeRiddleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentRiddleId]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 5 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: { xs: "calc(100% - 25px)", md: "50%" },
          top: 20,
          bottom: 20,
          width: "2px",
          background: "linear-gradient(to bottom, #16161F, #222230, #16161F)",
          transform: { xs: "none", md: "translateX(-50%)" },
          zIndex: 1,
        }}
      />

      {reversedRiddles.map((riddle) => {
        const originalIndex = riddles.findIndex((r) => r.id === riddle.id);
        const riddleColor = riddle.color || "#00E5FF";
        const isCurrent = riddle.id === currentRiddleId;
        const isSolved = riddle.status === "SOLVED";
        const isLocked = riddle.status === "LOCKED";
        const isLeft = originalIndex % 2 !== 0;

        // 🎯 חישוב הזמן שיוצג על הכרטיס
        // 🎯 חישוב הזמן שיוצג על הכרטיס (מותאם בול ל-Slice שלך)
        let durationInSeconds = 0;

        if (isSolved) {
          // אם נפתרה - ה-Slice כבר מחשב ושומר את הנתון הזה תחת duration!
          durationInSeconds = riddle.duration || 0;
        } else if (isCurrent && gameStatus === "RUNNING") {
          // אם זו החידה הנוכחית והמשחק רץ - לוקחים את ה-startTime מה-Slice
          const startTime = riddle.startTime || 0;
          durationInSeconds = Math.max(0, elapsedTime - startTime);
        }

        return (
          <AxisProgress
            key={riddle.id}
            innerRef={isCurrent ? activeRiddleRef : null}
            isCurrent={isCurrent}
            isSolved={isSolved}
            isLocked={isLocked}
            isLeft={isLeft}
            riddleColor={riddleColor}
          >
            <RiddleCard
              riddle={riddle}
              isCurrent={isCurrent}
              isSolved={isSolved}
              isLocked={isLocked}
              riddleColor={riddleColor}
              duration={durationInSeconds} // 🎯 העברת הזמן המחושב לכרטיס
              onClick={() => onRiddleClick(riddle.id, isCurrent)}
            />
          </AxisProgress>
        );
      })}
    </Box>
  );
};

export default RiddlesTimeline;
