import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './slices/roomSlice';
import riddlesReducer from './slices/riddlesSlice';
import devicesReducer from './slices/devicesSlice';
import sensorsReducer from './slices/sensorsSlice';

export const store = configureStore({
    reducer: {
        room: roomReducer,
        riddles: riddlesReducer,
        devices: devicesReducer,
        sensors: sensorsReducer,
    },
});