import { ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs/promises';
import { deletAny } from '../models/DelateFiled.js';

import { getAllClasesByIds, createNewCourse } from '../models/Curso.Model.js';

let linksToDelete = [];

const uploadclass = async (req, res) => {
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
            if (e.mimetype === 'video/mp4') return `..${req.path}/${e.filename}`;
          });
          break;

        case 'readme':
          pathReadme = req.files.readme.map(e => {
            if (e.mimetype === 'text/markdown') return `..${req.path}/${e.filename}`;
          });
          break;

        default:
          break;
      }
    });

    const classes = await getAllClasesByIds(JSON.parse(req.body.clases));

    const data = {
      _id: new ObjectId(),
      classes: classes.map((e) => e.classes),
      title: req.body.title,
      summary: req.body.resumen,
      quiz: JSON.parse(req.body.quiz),
      content: pathReadme[0],
      update_date: new Date(),
    };

    console.log(data);

    const result = null

    if (!result) {
      for(let item in req.files){
        req.files[item].forEach((value) => {
          linksToDelete.push(value.path);
        })
      }
      await deletAny(linksToDelete);
      throw new Error('Error al crear el curso');
    }

    res.status(200).send('Archivo subido correctamente.');
  } catch (error) {
    res.status(500).json({ error: 'error en la creacion del curso' });
    console.error('Error:', error);
  } finally {
    res.end();
    
  }
};




export { uploadclass };
