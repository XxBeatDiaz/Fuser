import { handleFrontDoor } from './automations/frontDoor.js';

export const handleDeviceEvent = (deviceName, payload) => {
    
    switch (deviceName) {
        case 'Front door':
            handleFrontDoor(payload);
            break;
            
        case 'Light':
            // handleLight(payload);
            break;
            
        default:
            // מכשירים שלא הוגדרה להם אוטומציה כרגע
            break;
    }
};