import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td> <td>{value}</td>
  </tr>
)

const avg = (good, neutral, bad) => {
  return (good - bad) / (good + neutral + bad)
}

const positive = (good, neutral, bad) => {
  const total = good + neutral + bad;
  const percentage = (good / total) * 100;
  return percentage + "%";
}

const AllStats = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
        <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={avg(good, neutral, bad)} />
        <StatisticLine text="positive" value={positive(good, neutral, bad)} />
        </table>
      </div>
      )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setState = (value, func) => {
    console.log(value)
    console.log(func)
    const handler = () => func(value + 1)
    return handler
  }

  return (
    <div>
      <Header text={"give feedback"}/>
      <Button handleClick={setState(good, setGood)} text="good" />
      <Button handleClick={setState(neutral, setNeutral)} text="neutral" />
      <Button handleClick={setState(bad, setBad)} text="bad" />
      <Header text={"statistics"}/>
      <AllStats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
