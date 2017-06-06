const assert = require('assert')
const mongoose = require('mongoose')

const User = require('../../server/models/user')
const Profile = require('../../server/models/profile')

describe('User Model', () => {

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
        assert( eric.createdAt - date < 3 )
        done()
      })
  })

  it('can link a user with a profile', done => {
    let user = {
      email: 'test@email.com',
      password: '123456'
    }
    let profile = {
      username: 'testslayer'
    }

    const eric = new User(user)
    const ericProfile = new Profile(profile)
    eric.save()
      .then(() => ericProfile.save() )
      .then(() => User.findOne({ email: user.email }) )
      .then((user) => {
        user.profile = ericProfile;
        return user.save();
       })
      .then(() => {
        User.findOne({ email: user.email })
          .populate('profile')
          .then( (user) => {
            assert( user.profile.username === profile.username )
            done()
          })
      })
  })

})
