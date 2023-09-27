import { fileURLToPath } from 'url';

import { getAllCourse } from '../models/Curso.Model.js';

import { createReadStream } from "fs"
import fs from 'fs/promises';
import { dirname } from 'path';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getVideo = async (req, res) => {
    const videoId = req.params.videoId;

    const videoPath = path.join(__dirname, `../uploads/${videoId}.mp4`);
    try {
        await fs.stat(videoPath)
        const stream = createReadStream(videoPath);
        res.setHeader('Content-Type', 'video/mp4');
        stream.pipe(res);

    } catch (error) {
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
