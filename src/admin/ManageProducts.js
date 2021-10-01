import React, { useState, useEffect } from 'react'
import { getAllProducts,deleteProduct} from './AdminApi'
import Layout from '../components/Layout'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user,token } = isAuthenticated();

  const loadProducts = () => {
    getAllProducts().then(data => {
      console.log(data);
      if(data.error){
        console.log(data.error)
      }
      else{
        setProducts(data);
      }
    })
  }

  const destroyProduct = (productId) => {
    deleteProduct(productId,user._id,token).then(data => {
      if(data.error){
        console.log(data.error)
      }
      else{
        loadProducts();
      }
    })
  }

  useEffect(() => {
    loadProducts();
 }, [])

    return (
      <Layout className='container-fuild'>
       <div className="row">
           <div className="col-12">
             <ui className="list-group">
             <h2 className='text-center'>Total Products {products.length}</h2>
             <hr/>
             {products.map((p,i) => {
               return (
                 <li
                   key={i}
                   className='list-group-item d-flex align-items-center justify-content-between'
                 >
                   <strong>{p.name}</strong>
                   <div >
                     <Link to={`/admin/product/update/${p._id}`}>
                       <span className='badge badge-warning badge-pill mr-4'>
                         Update
                       </span>
                     </Link>
                     <button className='badge badge-danger badge-pill' onClick={() => destroyProduct(p._id)}>
                       Delete
                     </button>
                   </div>
                 </li>
               )
             })}
             </ui>
           </div>
       </div>
      </Layout>
    )
}

export default ManageProducts
