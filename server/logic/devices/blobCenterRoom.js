// src/automation/devices/centerRoomLightDevice.js
import { sendDeviceCommand } from '../../services/deviceService.js';

const DEVICE_NAME = 'Blob center room';

export const blobCenterRoom = {

    // ==========================================
    // 1. שליטה בבסיס התאורה (Basic Control)
    // ==========================================

    turnOn: async () => {
        console.log(`💡 [Device: ${DEVICE_NAME}] הדלקת נורה (ON)`);
        return await sendDeviceCommand(DEVICE_NAME, 'ON');
    },

    turnOff: async () => {
        console.log(`🌑 [Device: ${DEVICE_NAME}] כיבוי נורה (OFF)`);
        return await sendDeviceCommand(DEVICE_NAME, 'OFF');
    },

    toggle: async () => {
        console.log(`🔄 [Device: ${DEVICE_NAME}] שינוי מצב (TOGGLE)`);
        return await sendDeviceCommand(DEVICE_NAME, 'TOGGLE');
    },

    // ==========================================
    // 2. שליטה בעוצמה וצבע (Brightness & Color)
    // ==========================================

    /**
     * שינוי עוצמת האור (Brightness)
     * @param {number} level - ערך בין 0 ל-254
     * @param {number} transitionSeconds - זמן מעבר חלק בשניות (אופציונלי)
     */
    setBrightness: async (level, transitionSeconds = 0) => {
        const brightness = Math.max(0, Math.min(254, level));
        console.log(`🔆 [Device: ${DEVICE_NAME}] שינוי עוצמת תאורה ל-${brightness}`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({
            brightness,
            transition: transitionSeconds
        }));
    },

    /**
     * שינוי טמפרטורת צבע - לבן חם / לבן קר (Color Temperature)
     * @param {number} mired - ערך מירד (לרוב בין 150 - לבן קר ל-500 - לבן חם)
     */
    setColorTemp: async (mired) => {
        console.log(`🌡️ [Device: ${DEVICE_NAME}] שינוי טמפרטורת צבע ל-${mired} mired`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ color_temp: mired }));
    },

    /**
     * שינוי צבע הנורה (RGB / Color)
     * @param {{ r: number, g: number, b: number }} rgb - אובייקט עם ערכי R, G, B (0-255)
     */
    setColor: async ({ r, g, b }) => {
        console.log(`🎨 [Device: ${DEVICE_NAME}] שינוי צבע ל-RGB (${r}, ${g}, ${b})`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ color: { r, g, b } }));
    },

    // ==========================================
    // 3. הגדרות חומרה ואפקטים (Hardware & Effects)
    // ==========================================

    /**
     * קובע מה יקרה לנורה אחרי הפסקת חשמל (Power outage memory)
     * @param {'on' | 'off' | 'previous'} mode - תידלק, תישאר כבויה, או תחזור למצב האחרון
     */
    setPowerOnBehavior: async (mode) => {
        console.log(`🔌 [Device: ${DEVICE_NAME}] הגדרת התנהגות לאחר הפסקת חשמל: ${mode}`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ power_on_behavior: mode }));
    },

    /**
     * מפעיל אפקט מובנה בנורה (Blink / Breathe / Okay)
     * @param {'blink' | 'breathe' | 'okay' | 'channel_change'} effect 
     */
    triggerEffect: async (effect = 'blink') => {
        console.log(`🎭 [Device: ${DEVICE_NAME}] הפעלת אפקט: ${effect}`);
        return await sendDeviceCommand(DEVICE_NAME, JSON.stringify({ effect }));
    },

    /**
     * הבהוב תוכנתי גמיש
     */
    flash: async (count = 3, intervalMs = 500) => {
        console.log(`⚡ [Device: ${DEVICE_NAME}] מתחיל אפקט הבהוב (${count} פעמים)`);
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
    // 4. קריאת ופענוח נתונים (Telemetry)
    // ==========================================

    /**
     * מפענח את הנתונים שמגיעים מהנורה
     */
    parseTelemetry: (payload) => {
        return {
            state: payload.state,                       // ON / OFF
            brightness: payload.brightness || 0,        // 0-254
            colorTemp: payload.color_temp,              // Mired value
            color: payload.color,                      // { x, y } או { r, g, b }
            colorMode: payload.color_mode,              // color_temp / xy / hs
            powerOnBehavior: payload.power_on_behavior, // on / off / previous
            linkQuality: payload.linkquality            // עוצמת קליטת קשר (LQI)
        };
    }
};