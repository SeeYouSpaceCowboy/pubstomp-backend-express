import express from 'express'

import basicController from './controllers/basicController'
import userController from './controllers/userController'

const routes = express()

routes.get('/', basicController.get);

routes.post('/signup', userController.create);
routes.get('/user/:email', userController.show);
routes.get('/users', userController.showAll);

export default routes
