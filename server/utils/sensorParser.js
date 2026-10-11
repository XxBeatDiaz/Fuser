const ON = 'ON';

export const parseSensorData = (deviceName, payload = {}) => {
    // שדות כלליים שקיימים כמעט בכל חיישן מ-Zigbee2MQTT
    const linkquality = payload.linkquality ?? null; // עוצמת קליטה (LQI)
    const battery = payload.battery ?? null;         // אחוז סוללה

    switch (deviceName) {
        case 'Sensor bathroom door':
            return {
                id: deviceName,
                name: "דלת חדר מקלחת",
                type: "magnetic",
                value: payload.contact === true,
                trueText: "סגורה",
                falseText: "פתוחה",
                battery,
                linkquality
            };

        case 'Sensor drawer':
            return {
                id: deviceName,
                name: "מגירה",
                type: "magnetic",
                value: payload.contact === true,
                trueText: "סגורה",
                falseText: "פתוחה",
                battery,
                linkquality
            };

        case 'Blob showcase':
            return {
                id: deviceName,
                name: "מנורה ויטרינה",
                type: "light",
                value: payload.state === ON,
                trueText: "דלוק",
                falseText: "כבוי",
                linkquality
            };

        case 'Blob center room':
            return {
                id: deviceName,
                name: "תאורה מרכזית",
                type: "light",
                value: payload.state === ON,
                brightness: payload.brightness || 0,
                colorTemp: payload.color_temp,
                trueText: "דלוק",
                falseText: "כבוי",
                linkquality
            };

        case 'Blob ultraviolet right':
            return {
                id: deviceName,
                name: "אולטרה סגול ימין",
                type: "uv_light",
                value: payload.state === ON,
                power: payload.power || 0,
                childLock: payload.child_lock,
                trueText: "דלוק",
                falseText: "כבוי",
                linkquality
            };

        case 'Blob ultraviolet left':
            return {
                id: deviceName,
                name: "אולטרה סגול שמאל",
                type: "uv_light",
                value: payload.state === ON,
                power: payload.power || 0,
                childLock: payload.child_lock,
                trueText: "דלוק",
                falseText: "כבוי",
                linkquality
            };

        case 'Sensor left arm':
            return {
                id: deviceName,
                name: "שלד זרוע שמאל",
                type: "magnetic",
                value: payload.contact === true,
                power: payload.power || 0,
                trueText: "מחובר",
                falseText: "מנותק",
                battery,
                linkquality
            };

        case 'Sensor right arm':
            return {
                id: deviceName,
                name: "שלד זרוע ימין",
                type: "magnetic",
                value: payload.contact === true,
                power: payload.power || 0,
                trueText: "מחובר",
                falseText: "מנותק",
                battery,
                linkquality
            };

        case 'Sensor left leg':
            return {
                id: deviceName,
                name: "שלד רגל שמאל",
                type: "magnetic",
                value: payload.contact === true,
                power: payload.power || 0,
                trueText: "מחובר",
                falseText: "מנותק",
                battery,
                linkquality
            };

        case 'Sensor right leg':
            return {
                id: deviceName,
                name: "שלד רגל ימין",
                type: "magnetic",
                value: payload.contact === true,
                power: payload.power || 0,
                trueText: "מחובר",
                falseText: "מנותק",
                battery,
                linkquality
            };

        case 'Controller':
            return {
                id: deviceName,
                name: "בקר IR מרכזי",
                type: "controller",
                value: true,
                trueText: "מחובר",
                falseText: "מנותק",
                linkquality
            };

        default:
            return {
                id: deviceName,
                name: deviceName,
                type: "default",
                value: payload.contact ?? payload.occupancy ?? (payload.state === 'ON') ?? true,
                trueText: "פעיל",
                falseText: "לא פעיל",
                battery,
                linkquality
            };
    }
};