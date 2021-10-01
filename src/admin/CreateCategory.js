import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth'
import Layout from '../components/Layout';
import { createCategory } from './AdminApi';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState(false);

    const { user,token } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('');
        setSucess(false);
        createCategory(user._id,token,{name})
        .then((data) => {
            console.log(data);
            if(data.error)
            {
                setError(data.error);

            }
            else{
                setError('');
                setSucess(true);
            }
        })
    }

 const showSucess = () => {
     if(sucess){
         return <h3 className="text-success">{name} is created</h3>
     }
 }

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>{name} must be unique</h3>
    }
  }

  const goBack = () => {
      return (
          <div className="mt-5">
              <Link className="text-warning" to="/admin/dashboard">
                  Back to Admin Dashboard
              </Link>
          </div>
      )
  }

    return (
      <Layout>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
          {showSucess()}
          {showError()}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                  type='text'
                  onChange={(e) => handleChange(e)}
                  className='form-control'
                  value={name}
                />
                <button className='btn btn-outline-primary'>
                  Create Category
                </button>
              </div>
            </form>
            {goBack()}
          </div>
        </div>
      </Layout>
    )
}

export default CreateCategory
