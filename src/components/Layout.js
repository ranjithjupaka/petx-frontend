import React from 'react'
import Header from './Header'
import '../styles.css'

const Layout = ({className,children}) => {
    return (
      <div>
        <Header />
        <div>
          <h2 className='jumbotron'>.</h2>
          <p className='lead'></p>

        </div>
        <div className={className}>{children}</div>
      </div>
    )
}

export default Layout
