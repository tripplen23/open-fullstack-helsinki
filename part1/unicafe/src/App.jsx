import { useState } from 'react'

import Feedback from './components/Feedback.jsx'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  <tr>
    <th scope="row">{text}</th>
    <td>{value}</td>
  </tr>
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p>No feedback is given.</p>
  }
  return (
    <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
    </table>
  ) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good - bad) / total || 0;
  const positive = `${((good / total || 0) * 100).toFixed(3)}%`;


  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Feedback />

      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>

      <h1>Statistic</h1>

      good={good}
      <br/>
      neutral={neutral}
      <br/>
      bad={bad}
      <br/>
      all={total}
      <br/>
      average={average}
      <br/>
      positive={positive}
    </div>
  )
}

export default App
