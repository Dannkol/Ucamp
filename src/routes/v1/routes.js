import { Router } from 'express';
import session from 'express-session';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

import dotenv from "dotenv";

dotenv.config();

const Router_Init = Router();

Router_Init.get('/ok', ensureAuthenticated, (req, res) => {
    // Aquí puedes manejar las acciones que deseas realizar en la ruta protegida
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <body>
      </body>
      <script>
        console.log('hola')
        const targetWindow = window.opener || window.parent; // Obtener una referencia a la ventana receptora
        targetWindow.postMessage(true, 'http://localhost:5102')
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