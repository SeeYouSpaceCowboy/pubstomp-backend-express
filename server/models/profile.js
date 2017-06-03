const mongoose = require('mongoose')

const { Schema } = mongoose

mongoose.Promise = global.Promise

const profileSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  summary: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  jobTitle: {
    type: String
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
