const mongoose = require('mongoose');
const Game = mongoose.model('Game');
const Profile = mongoose.model('Profile');
const User = mongoose.model('User');

const gameController = {};

gameController.create = (request, response) => {

  // List any key that shouldn't be user assigned here
  let protectedKeys = ['_id', 'id', '__v'];

  // Check if username already exists
  Game.findOne({ username: request.body.username })
    .then( (duplicateGame) => {
      if ( duplicateGame ) {
        response.status(422).json({
          success: false,
          error: 'Username already exists.'
        });
        return;
      }

      const user = request.user;
      const game = new Game();

      for (let key in request.body) {
        if ( Object.keys( Game.schema.tree ).indexOf(key) >= 0 &&
        Object.keys( Game.schema.tree ).indexOf( protectedKeys < 0 ) ) {
          game[key] = request.body[key];
        }
      }

      game.save()
        .then( () => {
          User.findOne({ email: user.email })
            .then( (user) => {
              user.game = game;
              user.save()
                .then( (user) => {
                  response.status(200).json({
                    success: true,
                    data: game
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
  }); // End of then for duplicate game check
};

gameController.show = (request, response) => {
  const { username } = request.params;

  Game.findOne({ username })
    .then((game) => {
      return response.status(200).json({
        data: game
      });
    })
    .catch((err) => {
      return response.status(500).json({
        error: err
      });
    });
};

gameController.showAll = (request, response) => {
  Game.find({})
    .then((games) => {
      return response.status(200).json({
        data: games
      });
    })
    .catch((err) => {
      return response.status(500).json({
        error: err
      });
    });
}

module.exports = gameController;
