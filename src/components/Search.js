import React, { useState, useEffect } from 'react'
import { getCategories, list } from '../admin/AdminApi'
import ProductCard from '../components/ProductCard'

const Search = () => {
  const [data, setData] = useState({
      categories:[],
      category:'',
      search:'',
      searched:false,
      results:[]
  })

const { categories, category, search, searched, results } = data;

const loadCategories = () => {
    getCategories()
    .then((data) => {
        if(data.error){
          console.log(data.error);
        }
        else{
            setData({...data,categories:data})
        }
    })
}

useEffect(() => {
   loadCategories();
}, [])

const searchData = () => {
  if(search){
    list({search:search || undefined,category:category})
    .then(response => {
      if(response.error){
        console.log(response.error);
      }
      else{
        setData({...data,results:response,searched:true})
      }
    })
  }
  
}

const handleSubmit = (e) => {
  e.preventDefault();
  searchData();
}

const handleChange = (name) => event => {
   setData({...data,[name]:event.target.value,searched:false});
}

const searchResultMsg = (searched, results) => {
  if (searched){
if (results.length > 0) {
  return `${results.length} Products Found`
} else {
  return 'No Products Found'
}
  }
}

const searchedProducts = (results = []) => {
  return (
    <div>
      <h2 className='mt-2 mb-2 ml-5'>{searchResultMsg(searched, results)}</h2>
      <div className='row'>
        {results.map((product, i) => (
          <div className='col-4 mb-3 ml-5 '>
            <ProductCard key={i} product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

const searchForm = () => (
  <form onSubmit={e => handleSubmit(e)}>
    <span className='input-group-text'>
      <div className='input-group input-group-lg'>
        <div className='input-group-prepend'>
          <select className='btn  mr-4' onChange={handleChange('category')}>
            <option value='All'>Pick a Category</option>
            {categories.data &&
              categories.data.length > 0 &&
              categories.data.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <input
          type='search'
          className='form-control'
          onChange={handleChange('search')}
          placeholder='Search by Name'
        />
      </div>
      <div className='btn input-group-append'>
        <button className='input-group-text' style={{border:'2px solid white'}}>Search</button>
      </div>
    </span>
  </form>
)
  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3 '>{searchedProducts(results)}</div>
    </div>
  )
}

export default Search
