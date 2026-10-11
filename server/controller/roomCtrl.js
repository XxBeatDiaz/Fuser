import {
    updateRoomStatus,
    getRoomStatus,
    setCompleteRoomTime,  // ⏱️ ייבוא הפונקציה להגדרת זמן גג
    addCompleteRoomTime,       // ➕ ייבוא הפונקציה להוספת זמן
    subtractCompleteRoomTime   // ➖ ייבוא הפונקציה להפחתת זמן
} from '../services/roomStateService.js';

export const changeRoomStatus = async (req, res) => {
    try {
        const { gameStatus, isPaused } = req.body;
        const updatedState = updateRoomStatus(gameStatus, isPaused);

        console.log(`🎛️ [Room State]: status=${updatedState.gameStatus}, paused=${updatedState.isPaused}`);
        return res.json({ success: true, state: updatedState });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const fetchRoomStatus = async (req, res) => {
    return res.json({ success: true, state: getRoomStatus() });
};

export const setRoomTime = async (req, res) => {
    try {
        const { minutes } = req.body;
        const updatedState = setCompleteRoomTime(Number(minutes));

        console.log(`⏱️ [Room Time sets to]: ${minutes} minutes. Total: ${updatedState.completRoomTime}s`);
        // מחזירים את האובייקט המעודכן ישירות כדי שיתאים ל-Thunk בפרונט
        return res.json({ success: true, state: updatedState });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * ➕ קונטרולר להוספת זמן גג לחדר
 */
export const addRoomTime = async (req, res) => {
    try {
        const { minutes } = req.body;
        const updatedState = addCompleteRoomTime(Number(minutes));

        console.log(`⏱️ [Room Time Added]: +${minutes} min. Total: ${updatedState.completRoomTime}s`);
        // מחזירים את האובייקט המעודכן ישירות כדי שיתאים ל-Thunk בפרונט
        return res.json({ success: true, state: updatedState });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * ➖ קונטרולר להפחתת זמן גג מהחדר
 */
export const subtractRoomTime = async (req, res) => {
    try {
        const { minutes } = req.body;
        const updatedState = subtractCompleteRoomTime(Number(minutes));

        console.log(`⏱️ [Room Time Subtracted]: -${minutes} min. Total: ${updatedState.completRoomTime}s`);
        return res.json({ success: true, state: updatedState });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};