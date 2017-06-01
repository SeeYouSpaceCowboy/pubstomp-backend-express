const express = require('express');
const Router = express.Router()
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

if ( process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/pubstomp', () => {
    console.log('Connected to MongoDB...')
  })
  .then( () => true )
  .catch( (err) => { console.log(err) })
}

const app = express()

// app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

routes(app)

app.use( (err, req, res, next) => {
  console.log(err.message)
  res.status(422).send({error: err.message})
})

module.exports = app
