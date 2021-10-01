import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth'
import { getPurchaseHistory } from '../apis/user'
import Layout from '../components/Layout'
import moment from 'moment'

const UserDashboard = () => {

   const [history, setHistory] = useState([])
    const {user:{_id,name,email,role},token} = isAuthenticated();

    const init = (userId,token) => {
      getPurchaseHistory(userId, token).then(data => {
        if(data.error){
          console.log(data.error)
        }
        else{
          setHistory(data)
        }
      })
    }

   useEffect(() => {
     init(_id, token)
     // eslint-disable-next-line
   }, [])

    const userLinks = () => {
       return (
         <div className='card'>
           <h4 className='card-header'>User Links</h4>
           <ui className='list-group'>
             <li className='list-group-item'>
               <Link to='/cart'>Cart</Link>
             </li>
             <li className='list-group-item'>
               <Link to={`/profile/${_id}`}>Profile update</Link>
             </li>
           </ui>
         </div>
       )
    }

    const userInfo = () => {
        return (
          <div className='card mb-5'>
            <h2 className='card-header'>User Information</h2>
            <ui className='list-group'>
              <li className='list-group-item'>{name}</li>
              <li className='list-group-item'>{email}</li>
              <li className='list-group-item'>
                {role === 1 ? 'Admin' : 'User'}
              </li>
            </ui>
          </div>
        )
    }

    const purchaseHistory = () => {
        return (
          <div className='card mb-5'>
            <h2 className='card-header'>Purchase History</h2>
            <ui className='list-group'>
              <li className='list-group-item'>
                {history.map((h, i) => {
                  return (
                    <div key={i} style={{ border: '2px solid indigo' }} className='mt-2'>
                      {h.products.map((p, i) => {
                        return (
                          <div key={i} className='mt-3 mb-3 ml-4'>
                            <h6>Product name: {p.name}</h6>
                            <h6>Product price: ${p.price}</h6>
                            <h6>
                              Purchased date: {moment(p.createdAt).fromNow()}
                            </h6>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </li>
            </ui>
          </div>
        )
    }
    return (
      <Layout className='container-fluid'>
        <div className="row">
            <div className="col-3">
                {userLinks()}
            </div>
            <div className="col-6">
                {userInfo()}
                {purchaseHistory()}
            </div>
        </div>
        
      </Layout>
    )
}

export default UserDashboard;
