const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

commentsRouter.get('/:id/comments', async (request, response) => {
  const { id } = request.params
  const commentsInBlog = await Blog.findById(id).populate('comments')
  response.json(commentsInBlog)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request
  console.log('comment body on backend ', { body })

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // TODO: Checking the validity of the token
  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const comment = new Comment({
    comment: body.comment,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment.toJSON())
})

module.exports = commentsRouter
