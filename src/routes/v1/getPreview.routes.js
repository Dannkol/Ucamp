import { Router } from 'express';

import { getVideo , getCourse , getReadme} from "../../controllers/preview.Controller.js";

import { addMyListController } from '../../controllers/cursos.Controller.js';

const preview = Router()

preview.get('/getVideo/:videoId', getVideo)
preview.get('/getReadme/:readmeId', getReadme)
preview.get('/infocourse/:id', getCourse)
preview.get('/addmylist/:idcourse', addMyListController)



export { preview }