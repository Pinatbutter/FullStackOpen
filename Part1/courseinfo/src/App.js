const Header = (courses) => {
  return(
    <>
      <h1>{courses.course}</h1>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total total={exercises1+exercises2+exercises3} />
    </>
  )
}

export default App