import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { isAuthenticated, signout } from '../auth';
import { itemCount } from '../helpers/Cart';

const isActive = (history,path) => {
  if(history.location.pathname === path)
  {
    return {color: '#242424'};
  }
  else 
  {
    return {color: '#ffffff'};
  }
}

const Header = ({history}) => {
    return (
      <header>
        <ul className='nav nav-tabs bg-primary'>
          <li className='nav-item'>
            <Link className='nav-link' style={isActive(history, '/')} to='/'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/shop')}
              to='/shop'
            >
              Shop
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/cart')}
              to='/cart'
            >
              Cart <sup className='cart-badge'>{itemCount()}</sup>
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'
              >
                Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className='nav-item'>
              <Link
                className='nav-link'
                style={isActive(history, '/admin/dashboard')}
                to='/admin/dashboard'
              >
                Dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  style={isActive(history, '/signin')}
                  to='/signin'
                >
                  Signin
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  style={isActive(history, '/signup')}
                  to='/signup'
                >
                  Signup
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <li className='nav-item'>
              <span
                className='nav-link'
                style={{ cursor: 'pointer', color: '#ffffff' }}
                onClick={() =>
                  signout(() => {
                    history.push('/')
                  })
                }
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </header>
    )
}

export default withRouter(Header)
