import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import routes from './routes'

mongoose.connect('mongodb://localhost:27017/pubstomp', () => {
  console.log('Connected to MongoDB...')
})

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/api', routes)

export default app
