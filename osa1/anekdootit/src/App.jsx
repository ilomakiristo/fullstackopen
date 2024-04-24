import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes = ({n}) => (
  <div>has {n} votes</div>
)

const Header = ({ text }) => <h1>{text}</h1>

const BestAnecdote = ({anecdotes, points}) => {
  const bestIndex = points.indexOf(Math.max(...points));
  return (
    <div>
      {anecdotes[bestIndex]}
      <Votes n={points[bestIndex]}/>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  console.log(points)

  const vote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    const handler = () => setPoints(copy)
    return handler
  }
  return (
    <div>
      <Header text={"Anecdote of the day"}/>
      {anecdotes[selected]}
      <br/>
      <Votes n={points[selected]}/>
      <Button handleClick={vote(selected)} text="vote"/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <Header text={"Anecdote with most votes"}/>
      <BestAnecdote anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App
