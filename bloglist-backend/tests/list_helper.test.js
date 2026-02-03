const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '1',
      title: 'First blog',
      author: 'Alice',
      url: 'http://example.com/1',
      likes: 5,
    },
    {
      _id: '2',
      title: 'Second blog',
      author: 'Bob',
      url: 'http://example.com/2',
      likes: 12,
    },
    {
      _id: '3',
      title: 'Third blog',
      author: 'Carol',
      url: 'http://example.com/3',
      likes: 8,
    }
  ]

  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })
})