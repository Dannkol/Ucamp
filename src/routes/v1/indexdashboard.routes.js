import { Router } from 'express'

import { getAllCoursecontent } from '../../controllers/cursos.Controller.js';

import { getUser } from '../../controllers/dahsboard.Controller.js';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

const IndexDashboard = Router();

IndexDashboard.get('/dashboard/all/course', getAllCoursecontent)

IndexDashboard.get('/dashboard/info/user', getUser)


export { IndexDashboard }