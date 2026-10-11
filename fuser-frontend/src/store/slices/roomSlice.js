import { createSlice } from '@reduxjs/toolkit';
// 🎯 ייבוא כל ה-Thunks - כולל ה-Thunk האבסולוטי החדש שנוסף
import {
  fetchRoomStatus,
  syncRoomStatus,
  setCompleteRoomTimeThunk,       // 👈 נוסף כאן
  addCompleteRoomTimeThunk,
  subtractCompleteRoomTimeThunk,
  resetDevicesThunk,
} from './thunks/roomThunks.js';

const initialState = {
  isConnected: false,         // סטטוס חיבור ה-Socket
  isPaused: false,            // מצב השהיה / סידור חדר (נועל את ה-UI)
  gameStatus: 'IDLE',         // מצב המשחק: 'IDLE' | 'RUNNING' | 'COMPLETED'
  elapsedTime: 0,             // הטיימר המרכזי בשניות (מגיע מהשרת)
  completRoomTime: 3600,      // 🏁 זמן מקסימלי לחדר בשניות (ברירת מחדל: 60 דקות = 3600 שניות)
  timeAdjustmentStep: 3,
  gameStartedAt: null,        // שעת התחלה מדויקת
  loading: false,             // חיווי על בקשות רשת בדרך
  error: null
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    // עדכון סטטוס החיבור של ה-Socket (מול ה-Backend)
    setConnection: (state, action) => {
      state.isConnected = action.payload;
    },

    // 🎯 רדוסר הליבה: מאזין לסוקט ומעדכן את כל הסטייט בלייב
    updateRoomStateFromSocket: (state, action) => {
      state.elapsedTime = action.payload.elapsedTime;
      state.gameStatus = action.payload.gameStatus;
      state.isPaused = action.payload.isPaused;
      state.completRoomTime = action.payload.completRoomTime;
    },

    setTimeAdjustmentStep: (state, action) => {
      state.timeAdjustmentStep = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 טעינה ראשונית של מצב החדר (GET) - עכשיו קורא מ-action.payload המיושר!
      .addCase(fetchRoomStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.elapsedTime = action.payload.elapsedTime;
        state.gameStatus = action.payload.gameStatus;
        state.isPaused = action.payload.isPaused;
        state.completRoomTime = action.payload.completRoomTime;
      })
      .addCase(fetchRoomStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🎛️ סנכרון פקודות מערכת (Start/Pause/Reset)
      .addCase(syncRoomStatus.fulfilled, (state, action) => {
        state.gameStatus = action.payload.gameStatus;
        state.isPaused = action.payload.isPaused;
        state.elapsedTime = action.payload.elapsedTime;
        state.completRoomTime = action.payload.completRoomTime;

        // ניהול חותמת זמן אסתטית לפרונט
        if (action.payload.gameStatus === 'RUNNING' && !state.gameStartedAt) {
          state.gameStartedAt = new Date().toISOString();
        } else if (action.payload.gameStatus === 'IDLE') {
          state.gameStartedAt = null;
        }
      })

      // ⏱️ עדכון זמן גג ישיר (מה-Input כשהמשחק לא רץ)
      .addCase(setCompleteRoomTimeThunk.fulfilled, (state, action) => {
        state.elapsedTime = action.payload.elapsedTime;
        state.gameStatus = action.payload.gameStatus;
        state.isPaused = action.payload.isPaused;
        state.completRoomTime = action.payload.completRoomTime;
      })

      // ➕ הוספת זמן יחסית בזמן ריצה (כפתור פלוס)
      .addCase(addCompleteRoomTimeThunk.fulfilled, (state, action) => {
        state.elapsedTime = action.payload.elapsedTime;
        state.gameStatus = action.payload.gameStatus;
        state.isPaused = action.payload.isPaused;
        state.completRoomTime = action.payload.completRoomTime;
      })

      // ➖ הפחתת זמן יחסית בזמן ריצה (כפתור מינוס)
      .addCase(subtractCompleteRoomTimeThunk.fulfilled, (state, action) => {
        state.elapsedTime = action.payload.elapsedTime;
        state.gameStatus = action.payload.gameStatus;
        state.isPaused = action.payload.isPaused;
        state.completRoomTime = action.payload.completRoomTime;
      })

      .addCase(resetDevicesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetDevicesThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetDevicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

// 📌 סלקטורים לחילוץ מידע נקי ברכיבים
export const selectRoomState = (state) => state.room;
export const selectIsConnected = (state) => state.room.isConnected;
export const selectIsPaused = (state) => state.room.isPaused;
export const selectGameStatus = (state) => state.room.gameStatus;
export const selectElapsedTime = (state) => state.room.elapsedTime;
export const selectCompletRoomTime = (state) => state.room.completRoomTime;
export const selectTimeAdjustmentStep = (state) => state.room.timeAdjustmentStep;

export const {
  setConnection,
  updateRoomStateFromSocket,
  setTimeAdjustmentStep
} = roomSlice.actions;

export default roomSlice.reducer;