import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Checkout from '../components/Checkout'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { getCart } from '../helpers/Cart'

const Cart = () => {

 const [items, setItems] = useState([]);
 const [run, setRun] = useState(false);
  

 const getItems = () => {
   setItems(getCart())
 }

 useEffect(() => {
  console.log('MAX DEPTH ...')
  getItems()
 }, [run])

const showItems = (items) => {
    return  items && items.length && (
      <div>
        <h2>your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => { 
          return ( 
          <ProductCard
            key={i}
            product={product}
            showAddCartbtn={false}
            updateCart={true}
            showRemovebtn={true}
            setRun={setRun}
            run={run}
          />
          )
         } )}
      </div>
    )
}

const noItems = () => (
  <h2>
    Your Cart is Empty <br /> <Link to='/shop'>continue Shopping</Link>
  </h2>
)

    return ( <Layout className='container-fluid'>
        <div className='row'>
          <div className='col-6'>
            {items && items.length > 0
              ? showItems(items)
              : noItems()}
          </div>
          <div className='col-6'>
            <h2>Cart Summary</h2>
            <hr />
            <Checkout products={items} />
          </div>
        </div>
      </Layout>
    )
}

export default Cart
