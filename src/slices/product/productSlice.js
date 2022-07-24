import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    products: [
      {id: 1, name: 'Product 1', price: 100, quantity: 60},
      {id: 2, name: 'Product 2', price: 200, quantity: 20},
      {id: 3, name: 'Product 3', price: 300, quantity: 30},
      {id: 4, name: 'Product 4', price: 400, quantity: 52},
      {id: 5, name: 'Product 5', price: 500, quantity: 5},
      {id: 6, name: 'Product 6', price: 600, quantity: 90},
      {id: 7, name: 'Product 7', price: 700, quantity: 70}
    ],
    product: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action) {
      
      state.products.push(action.payload)
    },
    deleteProduct(state, action) {
      const productFound = state.products.find(product => product.id === action.payload);
      
      if(productFound) {
        state.products.splice(state.products.indexOf(productFound), 1)
      }
    },
    editProduct(state, action) {
      const productFound = state.products.find(product => product.id === action.payload.id);

      if(productFound){
        state.products[state.products.indexOf(productFound)] = {...action.payload}
      }
    },
    activeProduct(state, action) {
      state.product = action.payload
    },
    deactiveProduct(state){
      state.product = null
    },
    buyProducts(state, action){
      
      const productsInCart = action.payload

      for (const product of productsInCart) {
        //* Buscarlo en el stock 

        const productInStock = state.products.find((item) => item.id === product.id)

        if(!productInStock){
          return
        }

        //* SI la cantidad de stock es mayor que la cantidad de producto que tengo en el carrito
        //* entonces eliminamos esa cantidad
        if(productInStock.quantity >= product.quantityInCart){

          state.products[state.products.indexOf(productInStock)] = {
            ...productInStock, 
            quantity: productInStock.quantity - product.quantityInCart
          }

        }

      }

    }
  },
})

export const { addProduct, deleteProduct, editProduct, activeProduct, deactiveProduct, buyProducts } = productSlice.actions
export default productSlice.reducer