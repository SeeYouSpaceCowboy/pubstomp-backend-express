const mongoose  = require('mongoose')
const bcrypt    = require('bcrypt')

const { Schema } = mongoose

mongoose.Promise = global.Promise

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be 6 characters or more']
  },
  gamerid: {
    type: String,
    required: false,
    minlength: [3, 'GamerID must be 3 characters or more']
  },
  name: {
    type: String
  }
})

userSchema.pre('save', function(next) {
  var user = this
  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) next(err)

      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) next(err)

        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

userSchema.methods.comparePassword = (passw, cb) => {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if(err) cb(err)

    cb(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User
