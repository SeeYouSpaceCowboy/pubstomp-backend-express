const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server/app');

const TestHelper = require('../test_helper');

const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

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
        gender: 'Male'
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

    it('returns an error if an invalid token is provided to a POST request to /profile', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      let profile = {
        username: 'testslayer',
        firstName: 'Eric',
        gender: 'Male'
      }

      const auth = TestHelper.createAuthenticatedUser( user )
        .then( (token) => {
          request(app)
            .post('/api/profile')
            .send(profile)
            .set({ Authorization: 'hax' })
            .end( (err, response) => {
              assert.equal( response.error.text, "Unauthorized" );
              done();
            })
        });
    });

    it('will not create a profile if the username is not unique', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      let profile = {
        username: 'testslayer',
        firstName: 'Eric',
        gender: 'Male'
      }
      let token;

      const eric = new User(user);
      const ericProfile = new Profile(profile);

      eric.save()
        .then( () => {
          ericProfile.save()
            .then( () => {
              token = TestHelper.generateTokenFromUser( eric, done )
              request(app)
                .post('/api/profile')
                .send(profile)
                .set({ Authorization: token })
                .end( (err, response) => {
                  assert.equal( 'error' in response.body, true );
                  done();
                });
            });
      });
    });

    it('can handle a GET request to /profile/:username returns the correct user profile info and requires authentication', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      let profile = {
        username: 'testslayer',
        firstName: 'Eric',
        gender: 'Male'
      }
      let token;

      const eric = new User(user);
      const ericProfile = new Profile(profile);
      eric.save()
        .then( () => {
          token = TestHelper.generateTokenFromUser( eric, done );

          ericProfile.save()
            .then( () => {
              eric.profile = ericProfile;
              eric.save()
                .then( () => {
                  request(app)
                  .get('/api/profile/testslayer')
                  .set({ Authorization: token })
                  .end( (err, response) => {
                    assert.equal( response.body.data.username, profile.username );
                    assert.equal( response.body.data.gender, profile.gender );
                    done();
                  });
                });
            });
        });
    });

    it('returns an error from a GET request to /profile/:username with an invalid token', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      let profile = {
        username: 'testslayer',
        firstName: 'Eric',
        gender: 'Male'
      }
      let token;

      const eric = new User(user);
      const ericProfile = new Profile(profile);
      eric.save()
        .then( () => {
          token = 'iHax'
          ericProfile.save()
            .then( () => {
              eric.profile = ericProfile;
              eric.save()
                .then( () => {
                  request(app)
                  .get('/api/profile/testslayer')
                  .set({ Authorization: token })
                  .end( (err, response) => {
                    assert.equal( response.error.text, "Unauthorized" );
                    done();
                  });
                });
            });
        });
    });
  }); //end of 'as an authenticated user' describe block
}); //end of 'Profile Controller' describe block
