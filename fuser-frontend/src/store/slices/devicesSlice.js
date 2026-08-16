import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [], // רשימת המכשירים הדינמית, למשל: [{ id: 'd1', name: 'מנעול דלת', state: 'OFF', riddleId: 'riddle_1' }]
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    // 1. טעינת המכשירים מהשרת בעליית האפליקציה
    setDevices: (state, action) => {
      state.devices = action.payload.map(device => ({
        ...device,
        state: device.state || 'OFF',
        isLoading: false // מצב טעינה ייחודי לכל מכשיר בנפרד!
      }));
    },

    // 2. המפעיל לחץ על הפעלה/כיבוי - נכנסים למצב המתנה (Loading)
    // action.payload: deviceId
    setDeviceLoading: (state, action) => {
      const device = state.devices.find(d => d.id === action.payload);
      if (device) {
        device.isLoading = true;
      }
    },

    // 3. השרת החזיר תשובה (ב-Socket) שהמכשיר אכן שינה את מצבו
    // action.payload: { deviceId, newState }
    updateDeviceState: (state, action) => {
      const { device, data } = action.payload; // פירוק המבנה האמיתי מהסוקט
      
      // אם השרת משתמש בשם המכשיר בתור המזהה שלו במערך (למשל d.name או d.id)
      // נחפש את המכשיר המתאים ברשימה (לפי השם או ה-id, מה שמתאים לשרת שלך)
      const foundDevice = state.devices.find(d => d.id === device || d.name === device);
      
      if (foundDevice && data) {
        // עדכון הסטייט הדינמי (אם קיים data.state, ואם לא - בודקים ערכים כמו contact)
        if (data.state !== undefined) {
          foundDevice.state = data.state;
        } else if (data.contact !== undefined) {
          // דוגמה לחיישן דלת: אם contact הוא true הדלת סגורה (OFF), אם false היא פתוחה (ON)
          foundDevice.state = data.contact ? 'OFF' : 'ON'; 
        }
        
        // בכל מקרה, הפעולה הסתיימה ומשחררים את מצב הטעינה
        foundDevice.isLoading = false; 
      }
    },

    // 4. במקרה של תקשורת שנכשלה (למשל השרת לא ענה תוך כמה שניות)
    // action.payload: deviceId
    cancelDeviceLoading: (state, action) => {
      const device = state.devices.find(d => d.id === action.payload);
      if (device) {
        device.isLoading = false;
      }
    },

    // 5. איפוס מוחלט של המכשירים (Global Reset)
    resetDevices: (state) => {
      state.devices = state.devices.map(device => ({
        ...device,
        state: 'OFF',
        isLoading: false
      }));
    }
  }
});

export const { 
  setDevices, 
  setDeviceLoading, 
  updateDeviceState, 
  cancelDeviceLoading, 
  resetDevices 
} = devicesSlice.actions;

export default devicesSlice.reducer;