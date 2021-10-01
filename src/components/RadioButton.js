import React, { useState } from 'react'


const RadioButton = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);


  const handleChange = (event) => {
      setValue(event.target.value)
      console.log(value);
      handleFilters(event.target.value)
  }

  return prices.map((p, i) => (
    <div key={i}>
      <input
        type='radio'
        className='mr-2 ml-4'
        value={`${p._id}`}
        name={p}
        onChange={(event) => handleChange(event)}
      />
      <label>{p.name}</label>
    </div>
  ))
}
    


export default RadioButton
