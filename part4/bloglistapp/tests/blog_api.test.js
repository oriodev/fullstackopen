const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// reset the database after each test

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

// verify that GET api call returns correct number of blogs

describe('where there are initial blogs', () => {

  test('all blogs are returned', async () => {
    const response = await helper.blogsInDB()
    expect(response).toHaveLength(helper.initialBlogs.length)
  })

  // verify that the unique identifer property of the blog posts is named id

  test('all blogs have id property not _id property', async () => {
    const response = await helper.blogsInDB()
    const id = response[0].id
    expect(id).toBeDefined()
  })

})

describe('the addition of a new blog', () => {

  // verify that post requests can be made

  test('a valid blog can be added', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fd",
        title: "Test Post",
        author: "Michael Ranger",
        url: "https://testpost.com/",
        likes: 37,
        __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(t => t.title)
    expect(titles).toContain(
      'Test Post'
    )

  })

  // verify that if the likes property is missing from a blog post, it defaults to zero

  test('missing likes defaults to 0', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fd",
      title: "Test Post",
      author: "Michael Ranger",
      url: "https://testpost.com/",
      __v: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(lastBlog.likes).toEqual(0)

  })

  // verify that a blog cannot be made without a title or url property

  test('blog cannot be made without title or url', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fd",
      author: "Michael Ranger",
      __v: 0
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('updating the likes of a blog post works', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]

    const blog = {
      id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 20
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd[0].likes).toEqual(20)

  })
})



afterAll(async () => {
  await mongoose.connection.close()
})