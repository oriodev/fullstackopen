import React, { useState, useEffect } from 'react'
// import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote ))
        setNewNote('')
      })

  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // handling importance toggle button

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })

  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important === true)

  // notification component
  
  const Notification = ({ message }) => {
    if (message == null || message === '') {
      return null
    } 

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  // footer component

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
      </div>
    )
  }

  // handle login function

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }
  
// returns the main page

  return (
    <div>
      <h1>Notes</h1>

    {/* displays notification/error messages */}

      <Notification message={errorMessage} />

      {/* the login form */}

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={( {target} ) => setUsername(target.value)}
            /> 
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={( {target} ) => setPassword(target.value)}
            />
        </div>
      </form>

      {/* toggle whether all notes are shown or just important notes */}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      {/* displays all of the notes */}

      <ul>
        { notesToShow.map(
            note => <Note 
                      key={note.id} 
                      note={note}  
                      toggleImportance={() => toggleImportanceOf(note.id)}
                    /> 
        )} 
      </ul>

      {/* creates the form to add new notes */}

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>


      <Footer />
    </div>
  )
}

export default App