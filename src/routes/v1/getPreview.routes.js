import { Router } from 'express';

import { getVideo , getCourse } from "../../controllers/preview.Controller.js";

const preview = Router()

preview.get('/getVideo/:videoId', getVideo)
preview.get('/infocourse/:id', getCourse)


export { preview }