require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))

// middleware
app.use(express.json())
app.use(morgan('tiny :body'))

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
}

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
    ]

// get request for /api/persons

app.get('/api/persons',  (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
      })
})

// get request for /api/persons/:id

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// get request for /info

app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${people} people</p><p>${date}</p>`)
})

// delete request for /api/persons/:id

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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

    const id = generateId()

    const person = new Person ({
        id: id,
        name: body.name,
        number: body.number
      })
    
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })

})

// update user's phonenumber

app.put(`/api/persons/:id`, (request, response, next) => {

    const body = request.body

    const person = {
        id: body.id,
        name: body.name,
        number: body.number
    }

   Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// run the server

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})