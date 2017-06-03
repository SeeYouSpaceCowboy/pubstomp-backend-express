const assert = require('assert')
const mongoose = require('mongoose')

const Profile = require('../../server/models/profile')

describe('Creating records', () => {

  it('saves a profile', done => {
    let form = {
      username: 'testslayer'
    }

    const profile = new Profile(form)
    profile.save()
      .then(() => {
        assert(!profile.isNew)
        done()
      })
  })

  it('requires a username', done => {
    let form = {
      firstName: 'Eric'
    }

    const profile = new Profile(form)
    profile.save()
      .then(() => {
        assert(false)
        done()
      })
      .catch( (err) => {
        assert(err.errors.username.message.indexOf('is required') >= 0)
        done()
      })
  })

})
