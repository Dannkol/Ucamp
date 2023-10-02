import { Router } from 'express';
import session from 'express-session';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

Router_Init.get('/me', ensureAuthenticated, (req, res) => {
  // Aquí puedes manejar las acciones que deseas realizar en la ruta protegida

  res.status(200).json({
    message: 'ok'
  })
});


Router_Init.get('/cursosdefaul', (req, res) => {
  // Aquí puedes manejar las acciones que deseas realizar en la ruta protegida
  const filePath = path.join(__dirname+'../../../../db/cursos.json');

  // Leer el archivo JSON de forma asíncrona utilizando promesas
  fs.promises.readFile(filePath, 'utf8')
    .then(data => {
      // Analizar el contenido del archivo JSON
      const jsonData = JSON.parse(data);

      // Enviar los datos como respuesta
      res.json(jsonData);
    })
    .catch(err => {
      console.error('Error al leer el archivo JSON:', err);
      res.status(500).json({ error: 'Error al leer el archivo JSON' });
    });
});

Router_Init.get('/cursos', (req, res) => {
  // Aquí puedes manejar las acciones que deseas realizar en la ruta protegida
  const course= req.query.course;
  console.log(course);
  if(!course || course !== 'react') return res.status(403).json({
    message: 'Archivo no encontrado'
  });
  const filePath = path.join(__dirname+'../../../../db/data.json');

  // Leer el archivo JSON de forma asíncrona utilizando promesas
  fs.promises.readFile(filePath, 'utf8')
    .then(data => {
      // Analizar el contenido del archivo JSON
      const jsonData = JSON.parse(data);

      // Enviar los datos como respuesta
      res.json(jsonData);
    })
    .catch(err => {
      console.error('Error al leer el archivo JSON:', err);
      res.status(500).json({ error: 'Error al leer el archivo JSON' });
    });
});

export { Router_Init }