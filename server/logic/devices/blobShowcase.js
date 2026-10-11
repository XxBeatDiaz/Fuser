// src/automation/devices/showcaseDevice.js
import { sendDeviceCommand } from '../../services/deviceService.js';

const DEVICE_NAME = 'Blob showcase';

export const blobShowcase = {

    // ==========================================
    // 1. שליטה בבסיס המעגל (Relay Control)
    // ==========================================

    turnOn: async () => {
        console.log(`💡 [Device: ${DEVICE_NAME}] הפעלת ממסר (ON)`);
        return await sendDeviceCommand(DEVICE_NAME, 'ON');
    },

    turnOff: async () => {
        console.log(`🌑 [Device: ${DEVICE_NAME}] כיבוי ממסר (OFF)`);
        return await sendDeviceCommand(DEVICE_NAME, 'OFF');
    },

    toggle: async () => {
        console.log(`🔄 [Device: ${DEVICE_NAME}] שינוי מצב (TOGGLE)`);
        return await sendDeviceCommand(DEVICE_NAME, 'TOGGLE');
    },

    // ==========================================
    // 2. הגדרות מתקדמות וחומרה (Tuya TS0001)
    // ==========================================

    /**
     * חוסם או מאפשר את הלחיצה על הכפתור הפיזי (Child Lock)
     * @param {boolean} locked - true לנעילה, false לשחרור
     */
    setChildLock: async (locked) => {
        const state = locked ? 'LOCK' : 'UNLOCK';
        console.log(`🔒 [Device: ${DEVICE_NAME}] נעילת מקש פיזי: ${state}`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ child_lock: state }));
    },

    /**
     * קובע מה יקרה למכשיר אחרי הפסקת חשמל (Power outage memory)
     * @param {'ON' | 'OFF' | 'RESTORE'} mode - ידלק, יישאר כבוי, או יחזור למצב האחרון
     */
    setPowerOutageMemory: async (mode) => {
        console.log(`🔌 [Device: ${DEVICE_NAME}] הגדרת זיכרון הפסקת חשמל ל-${mode}`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ power_outage_memory: mode }));
    },

    /**
     * שליטה על נורית הלד הפיזית שעל המתג (Indicator mode)
     * @param {'off' | 'none' | 'relay' | 'contract'} mode 
     */
    setIndicatorMode: async (mode) => {
        console.log(`🚨 [Device: ${DEVICE_NAME}] שינוי מצב נורית לד ל-${mode}`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ indicator_mode: mode }));
    },

    /**
     * הגדרת טיימר פנימי בחומרה לכיבוי אוטומטי (Countdown בשניות)
     * @param {number} seconds - מספר השניות (0 לביטול)
     */
    setCountdown: async (seconds) => {
        console.log(`⏱️ [Device: ${DEVICE_NAME}] הגדרת טיימר כיבוי בעוד ${seconds} שניות`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ countdown: seconds }));
    },

    // ==========================================
    // 3. אפקטים מבוססי תוכנה (Software Effects)
    // ==========================================

    /**
     * מהבהב את התאורה (שימושי לרמזים/חיוויים בחדר)
     */
    flash: async (count = 3, intervalMs = 500) => {
        console.log(`⚡ [Device: ${DEVICE_NAME}] מתחיל אפקט הבהוב תוכנתי (${count} פעמים)`);
        let current = 0;
        const interval = setInterval(async () => {
            if (current >= count * 2) {
                clearInterval(interval);
                return;
            }
            await sendDeviceCommand(DEVICE_NAME, current % 2 === 0 ? 'ON' : 'OFF');
            current++;
        }, intervalMs);
    },

    // ==========================================
    // 4. קריאת ופענוח נתונים (Telemetry & Sensors)
    // ==========================================

    /**
     * מפענח את המידע שמוזרם מדגם ה-TS0001
     */
    parseTelemetry: (payload) => {
        return {
            state: payload.state,                      // ON / OFF
            countdown: payload.countdown || 0,         // שניות לסיום הטיימר
            childLock: payload.child_lock,             // LOCK / UNLOCK
            indicatorMode: payload.indicator_mode,     // מצב נורית החיווי
            linkQuality: payload.linkquality           // עוצמת קליטת קשר (LQI)
        };
    }
};