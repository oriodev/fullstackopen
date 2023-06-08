import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'

const App = () => {

  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState({})

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      console.log('promise fufilled')
      setAllCountries(response.data)
    })
  }, [])

  useEffect(() => {
    console.log('effect run, country is now ', filter)

    if (filter) {
      console.log('fetching country data...')
    }

  }, [filter])

  return (
    <div>
      <Filter setFilter={setFilter} filter={filter}/>
    </div>
  )
}

export default App