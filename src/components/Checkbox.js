import React, {useState} from 'react'

const Checkbox = ({categories,handleFilters}) => {
     const [checked, setChecked] = useState([])

    const handleChange = c => () => {
        
        const currentCatId = checked.indexOf(c);
        const newCheckedCatId = [...checked];
         
        if(currentCatId === -1){
            newCheckedCatId.push(c);
        }
        else{
            newCheckedCatId.splice(currentCatId, 1)
        }
        // console.log(newCheckedCatId);
        setChecked(newCheckedCatId);
        handleFilters(newCheckedCatId);


    }





    return (
      <ui>
        <h4>Filter by Categories</h4>
        {categories.data.map((cat, i) => (
          <li key={i} className="ml-3">
            <input
              type='checkbox'
              className='form-check-input'
              onChange={handleChange(cat._id)}
              value={checked.indexOf(cat._id) !== -1}
            />
            <label  className='form-check-label'>
              {cat.name}
            </label>
          </li>
        ))}
      </ui>
    )
}

export default Checkbox
