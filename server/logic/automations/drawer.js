import { drawerSensor } from '../sensors/drawerSensor.js';
import { blobShowcase } from '../devices/blobShowcase.js';
import { roomState, drawerSensorCounter } from '../../services/roomStateService.js';



export const handleDrawer = (payload) => {
    const drawer = drawerSensor.parseState(payload);

    // 2. קבלת החלטה לוגית
    if (drawer.isOpen) {
        console.log(`🔓 [Automation] מגירה נפתחה!`);

        if (drawerSensorCounter.value === 0 && roomState.gameStatus === 'RUNNING' && !roomState.isPaused) {
            blobShowcase.turnOn();

            drawerSensorCounter.value += 1; // עדכון מונה ההפעלה מחדש
        }

        // 3. הפעלת מכשיר קצה (Output)
    } else {
        console.log("🔒 [Automation] מגירה נסגרה.");
    }
};