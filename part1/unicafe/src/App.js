import { useState } from 'react'

// BUTTON AND DISPLAY FUNCTIONS

const Button = ( { label, f } ) => ( <button onClick={f}> { label } </button> )
const StatisticLine = ( { label, result } ) => (<tr><td>{ label }</td><td>{ result }</td></tr>)

const Statistics = ( { good, neutral, bad } ) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all * 100) + "%"

  if (all === 0) {
    return (
      <div>press some buttons</div>
    )
  } else {
    console.log()
    return (
      <table>
        <tbody>
          <StatisticLine label="good" result={good} />
          <StatisticLine label="neutral" result={neutral} />
          <StatisticLine label="bad" result={bad} />
          <StatisticLine label="all" result={all} />
          <StatisticLine label="average" result={average} />
          <StatisticLine label="positive" result={positive} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  // HANDLE BUTTON CLICKS

  const increaseGood = () => setGood(good + 1) 
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <Button label="good" f={increaseGood}/>
      <Button label="neutral" f={increaseNeutral}/>
      <Button label="bad" f={increaseBad}/>

      <h1>STATISTICS</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )

}

export default App;