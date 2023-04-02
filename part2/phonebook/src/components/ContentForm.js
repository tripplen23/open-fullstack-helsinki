import React from 'react'

const ContentForm = ({addContent, newName, handleTypeName, newNumber, handleTypeNumber}) => {
  return (
    <div>
      <form onSubmit={addContent}>
        <div>
          Name: <input value={newName} onChange={handleTypeName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleTypeNumber}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default ContentForm