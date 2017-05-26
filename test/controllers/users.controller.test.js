const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server/app')

const User = mongoose.model('User')

describe('Users Controller', () => {

  it('Post request to /signup creates a new user', done => {
    let user = {
      email: 'test@email.com',
      password: '123456'
    }

    User.count()
      .then(count => {
        request(app)
        .post('/api/signup')
        .send(user)
        .end(() => {
          User.count().then(newCount => {
            assert(count + 1 === newCount)
            done()
          })
        });
      })
  })

  it('Get request to /user returns the correct user info', done => {
    let user = {
      email: 'test@email.com',
      password: '123456'
    }

    const eric = new User(user)
    eric.save()
      .then(() => {
        request(app)
        .get('/api/login')
        .send(user)
        .end( (err, result) => {
          assert.equal(result.body.data.email, 'test@email.com');
          done();
        });
      })
  })

  xit('Get request with wrong password to /user returns error', done => {
    let user = {
      email: 'test@email.com',
      password: '123456'
    }

    User.count()
      .then(count => {
        request(app)
        .post('/api/signup')
        .send(user)
        .end(() => {
          User.count().then(newCount => {
            assert(count + 1 === newCount)
            done()
          })
        });
      })
  })

})
