import { useState, useEffect } from 'react'
import axios from 'axios'


const Button = ({ onClick, text }) => <button onClick={onClick} type="submit"> {text} </button>;
const ShowFilteredPerson = ({p, handleFilter}) =>{
  return(
     <>
     <div>filter shown with <input onChange={handleFilter}/> </div>
     <div>{p.name} {p.number}</div>
     </>
   )
}
const NewPersonForm = ({handleName, handleNumber, onSubmitForm}) => {
  return(
    <>
      <div>name: <input onChange={handleName}/></div>
      <div>number: <input onChange={handleNumber}/></div>
      <div> <Button onClick={onSubmitForm} text={'add'} /> </div>
    </>
  )
}
const ShowPeople = ({p}) => p.map(person=><p key={person.name}>{person.name} {person.number}</p> );
const CheckExistingNames = (persons, newName) => persons.map(person=> person.name.toLowerCase() ).includes(newName.toLowerCase());

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFiltered, setPersonFiltered] = useState({ name: ' ', number: ' '})

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'notes')

  const handleNameChange  = (e) => setNewName(e.target.value)
  const handleNumberChange  = (e) => setNewNumber(e.target.value)
  const handleFilterChange  = (e) => {
    const filterIndex = (persons.map(person=> person.name.toLowerCase()).indexOf(e.target.value.toLowerCase()))
    filterIndex !== -1 ? setPersonFiltered({name: persons[filterIndex].name, number: persons[filterIndex].number } ) : setPersonFiltered({ name: ' ', number: ' '})
  }
  const handleSaveContact = (e) =>{
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if(newName !== '' && newNumber !== ''){
      if(!CheckExistingNames(persons, newName)){
        setPersons(persons.concat(nameObject))
        setNewName('')
      }
      else{
        alert(`${newName} is already added to phonebook`)
      }
    }
    else{
      alert(`Fill out name and number`)
    }
  }

  return (
    <>
      <h2> Phonebook </h2>
      <ShowFilteredPerson p = {personFiltered} handleFilter={handleFilterChange} />
      <h2> Add new contact </h2>
      <NewPersonForm handleName={handleNameChange} handleNumber={handleNumberChange} onSubmitForm={handleSaveContact} />
      <h2>Numbers</h2>
      <ShowPeople p = {persons}/>
    </>
  )
}

export default App