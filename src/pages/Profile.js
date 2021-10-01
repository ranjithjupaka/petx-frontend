import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth'
import { read, update, userUpdate } from '../apis/user'
import Layout from '../components/Layout'
import { Redirect } from 'react-router'

const Profile = ({match}) => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        sucess:false
    })
   
   const  { token } = isAuthenticated();
   const { name, email, password, sucess } = values;

   const init = (userId) => {
       read(userId,token).then(data => {
           if(data.error) {
               setValues({...values,error:data.error})
           }
           else{
               setValues({...values,name:data.name,email:data.email})
           }
       })
   }

   useEffect(() => {
     init(match.params.userId)
     // eslint-disable-next-line
   }, [])
   
   const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
   }

   const handleClick = (e) => {
     e.preventDefault();
     update(match.params.userId,token,{name,email,password}).then(data => {
        //  console.log(data);
         if(data.error){
             console.log(data.error)
         }
         else{
             userUpdate(data,() => {
                 setValues({
                     ...values,
                     name:data.name,
                     email:data.email,
                     sucess:true
                 })
             })
         }
     })
   }

   const profileUpdate = (name,email,password) => {
     return (
       <form className='ml-5 mr-5'>
         <div className='form-group'>
           <label className='text-muted'>Name </label>
           <input
             type='text'
             className='form-control'
             onChange={handleChange('name')}
             value={name}
           />
         </div>
         <div className='form-group'>
           <label className='text-muted'>Email </label>
           <input
             type='text'
             className='form-control'
             onChange={handleChange('email')}
             value={email}
           />
         </div>
         <div className='form-group'>
           <label className='text-muted'>Password </label>
           <input
             type='text'
             className='form-control'
             onChange={handleChange('password')}
             value={password}
           />
         </div>
         <button className="btn btn-primary" onClick = {handleClick}>
             Update
         </button>
       </form>
     )
   }

   const redirectUser = (sucess) => {
       if(sucess) {
           return <Redirect to='/cart'/>
       }
   }




    return (
      <Layout className='container-fuild'>
      <h2 className='mb-4 ml-5'>Profile Update</h2>
       {profileUpdate(name,email,password)}
       {redirectUser(sucess)}
      </Layout>
    )
}

export default Profile
