import { api } from '../configs/api'

export const read = (userId, token) => {
  return fetch(`${api}/user/${userId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const update = (userId, token, user) => {
  return fetch(`${api}/user/${userId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const userUpdate = (user,next) => {
    if(typeof window !== 'undefined'){
         if(localStorage.getItem('jwt')){
             let auth = JSON.parse(localStorage.getItem('jwt'));
             auth.user = user;
             localStorage.setItem('jwt',JSON.stringify(auth))
             next()
         }
    }
}

export const getPurchaseHistory = (userId, token) => {
  return fetch(`${api}/orders/by/user/${userId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}
