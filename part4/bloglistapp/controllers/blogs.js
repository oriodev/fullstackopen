const express = require('express')
const blogsRouter = require('express').Router()
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

blogsRouter.get('/api/blogs', (request, response) => {
Blog
    .find({})
    .then(blogs => {
    response.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (request, response) => {
const blog = new Blog(request.body)

blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
})

module.exports = blogsRouter