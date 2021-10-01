import React from 'react'
import { api } from '../configs/api'


const ProductImage = ({item,url}) => {
    return (
      <div
        className='product-img'
       
      >
        <img
          src={`${api}/${url}/photo/${item._id}`}
          alt={item.name}
          height='200px'
          className='mb-3'
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>
    )
}

export default ProductImage
