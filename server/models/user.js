const mongoose = require('mongoose')

const { Schema } = mongoose

mongoose.Promise = global.Promise

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  gamerid: {
    type: String,
    required: false,
    minlength: [3, 'GamerID must be 3 characters or more']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be 6 characters or more']
  },
  name: {
    type: String
  }
})

//Encryptions for Password

const User = mongoose.model('User', userSchema)

module.exports = User
