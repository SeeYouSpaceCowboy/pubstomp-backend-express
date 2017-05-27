const db  = require('./../models')

const userController = {}

userController.create = (request, response) => {
  const { email, gamerid, password, name } = request.body

  //Validation

  const user = new db.User({
    email,
    gamerid,
    password,
    name
  })

  user.save().then((newUser) => {
    response.status(200).json({
      success: true,
      data: newUser
    })
  }).catch((err) => {
    response.status(500).json({
      message: err
    })
  })
}

userController.login = (request, response) => {
  const { email } = request.body

  db.User.findOne({ email: email }).then((user) => {
    return response.status(200).json({
      success: true,
      data: user
    })
  }).catch((err) => {
    return response.status(500).json({
      message: err
    })
  })
}

userController.showAll = (request, response) => {
  db.User.find({}).then((users) => {
    return response.status(200).json({
      success: true,
      data: users
    })
  }).catch((err) => {
    return response.status(500).json({
      message: err
    })
  })
}

userController.show = (request, response) => {
  const { email } = request.body

  db.User.findOne({ email }).then((user) => {
    return response.status(200).json({
      success: true,
      data: user
    })
  }).catch((err) => {
    return response.status(500).json({
      message: err
    })
  })
}

module.exports = userController
