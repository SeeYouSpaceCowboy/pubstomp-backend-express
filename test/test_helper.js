const mongoose = require('mongoose')

const request = require('supertest')
const app = require('../server/app')

const User = mongoose.model('User')
const Profile = mongoose.model('Profile')

mongoose.Promise = global.Promise;

before( done => {
  mongoose.connect('mongodb://localhost/pubstomp-test')
  mongoose.connection
  .once('open', () => done())
  .on('error', err => {
    console.warn('Warning', err)
  })
})

beforeEach( done => {
  const { users, profiles } = mongoose.connection.collections
  Promise.all([users.drop(), profiles.drop()])
    .then(()=>done())
    .catch(()=>done())
})

module.exports.createAuthenticatedUser = ( user ) => {
  return new Promise(function(resolve, reject) {
    request(app)
      .post('/api/signup')
      .send(user)
      .end( (err, response) => {
        resolve(response.body.token);
      });
  })
}
