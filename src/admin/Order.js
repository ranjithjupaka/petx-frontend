import moment from 'moment'
import React, { useState,useEffect } from 'react'
import { isAuthenticated } from '../auth'
import Layout from '../components/Layout'
import { listAllOrders, getStatusValues,updateOrderStatus } from './AdminApi'

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const {user,token} = isAuthenticated();

    const loadOrders = () => {
        listAllOrders(user._id,token)
        .then((data) => {
            if(data.error){
                console.log(data.error);
            }
            setOrders(data)
        })
    }

     const loadStatusValues = () => {
       getStatusValues(user._id, token).then((data) => {
         if (data.error) {
           console.log(data.error)
         }
         setStatusValues(data)
       })
     }

    useEffect(() => {
      loadOrders()
      loadStatusValues()
      // eslint-disable-next-line
    }, [])

  const showOrders = (orders) => {
          if (orders.length > 0) {
            return (
              <h2 className='text-success'>
               Total Orders: {orders.length}
              </h2>
            )
          } else {
            return <h4 className='text-danger'>No orders</h4>
          }
        }

   const handleChange = (e,orderId) => {
       updateOrderStatus(user._id,token,orderId,e.target.value)
       .then((data) => {
           if(data.error){
               console.log('status update failed');
           }
           else{
               loadOrders();
           }
       })
   }

   const showStatus = (o) => {
       return (
           <div className="form-group">
               <h3 className="mark mb-4">
                   Status : {o.status}
               </h3>
               <select className='form-control'
               onChange = {(e) => handleChange(e,o._id)}
               >
               <option>Update Status</option>
               {statusValues.map((s,i) => (
                   <option value={s} key={i}>{s}</option>
               ))}
               </select>
           </div>
       )
    
   }


  const showInput = (key, value) => {
    //   console.log(key,value);
      return (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
        <input type='text' value={value} className='form-control' readOnly />
      </div>
    </div>

  )}

    return (
      <Layout>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            {showOrders(orders)}
            {orders.map((o,oI) => {
                return (
                  <div
                    className='mt-5'
                    key={oI}
                    style={{ borderBottom: '5px solid indigo' }}
                  >
                    <h4 className='mb-5 mt-2 ml-3'>Order ID : {o._id}</h4>
                    <ui className='list-group mb-2'>
                      <li className='list-group-item'>{showStatus(o)}</li>
                      <li className='list-group-item'>
                        Transaction ID : {o.transaction_id}
                      </li>
                      <li className='list-group-item'>Amount : {o.amount}</li>
                      <li className='list-group-item'>
                        Ordered By : {o.user.name}
                      </li>
                      <li className='list-group-item'>
                        Delivery Address : {o.address}
                      </li>
                      <li className='list-group-item'>
                        Ordered {moment(o.createdAt).fromNow()}
                      </li>
                    </ui>
                    <h3 className="mb-4 mt-4 ml-3 font-italic">
                        Total products in this Order: {o.products.length}
                    </h3>
                    {o.products.map((p,pI) => {

                        return (
                        <div
                          className='mb-4'
                          key={pI}
                          style={{
                            padding: '20px',
                            border: '2px solid indigo',
                          }}
                        >
                          {showInput('Product name', p.name)}
                          {showInput('Quantity', p.count)}
                          {showInput('Price', p.price)}
                          {showInput('Product ID', p._id)}
                        </div>
                        )
                    })}
                  </div>
                )
            })}
          </div>
        </div>
      </Layout>
    )
}

export default Order
