const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Alice',
    url: 'http://example.com/1',
    likes: 5
  },
  {
    title: 'Second blog',
    author: 'Bob',
    url: 'http://example.com/2',
    likes: 3
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})


test('blogs are returned as JSON and the correct amount', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const blog = response.body[0]

  assert(blog.id)
  assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/Await in Node.js',
    author: 'Xavier Alves',
    url: 'https://example.com/async-await',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  const titles = response.body.map(b => b.title)
  assert(titles.includes('Async/Await in Node.js'))
})


after(async () => {
  await mongoose.connection.close()
})