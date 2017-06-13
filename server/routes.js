const Authentication = require('./controllers/authController');

const basicController = require('./controllers/basicController');
const gameController = require('./controllers/gameController');
const profileController = require('./controllers/profileController');
const userController = require('./controllers/userController');

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/api/', basicController.get);

  app.post('/api/login', requireSignin, Authentication.login);
  app.post('/api/signup', Authentication.signup);
  app.get('/api/fetchUser', requireAuth, userController.fetchUser);
  
  app.post('/api/users', requireAuth, userController.update);
  app.get('/api/users', requireAuth, userController.showAll);
  app.get('/api/users/:email', requireAuth, userController.show);

  app.post('/api/profiles', requireAuth, profileController.create);
  app.get('/api/profiles/:username', requireAuth, profileController.show);
  app.get('/api/profiles', profileController.showAll);

  app.post('/api/games', requireAuth, gameController.create);
  app.get('/api/games/:name', requireAuth, gameController.show);
  app.get('/api/games', gameController.showAll);


};
