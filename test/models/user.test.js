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
        let errorMsg = {
          path: 'email',
          name: 'ValidatorError'
        }
        assert(err.errors.email.path === errorMsg.path)
        assert(err.errors.email.name === errorMsg.name)
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
        let errorMsg = {
          path: 'password',
          name: 'ValidatorError'
        }
        assert(err.errors.password.path === errorMsg.path)
        assert(err.errors.password.name === errorMsg.name)
        done()
      })
  })

})
