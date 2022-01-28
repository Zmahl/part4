//Instance of complete middleware and routing system
const blogRouter = require('express').Router()

//Create blog using the models from mongoose
const Blog = require('../models/blog_schema')

//Middleware specific to this router
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
  })
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    console.log(blog, blog.url)

    if (blog.url == undefined && blog.title == undefined){
      response.status(400).send({ error: "400 Bad Request" })
    }
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  module.exports = blogRouter