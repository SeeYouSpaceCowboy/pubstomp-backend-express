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
  dob: {
    type: Date
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
  },
  createdAt: {
    type : Date,
    default: Date.now
  }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
