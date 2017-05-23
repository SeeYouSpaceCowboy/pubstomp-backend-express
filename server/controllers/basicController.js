const basicController = {};

basicController.get = (request, response) => {
  response.json({
    message: 'Welcome to our API.'
  })
}

export default basicController
