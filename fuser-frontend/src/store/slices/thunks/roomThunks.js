import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverIp = window.location.hostname;
const API_URL = `http://${serverIp}:5000/api/room/status`;
const DEVICES_API_URL = `http://${serverIp}:5000/api/devices`;

/**
 * Thunk אסינכרוני למשיכת מצב החדר הנוכחי מהשרת (מעולה למכשיר חדש שמתחבר באמצע)
*/
export const fetchRoomStatus = createAsyncThunk(
  'room/fetchStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk אסינכרוני המסנכרן את הפקודות של הגייממאסטר (Start/Pause/Reset) מול השרת
 */
export const syncRoomStatus = createAsyncThunk(
  'room/syncStatus',
  async ({ gameStatus, isPaused }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { gameStatus, isPaused });
      return response.data.state;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetDevicesThunk = createAsyncThunk(
  'devices/resetAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${DEVICES_API_URL}/reset`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setCompleteRoomTimeThunk = createAsyncThunk(
  'room/setCompleteTime',
  async (minutes, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/set-time`, { minutes });
      return response.data.state;
    } catch (error) { return rejectWithValue(error.message); }
  }
);

/**
 * ➕ Thunk אסינכרוני להוספת דקות לזמן הגג של המשחק בשרת
 */
export const addCompleteRoomTimeThunk = createAsyncThunk(
  'room/addCompleteTime',
  async (minutes, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add-time`, { minutes });
      return response.data.state; // מניחים שהשרת מחזיר את ה-roomState המלא והמעודכן
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * ➖ Thunk אסינכרוני להפחתת דקות מזמן הגג של המשחק בשרת
 */
export const subtractCompleteRoomTimeThunk = createAsyncThunk(
  'room/subtractCompleteTime',
  async (minutes, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/subtract-time`, { minutes });
      return response.data.state; // מניחים שהשרת מחזיר את ה-roomState המלא והמעודכן
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);