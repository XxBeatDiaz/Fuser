// server/services/deviceService.js
import { publish } from '../config/MQTT.js';
import { emitDeviceUpdate } from '../config/socket.js';
import { handleDeviceEvent } from '../logic/automationRouter.js';
import { isRoomAutomationBlocked } from './roomStateService.js';
import { parseSensorData } from '../utils/sensorParser.js';

/**
 * מעבד אירועים שמגיעים מה-MQTT ומעביר אותם ישירות לסוקט ולאוטומציות
 */
export const processSensorEvent = (topic, payload) => {
    
    // חסימת כל הודעות המערכת והניהול של ה-Bridge
    if (topic.startsWith('zigbee2mqtt/bridge')) {
        return;
    }

    // חילוץ שם המכשיר (למשל: 'Front door')
    const deviceName = topic.replace('zigbee2mqtt/', '');
    
    // נירמול הדאטה הגולמית דרך ה-Parser
    const chewedData = parseSensorData(deviceName, payload);

    // שיגור הנתונים המעובדים לפרונטנד בזמן אמת
    emitDeviceUpdate(deviceName, chewedData);
    
    // בדיקה והפעלה של אוטומציות (כמו שליחת התראות או הדלקת אורות)
    if (!isRoomAutomationBlocked()) {
        handleDeviceEvent(deviceName, payload);
    }
};

export const sendDeviceCommand = async (topic, state) => {
    console.log(`Sending command to ${topic}: ${state}`);
    
    const mqttTopic = `zigbee2mqtt/${topic}/set`;
    publish(mqttTopic, { state }); 
    return { success: true };
};

export const resetAllDevices = async () => {
    console.log('🔄 [DeviceService] מתחיל איפוס מכשירים למצב התחלתי...');

    await Promise.all([
        sendDeviceCommand('Blob ultraviolet right', 'OFF'),
        sendDeviceCommand('Blob ultraviolet left', 'OFF'),
        sendDeviceCommand('Blob showcase', 'OFF'),
        sendDeviceCommand('Blob center room', 'ON')
    ]);

    return { success: true, message: 'All devices reset successfully' };
};