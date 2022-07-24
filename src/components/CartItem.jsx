import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteAllItemsInCart, deleteProductCart } from '../slices/cart/cartSlice';

export const CartItem = ({item}) => {

    const dispatch = useDispatch();

    const {id, name, price, quantityInCart} = item;

    const handleOneRemoveFromCart = () => {
        dispatch(deleteProductCart(id))
    }

    const handleAllRemoveFromCart = () => {
        dispatch(deleteAllItemsInCart(id))
    }


    return (
        <div className='col-3 mt-2 mb-3'>
            <div className='card' style={{width: "18rem", margin: "10px 5px"}}>
            <div className='card-header text-center bg-primary bg-opacity-75 p-2 text-white p-3'>
                <h4 className='card-title'>{name}</h4>
            </div>
            <div className='card-body'>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Quantity <span className="badge bg-success">{quantityInCart}</span></li>
                    <li className="list-group-item">Total price <span className="badge bg-primary">{quantityInCart} x {price} = {price * quantityInCart}</span></li>
                </ul>
            </div>
            <div className="card-footer footer-element">
                <div className='row' role="group" aria-label="Basic outlined example">

                    <button type="button" className="btn btn-outline-danger mb-2" onClick={handleOneRemoveFromCart} >
                        Remove one from cart
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={handleAllRemoveFromCart} >
                        Remove all items
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}
