const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose

mongoose.Promise = global.Promise

const ProfileSchema = require('./profile');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be 6 characters or more']
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type : Date,
    default: Date.now
  }
})

//Encryptions for Password
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema)

module.exports = User
