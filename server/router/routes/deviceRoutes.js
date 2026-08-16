import express from 'express';
import { deviceCtrl } from '../../controller/deviceCtrl.js';

const deviceRouter = express.Router();

deviceRouter.post('/', deviceCtrl);

export default deviceRouter;