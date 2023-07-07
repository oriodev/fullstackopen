const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

// middleware
app.use(express.json())
app.use(morgan('tiny :body'))


// random id generator function

const generateId = () => {
    return Math.floor(Math.random() * 5000)
}

// root page

app.get('/', (request, response) => {
    response.send('<h1>Hello :)</h1>')
})

// hardcoded data

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

// get request for /api/persons

app.get('/api/persons',  (request, response) => {
    response.json(persons)
})

// get request for /api/persons/:id

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// get request for /info

app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${people} people</p><p>${date}</p>`)
})

// delete request for /api/persons/:id

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

// post request for new entries to /api/persons

app.post('/api/persons', morgan(), (request, response) => {
    const body = request.body
    console.log(body)
    console.log('doing a thing')

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    // if (persons.map(name => body.name === name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const id = generateId()

    const person = {
        "id": id,
        "name": body.name,
        "number": body.number
    }
    
    persons = persons.concat(person)

    console.log(person)
    response.json(person)

})

// run the server

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})