import express from 'express';
import dotenv from "dotenv";

import cors from "cors";

import configureApp from './src/config/expressConfig.js';


/* ROUTE AUTH */
import { Router_Auth } from './src/routes/auth.routes.js';

/* ROTES INITIAL */

import { Router_Init } from './src/routes/v1/routes.js';

/* ROUTES UPLOAD */

import { uploads } from './src/routes/v1/upload.routes.js';

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



// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


const PORT = SERVER.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`App listening at http://${SERVER.HOSTNAME}:${PORT}`);
});