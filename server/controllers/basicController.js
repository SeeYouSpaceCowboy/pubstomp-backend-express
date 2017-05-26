const basicController = {};

basicController.get = (request, response) => {
  response.json({
    message: 'Welcome to our API.'
  })
}

module.exports = basicController
