import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartSlice from "../slices/cart/cartSlice";
import productSlice from "../slices/product/productSlice";

const reducers = combineReducers({
    product: productSlice,
    cart: cartSlice
})

export const store = configureStore({
    reducer: reducers
})