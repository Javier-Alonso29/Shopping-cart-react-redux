import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addProductCart, deleteAllItemsInCart } from '../slices/cart/cartSlice';
import { activeProduct, deleteProduct } from '../slices/product/productSlice';

export const Product = ({data}) => {

  const {cartList} = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const {id, name, price, quantity} = data;
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    
    //* Validar si este producto se agrego al carrito
    const currentProduct = cartList.find(product => product.id === id)

    if(quantity === 0){
      setDisableButton(true);
    }
    else if(currentProduct){
      //* Validar la cantidad del producto en el carrito no revase la cantidad de stock
      if(currentProduct.quantityInCart === quantity){
        setDisableButton(true);
      }
      
      if(currentProduct.quantityInCart < quantity){
        setDisableButton(false);
      }

    }else{
      setDisableButton(false);
    }

  }, [cartList, quantity])
  

  const handleEditProduct = () =>{
    dispatch(activeProduct(data))
  }

  const handleAddProductToCart = () => {
    let price = parseInt(data.price)
    let quantityInCart  = parseInt(data.quantityInCart)
    let quantity = parseInt(data.quantity)
    dispatch(addProductCart({price, quantityInCart, quantity, ...data}))
  }

  const handleDeleteProduct = () => {
    
    dispatch(deleteAllItemsInCart(id))
    dispatch(deleteProduct(id))
  }

  return (
    <div className='col-3'>
      <div className='card' style={{width: "18rem", margin: "10px 5px"}}>
        <div className='card-header text-center bg-dark text-white p-3'>
          <h4 className='card-title'>{name}</h4>
        </div>
          <div className='card-body'>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price <span className="badge bg-primary">{price}</span></li>
              <li className="list-group-item">Quantity <span className="badge bg-success">{quantity}</span></li>
            </ul>
          </div>
          <div className="card-footer footer-element">
            <div className="btn-group" role="group" aria-label="Basic outlined example">
              <button type="button" className="btn btn-outline-primary" onClick={handleEditProduct}>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" className="btn btn-outline-success" disabled={disableButton} onClick={handleAddProductToCart}>
                <i className="fa-solid fa-cart-plus"></i>
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={handleDeleteProduct}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
      </div>
    </div>
      
  )
}
