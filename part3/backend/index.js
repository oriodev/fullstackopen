// import express module

const express = require('express')
const app = express()

// import cors

const cors = require('cors')
app.use(cors())

// import static

app.use(express.static('build'))

// active json-parser

app.use(express.json())

// make our own middleware

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }

// app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
//   }
  
//   app.use(unknownEndpoint)

// hardcoded notes json

let notes = [  
    {    
        id: 1,    
        content: "HTML is easy",    
        important: true  
    },  
    {   id: 2,    
        content: "Browser can execute only JavaScript",    
        important: false  
    },  
    {   id: 3,    
        content: "GET and POST are the most important methods of HTTP protocol",    
        important: true  
    }
]

// generate an id number

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

// gets basic data for the root page 

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// gets the json notes data

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// gets the specific json note by id

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note =>  note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

})

// deletes notes from json data
// tested using postman

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

// posts new notes to the json data
// .body is done with the json parser

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()

    }

    notes = notes.concat(note)

    console.log(note)
    response.json(note)
})

// runs the server

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})