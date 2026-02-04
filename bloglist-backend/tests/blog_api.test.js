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


after(async () => {
  await mongoose.connection.close()
})