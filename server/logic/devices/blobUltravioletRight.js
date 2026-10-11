// src/automation/devices/lightDevice.js
import { sendDeviceCommand } from '../../services/deviceService.js';

const DEVICE_NAME = 'Blob ultraviolet right';

export const blobUltravioletRight = {

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
     * קריטי לאיפוס וסנכרון החדר בריסטארט!
     * @param {'on' | 'off' | 'restore'} mode - ידלק, יישאר כבוי, או יחזור למצב האחרון לפני הניתוק
     */
    setPowerOutageMemory: async (mode) => {
        console.log(`🔌 [Device: ${DEVICE_NAME}] הגדרת זיכרון הפסקת חשמל ל-${mode}`);
        // בדגמים האלו השדה נקרא לרוב power_outage_memory ב-MQTT
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ power_outage_memory: mode }));
    },

    /**
     * שליטה על נורית הלד הפיזית שעל התקע (Indicator mode)
     * @param {'disabled' | 'lit_when_on' | 'lit_when_off'} mode 
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

    /**
     * גורם לנורית המכשיר להבהב פיזית כדי לזהות אותו בין המכשירים (Identify)
     */
    identify: async () => {
        console.log(`🔍 [Device: ${DEVICE_NAME}] מפעיל זיהוי חומרה (Identify)`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ identify: {} }));
    },

    // ==========================================
    // 3. אפקטים מבוססי תוכנה (Software Effects)
    // ==========================================

    /**
     * מהבהב את המנורה (שימושי לרמזים בחדר)
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
     * מפענח את כל המידע המלא שהמכשיר מזרים לרשת
     */
    parseTelemetry: (payload) => {
        return {
            state: payload.state,                       // ON / OFF
            countdown: payload.countdown || 0,          // שניות לסיום הטיימר
            power: payload.power || 0,                  // צריכה אקטיבית (W)
            current: payload.current || 0,              // זרם נוכחי (A)
            voltage: payload.voltage || 0,              // מתח נוכחי (V)
            energy: payload.energy || 0,                // סך הכל צריכה מצטברת (kWh)
            childLock: payload.child_lock,              // LOCK / UNLOCK
            linkQuality: payload.linkquality            // עוצמת קליטת קשר (LQI) - בתמונות שלך עומד על 135
        };
    }
};