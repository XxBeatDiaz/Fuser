import { leftArmSensor } from '../sensors/leftArmSensor.js';
import { rightArmSensor } from '../sensors/rightArmSensor.js';
import { leftLegSensor } from '../sensors/leftLegSensor.js';
import { rightLegSensor } from '../sensors/rightLegSensor.js';
import { blobUltravioletRight } from '../devices/BlobUltravioletRight.js';
import { blobUltravioletLeft } from '../devices/BlobUltravioletLeft.js';

import { roomState, skeletonSensors } from '../../services/roomStateService.js';

export const handleUltravioletBlobs = (payload, sensorName) => {
    let leftArm, rightArm, leftLeg, rightLeg;

    switch (sensorName) {
        case 'Sensor left arm':
            console.log("[Automation] Sensor left arm triggered");
            leftArm = leftArmSensor.parseState(payload);
            skeletonSensors.leftArm = leftArm.isAttached;
            break;
        case 'Sensor right arm':
            console.log("[Automation] Sensor right arm triggered");
            rightArm = rightArmSensor.parseState(payload);
            skeletonSensors.rightArm = rightArm.isAttached;
            break;
        case 'Sensor left leg':
            console.log("[Automation] Sensor left leg triggered");
            leftLeg = leftLegSensor.parseState(payload);
            skeletonSensors.leftLeg = leftLeg.isAttached;
            break;
        case 'Sensor right leg':
            console.log("[Automation] Sensor right leg triggered");
            rightLeg = rightLegSensor.parseState(payload);
            skeletonSensors.rightLeg = rightLeg.isAttached;
            break;
    }
    console.log(`Current skeleton sensors state: ${JSON.stringify(skeletonSensors)}`);
    // 2. קבלת החלטה לוגית
    if (skeletonSensors.leftArm && skeletonSensors.rightArm && skeletonSensors.leftLeg && skeletonSensors.rightLeg) {
        console.log(`🔓 [Automation] full skeleton`);

        if (roomState.gameStatus === 'RUNNING' && !roomState.isPaused) {
            blobUltravioletRight.turnOn();
            blobUltravioletLeft.turnOn();
        }

        // 3. הפעלת מכשיר קצה (Output)
    } else {
        console.log("🔒 [Automation] full skeleton not complete");
    }
};