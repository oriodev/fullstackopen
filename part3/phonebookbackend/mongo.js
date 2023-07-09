const mongoose = require('mongoose');

// arguments from cl

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// connecting to cloud db

const url = `mongodb+srv://oriodev:${password}@cluster0.2plguuc.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// schema

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length > 3) {

    const note = new Note({
        name: name,
        number: number,
    })

    note.save().then(result => {
        console.log('note saved')
        mongoose.connection.close()
    })

    console.log(`added ${name} number ${number} to phonebook`)

}

if (process.argv.length === 3) {
    console.log('phonebook:')
    Note.find().then(result => {
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)
            mongoose.connection.close()
        })
    })
}