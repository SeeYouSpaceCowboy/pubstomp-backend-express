const mongoose = require('mongoose');
const Profile = mongoose.model('Profile');
const User = mongoose.model('User');

const profileController = {};

profileController.create = (request, response) => {

  // List any key that shouldn't be user assigned here
  let protectedKeys = ['_id', 'id', '__v'];

  const user = request.user;
  const profile = new Profile();

  for (let key in request.body) {
    if ( Object.keys( Profile.schema.tree ).indexOf(key) >= 0 &&
    Object.keys( Profile.schema.tree ).indexOf( protectedKeys < 0 ) ) {
      profile[key] = request.body[key];
    }
  }

  profile.save()
    .then( () => {
      User.findOne({ email: user.email })
        .then( (user) => {
          user.profile = profile;
          user.save()
            .then( (user) => {
              response.status(200).json({
                success: true,
                data: profile
              });
            })
            .catch((err) => {
              console.log(err)
              response.status(500).json({
                message: err
              });
            });
        });
    });
};

profileController.show = (request, response) => {
  const { username } = request.params;

  Profile.findOne({ username })
    .then((profile) => {
      return response.status(200).json({
        data: profile
      });
    })
    .catch((err) => {
      return response.status(500).json({
        error: err
      });
    });
};

profileController.showAll = (request, response) => {
  Profile.find({})
    .then((profiles) => {
      return response.status(200).json({
        data: profiles
      });
    })
    .catch((err) => {
      return response.status(500).json({
        error: err
      });
    });
}

module.exports = profileController;
