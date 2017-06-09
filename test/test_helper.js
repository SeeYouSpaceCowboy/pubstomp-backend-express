const mongoose = require('mongoose')

const request = require('supertest')
const app = require('../server/app')

const passport = require('passport');
const jwt = require('jwt-simple');
const config = require('../config');

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

module.exports.createAuthenticatedUser = user => {
  return new Promise(function(resolve, reject) {
    request(app)
      .post('/api/signup')
      .send(user)
      .end( (err, response) => {
        resolve(response.body.token);
      });
  })
}

module.exports.createAuthenticatedUserWithProfile = (user,profile) => {
  let token;

  return new Promise(function(resolve, reject) {
    request(app)
      .post('/api/signup')
      .send(user)
      .end( (err, response) => {
        token = response.body.token;
        const userProfile = new Profile( profile );
        userProfile.save()
          .then( () => {
            User.findOne({ email: user.email})
            .then( user => {
              user.profile = userProfile;
              user.save()
                .then( () => {
                  resolve(token);
                })
            })
          })
      });
  })
}

module.exports.generateTokenFromUser = (user, done) => {
  function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  }
  return tokenForUser( user );
}
