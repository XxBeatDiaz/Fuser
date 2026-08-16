import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography, TextField, Box, MenuItem } from "@mui/material";
import { 
  selectCompletRoomTime, 
  selectGameStatus, 
  selectIsPaused, 
  selectTimeAdjustmentStep,
  setTimeAdjustmentStep 
} from "../../store/slices/roomSlice.js";
import { setCompleteRoomTimeThunk } from "../../store/slices/thunks/roomThunks.js";

export const TimeSettings = ({ onRegisterSave }) => {
  const dispatch = useDispatch();

  const gameStatus = useSelector(selectGameStatus);
  const isPaused = useSelector(selectIsPaused);
  const completRoomTime = useSelector(selectCompletRoomTime);
  const timeAdjustmentStep = useSelector(selectTimeAdjustmentStep);

  const isGameRunningLive = gameStatus === "RUNNING" && !isPaused;
  const currentMinutes = Math.floor(completRoomTime / 60);

  // 🎯 הסטייט מתחיל ריק לחלוטין בשביל הזנה נקייה
  const [minutesInput, setMinutesInput] = useState("");

  // 🎯 רישום פונקציית השמירה באב
  useEffect(() => {
    if (onRegisterSave) {
      onRegisterSave(() => {
        // מעדכנים את השרת רק אם המשחק לא רץ ורק אם המשתמש אשכרה הקליד ערך
        if (!isGameRunningLive && minutesInput.trim() !== "") {
          const minutes = Number(minutesInput);
          if (!isNaN(minutes) && minutes >= 0) {
            dispatch(setCompleteRoomTimeThunk(minutes));
          }
        }
      });
    }
  }, [minutesInput, isGameRunningLive, onRegisterSave, dispatch]);

  return (
    <Stack spacing={3} sx={{ py: 1 }}>
      {/* חלק 1: הזנת זמן גג כולל לחדר */}
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
          זמן גג למשחק (טיימר ספירה לאחור)
        </Typography>

        {isGameRunningLive ? (
          <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2, textAlign: "center" }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              {currentMinutes} דקות
            </Typography>
            <Typography variant="caption" color="text.disabled">
              המשחק רץ בלייב - שינוי ידני חסום
            </Typography>
          </Box>
        ) : (
          <TextField
            type="number"
            label="הזן זמן גג חדש (בדקות)"
            placeholder={`זמן נוכחי: ${currentMinutes} דק'`} // מציג את הזמן הנוכחי כרמז קל ברקע
            variant="outlined"
            size="small"
            value={minutesInput}
            onChange={(e) => setMinutesInput(e.target.value)}
            inputProps={{ min: 0 }}
            fullWidth
            sx={{ mt: 1 }}
            InputLabelProps={{ shrink: true }} // שומר על הלייבל למעלה שלא יתנגש ב-placeholder
          />
        )}
      </Box>

      {/* חלק 2: קביעת ערך הפלוס/מינוס לכפתורים שבחוץ */}
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
        | + | - | כמות דקות לשינוי מהיר
        </Typography>
        
        <TextField
          select
          label="צעד שינוי זמן"
          value={timeAdjustmentStep}
          onChange={(e) => dispatch(setTimeAdjustmentStep(Number(e.target.value)))}
          size="small"
          fullWidth
        >
          {[1, 2, 3, 5, 10, 15].map((option) => (
            <MenuItem key={option} value={option}>
              {option} {option === 1 ? "דקה" : "דקות"}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Stack>
  );
};

export default TimeSettings;