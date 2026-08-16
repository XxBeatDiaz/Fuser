// src/hooks/useSocketSensors.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { updateSensor } from '../store/slices/sensorsSlice';
import { updateRoomStateFromSocket, setConnection } from '../store/slices/roomSlice'; // 🎯 ייבוא הרדוסרים החדשים

const serverIp = window.location.hostname;
const socket = io(`http://${serverIp}:5000`);

export const useSocketSensors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      dispatch(setConnection(true)); // 🔌 מעדכן שהסוקט מחובר
      socket.emit('request_initial_devices');
    });

    socket.on('disconnect', () => {
      dispatch(setConnection(false)); // 🔌 מעדכן שהסוקט התנתק
    });

    socket.on('device_update', (event) => {
      if (event && event.data) {
        dispatch(updateSensor(event.data)); 
      }
    });

    // 🎯 האזנה לעדכוני הסטטוס והזמן של החדר מהשרת
    socket.on('room_status_update', (roomState) => {
      if (roomState) {
        dispatch(updateRoomStateFromSocket(roomState));
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('device_update');
      socket.off('room_status_update'); // מנקה את ההאזנה ב-Unmount
    };
  }, [dispatch]);
};