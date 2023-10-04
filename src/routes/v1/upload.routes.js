import { Router } from 'express'
import multer from 'multer';
import path , {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { uploadclass} from '../../controllers/uploadClasses.js';

import { getCoursesNameId , getClasesNameId, getClasescontent} from '../../controllers/cursos.Controller.js';
import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

const uploads = Router();

// Configura la carpeta donde se guardarán los archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../../uploads/'));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

uploads.post('/upload', upload.fields([
  {
    name: 'file'
  },
  {
    name : 'readme'
  }
]), ensureAuthenticated, uploadclass);

uploads.get('/all/courses', ensureAuthenticated, getCoursesNameId)

uploads.get('/all/clases', ensureAuthenticated, getClasesNameId)

uploads.post('/all/content/clases', ensureAuthenticated, getClasescontent )


export { uploads }