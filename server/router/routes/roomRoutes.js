// server/router/routes/roomRoutes.js
import express from 'express';
import { changeRoomStatus, fetchRoomStatus, setRoomTime, addRoomTime, subtractRoomTime } from '../../controller/roomCtrl.js';

const roomRouter = express.Router();

roomRouter.post('/status', changeRoomStatus);
roomRouter.get('/status', fetchRoomStatus);
roomRouter.post('/status/set-time', setRoomTime);
roomRouter.post('/status/add-time', addRoomTime);
roomRouter.post('/status/subtract-time', subtractRoomTime);

export default roomRouter;