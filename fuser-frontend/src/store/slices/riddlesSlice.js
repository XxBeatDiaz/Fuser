import { createSlice, createSelector } from '@reduxjs/toolkit';
import { mockRiddles } from '../../data/mock.js'; 

const initialState = {
  // 🎯 כל החידות מתחילות במצב נעול (LOCKED) כברירת מחדל בטעינת המערכת
  riddles: mockRiddles.map(riddle => ({
    id: riddle.id,
    name: riddle.name,
    description: riddle.description,
    hint: riddle.hint,
    color: riddle.color, 
    status: 'LOCKED', // 👈 שונה מ-riddle.id === 1 כדי שכולן יהיו נעולות
    startTime: null,  // 👈 שונה מ-0 ל-null
    endTime: null,
    duration: 0, 
    isSkipped: false,
    triggers: riddle.triggers || []
  })),           
  currentRiddleId: 1,
};

const riddlesSlice = createSlice({
  name: 'riddles',
  initialState,
  reducers: {
    // עדכון רשימת החידות (למשל מטעינת קובץ או הגדרות חדר)
    setRiddles: (state, action) => {
      state.riddles = action.payload.map(riddle => ({
        id: riddle.id,
        name: riddle.name,
        description: riddle.description,
        hint: riddle.hint,
        color: riddle.color, 
        status: 'LOCKED',
        startTime: null,
        endTime: null,
        duration: 0, 
        isSkipped: false,
        triggers: riddle.triggers || []
      }));
    },
    
    // 🚀 נקרא רק כשהמפעיל לוחץ על "התחל משחק" ברמת האפליקציה
    initializeFirstRiddle: (state) => {
      if (state.riddles.length > 0) {
        state.riddles[0].status = 'IN_PROGRESS';
        state.riddles[0].startTime = 0;
        state.currentRiddleId = state.riddles[0].id;
      }
    },
    
    // פתרון החידה הנוכחית
    solveCurrentRiddle: (state, action) => {
      const { riddleId, currentElapsedTime, isSkipped } = action.payload;
      const riddle = state.riddles.find(r => r.id === riddleId);
      if (riddle) {
        riddle.status = 'SOLVED';
        riddle.endTime = currentElapsedTime;
        riddle.isSkipped = isSkipped;
        riddle.duration = currentElapsedTime - (riddle.startTime || 0);
      }
    },
    
    // מעבר לחידה הבאה במערך
    moveToNextRiddle: (state, action) => {
      const { currentElapsedTime } = action.payload;
      const currentIdx = state.riddles.findIndex(r => r.id === state.currentRiddleId);
      const nextIdx = currentIdx + 1;
      if (nextIdx < state.riddles.length) {
        state.riddles[nextIdx].status = 'IN_PROGRESS';
        state.riddles[nextIdx].startTime = currentElapsedTime;
        state.currentRiddleId = state.riddles[nextIdx].id;
      } else {
        state.currentRiddleId = null; // סיום כל החידות בחדר
      }
    },
    
    // 🔄 איפוס מוחלט של החידות - כולן ננעלות מחדש ומחכות ללחיצת ההפעלה
    resetRiddles: (state) => {
      state.riddles = state.riddles.map((riddle) => ({
        ...riddle,
        status: 'LOCKED', // 🎯 שינוי מפתח: כולם נעולים בריסטארט
        startTime: null,  // 🎯 מאפס לחלוטין את זמני ההתחלה
        endTime: null,
        duration: 0,
        isSkipped: false
      }));
      state.currentRiddleId = 1;
    }
  }
});

// 📌 Input Selectors
const selectCurrentRiddleId = (state) => state.riddles.currentRiddleId;
const selectAllRiddlesList = (state) => state.riddles.riddles;

// סלקטור מסלייס ה-Sensors (גישת O(1) מול האובייקט הממופתח)
const selectSensorsEntities = (state) => state.sensors.entities;

export const selectActiveRiddle = (state) => {
  return state.riddles.riddles.find(r => r.id === state.riddles.currentRiddleId) || null;
};

// 🧠 הסלקטור המשולב לבדיקת פתרון מול תנאי החומרה של החידה הנוכחית
export const selectCheckRiddleSolution = createSelector(
  [selectCurrentRiddleId, selectAllRiddlesList, selectSensorsEntities],
  (currentRiddleId, riddlesList, sensorsEntities) => {
    
    if (!currentRiddleId) return { shouldSolve: false, targetRiddleId: null };

    const currentRiddle = riddlesList.find(r => r.id === currentRiddleId);
    
    // אם החידה הנוכחית נעולה עדיין (המשחק לא התחיל) - אל תבדוק תנאי פתרון
    if (!currentRiddle || currentRiddle.status === 'LOCKED' || !currentRiddle.triggers || currentRiddle.triggers.length === 0) {
      return { shouldSolve: false, targetRiddleId: null };
    }

    // בדיקה שכל החיישנים של החידה הנוכחית הגיעו לערך היעד שלהם
    const allConditionsMet = currentRiddle.triggers.every(trigger => {
      const activeSensor = sensorsEntities[trigger.sensorId]; 
      return activeSensor && activeSensor.value === trigger.targetValue;
    });

    if (allConditionsMet) {
      return {
        shouldSolve: true,
        targetRiddleId: currentRiddleId
      };
    }

    return { shouldSolve: false, targetRiddleId: null };
  }
);

export const { 
  setRiddles, 
  initializeFirstRiddle, 
  solveCurrentRiddle, 
  moveToNextRiddle, 
  resetRiddles 
} = riddlesSlice.actions;

export default riddlesSlice.reducer;