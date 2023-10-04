
import { getAllCourseByid } from '../models/Curso.Model.js';

import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { dirname } from 'path';
import path from 'path';
import { createReadStream } from 'fs';
import axios from 'axios'

/* import { promisify } from 'util';

const statAsync = promisify(fs.stat);
const readFileAsync = promisify(fs.readFile); */


const __dirname = dirname(fileURLToPath(import.meta.url));

/* 
En caso de no funcionar en el clouster hirse por la facil

const getVideo = async (req, res) => {
    const videoId = req.params.videoId;

    const videoPath = path.join(__dirname, `../uploads/${videoId}.mp4`);
    try {
        const video = await fs.stat(videoPath)
        const stream = await fs.readFile(videoPath);
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'inline');
        res.setHeader('Content-Length', video.size);
        res.status(200).send(stream);

    } catch (error) {
        console.log(error);
        return res.status(404).send('Archivo no encontrado');
    }
};
 */


const getVideo = async (req, res) => {
    const videoId = req.params.videoId;
    const videoPath = path.join(__dirname, `../uploads/${videoId}.mp4`);
  
    try {
      const videoStat = await fs.stat(videoPath);
      const fileSize = videoStat.size;
  
      // Obtén el rango de bytes solicitado por el navegador
      const range = req.headers.range;
  
      if (!range) {
        // Si no se proporciona un rango, devuelve un error 416 (Solicitud no válida)
        return res.status(416).send('Solicitud no válida');
      }
  
      // Parsea el rango
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;
  
      // Configura las cabeceras de la respuesta para la transmisión
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });
  
      // Lee y envía solo el fragmento del video solicitado
      const stream = createReadStream(videoPath, { start, end });
      stream.pipe(res);
    } catch (error) {
      console.error('Error al abrir el archivo de video:', error);
      res.status(404).send('Archivo no encontrado');
    }
};


const getReadme = async (req, res) => {
    const readmeId = req.params.readmeId;

    const videoPath = path.join(__dirname, `../uploads/${readmeId}.md`);

    try {
        await fs.access(videoPath, fs.constants.R_OK);
        const stream = createReadStream(videoPath);
        res.setHeader('Content-Type', 'text/markdown');
        stream.pipe(res);
    } catch (error) {
        return res.status(404).send('Archivo no encontrado');
    }
};


const isValidObjectId = (value) => {
    if (typeof value === 'string' && value.length === 24) {
      return /^[0-9a-fA-F]{24}$/.test(value);
    }
    return false;
  };


const getCourse = async (req, res) => {
    try {
        let data = []
        if (!isValidObjectId(req.params.id)) {
            try {
                const response = await axios.get(`http://192.168.128.23:5010/cursos/v2`, {
                  params: { course: req.params.id }
                });
                
                data = response.data;
               
              } catch (error) {
                console.error('Error al realizar la solicitud HTTP:', error);
                throw error;
              }
        }else{

            data = await getAllCourseByid(req.params.id);
        }
        return res.status(200).json(data)
    } catch (error) {

        return res.status(404).json(
            {
                massage: 'Archivo no encontrado'
            }
        );
    }
};

export { getVideo, getCourse, getReadme };
