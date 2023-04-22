require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

// Creating a new token
morgan.token('person', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    return null
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json()) // json-parser
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :person'
))

app.get("/", (req,res) => {
    res.send('<h1>Welcome to phonebook backend</h1>');
})

app.get("/api/persons", (req,res) => {
    Person.find({})
    .then(people => {
        res.json(people.map((person) => 
            person.toJSON()
        ))
    })
})

app.get("/api/persons/:id", (req,res) => {
    const { id } = req.params

    Person.findById(id)
    .then(person => {
        if (person) {
            res.json(person.toJSON())
        } else {
            // No person with the given id
            res.status(404).end()
        }
    })
    .catch((error) => next(error))
})

app.get("/info", (req,res) => {
    Person.find({})
    .then((people) => {
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
    const { body } = req;
    
    if (!body.name) {
        return res.status(400).json({
            error: 'Name is missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'Number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
    .then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    people = Person.filter(person => person.id !== id)
    res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})