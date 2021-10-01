import React, { useState, useEffect } from 'react'
import { readProduct,realatedList } from '../admin/AdminApi'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'


const Product = (props) => {
 const [product, setProduct] = useState({})
 const [relatedProduct, setRelatedProduct] = useState([])
 const [error,setError] = useState('')

 
 const loadProduct = (productId) => {
   readProduct(productId)
   .then(data => {
       if(data.error){
           setError(data.error);
           console.log(error);
       }
       else{
           setProduct(data);
           realatedList(data._id)
           .then(data => {
               if(data.error){
                     setError(data.error)
                     console.log(error)
               }
               else {
                     setRelatedProduct(data)
               }
           })
       }
   })
 }


 useEffect(() => {
   const productId = props.match.params.productId
   loadProduct(productId)
   // eslint-disable-next-line
 }, [props])



  return (
    <Layout className='container-fuild'>
      <div className='row '>
        <div className='col-xl-5 col-md-4 col-sm-5 col-10 ml-5'>
          {product && <ProductCard product={product} viewProductBtn={false} />}
        </div>
        <div className='col-6'>
          <h4 className='mb-3 mt-2 ml-5'>Related Products</h4>
          {relatedProduct.map((p, i) => (
            <div
              className='col-xl-8 col-md-8 col-sm-6 ml-5 mt-3 mb-3'
              style={{ minWidth: '250px' }}
            >
              <ProductCard product={p} key={i} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Product
