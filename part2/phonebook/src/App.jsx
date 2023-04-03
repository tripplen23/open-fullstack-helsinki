import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import {ContentForm, Person, Filter} from "./components/ComponentsOutput"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {
    console.log("Effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("Promise fulfiled")  
        console.log(response.data)  
        setPersons(response.data)  
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
    const existPerson = persons.some(person => person.name === newName)
    const existNumber = persons.some(person => person.number === newNumber)

    if (existPerson) {
      alert (`${newName} is already in the list`)
    }
    else if (existNumber) {
      alert (`${newNumber} is already in the list`)
    }
    else {
      const contentObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(contentObject))  
      setNewName('') 
      setNewNumber(newNumber)
    }
  }
  console.log(persons)

  const filterPersonName = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )

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
            return <Person key={index} person={person}/>
          })}
        </div>
      ...
    </div>
  )
}

export default App