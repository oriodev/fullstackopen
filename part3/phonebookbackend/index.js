const express = require('express')
const app = express()

// root page

app.get('/', (request, response) => {
    response.send('<h1>Hello :)</h1>')
})

// hardcoded data

let persons = [
    [
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
]

// get request for /api/persons

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// get request for /info

app.get('/info', (request, response) => {
    response.send('<p>Phonebook has info for x people</p><p>date goes here</p>')
})

// run the server

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})