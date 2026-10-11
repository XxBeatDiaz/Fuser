import express from 'express';
import { deviceCtrl, resetDevicesCtrl } from '../../controller/deviceCtrl.js';

const deviceRouter = express.Router();

deviceRouter.post('/', deviceCtrl);
deviceRouter.post('/reset', resetDevicesCtrl);

export default deviceRouter;