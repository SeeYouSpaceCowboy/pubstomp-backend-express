const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server/app')

const TestHelper = require('../test_helper')

const User = mongoose.model('User')
const Profile = mongoose.model('Profile')

describe('Profile Controller', () => {

  describe('while logged in as an authenticated user', () => {

    it('can handle a POST request to /profile that creates a user profile and assigns it to the user that made the request', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      let profile = {
        username: 'testslayer',
        firstName: 'Eric',
        gender: 'Male',
        age: 27
      }

      const auth = TestHelper.createAuthenticatedUser( user )
        .then( (token) => {
          request(app)
            .post('/api/profile')
            .send(profile)
            .set({ Authorization: token })
            .end( (err, response) => {
              User.findOne({ email: user.email })
                .populate('profile')
                .then( ( user ) => {
                  assert.equal( user.profile.username, profile.username );
                  assert.equal( user.profile.gender, profile.gender );
                  done();
                })
                .catch( err => console.log(err))
            });
        });
    });
  });

  xit('Get request to /profile returns the correct user profile info', done => {
    let user = {
      email: 'test@email.com',
      email: '123456'
    }
    let profile = {
      username: 'test'
    }

    const eric = new User(user)
    eric.save()
    .then(() => {
      request(app)
      .post('/api/profile/test')
      .send(user)
      .end( (err, response) => {
        assert.equal(result.body.data.username, 'test');
        done();
      });
    })

  })
})
