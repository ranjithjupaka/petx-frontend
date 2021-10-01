import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../components/Layout'

const UserDashboard = () => {
  const {
    user: {  name, email, role },
  } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ui className='list-group'>
          <li className='list-group-item'>
            <Link to='/category/create'>Create Category</Link>
          </li>
          <li className='list-group-item'>
            <Link to='/product/create'>Create Product</Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/orders'>View Orders</Link>
          </li>
          <li className='list-group-item'>
            <Link to='/admin/products'>Manage Products</Link>
          </li>
        </ui>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h2 className='card-header'>Admin Information</h2>
        <ui className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>{role === 1 ? 'Admin' : 'User'}</li>
        </ui>
      </div>
    )
  }


  return (
    <Layout className='container-fluid'>
      <div className='row'>
        <div className='col-3'>{adminLinks()}</div>
        <div className='col-6'>
          {adminInfo()}
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard
