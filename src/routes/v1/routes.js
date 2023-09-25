import { Router } from 'express';
import session from 'express-session';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

import dotenv from "dotenv";

dotenv.config();

const Router_Init = Router();

const SERVER_FRONT = JSON.parse(process.env.SERVER_FRONT)

Router_Init.get('/ok', ensureAuthenticated, (req, res) => {
    // Aquí puedes manejar las acciones que deseas realizar en la ruta protegida
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
        const targetWindow = window.opener || window.parent; // Obtener una referencia a la ventana receptora
        targetWindow.postMessage(true, 'http://${SERVER_FRONT.HOSTNAME}:${SERVER_FRONT.PORT}')
      </script>
    </html>`);
});

Router_Init.get('/dashboard', ensureAuthenticated, (req, res) => {
    // Aquí puedes manejar las acciones que deseas realizar en la ruta protegida
    
    res.status(200).json({
        message : req.user.username
    })
});

export { Router_Init }