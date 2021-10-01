export const addItem = (item,next) => {
   let cart = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count:1
        })

        cart = Array.from(new Set(cart.map(p => p._id))).map( id => {
            return cart.find(p => p._id === id)
        }
        )

        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
}

export const itemCount = () => {
     if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
        return 0;
    }
}

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        // console.log(JSON.parse(localStorage.getItem('cart')))
      return JSON.parse(localStorage.getItem('cart'))
    }
    return [];
  }
}

export const updateItems = (productId,count) => {
    let cart = [];
    if(typeof window !== 'undefined')  {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            cart.map((product, i) => {
              if ((product._id === productId)) {
                product.count = count;
              }
              return product;
            })

            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }  
}

export const removeItem = (productId) => {
  let cart = []
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((product, i) => {
      return cart.splice(i, 1) ? product._id === productId: null;
      // if ((product._id === productId)) {
      //    cart.splice(i,1);
      // }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

export const emptyCart = (next) => {
  if (typeof window !== 'undefined'){
    localStorage.removeItem('cart');
    next();
  }
}