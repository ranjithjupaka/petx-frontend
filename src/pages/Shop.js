import React, { useState, useEffect } from 'react'
import { getFilteredProducts,getCategories } from '../admin/AdminApi'
import Checkbox from '../components/Checkbox'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import {prices} from '../components/Pricefilters'
import RadioButton from '../components/RadioButton'

const Shop = () => {
    const limit = 6;

    const [categories, setCategories] = useState([]);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(limit);
    const [error, setError] = useState('');
    const [filterResults, setFilterResults] = useState([])
    const [myFilters,setMyFilters] = useState({
        filters:{category:[],price:[]}
    })
   

 const init = () => {
   getCategories().then((data) => {
     //  console.log(data);
     if (data.error) {
        setError(data.error);
     } else {
       setCategories(data);
     }
   })
 }

 useEffect(() => {
   init()
   // eslint-disable-next-line
 }, [])

const filteredProducts = (newFilters) => {
   getFilteredProducts(skip,limit,newFilters)
   .then((data) => {
       console.log(data);
       if(data.error){
           setError(data.error);
           console.log(error);
       }
       else{
          setFilterResults(data.data)
          setSize(data.size);
          setSkip(0);
          console.log(size);
       }
   })
}

const loadMore = () => {
    let toSkip = skip+limit;
  getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
    // console.log(data)
    if (data.error) {
      setError(data.error)
      console.log(error)
    } else {
        console.log('size'+size);
      setFilterResults([...filterResults,...data.data]);
      setSize(data.size);
      setSkip(toSkip)
    }
  })
}

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='btn btn-warning mb-5'>
          Load more
        </button>
      )
    )
  }


const handlePrice = (value) => {
    let data = prices;
    let array = [];
    console.log(value);
    for (let key in data){
        if(data[key]._id === parseInt(value)){
            array = data[key].array;
        }
    }

    return array;
}


const handleFilters = (filters,sortBy) => {
   const newFilters = {...myFilters};
   newFilters.filters[sortBy] = filters;
    
   if(sortBy === 'price'){
     const newPrices = handlePrice(filters);
     newFilters.filters[sortBy] = newPrices;
   }

   setMyFilters(newFilters);
   filteredProducts(newFilters.filters);
   console.log(myFilters);
}

   return (
     <Layout className='container-fuild'>
       <div className='px-5'>
         <div className='row'>
           <div className='col-md-3 col-sm-4 d-flex flex-wrap col-xl-12'>
             {categories.data && categories.data.length > 0 && (
               <div className='mr-4 mb-2'>
                 <Checkbox
                   categories={categories}
                   handleFilters={(filters) =>
                     handleFilters(filters, 'category')
                   }
                 />
               </div>
             )}
             <div className=''>
               <h4>Filter by prices</h4>
               <RadioButton
                 prices={prices}
                 handleFilters={(filters) => handleFilters(filters, 'price')}
               />
             </div>
           </div>

           <div>
             <h2 className='mb-4 ml-3'>Products</h2>
             <div className='row'>
               {filterResults.map((product, i) => (
                 <div className='col-xl-3 col-md-4 col-sm-6 mb-3  mx-auto'>
                   <ProductCard key={i} product={product} />
                 </div>
               ))}
             </div>
             <hr />
             {filterResults.length > 0 && loadMoreButton()}
             {/* {size > 0 && size >= limit && (
             <button className='btn btn-warning mb-5' onClick={loadMore()}>
               Load more
             </button>
           )} */}
           </div>
         </div>
       </div>
     </Layout>
   )
}

export default Shop
