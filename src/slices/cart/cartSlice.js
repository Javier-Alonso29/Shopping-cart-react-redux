import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    cartList: [],
    activeProduct: null,
    total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductCart(state, action) {

      const productInCart = state.cartList.find(product => product.id === action.payload.id)

      if(productInCart){

        state.cartList[state.cartList.indexOf(productInCart)] = {...productInCart, quantityInCart: productInCart.quantityInCart + 1}

      }else{

        state.cartList.push({...action.payload, quantityInCart: 1})

      }

    },
    deleteProductCart(state, action) {
      
      //* Buscar el elemento que queremos borrar en el carrito

      const productInCart = state.cartList.find((product) => product.id === action.payload)

      if(!productInCart) return state;

      if(productInCart.quantityInCart > 1){

        state.cartList[state.cartList.indexOf(productInCart)] = {...productInCart, quantityInCart: productInCart.quantityInCart - 1}

      }else{

        state.cartList.splice(state.cartList.indexOf(productInCart), 1)
        
      }
    },
    deleteAllItemsInCart(state, action){
      
      const productInCart = state.cartList.find((product) => product.id === action.payload)

      if(productInCart){
        state.cartList.splice(state.cartList.indexOf(productInCart), 1)
      }
    },
    editItemInCart(state, action) {

      const productInCart = state.cartList.find((product) => product.id === action.payload.id)
      if(productInCart){
        state.cartList[state.cartList.indexOf(productInCart)] = {...action.payload, quantityInCart: action.payload.quantity}
      }

    },
    cleanCart(state){
      state.cartList = []
    },
    totalPrice(state) {
      
      let total = 0
      state.cartList.forEach((product) => {
        
        total = total + (product.price * product.quantityInCart)

      })

      state.total = total

    }
  },
})

export const { addProductCart, deleteProductCart, deleteAllItemsInCart, editItemInCart, cleanCart,totalPrice} = cartSlice.actions
export default cartSlice.reducer