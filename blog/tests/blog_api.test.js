const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog_schema')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogDB.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await Promise.all(promiseArray)
        console.log('saved')
})

test('notes are returned as json', async () => {
    const response = await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogDB.length)
})

test('property id exists', async () => {
    const response = await api
    .get('/api/blog')
    
    const blogs = response.body
    
    //Checks if property 'id' is defined in blog
    expect(blogs[0].id).toBeDefined();
})

test('valid blog can be added', async() => {

    const newBlog = {

        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }

    await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd).toHaveLength(helper.initialBlogDB.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('React patterns')
})

test('blog with no likes can be added with 0', async () => {
    const blogNoLikes = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }

    await api
    .post('/api/blog')
    .send(blogNoLikes)

    const blogsAtEnd = await Blog.find({})

    const likes = blogsAtEnd.map(blog => blog.likes)

    expect(likes).toContain(0)

})

test('returns 400 with missing title and url', async () => {
    const blogNoTitleUrl = {
        author: "Michael Chan",
        likes: 7
    }

    await api
    .post('/api/blog')
    .send(blogNoTitleUrl)
    .expect(400)


})

afterAll(() => {
    mongoose.connection.close()
})