const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server/app')

const User = mongoose.model('User')

describe('Auth Controller', () => {

  describe('/signup', () => {

    it('handles post request to /signup creates a new user and returns JWT token', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      User.count()
        .then(count => {
          request(app)
          .post('/api/signup')
          .send( user )
          .end( (err, result) => {
            User.count().then( updatedCount => {
              assert( count + 1 === updatedCount );
              assert( 'token' in result.body );
              done();
            });
          });
        });
    });

    it('handles post request to /signup and does not create a new user if email already exists and responds with error stating so', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      const testUser = new User( user );

      testUser.save()
        .then( () => {
          User.count()
          .then(count => {
            request(app)
            .post('/api/signup')
            .send(user)
            .end( (err, response) => {
              User.count().then( updatedCount => {
                assert(count ===  updatedCount);
                assert( response.body.error.indexOf('in use') >= 0 );
                done();
              });
            });
          });
        });
    });

    it('handles post request to /signup and does not create a new user if password isn\'t supplied', done => {
      let user = {
        email: 'test@email.com'
      }

      request(app)
        .post('/api/signup')
        .send(user)
        .end( (err, response) => {
          User.count()
            .then( updatedCount => {
              assert(updatedCount ===  0);
              assert( response.body.error.indexOf('You must provide email and password') >= 0 );
              done()
            });
        });
    });

    it(' handles post request to /signup and does not create a new user if email isn\'t supplied', done => {
      let user = {
        password: '123456'
      }

      request(app)
        .post('/api/signup')
        .send(user)
        .end( (err, response) => {
          User.count()
            .then( updatedCount => {
              assert(updatedCount ===  0);
              assert( response.body.error.indexOf('You must provide email and password') >= 0 );
              done();
            });
        });
    });
  });

  describe('/login', () => {

    it('handles post request with correct credentials to /user and returns JWT token', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      const testUser = new User( user );

      testUser.save()
        .then( () => {
          request(app)
            .post('/api/login')
            .send(user)
            .end( (err, response) => {
              assert( 'token' in response.body );
              done();
            });
        });
    });

    it('handles post request with wrong password to /user and returns error', done => {
      let user = {
        email: 'test@email.com',
        password: '123456'
      }

      let wrongInfo = {
        email: 'test@email.com',
        password: '1234566'
      }

      const testUser = new User( user );

      testUser.save()
        .then( () => {
          request(app)
            .post('/api/login')
            .send( wrongInfo )
            .end( (err, response) => {
              assert( !('token' in response.body) )
              done()
            });
        });
    });
  });
});
