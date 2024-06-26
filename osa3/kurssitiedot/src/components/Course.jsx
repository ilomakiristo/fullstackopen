const Header = (props) => {
    console.log("in header")
    return <h2>{props.course}</h2>
  }

  const Part = (props) => {
    console.log("Part props")
    console.log(props)
    return (
      <p>{props.name} {props.excercises}</p>
    )
  }

  const Content = ({parts}) => {
    console.log("in content")
    console.log(parts)
    return (
      parts.map(part => <Part key = {part.id} name={part.name} excercises={part.exercises}/>)
    )
  }
  const Total = ({parts}) => {
    console.log("Total props")
    console.log(parts)
    const totalSum = parts.reduce((total, part) => total + part.exercises, 0)
    return (
      <p>Number of exercises {totalSum}</p>
    )
  }

  const Course = ({course}) => {
    console.log("in course")
    console.log(course.parts)
    return (
      <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </>
    )
  }

  export default Course
