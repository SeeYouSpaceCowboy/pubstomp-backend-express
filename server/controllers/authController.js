const db = require('./../models');
const jwt = require('jwt-simple');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const authController = {}

authController.signup = function(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  db.User.findOne({ email: email }, function(err, existingUser) {
    if ( err ) { return next(err); }

    if ( existingUser ) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new db.User({
      email: email,
      password: password
    });

    user.save( (err) => {
      if (err) { return next(err); }

      res.json({ token: tokenForUser(user) });
    });
  });
}

authController.login = (req, res, next) => {
  // User has already had their email and password auth'd thru passport
  res.send({ token: tokenForUser(req.user) });
}

module.exports = authController;
