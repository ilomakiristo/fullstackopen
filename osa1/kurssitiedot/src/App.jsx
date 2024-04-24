const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  console.log("Part props")
  console.log(props)
  return (
    <p>{props.name} {props.excercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    props.parts.map(part => <Part name={part.name} excercises={part.exercises}/>)
  )
}
const Total = (props) => {
  console.log("Total props")
  console.log(props)
  let totalSum = 0
  props.parts.forEach(part => {
    totalSum += part.exercises
  })
  return (
    <p>Number of exercises {totalSum}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
        <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
