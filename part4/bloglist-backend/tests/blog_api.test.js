const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')

const globals = {}

// reset the database after each test

beforeEach(async () => {

  // sets up the user database
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  allUsers = await helper.usersInDb()
  
  const mainUser = {
    username: allUsers[0].username,
    id: allUsers[0].id
  }

  const token = jwt.sign(mainUser, process.env.SECRET)

  globals.token = `Bearer ${token}`
  globals.mainUser = mainUser

  // sets up the blog database

  allBlogs = helper.initialBlogs.map((blog => {
    blog.user = globals.mainUser.id.toString()
    return blog
  }))

  await Blog.deleteMany({})
  await Blog.insertMany(allBlogs)

  globals.allBlogs = await helper.blogsInDB()
  
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
      _id: '5a422bc61b54a676234d17fd',
      title: 'Test Post',
      author: 'Michael Ranger',
      url: 'https://testpost.com/',
      likes: 37,
      user: globals.mainUser.id,
      __v: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
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
      _id: '5a422bc61b54a676234d17fd',
      title: 'Test Post',
      author: 'Michael Ranger',
      url: 'https://testpost.com/',
      user: globals.mainUser.id,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
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
      _id: '5a422bc61b54a676234d17fd',
      author: 'Michael Ranger',
      user: '64b2cd054ca9eec8e72827cb',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YWZkY2Y0MTRmMDhkOGI0MDg5MjA4ZSIsImlhdCI6MTY4OTUwMTg2MH0.PRSwpncsWf0VTpAzKu-Zy_GycUR2iL1piVkAHbtWnd8')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogToDelete = globals.allBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', globals.token)
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
      id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
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


describe('when there is initially one user in db', () => {
  
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('adding new users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('fails when username and password are less than or equal to 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'Matti Luukkainen',
      password: 'sal',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })

})


afterAll(async () => {
  await mongoose.connection.close()
})