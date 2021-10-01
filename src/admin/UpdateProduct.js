import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { isAuthenticated } from '../auth'
import Layout from '../components/Layout'
import { updateProduct,getProduct,getCategories } from './AdminApi'

const UpdateProduct = ({match}) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })

   const [categories, setCategories] = useState([])

  const {
    name,
    description,
    price,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values

  const { user, token } = isAuthenticated()

  const init = (productId) => {
     getProduct(productId).then(data => {
         if(data.error){
             setValues({...values,error:data.error})
         }
         else {
             setValues({
               ...values,
               name: data.name,
               description: data.description,
               price: data.price,
               shipping: data.shipping,
               quantity: data.quantity,
               category: data.category._id,
               formData: new FormData(),
             });

             initCategories();
         }
     })
  }

  const initCategories = () => {
    getCategories().then((data) => {
      //  console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    init(match.params.productId)
    // eslint-disable-next-line
  }, [])

  const options = () => {
    // console.log(categories.data);
    return (
      categories.data &&
      categories.data.length > 0 &&
      categories.data.map((c, i) => (
        <option key={i} value={c._id}>
          {c.name}
        </option>
      ))
    )
  }

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.append(name, value)
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //  console.log(formData);
    setValues({ ...values, loading: true, error: '' })
    updateProduct(match.params.productId,user._id, token, formData).then(
      (data) => {
        // console.log(data)
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            quantity: '',
            photo: '',
            price: '',
            category: '',
            shipping: '',
            loading: false,
            createdProduct: data.name,
          })
        }
      }
    )
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSucess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2> {createdProduct} is updated</h2>
    </div>
  )

  const showLoading = () => {
    loading && (
      <div className='alert alert-sucess'>
        <h2> loading...</h2>
      </div>
    )
  }

  const redirectUser = (redirectToProfile) => {
    if (redirectToProfile && !error) {
      return <Redirect to='/' />
    }
  }

  const newPostForm = () => {
    return (
      <form className='mb-3' onSubmit={handleSubmit}>
        <h4>Post Photo</h4>
        <div className='form-group'>
          <label className='btn btn-secondary'>
            <input
              type='file'
              accept='image/*'
              name='photo'
              onChange={handleChange('photo')}
            />
          </label>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={handleChange('name')}
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Description</label>
          <textarea
            className='form-control'
            value={description}
            onChange={handleChange('description')}
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Price</label>
          <input
            type='number'
            className='form-control'
            value={price}
            onChange={handleChange('price')}
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Category</label>
          <select
            className='form-control'
            onChange={handleChange('category')}
            value={category}
          >
            <option>Please select</option>
            {options()}
          </select>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Shipping</label>
          <select
            className='form-control'
            onChange={handleChange('shipping')}
            value={shipping}
          >
            <option>Please select</option>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Quantity</label>
          <input
            type='number'
            className='form-control'
            value={quantity}
            onChange={handleChange('quantity')}
          />
        </div>
        <button className='btn btn-outline-success'>Update Product</button>
      </form>
    )
  }

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSucess()}
          {showError()}
          {showLoading()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
