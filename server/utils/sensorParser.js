export const parseSensorData = (deviceName, payload) => {
    const data = payload || {};

    switch (deviceName) {
        case 'Front door':
            return {
                id: deviceName,
                name: "דלת כניסה",
                type: "magnetic", 
                value: data.contact === true,
                trueText: "סגורה",
                falseText: "פתוחה"
            };

        case 'Motion sensor':
            return {
                id: deviceName,
                name: "חיישן תנועה סלון",
                type: "motion",
                value: data.occupancy === false,
                trueText: "אין תנועה",
                falseText: "זוהתה תנועה"
            };

        case 'Smoke detector':
            return {
                id: deviceName,
                name: "גלאי עשן מטבח",
                type: "smoke",
                value: data.smoke === false,
                trueText: "תקין",
                falseText: "⚠️ עשן זוהה!"
            };

        default:
            // return {
            //     id: deviceName,
            //     name: deviceName,
            //     type: "default",
            //     value: data.contact ?? data.occupancy ?? (data.state === 'ON') ?? true,
            //     trueText: "תקין",
            //     falseText: "פעיל"
            // };
    }
};