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
          })
      }

    } else {

      handleEntries
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
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

  // DELETE ENTRY

  const deleteEntry = (id) => {

    if (window.confirm(`Delete item number ${id} ?`)) {
      handleEntries
        .remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

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