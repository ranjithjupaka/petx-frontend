import React,{useState} from 'react'
import { Link,Redirect } from 'react-router-dom'
import ProductImage from './ProductImage'
import moment from 'moment'
import { addItem, updateItems, removeItem } from '../helpers/Cart'

const ProductCard = ({
  product,
  viewProductBtn = true,
  showAddCartbtn = true,
  updateCart = false,
  showRemovebtn = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const showStock = (quantity) => {
    //  console.log('quantity',quantity)
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock</span>
    ) : (
      <span className='badge badge-secondary badge-pill'>Out of Stock</span>
    )
  }
  const addToCart = () => {
    // console.log('added')
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const doRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  const showAddToCartbtn = (value) => {
    if (value) {
      return (
        <button
          className='btn btn-outline-warning mt-2 mb-2'
          onClick={() => addToCart()}
        >
          Add to Cart
        </button>
      )
    }
  }

  const showRemoveToCartbtn = (value) => {
    if (value) {
      return (
        <button
          className='btn btn-outline-danger mt-2 mb-2'
          onClick={() => {
            removeItem(product._id); 
            setRun(!run);
            }}
        >
          Remove to Cart
        </button>
      )
    }
  }

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value > 0) {
      // console.log(productId, event.target.value)
      updateItems(productId, event.target.value);
    }
  }

  const updateCartOptions = (updateCart) => {
    return (
      updateCart && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    )
  }

  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      {doRedirect(redirect)}
      <div className='card-body'>
        <ProductImage url='product' item={product} />
        <p className='lead mt-2'> {product.description}</p>
        <p className='black-9'>₹ {product.price}</p>
        <p className='black-8'>
          Category: {product.category && product.category.name}
        </p>
        <p className='black-8'>
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <hr />
        <Link to={`/product/${product._id}`}>
          {viewProductBtn && (
            <button className='btn btn-outline-primary mt-2 mb-2 mr-3'>
              View Product
            </button>
          )}
        </Link>
        {showAddToCartbtn(showAddCartbtn)}
        {showRemoveToCartbtn(showRemovebtn)}
        {updateCartOptions(updateCart)}
      </div>
    </div>
  )
}

export default ProductCard
