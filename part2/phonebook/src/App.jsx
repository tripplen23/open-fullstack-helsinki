import React from "react";
import { useState, useEffect } from "react";

import personService from './services/persons'

import {ContentForm, Person, Filter} from "./components/ComponentsOutput"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    console.log("Effect")
    personService
      .getAll()
      .then(initialPersons => {
        console.log("Promise fulfiled")  
        console.log(initialPersons)  
        setPersons(initialPersons)  
      })
  }

  useEffect(hook, [])
  
  const handleTypeName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleTypeNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleTypeFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addContent = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    console.log(existingPerson)
    const existingNumber = persons.some(person => person.number === newNumber)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedNumber = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Failed to update ${existingPerson.name}'s number.`)
          })
      }
    }
    else if (existingNumber) {
      alert (`${newNumber} is already in the list`)
    }
    else {
      const contentObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(contentObject)
        .then(returnedContent => {
          setPersons(persons.concat(returnedContent))  
          setNewName('') 
          setNewNumber(newNumber)
        })
    }
  }
  console.log(persons)

  const filterPersonName = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  const handleDeletionOf = (person) => {
    console.log('deletion')
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterName={filterName} handleTypeFilterName={handleTypeFilterName}/>
      <h2>Add a new</h2>
        <div className="content__form">
          <ContentForm
            addContent={addContent}
            newName={newName}
            handleTypeName={handleTypeName}
            newNumber={newNumber}
            handleTypeNumber={handleTypeNumber}
          />
        </div>
      <h2>Numbers</h2>
        <div>
          {filterPersonName.map((person, index) => {
            return <Person 
              key={index}
              person={person}
              handleDelete={() => handleDeletionOf(person)}
            />
          })}
        </div>
      ...
    </div>
  )
}

export default App