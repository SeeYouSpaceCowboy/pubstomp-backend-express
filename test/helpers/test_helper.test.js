const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const jwt = require('jwt-simple');
const config = require('../../config');

const app = require('../../server/app');

const TestHelper = require('../test_helper');

const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

describe('Test Helpers', () => {

  describe('createAuthenticatedUser', () => {

    it('creates an authenticated user and returns a jwt token', done => {
      const user = {
        email: 'test@email.com',
        password: '123456'
      }

      TestHelper.createAuthenticatedUser( user )
        .then( token => {
          User.findOne({ email: user.email})
            .then( user => {
              let decodedToken = jwt.decode(token, config.secret).sub;
              assert( decodedToken === user._id.toString() );
              done();
            });
        });
    });
  });

  describe('createAuthenticatedUser', () => {
    it('creates an authenticated user with a profile and returns a jwt token', done => {
      const user = {
        email: 'test@email.com',
        password: '123456'
      }
      const profile = {
        username: 'testslayer'
      }

      TestHelper.createAuthenticatedUserWithProfile( user, profile )
        .then( token => {
          User.findOne({ email: user.email})
            .populate('profile')
            .then( user => {
              let decodedToken = jwt.decode(token, config.secret).sub;
              assert( decodedToken === user._id.toString() );
              assert( user.profile.username === profile.username );
              done();
            });
        });
    });
  });

  describe('generateTokenFromUser', () => {
    it('creates and returns a token from a user', done => {
      const user = {
        email: 'test@email.com',
        password: '123456'
      }

      const eric = new User(user)

      eric.save()
        .then( () => {
          let token = TestHelper.generateTokenFromUser( eric );

          User.findOne({ email: user.email})
            .then( user => {
              let decodedToken = jwt.decode(token, config.secret).sub;
              assert( decodedToken === user._id.toString() );
              done();
            });
        });
    });
  });
});
