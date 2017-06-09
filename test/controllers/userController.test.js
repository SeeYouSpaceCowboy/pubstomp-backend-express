const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server/app')

const TestHelper = require('../test_helper');
const User = mongoose.model('User')

describe('User Controller', () => {

    it('handles get request to /user/:email returns email and profile', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }
      let profile = {
        username: 'testslayer'
      }

      const auth = TestHelper.createAuthenticatedUserWithProfile( user, profile )
        .then( token => {
          request(app)
          .get(`/api/user/${user.email}`)
          .set({ 'Authorization': token })
          .end( (err, response) => {
            assert.equal( user.email, response.body.user.email );
            assert.equal( profile.username, response.body.user.profile.username );
            done();
          });
        });
    });

    it('handles get request to /user returns all user\'s email and profile', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }
      let profile = {
        username: 'testslayer'
      }
      let user2 = {
        email: 'test2@email.com',
        password: '123456'
      }
      let profile2 = {
        username: 'testslayer2'
      }

      let auth = TestHelper.createAuthenticatedUserWithProfile( user, profile )
        .then( token => {
          TestHelper.createAuthenticatedUserWithProfile( user2, profile2 )
            .then( () => {
              request(app)
              .get(`/api/user`)
              .set({ 'Authorization': token })
              .end( (err, response) => {
                assert.equal( user.email, response.body.users[0].email );
                assert.equal( user2.email, response.body.users[1].email );
                assert.equal( profile.username, response.body.users[0].profile.username );
                done();
              });
            });
        });
    });
});
