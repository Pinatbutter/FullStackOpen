const Header = (props) => {
  console.log(props.course)
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Content = (course) => {
  return(
    <>
    <Parts part={course.part1} exercises={course.exercises1} />
    <Parts part={course.part2} exercises={course.exercises2} />
    <Parts part={course.part3} exercises={course.exercises3} />
    </>
  )
}
const Parts = (course) => {
  return(
    <>
    <p>{course.part} {course.exercises}</p>
    </>
  )
}
const Total = (exercises) => {
  return(
    <>
    <p>Number of exercises {exercises.total}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
      <Total total={part1.exercises+part2.exercises+part3.exercises} />
    </>
  )
}

export default App