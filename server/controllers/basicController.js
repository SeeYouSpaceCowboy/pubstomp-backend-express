const basicController = {};

basicController.get = (request, response) => {
  response.json({
    message: 'Welcome to our API. See docs at https://github.com/SeeYouSpaceCowboy/pubstomp-backend-express/blob/master/README.md for details on how to work with our API.'
  })
}

module.exports = basicController
