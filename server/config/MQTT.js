import mqtt from 'mqtt';
import { processSensorEvent } from '../services/deviceService.js';

// פותחים חיבור אחד ויחיד לכל השרת!
const client = mqtt.connect('mqtt://0.0.0.0:1883');

client.on('connect', () => {
    console.log('🔌 [MQTT] Connected and synchronized');

    // מפעילים את האזנה על החיבור הזה
    client.subscribe('zigbee2mqtt/#');
    client.subscribe('zigbee2mqtt/bridge/devices');
});

client.on('message', (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        processSensorEvent(topic, payload);
    } catch (error) {
        // התעלמות משגיאות פורמט
    }
});

// הכביש היוצא: פונקציית השליחה שמשתמשת באותו החיבור בדיוק
export const publish = (topic, payload) => {
    const stringPayload = typeof payload === 'object' ? JSON.stringify(payload) : payload.toString();
    client.publish(topic, stringPayload);
};