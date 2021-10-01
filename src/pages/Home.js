import React, { useState,useEffect } from 'react'
import { getProducts } from '../admin/AdminApi';
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';


const Home = () => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [productsBySell, setProductsBySell] = useState([]);
    const [error, setError] = useState('');

    const loadProductsBySell = () => {
        getProducts('sold')
        .then(data => {
            if(data.error)
            {
               setError(data.error)
               console.log(error);
            }
            else{
               setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
      getProducts('createdAt').then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setProductsByArrival(data)
        }
      })
    }

 useEffect(() => {
   loadProductsByArrival()
   loadProductsBySell()
   // eslint-disable-next-line
 }, [])

    return (
      <Layout className='container-fuild'>
        <Search />
        <h2 className='mb-4 ml-5'>New arrivals</h2>
        <div className='row'>
          {productsByArrival.map((product, i) => (
            <div className='col-3 mb-3 ml-5'>
              <ProductCard key={i} product={product} />
            </div>
          ))}
        </div>
        <h2 className='mb-4 ml-5'>Best sellers</h2>
        <div className='row '>
          {productsBySell.map((product, i) => (
            <div className='col-3 mb-3 ml-5'>
              <ProductCard key={i} product={product} />
            </div>
          ))}
        </div>
      </Layout>
    )
}

export default Home
