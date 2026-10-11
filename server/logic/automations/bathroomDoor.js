// src/automation/index.js
import { bathroomDoorSensor } from '../sensors/bathroomDoorSensor.js';
import { blobShowcase } from '../devices/blobShowcase.js';
import { blobCenterRoom } from '../devices/blobCenterRoom.js';
import { roomState, bathroomDoorSensorCounter } from '../../services/roomStateService.js';

export const handleBathroomDoor = (payload) => {
    const door = bathroomDoorSensor.parseState(payload);

    // 2. קבלת החלטה לוגית
    if (door.isOpen) {
        console.log(`🔓 [Automation] דלת נפתחה!`);

        if (bathroomDoorSensorCounter.value === 0 && roomState.gameStatus === 'RUNNING' && !roomState.isPaused) {
            blobCenterRoom.turnOn();
            blobShowcase.turnOn();

            bathroomDoorSensorCounter.value += 1; // עדכון מונה ההפעלה מחדש
        }

        // 3. הפעלת מכשיר קצה (Output)
    } else {
        console.log("🔒 [Automation] דלת נסגרה.");
    }
};