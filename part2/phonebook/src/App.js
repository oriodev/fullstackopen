import React, { useEffect, useState } from 'react'
import handleEntries from './services/handleEntries'

import Filter from './components/Filter'
import EntryForm from './components/EntryForm'
import DisplayEntries from './components/DisplayEntries'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState('')

  const hook = () => {
    handleEntries
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addEntry = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (handleSameName()) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`)) {
        const id = getIdFromName()
        handleEntries
          .update(id, nameObject)
          .then(updatedNote => {
            setPersons(persons.map( p => {
              let returnPerson = p
              if (p.id === id) returnPerson.number = newNumber
              return(returnPerson)
            }))
            setMessage(`${newName}'s number was updated.`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch( error => {
              setMessage(`${newName} was already deleted from the server.`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(n => n.id !== id))
            }
          )
      }

    } else {

      handleEntries
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(
            `${newName} was added to the phonebook.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSameName = () => {  
    return persons.some(person => person.name === newName)
  }

  const getIdFromName = () => {
    const person = persons.find(person => person.name === newName)
    return person.id
  }

  const entriesToShow = persons.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))

  // delete entry

  const deleteEntry = (id) => {

    if (window.confirm(`Delete item number ${id} ?`)) {
      handleEntries
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // error message display

  const Notification = ({ message }) => {

    const messageStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (message == null) {
      return null
    }

    return (
      <div className='notification' style={messageStyle}>
        {message}
      </div>
    )
  }

  // application display

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={filter} setFilter={setFilter}/>

      <EntryForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
        addEntry={addEntry}
      />

      <h2>Numbers</h2>

      <DisplayEntries entriesToShow={entriesToShow} deleteEntry={deleteEntry}/>

    </div>
  )

}

export default App;