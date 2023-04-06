import React from 'react'
import '../index.css'
const Notification = ({ message }) => {
  if (message === null){
    return null
  }

  const className = message.includes("add")
    ? "noti__add"
    : "noti__delete"


  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification