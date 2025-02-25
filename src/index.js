import Express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// init dotenv
dotenv.config()

// import routes
import { publicRoutes } from './routes/public/publicRoutes.js'
import { privateRoutes } from './routes/private/privateRoutes.js'

const app = Express()
const PORT = process.env.PORT || 5000
const mongodbURI = `mongodb+srv://${process.env.USER}:${process.env.MONGODB_PASSWORD}@netjobs.jglqn.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
const mongodbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// body parser
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())

app.use('/public', publicRoutes)
app.use('/private', privateRoutes)

mongoose.connect(mongodbURI, mongodbConfig, () => {
  console.log('connected to db')
  app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
})