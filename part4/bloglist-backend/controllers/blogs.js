const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
    .populate('user')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  try {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url, 
      likes: body.likes,
      user: user.id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    console.log(error)
    response.status(400).json({ error: 'blog not successfully made'})
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  try {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if ( blog.user.toString() === user.id.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({
        error: 'you cannot delete blogs you did not create'
      })
    }
  } catch {
    response.status(400).json({ error: 'blog not successfully deleted'})
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    user: user.id,
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote)


})

module.exports = blogsRouter