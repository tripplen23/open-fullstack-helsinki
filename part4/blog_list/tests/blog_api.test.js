const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blogs')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Get all blogs in the database', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('Unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('Create a new blog into the database', async () => {
  const newBlog = {
    _id: '644b46cd041cc4325aea2723',
    title: 'Python is amazing',
    author: 'Binh Nguyen',
    url: 'https://github.com',
    likes: 9,
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'Python is amazing'
  )
})

test('Create a blog with the default like as 0 (not include likes in the request', async () => {
  const newBlog = {
    _id: '644b46cd041cc4325aea2720',
    title: 'Java is lengendary',
    author: 'Binh Nguyen',
    url: 'https://github.com',
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'Java is lengendary'
  )

  const likesOfAddedBlog = blogsAtEnd[helper.initialBlogs.length]
  expect(likesOfAddedBlog.likes).toBe(0)
})

test ('blog schema without URL is not added', async () => {
  const newBlog = {
    _id: '644b46cd041cc4325aea2719',
    title: 'C++ is fascinating',
    author: 'Binh Nguyen',
    __v: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
