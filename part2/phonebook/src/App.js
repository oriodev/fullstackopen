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

    if (handleSameName()) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

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