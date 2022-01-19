//Instance of complete middleware and routing system
const blogRouter = require('express').Router()

//Create blog using the models from mongoose
const Blog = require('../models/blog_schema')

//Middleware specific to this router
blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  module.exports = blogRouter