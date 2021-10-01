import React, { useState } from 'react'
import Layout from '../components/Layout';
import { signup } from '../auth';


const Signup = () => {
    const [values, setValues] = useState({
      name:'',
      email: '',
      password: '',
      error: '',
      sucess: false,
    })

  const { name,email, password, sucess, error } = values

   const handleChange =
     (name) => (event) => {
       setValues({ ...values, error: false, [name]: event.target.value })
     }


const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false })
    signup({name,email,password})
    .then((data) => {
      console.log(data);
      if(data.errors)
      {
        setValues({
          ...values,
          error: data.errors.errors[0].msg,
          success: false,
        })
      }
      else
      {
         setValues({
           ...values,
           name: '',
           email: '',
           password: '',
           error: '',
           sucess: true,
         })
         console.log(sucess);
      }
    })
}

const showError = () => (
  <div className="alert alert-danger" style={{display:error?'':'none'}}>
   {error}
  </div>
)

const showSucess = () => (
  <div className="alert alert-info" style={{display:sucess?'':'none'}}>
    New account is created.please signin.
  </div>
)

const signupForm = () => (
  <form>
    <div className='form-group'>
      <label className='text-muted'>Name</label>
      <input
        onChange={handleChange('name')}
        type='text'
        value={name}
        className='form-control'
      />
    </div>
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
      {showSucess()}
      {showError()}
      {signupForm()}
     </Layout>
    )
}

export default Signup
