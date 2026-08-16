import { sendDeviceCommand } from '../services/deviceService.js';

// --- הקונטרולר המקורי שלך לשליטה (עבור ה-POST) ---
export const deviceCtrl = async (req, res) => {
    try {
        const { deviceName, state } = req.body;

        if (!deviceName || !state) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing deviceName or state in request body' 
            });
        }

        const result = await sendDeviceCommand(deviceName, state);
        return res.status(200).json(result);
        
    } catch (error) {
        console.error('❌ [Controller Error - Control]:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Internal Server Error' 
        });
    }
};