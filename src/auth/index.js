import { api } from '../configs/api'

export const signup = (user) => {
  return fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const signin = (user) => {
  return fetch(`${api}/signin`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const authenticate = (data,next) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem("jwt",JSON.stringify(data));
        console.log(data)
        next()
    }
}

export const signout = (next) => {
     if (typeof window !== 'undefined') {
       localStorage.removeItem("jwt");
       next()
       return fetch(`${api}/signout`,{
           method:'GET'
       }).then(response => console.log('signout',response))
       .catch((err) => console.log(err));
     }
}

export const isAuthenticated = () => {
  if(typeof window == 'undefined')
  {
    return false
  }

  if(localStorage.getItem("jwt"))
  {
    return JSON.parse(localStorage.getItem("jwt"));
  }
  else{
    return false;
  }
}