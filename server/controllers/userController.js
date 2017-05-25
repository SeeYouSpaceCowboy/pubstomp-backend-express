import db from './../models'

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

userController.show = (request, response) => {
  
}

export default userController