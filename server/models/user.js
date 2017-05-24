import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Username must be 3 characters or more']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be 6 characters or more']
  }
})

//Encryptions for Password

const User = mongoose.model('User', userSchema)

export default User
