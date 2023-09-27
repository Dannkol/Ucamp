import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs/promises';
import { deletAny } from '../models/DelateFiled.js';

import { getAllClasesByIds, createNewCourse, createNewClase } from '../models/Curso.Model.js';

let linksToDelete = [];


const CreatPath = async (req) => {
  try {
    let pathVideo = '';
    let pathReadme = '';

    if (req.files == {}) {
      pathVideo = req.body.file;
      pathVideo = req.body.readme;
      return res.status(200).send('Archivo subido correctamente.');
    }

    Object.keys(req.files).forEach(key => {
      switch (key) {
        case 'file':
          pathVideo = req.files.file.map(e => {
            if (e.mimetype === 'video/mp4') return `${e.filename}`;
          });
          break;
        case 'readme':
          pathReadme = req.files.readme.map(e => {
            if (e.mimetype === 'text/markdown') return `${e.filename}`;
          });
          break;

        default:
          break;
      }
    });

    return {
      pathVideo: pathVideo,
      pathReadme: pathReadme
    }
  } catch (error) {
    return null
  }
}

const uploadclass = async (req, res) => {
  if (req.body.tipo === 'true' ? true : false) {
    try {

      const path = await CreatPath(req)
      const classes = await getAllClasesByIds(JSON.parse(req.body.clases));

      const data = {
        _id: new ObjectId(),
        classes: classes.map((e) => e.classes),
        title: req.body.title,
        summary: req.body.resumen,
        quiz: JSON.parse(req.body.quiz),
        content: path.pathReadme[0],
        update_date: new Date(),
      };

      await createNewCourse(data)

      res.status(200).send('Archivo subido correctamente.');
    } catch (error) {
      for (let item in req.files) {
        req.files[item].forEach((value) => {
          linksToDelete.push(value.path);
        });
      }

      let filesDeleted = await deletAny(linksToDelete);

      linksToDelete = [];

      if (filesDeleted < linksToDelete.length) {
        return res.status(500).json({
          message: 'No se pudieron eliminar todos los archivos',
        });
      } 
      res.status(500).json({ message: 'error en la creaciSSon del curso' });
    } finally {
      res.end();
    }
  } else {
    try {

      const path = await CreatPath(req)

      const data = {
        _id: new ObjectId(),
        curso: req.body.curso,
        title: req.body.title,
        summary: req.body.resumen,
        content: [path.pathVideo[0], path.pathReadme[0]],
        update_date: new Date(),
      };

      await createNewClase(data)

      res.status(200).send('Archivo subido correctamente.');
    } catch (error) {
      for (let item in req.files) {
        req.files[item].forEach((value) => {
          linksToDelete.push(value.path);
        });
      }

      let filesDeleted = await deletAny(linksToDelete);
      req.files = [];
      linksToDelete = []
      if (filesDeleted < linksToDelete.length) {
        return res.status(500).json({
          message: 'No se pudieron eliminar todos los archivos',
        });
      } 
      res.status(500).json({ message: 'error en la cssreacion del curso' });
    } finally {
      res.end();
    }
  }

};




export { uploadclass };
