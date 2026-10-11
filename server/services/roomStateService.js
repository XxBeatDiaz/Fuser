import { emitRoomStateUpdate } from '../config/socket.js';

export const roomState = {
    gameStatus: 'IDLE',      // 'IDLE' | 'RUNNING' | 'COMPLETED'
    isPaused: false,
    elapsedTime: 0,          // ⏱️ זמן שעבר בשניות
    completRoomTime: 60 * 60, // 🏁 זמן מקסימלי לחדר בשניות
};

export const drawerSensorCounter = { value: 0 };
//export const bathroomDoorSensorCounter = { value: 0 };
export const skeletonSensors = { leftArm: false, rightArm: false, leftLeg: false, rightLeg: false };

export const resetSkeletonSensors = () => {
    skeletonSensors.leftArm = false;
    skeletonSensors.rightArm = false;
    skeletonSensors.leftLeg = false;
    skeletonSensors.rightLeg = false;
};

let timerInterval = null;

const startTimer = () => {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (roomState.gameStatus === 'RUNNING' && !roomState.isPaused) {
            roomState.elapsedTime += 1;

            // 🛑 מנגנון ביטחון מעודכן:
            if (roomState.elapsedTime >= roomState.completRoomTime) {
                roomState.elapsedTime = roomState.completRoomTime; // 🎯 חותך ומיישר את הזמן בדיוק לגג!
                roomState.gameStatus = 'COMPLETED';
                stopTimer();
            }

            emitRoomStateUpdate({ ...roomState });
        }
    }, 1000);
};

const stopTimer = () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
};

export const getRoomStatus = () => {
    return { ...roomState };
};

export const updateRoomStatus = (gameStatus, isPaused) => {
    if (gameStatus !== undefined) roomState.gameStatus = gameStatus;
    if (isPaused !== undefined) roomState.isPaused = isPaused;

    if (!isRoomAutomationBlocked()) {
        startTimer();
    } else {
        stopTimer();
        if (roomState.gameStatus === 'IDLE') {
            resetRoomTime();
            resetSkeletonSensors();
            
            drawerSensorCounter.value = 0;
            bathroomDoorSensorCounter.value = 0;
        }
    }

    emitRoomStateUpdate({ ...roomState });
    return { ...roomState };
};

// הוסף את זה לקובץ roomStateService.js שלך
export const setCompleteRoomTime = (minutes) => {
    if (typeof minutes === 'number' && minutes >= 0 && isRoomAutomationBlocked()) {
        roomState.completRoomTime = minutes * 60; // המרה לשניות

        // מנגנון הגנה: אם הזמן החדש קטן ממה שכבר עבר, נחתוך ונסיים את המשחק
        if (roomState.elapsedTime >= roomState.completRoomTime) {
            roomState.elapsedTime = roomState.completRoomTime;
            roomState.gameStatus = 'COMPLETED';
            stopTimer();
        }

        emitRoomStateUpdate({ ...roomState });
    }
    return { ...roomState };
};

export const addCompleteRoomTime = (minutes) => {
    if (typeof minutes === 'number' && minutes > 0) {
        roomState.completRoomTime += (minutes * 60);
        emitRoomStateUpdate({ ...roomState });
    }
    return { ...roomState };
};

export const subtractCompleteRoomTime = (minutes) => {
    if (typeof minutes === 'number' && minutes > 0) {
        // 🎯 שינוי לוגיקה: מעדכנים את זמן הגג החדש לפי בקשת המפעיל
        roomState.completRoomTime = Math.max(0, roomState.completRoomTime - (minutes * 60));

        // 🧠 אם זמן הגג החדש קטן או שווה לזמן שכבר עבר - מסיימים את המשחק מיד ומיישרים קו
        if (roomState.elapsedTime >= roomState.completRoomTime && roomState.gameStatus === 'RUNNING') {
            roomState.elapsedTime = roomState.completRoomTime; // חיתוך אסתטי לפרונטנד
            roomState.gameStatus = 'COMPLETED';
            stopTimer();
        }

        emitRoomStateUpdate({ ...roomState });
    }
    return { ...roomState };
};

export const resetRoomTime = () => {
    roomState.elapsedTime = 0;
    roomState.completRoomTime = 60 * 60; // איפוס לזמן ברירת המחדל של שעה
    emitRoomStateUpdate({ ...roomState });
};

export const isRoomAutomationBlocked = () => {
    return roomState.gameStatus !== 'RUNNING' || roomState.isPaused;
};
