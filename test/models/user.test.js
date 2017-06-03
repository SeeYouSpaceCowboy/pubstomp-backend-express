const assert = require('assert')
const mongoose = require('mongoose')

const User = require('../../server/models/user')

describe('Creating records', () => {

  it('saves a user', done => {
    let user = {
      email: 'test@email.com',
      password: '123456'
    }

    const eric = new User(user)
    eric.save()
      .then(() => {
        assert(!eric.isNew)
        done()
      })
  })

  it('requires an email', done => {
    let user = {
      password: '123456'
    }

    const eric = new User(user)
    eric.save()
      .then(() => {
        assert(false)
        done()
      })
      .catch( (err) => {
        assert(err.errors.email.message.indexOf('is required') >= 0)
        done()
      })
  })

  it('requires a password', done => {
    let user = {
      email: 'test@email.com'
    }

    const eric = new User(user)
    eric.save()
      .then(() => {
        assert(false)
        done()
      })
      .catch( (err) => {
        assert(err.errors.password.message.indexOf('is required') >= 0)
        done()
      })
  })

  it('gets initialized with a timestamp (createdAt)', done => {
    let user = {
      email: 'test@email.com',
      password: '123456'
    }
    let date = Date.now()
    const eric = new User(user)
    eric.save()
      .then(() => {
        assert( eric.createdAt - date === 0 )
        done()
      })
  })

})
