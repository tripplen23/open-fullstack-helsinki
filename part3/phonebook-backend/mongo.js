const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Give password as argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://binhnguyen:${password}@cluster-phone-book.tymwfcx.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // If only password is provided, print all persons in phonebook
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // If name and number are provided, add new person to phonebook
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid arguments')
  process.exit(1)
}
