import { Router } from 'express'

import { getAllCoursecontent, getmylist, uprol } from '../../controllers/cursos.Controller.js';

import { getUser } from '../../controllers/dahsboard.Controller.js';

import { deletmycourses, deletMyListController } from '../../controllers/cursos.Controller.js';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

const IndexDashboard = Router();

IndexDashboard.get('/dashboard/all/course', getAllCoursecontent)

IndexDashboard.post('/dashboard/mylist', getmylist)

IndexDashboard.get('/dashboard/info/user', getUser)

IndexDashboard.get('/dashboard/mylist/delate/:idcourse', deletMyListController)
IndexDashboard.get('/dashboard/mycourses/delate/:idcourse', deletmycourses)
IndexDashboard.get('/dashboard/update/rol', uprol)




export { IndexDashboard }