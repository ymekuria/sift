import React from 'react'


const Input = ({
  onSubmit
}) => {
  return (
    <input onKeyUp={(e) => onSubmit(e)} type="text"/>
  )
}

export default Input
