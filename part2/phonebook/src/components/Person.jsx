import React from 'react'

const Person = ({ person }) => {
  return (
    <p>
      {person.id}. {person.name} {person.number}
    </p>
  )
}

export default Person