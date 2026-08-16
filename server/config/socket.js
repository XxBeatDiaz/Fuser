// server/config/socket.js
import { Server } from 'socket.io';
import { publish } from './MQTT.js';

let io = null;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`🔌 [Socket] משתמש חדש התחבר לדשבורד (ID: ${socket.id})`);
    });

    return io;
};

export const emitDeviceUpdate = (deviceName, stateData) => {
    if (!io) return;
    
    io.emit('device_update', {
        device: deviceName,
        data: stateData
    });
};

export const emitRoomStateUpdate = (roomState) => {
    if (!io) return;
    
    io.emit('room_status_update', roomState);
};