// src/store/sensorsSlice.js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// 1. מייצרים את האדפטר ומגדירים ששדה המפתח שלנו הוא 'id' (זה ה-default, אבל טוב לכתוב את זה)
const sensorsAdapter = createEntityAdapter({
  selectId: (sensor) => sensor.id,
});

// 2. ה-initialState האוטומטי של האדפטר מייצר לנו מבנה של: { ids: [], entities: {} }
const initialState = sensorsAdapter.getInitialState();

const sensorsSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {
    // 3. משתמשים במתודה המובנית upsertOne!
    // היא עושה בדיוק את ה-if/else שלנו: אם ה-id קיים היא מעדכנת, אם לא - היא מוסיפה. בשורה אחת.
    updateSensor: sensorsAdapter.upsertOne,
  }
});

export const { updateSensor } = sensorsSlice.actions;

// 4. האדפטר מייצר לנו סלקטורים מוכנים בחינם
export const { selectAll: selectAllSensors } = sensorsAdapter.getSelectors(
  (state) => state.sensors
);

export default sensorsSlice.reducer;