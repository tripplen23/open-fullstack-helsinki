require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

// Creating a new token
morgan.token('person', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json()) // json-parser
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :person'
  )
)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// TODO: Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

app.get('/', (req, res) => {
  res.send('<h1>Welcome to phonebook backend</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people.map((person) => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        // No person with the given id
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.get('/info', (req, res) => {
  Person.find({}).then((people) => {
    res.send(
      `<div>
                <span>
                    Phonebook has info for ${people.length} people
                </span>
            </div>
            <span>${new Date().toString()}</span>`
    )
  })
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  if (body.name === undefined) {
    return res.status(400).json({
      error: 'Name is missing',
    })
  }

  if (body.number === undefined) {
    return res.status(400).json({
      error: 'Number is missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON())
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { body } = req

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`)
})
