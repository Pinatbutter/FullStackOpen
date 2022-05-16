const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const baseUrl = '/api/persons';


morgan.token('newData', function (req) { return req.blah })

app.use(cors())
app.use(express.static('build'));
app.use(express.json())
app.use(displayNewData)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :newData'));

function displayNewData (req, res, next) {
  Object.keys(req.body).length === 0 ? req.newData = ("") : req.newData = JSON.stringify(req.body)
  next()
}
const CheckExistingNames = (persons, newName) => persons.map(person=> person.name.toLowerCase() ).indexOf(newName.toLowerCase());

let persons = [
  { "id": 1, "name": "Arto Hellas", "number": "040-123456"},
  { "id": 2, "name": "Ada Lovelace", "number": "39-44-5323523"},
  { "id": 3, "name": "Dan Abramov", "number": "12-43-234345"},
  { "id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122"}
]

app.get('/info', (request,response) =>{
  const display = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  response.send(display)
})
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post(baseUrl, (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  let existingNames =CheckExistingNames(persons, body.name)
  if(existingNames!==-1){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  body.id = generateId();
  const person = {
    id: body.id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.send(person)
})

app.get(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.json("No person found")
  }
})
app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
app.get(baseUrl, (request, response) => {
  response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)