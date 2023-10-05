import { Router } from 'express'

import { getAllCoursecontent, getmylist, uprol } from '../../controllers/cursos.Controller.js';

import { getUser } from '../../controllers/dahsboard.Controller.js';

import { deletmycourses, deletMyListController } from '../../controllers/cursos.Controller.js';

import { ensureAuthenticated } from '../../middleware/ensureAuthenticated.middleware.js';

const IndexDashboard = Router();

IndexDashboard.get('/dashboard/all/course', ensureAuthenticated, getAllCoursecontent)

IndexDashboard.post('/dashboard/mylist', ensureAuthenticated, getmylist)

IndexDashboard.get('/dashboard/info/user', ensureAuthenticated, getUser)

IndexDashboard.get('/dashboard/mylist/delate/:idcourse', ensureAuthenticated, deletMyListController)
IndexDashboard.get('/dashboard/mycourses/delate/:idcourse', ensureAuthenticated, deletmycourses)
IndexDashboard.get('/dashboard/update/rol', ensureAuthenticated, uprol)




export { IndexDashboard }