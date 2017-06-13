const mongoose = require('mongoose')

const { Schema } = mongoose
const ProfileSchema = require('./profile');

mongoose.Promise = global.Promise

const gameSchema = new Schema({
  twitchId: {
    type: String,
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
