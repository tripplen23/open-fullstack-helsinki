import React from 'react'

const Filter = ({ filterName, handleTypeFilterName }) => {
  return (
    <div>
        Filter shown with <input value={filterName} onChange={handleTypeFilterName} />
    </div>
  )
}

export default Filter