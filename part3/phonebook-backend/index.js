const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get("/", (req,res) => {
    res.send('<h1>Welcome to phonebook backend</h1>');
})

app.get("/api/persons", (req,res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person =>
        person.id === id
    )

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get("/info", (req,res) => {
    const numberOfPeople = persons.length
    const now = new Date()
    console.log(now)
    res.send(`Phonebook has info for ${numberOfPeople} people </br> ${now}`)
})

const generateId = () => {
    const newId = persons.length > 0
        ? Math.floor(Math.random() * (persons.length * 1000))
        : 0
    return newId  
}

app.post('/api/persons', (req, res) => {
    const body = req.body;
    
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

    const nameExists = persons.find(person =>
        person.name === body.name
    )
    if (nameExists) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }


    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    console.log("Person added is ", person )

    res.json(person)
})

app.delete("/api/persons/:id", (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})