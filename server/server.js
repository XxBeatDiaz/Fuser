import express from 'express';
import { createServer } from 'http';
import { initSocket } from './config/socket.js';
import cors from 'cors';
import router from './router/router.js';
import './config/MQTT.js';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api', router);

initSocket(httpServer);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 [Server] Running on port ${PORT}`);
});