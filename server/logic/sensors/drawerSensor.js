export const drawerSensor = {
    parseState: (payload) => {
        return {
            isOpen: payload.contact === false,
            isClosed: payload.contact === true,
            battery: payload.battery || 100,
            linkQuality: payload.linkquality 
        };
    }
};