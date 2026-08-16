import express from 'express';
import deviceRouter from './routes/deviceRoutes.js';
import roomRouter from './routes/roomRoutes.js';

const router = express.Router();

router.use('/devices', deviceRouter);
router.use('/room', roomRouter);

export default router;