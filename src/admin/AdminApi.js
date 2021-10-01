import { api } from '../configs/api'
import queryString from 'query-string'

export const createCategory = (userId,token,category) => {
  return fetch(`${api}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const createProduct = (userId, token, product) => {
  console.log(product);
  return fetch(`${api}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const getCategories = () => {
  return fetch(`${api}/categories`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const getProducts = (sortBy) => {
  return fetch(`${api}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const getFilteredProducts = (skip,limit, filters={}) => {
  const data = {
    skip,limit,filters
  }
  return fetch(`${api}/products/by/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const list = (params) => {
  const query = queryString.stringify(params);
  return fetch(`${api}/products/search?${query}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const readProduct = (productId) => {
  return fetch(`${api}/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const realatedList = (productId) => {
  return fetch(`${api}/products/related/${productId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const getBraintreeToken = (userId, token) => {
  return fetch(`${api}/braintree/getToken/${userId}`, {
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

export const processPayment = (userId, token,paymentData) => {
  return fetch(`${api}/braintree/payment/${userId}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(paymentData)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const createOrder = (userId, token, orderData) => {
  return fetch(`${api}/order/create/${userId}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}


export const listAllOrders = (userId, token) => {
  return fetch(`${api}/order/list/${userId}`, {
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

export const getStatusValues = (userId, token) => {
  return fetch(`${api}/order/status-values/${userId}`, {
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


export const updateOrderStatus = (userId, token,orderId,status) => {
  return fetch(`${api}/order/${orderId}/status/${userId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({orderId,status})
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}


export const getAllProducts = () => {
  return fetch(`${api}/products?limit=undefined`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}


export const deleteProduct = (productId,userId, token) => {
  return fetch(`${api}/product/${productId}/${userId}`, {
    method: 'DELETE',
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

export const getProduct = (productId) => {
  return fetch(`${api}/product/${productId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}

export const updateProduct = (productId, userId, token,product) => {
  return fetch(`${api}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body:product
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error)
    })
}
