const db = require('./../models');

const userController = {}

userController.update = function(req, res, next) {

  res.json({ user: 'This feature is underconstruction' });
}

userController.show = function(req, res, next) {
  //  this is a protected route

  const { email } = req.params;

  if ( !email ) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  db.User.findOne({ email })
    .populate('profile')
    .then( existingUser => {
      if ( !existingUser ) { return res.status(422).send({ error: 'Could not locate a user with that email' }); }

      let user = {
        email: existingUser.email,
        profile: existingUser.profile
      }
      res.json({ user });
    })
    .catch( (err) => {
      return next(err);
    });
}

userController.showAll = (req, res, next) => {
  //  this is a protected route

  db.User.find()
    .populate('profile')
    .then( existingUsers => {
      let limit = 25;
      let users = []
      for (var i = 0; i < existingUsers.length; i++) {
        if ( i >= limit ) { break; };
        users.push({
          email: existingUsers[i].email,
          profile: existingUsers[i].profile
        });
      }
      res.json({ users });
    })
    .catch( (err) => {
      return next(err);
    });

}

userController.fetchUser = (req, res, next) => {
  //  this is a protected route
  let currentUser = req.user;

  db.User.findOne({ email: currentUser.email })
    .populate('profile')
    .then( user => {
      res.json({ user });
    })
    .catch( (err) => {
      return next(err);
    });
}

module.exports = userController;
