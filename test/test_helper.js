const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

before( done => {
  mongoose.connect('mongodb://localhost/pubstomp-test')
  mongoose.connection
  .once('open', () => done())
  .on('error', err => {
    console.warn('Warning', err)
  })
})

beforeEach( done => {
  // Add additional collections below and in the Promise.all array
  const { users } = mongoose.connection.collections
  Promise.all([users.drop()])
    .then(()=>done())
    .catch(()=>done())
})
