import React, { useState } from 'react'
import Layout from '../components/Layout'
import { authenticate, isAuthenticated, signin } from '../auth'
import { Redirect } from 'react-router'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    doRedirect: false,
  })

  const { email, password, error, loading, doRedirect } = values

  const {user} = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password })
    .then((data) => {
      console.log(data)
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        })
      } else {
        authenticate(data,() => {
           setValues({
             ...values,
             doRedirect: true,
           })
        })
      }
    })
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showLoading = () => (
    loading && (<div className='alert alert-info'>
      <h2>Loading....</h2>
    </div>)
  );

  const redirectUser = () => {
    if(doRedirect)
    {
      if(user && user.role === 1)
      {
        return <Redirect to='/admin/dashboard'/>
      }
      else {
        return <Redirect to='/user/dashboard' />
      }
    }

    if(isAuthenticated())
    {
      return <Redirect to='/' />
    }
  }

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          value={email}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          value={password}
          className='form-control'
        />
      </div>
      <button
        className='btn btn-primary'
        type='submit'
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </form>
  )
  return (
    <Layout className='container col-md-8 offset-md-2'>
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  )
}

export default Signin