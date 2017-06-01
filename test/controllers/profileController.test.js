const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../server/app')

const User = mongoose.model('User')

describe('Profile Controller', () => {

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
      .end( (err, result) => {
        assert.equal(result.body.data.username, 'test');
        done();
      });
    })

  })
})
