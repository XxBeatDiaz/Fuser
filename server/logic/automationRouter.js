import { handleBathroomDoor } from './automations/bathroomDoor.js';
import { handleDrawer } from './automations/drawer.js';
import { handleUltravioletBlobs } from './automations/ultravioletBlobs.js';

export const handleDeviceEvent = (deviceName, payload) => {
    switch (deviceName) {
        case 'Sensor bathroom door':
            handleBathroomDoor(payload);
            break;

        case 'Sensor drawer':
            handleDrawer(payload);
            break;

        case 'Sensor left arm':
            handleUltravioletBlobs(payload, deviceName);
            break;

        case 'Sensor right arm':
            handleUltravioletBlobs(payload, deviceName);
            break;

        case 'Sensor left leg':
            handleUltravioletBlobs(payload, deviceName);
            break;

        case 'Sensor right leg':
            handleUltravioletBlobs(payload, deviceName);
            break;

        default:
            // מכשירים שלא הוגדרה להם אוטומציה כרגע
            break;
    }
};