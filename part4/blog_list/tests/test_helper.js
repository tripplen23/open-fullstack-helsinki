const Blog = require('../models/blogs')

const initialBlogs = [
  {
    _id: '644b46cd041cc4325aea2729',
    title: 'Javascript is fun',
    author: 'Binh Nguyen',
    url: 'https://github.com',
    likes: 2,
    __v: 0,
  },
  {
    _id: '644b46cd041cc4325aea2726',
    title: 'Golang is amazing',
    author: 'Binh Nguyen',
    url: 'https://github.com',
    likes: 5,
    __v: 0,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
