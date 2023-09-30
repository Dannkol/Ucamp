import { Router } from 'express'

import { getAllCoursecontent, getmylist } from '../../controllers/cursos.Controller.js';

import { getUser } from '../../controllers/dahsboard.Controller.js';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

const IndexDashboard = Router();

IndexDashboard.get('/dashboard/all/course', getAllCoursecontent)

IndexDashboard.post('/dashboard/mylist', getmylist)

IndexDashboard.get('/dashboard/info/user', getUser)


export { IndexDashboard }