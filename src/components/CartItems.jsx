import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { totalPrice } from '../slices/cart/cartSlice'
import { CartItem } from './CartItem'
import { Modal, ModalComponent } from './ModalComponent'

export const CartItems = () => {

    const {cartList, total} = useSelector(state => state.cart)

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(totalPrice())
    }, [cartList])

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true)
    }
    

    return (
        <div className='container'>
            <div className='row'>
                <h3>Your shopping cart</h3>
                {
                    cartList.map((item) => <CartItem key={item.id} item={item}/>)
                }
            </div>

            <div className="alert alert-success d-flex justify-content-between" role="alert">
                <div className='d-flex mt-1' style={{alignItems: 'baseline'}}>
                    <i className="fa-solid fa-bag-shopping"></i>
                    <div>
                        <h5 className='ms-3'>Total Acount: <b>{total}</b></h5>
                    </div>
                </div>
                <div>
                    <button 
                    className='btn btn-success' 
                    disabled={cartList.length < 1}
                    onClick={handleOpenModal}>
                        confirm purchase <i className="fa-solid fa-circle-check ms-1"></i>
                    </button>
                </div>
            </div>

            {
                showModal && <ModalComponent show={showModal} setShow={setShowModal}/>
            }

        </div>
    )
}
