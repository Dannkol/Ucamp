
import { getAllCourse } from '../models/Curso.Model.js';

import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { dirname } from 'path';
import path from 'path';
/* import { promisify } from 'util';

const statAsync = promisify(fs.stat);
const readFileAsync = promisify(fs.readFile); */


const __dirname = dirname(fileURLToPath(import.meta.url));

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

const getCourse = async (req, res) => {
    try {
        const data = await getAllCourse(req.params.id);
        if (!data) throw 'Course not found'
        res.status(200).json(data)
    } catch (error) {
        return res.status(404).json(
            {
                massage: 'Archivo no encontrado'
            }
        );
    }
};

export { getVideo, getCourse, getReadme };
