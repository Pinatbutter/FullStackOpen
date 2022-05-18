// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>');
//     process.exit(1)
// }
// else if(process.argv.length === 4 || process.argv.length > 5){
//     console.log('Please provide appropriate number of fields');
//     process.exit(1)
// }

// const password = process.argv[2]
// const url = `mongodb+srv://dpina:${password}@cluster0.z19td.mongodb.net/PhoneBook?retryWrites=true&w=majority`

// mongoose.connect(url)

// const contactSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })

// const Person = mongoose.model('Person', contactSchema)

// if (process.argv.length === 5){
//     let newName =   process.argv[3];
//     let newNumber = process.argv[4];

//     const person = new Person({
//         name: newName,
//         number: newNumber
//     })

//     person.save().then(result => {
//         console.log(`added ${newName}, number: ${newNumber} to phonebook`)
//         mongoose.connection.close()
//     })
// }
// else{
//     Person.find({}).then(result => {
//         console.log('phonebook:')
//         result.forEach(person => {
//           console.log(person.name, person.number)
//         })
//         mongoose.connection.close()
//       })
// }