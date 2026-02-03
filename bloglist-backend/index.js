const express = require('express')
const mongoose = require('mongoose')

const app = express()

const mongoUrl =
  `mongodb+srv://xavier:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.lbwwkqb.mongodb.net/bloglist?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})