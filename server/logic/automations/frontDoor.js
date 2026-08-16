// src/automation/index.js
import { frontDoorSensor } from '../sensors/frontDoorSensor.js';
import { lightDevice } from '../devices/lightDevice.js';


export const handleFrontDoor = (payload) => {
    const door = frontDoorSensor.parseState(payload);

    // 2. קבלת החלטה לוגית
    if (door.isOpen) {
        console.log(`🔓 [Automation] דלת נפתחה! (סוללה: ${door.battery}%)`);
        
        // 3. הפעלת מכשיר קצה (Output)
        lightDevice.turnOn();
    } else {
        console.log("🔒 [Automation] דלת נסגרה.");
        
        lightDevice.turnOff();
    }
};