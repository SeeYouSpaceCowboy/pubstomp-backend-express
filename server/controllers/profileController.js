const db = require('./../models')

const profileController = {}

profileController.create = (request, response) => {
  const { username } = request.body

  const profile = new db.Profile({
    username
  })

  profile.save().then((newUser) => {
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

profileController.show = (request, response) => {
  const { username } = request.body

  db.User.findOne({ username })
    .then((profile) => {
      return response.status(200).json({
        data: profile
      })
    })
    .catch((err) => {
      return response.status(500).json({
        message: err
      })
    })
}

profileController.showAll = (request, response) => {
  db.User.find({})
    .then((profiles) => {
      return response.status(200).json({
        data: profiles
      })
    })
    .catch((err) => {
      return response.status(500).json({
        message: err
      })
    })
}

module.exports = profileController
