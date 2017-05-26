const express = require('express')

const basicController = require('./controllers/basicController')
const userController = require('./controllers/userController')

const routes = express()

routes.get('/', basicController.get);

routes.post('/signup', userController.create);
routes.get('/login', userController.login);

routes.get('/user/:email', userController.show);
routes.get('/users', userController.showAll);

module.exports = routes
