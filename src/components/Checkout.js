import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth';
import { createOrder, getBraintreeToken, processPayment } from '../admin/AdminApi';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from '../helpers/Cart';

const Checkout = ({products}) => {
    const [data, setData] = useState({
     success:false,
     loading:false,
     clientToken:null,
     error:'',
     instance:{},
     address:''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId,token) => {
         getBraintreeToken(userId,token)
         .then(data => {
          //  console.log(data);
           if(data.error){
             setData({...data,error:data.error});
           }
           else{
             setData({clientToken:data.clientToken})
           }
         }) 
    }

    useEffect(() => {
      getToken(userId, token)
      // eslint-disable-next-line
    },[])

    const getTotal = () => {  
       return products && products.reduce((current, next) => {
              return current + next.count * next.price
      }, 0)
    }

    const showCheckout = () => {
     
      return isAuthenticated() ? (
        <div>
          {showDropIn()}
        </div>
      ) : (
        <button className='btn btn-primary'>Signin to Checkout</button>
      )
    }
    
    let deliveryAddress = data.address;

    const pay = () => {
      console.log(data.instance);
      setData({loading:true});
      data.instance
        .requestPaymentMethod()
        .then((data) => {
          console.log(data)
          let nonce = data.nonce
           
          const paymentData = {
            paymentMethodNonce:nonce,
            amount:getTotal(products)
          }

          processPayment(userId,token,paymentData)
          .then(response => {
                console.log(response)
                const orderData = {
                  products: products,
                  transaction_id: response.transaction_id,
                  amount: response.transaction.amount,
                  address: deliveryAddress,
                }

                createOrder(userId, token,orderData).then(response => {
                  console.log(response);
                  emptyCart(() => {
                     setData({ loading: false, success: true })
                    console.log('payment sucessful and cart empty')
                  });
                })
          } )
          .catch(error => {
            console.log(error);
            setData({ loading: false })
          } )
        })
        .catch((error) => {
          setData({ ...data, error: error.message })
        })
    }
    
    const handleAddress = (event) => {
      setData({ ...data, address: event.target.value })
    }


    const showDropIn = () => (
      <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
          <div className="form-group mb-3">
            <label  className="text-muted">Delivary Adress:</label>
            <textarea 
            className="form-control"
            value={data.address}
            placeholder='type your delivery adress here'
            onChange={(event) => handleAddress(event)}
            />
          </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal:{
                  flow:'vault'
                }
              }}
              onInstance={(instance) =>
                setData({ ...data, instance: instance })
              }
            />
            <button onClick={() => pay()} className='btn btn-success btn-block'>
              Pay now
            </button>
          </div>
        ) : null}
      </div>
    )
   
    const showErrors = (error) => (
      <div className='alert alert-danger'
      style={{display:error ? '':'none'}}
      >
           {error}
      </div>
    )
  let doshowSuccess = data.success;
    const showSuccess = (success) => {
      console.log('success '+success);
        return  ( <div
            className='alert alert-info'
            style={{ display: success ? '' : 'none' }}
          >
            Your Transaction is Sucessful
          </div>
        )
    }

    const showLoading = (loading) => {
           console.log('loading ' + loading)
      return loading && (
       <h2>Loading....</h2>
      )
    }


    return (
      <div>
        <h3>₹ {getTotal()}</h3>
        {showLoading(data.loading)}
        {showSuccess(doshowSuccess)}
        {showErrors(data.error)}
        {showCheckout()}
      </div>
    )
}

export default Checkout
