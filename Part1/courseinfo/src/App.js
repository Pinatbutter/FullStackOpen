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
    <p>{course.part1} {course.exercises1}</p>
    <p>{course.part2} {course.exercises2}</p>
    <p>{course.part3} {course.exercises3}</p>
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