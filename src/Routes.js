import React from 'react'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import UserDashboard from './pages/UserDashboard'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Product from './pages/Product'
import Cart from './pages/Cart'
import AdminRoute from './auth/AdminRoute'
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'
import Order from './admin/Order'
import Shop from './pages/Shop'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/user/dashboard' component={UserDashboard} />
        <PrivateRoute exact path='/profile/:userId' component={Profile} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/category/create' component={CreateCategory} />
        <AdminRoute exact path='/product/create' component={CreateProduct} />
        <AdminRoute exact path='/admin/orders' component={Order} />
        <AdminRoute exact path='/admin/products' component={ManageProducts} />
        <AdminRoute
          exact
          path='/admin/product/update/:productId'
          component={UpdateProduct}
        />
        <Route exact path='/product/:productId' component={Product} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
