const Authentication = require('./controllers/authController');

const basicController = require('./controllers/basicController');
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

  app.post('/api/profile', requireAuth, profileController.create);
  app.get('/api/profile/:username', requireAuth, profileController.show);
  app.get('/api/profile', profileController.showAll);

  app.post('/api/user', requireAuth, userController.update);
  app.get('/api/user', requireAuth, userController.showAll);
  app.get('/api/user/:email', requireAuth, userController.show);

};
