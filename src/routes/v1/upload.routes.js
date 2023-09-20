import { Router } from 'express'
import multer from 'multer';
import path from 'path';

import { uploadclass } from '../../controllers/uploadClasses.js';

const uploads = Router();


// Configura la carpeta donde se guardarán los archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

uploads.post('/upload', upload.single('file'), uploadclass);

export { uploads }