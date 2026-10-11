export const rightArmSensor = {
    parseState: (payload) => {
        return {
            isAttached: payload.contact,
            battery: payload.battery || 100,
            linkQuality: payload.linkquality
        };
    }
};