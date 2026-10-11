import { useSelector, useDispatch } from "react-redux";
import { Box, Card, CardContent, Divider, Stack } from "@mui/material";

import {
  selectElapsedTime,
  selectGameStatus,
  selectIsPaused,
} from "../../store/slices/roomSlice";

import {
  syncRoomStatus,
  resetDevicesThunk,
} from "../../store/slices/thunks/roomThunks"; // ייבוא ה-Thunk לסנכרון מול השרת

import TimerView from "../timerComps/TimerView";
import Controls from "./Controls";

export const ControlPanel = () => {
  const dispatch = useDispatch();

  // שליפת הסטייט הנוכחי מרידאקס
  const elapsedTime = useSelector(selectElapsedTime);
  const gameStatus = useSelector(selectGameStatus);
  const isPaused = useSelector(selectIsPaused);

  // --- פונקציות ה-Callbacks שיורדות לכפתורים ---

  const handleStartGame = () => {
    dispatch(syncRoomStatus({ gameStatus: "RUNNING", isPaused: false }));
  };

  const handleTogglePause = () => {
    dispatch(syncRoomStatus({ gameStatus, isPaused: !isPaused }));
  };

  const handleEndGame = () => {
    if (
      gameStatus !== "IDLE" &&
      !window.confirm(
        "האם אתה בטוח שברצונך לסיים את המשחק? המשחק ייחסם ולא ניתן יהיה להמשיך בו ויחייב לבצע איפוס למשחק על מנת להתחיל מחדש.",
      )
    ) {
      return;
    }
    dispatch(syncRoomStatus({ gameStatus: "COMPLETED", isPaused: false }));
  };

  const handleResetRoom = () => {
    if (
      gameStatus !== "IDLE" &&
      !window.confirm("האם אתה בטוח שברצונך לאפס את החדר? כל הזמן שנמדד יימחק.")
    ) {
      return;
    }
    dispatch(resetDevicesThunk());
    dispatch(syncRoomStatus({ gameStatus: "IDLE", isPaused: false }));
  };

  return (
    <Card
      sx={{
        minWidth: 150,
        maxWidth: 240,
        mx: "auto",
        boxShadow: 4,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          {/* חלק מרכזי: הזרקת הנתונים לתוך ה-View הניטרלי */}
          <Box width="100%">
            <TimerView
              elapsedTime={elapsedTime}
              gameStatus={gameStatus}
              isPaused={isPaused}
            />
          </Box>

          <Divider sx={{ width: "100%" }} />

          <Box width="100%">
            <Controls
              gameStatus={gameStatus}
              isPaused={isPaused}
              onStart={handleStartGame}
              onTogglePause={handleTogglePause}
              onEnd={handleEndGame}
              onReset={handleResetRoom}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
