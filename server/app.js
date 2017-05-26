const express =require('express')
const mongoose =require('mongoose')
const bodyParser =require('body-parser')

const routes =require('./routes')

if ( process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/pubstomp', () => {
    console.log('Connected to MongoDB...')
  })
  .then( () => true )
  .catch( (err) => { console.log(err) })
}

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/api', routes)

app.use( (err, req, res, next) => {
  console.log(err.message)
  res.status(422).send({error: err.message})
})

module.exports = app
