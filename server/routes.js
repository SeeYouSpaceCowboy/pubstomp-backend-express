const Authentication = require('./controllers/authController');

const basicController = require('./controllers/basicController')
const profileController = require('./controllers/profileController')

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/api/', basicController.get);

  app.post('/api/login', requireSignin, Authentication.login);
  app.post('/api/signup', Authentication.signup);

  app.get('/api/profile/:username', profileController.show);
  app.get('/api/profile', profileController.showAll);

}
