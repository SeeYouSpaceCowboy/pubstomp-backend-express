import db from './../models'

const userController = {}

userController.create = (request, response) => {
  const { username, password } = request.body

  //Validation

  const user = new db.User({
    username,
    password
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

export default userController
