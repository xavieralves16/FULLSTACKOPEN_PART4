const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const app = express()

// MongoDB connection
const mongoUrl = `mongodb+srv://xavier:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.lbwwkqb.mongodb.net/bloglist?appName=Cluster0`
mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

// Middlewares
app.use(express.json())

// Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app