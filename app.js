import express from 'express';
import dotenv from "dotenv";
import http from "http";

import cors from "cors";

import configureApp from './src/config/expressConfig.js';


/* ROUTE AUTH */
import { Router_Auth } from './src/routes/auth.routes.js';

/* ROTES INITIAL */

import { Router_Init } from './src/routes/v1/routes.js';

/* ROUTES UPLOAD */

import { uploads } from './src/routes/v1/upload.routes.js';

/* ROUTES PREVIEW */
import { preview } from './src/routes/v1/getPreview.routes.js';

/* ROUTES DASHBOARD */

import { IndexDashboard } from './src/routes/v1/indexdashboard.routes.js';

dotenv.config();
const SERVER = JSON.parse(process.env.SERVER)

const app = express();


configureApp(app);



app.use(cors({
    origin: true,
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
}))

app.use(Router_Auth)
app.use(Router_Init)
app.use(uploads)
app.use(preview)
app.use(IndexDashboard)




// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


const PORT = SERVER.PORT || 8080;

const server = http.createServer(app);

// Configura un tiempo de espera en la red en milisegundos
const networkTimeout = 5000; // 5000 milisegundos (5 segundos)

server.timeout = networkTimeout;

server.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});