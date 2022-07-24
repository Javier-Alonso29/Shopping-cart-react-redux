import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { editItemInCart } from '../slices/cart/cartSlice';
import { addProduct, deactiveProduct, editProduct } from '../slices/product/productSlice';

export const Controls = () => {

    const dispatch = useDispatch();
    const {product} = useSelector(state => state.product);

    useEffect(() => {
      
        if(product){
            setFormValues({...product})
        }

    }, [product])

    const handleCancelEdit = (event) => {

        event.preventDefault();

        if(!product){
            return
        }
        setFormValues({
            name: '',
            price: '',
            quantity: ''
        })
        dispatch(deactiveProduct())
    }
    

    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        quantity: ''
    })

    const handleChangeFromValues = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        })
    }

    const handleSaveEditProduct = (event) => {
        event.preventDefault();

        let {name, price, quantity} = formValues;

        const priceIntValue = parseInt(price)
        const quantityIntValue = parseInt(quantity)


        if(!name || !price || !quantity || priceIntValue <= 0 || quantityIntValue < 0 ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
            return
        }

        const data = {
            ...formValues.price = priceIntValue,
            ...formValues.quantity = quantityIntValue,
            ...formValues
        }

        dispatch(editProduct(data))
        dispatch(editItemInCart(data))

        setFormValues({
            name: '',
            price: '',
            quantity: ''
        })

        dispatch(deactiveProduct())
    }

    const handleSubmitNewProduct = (event) => {
        event.preventDefault();

        let {name, price, quantity} = formValues;

        const priceIntValue = parseInt(price)
        const quantityIntValue = parseInt(quantity)

        if(!name || !price || !quantity || priceIntValue <= 0 || quantityIntValue < 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
            return
        }

        let id = Math.random() + Date.now().toString();

        const data = {
            id,
            ...formValues.price = priceIntValue,
            ...formValues.quantity = quantityIntValue,
            ...formValues
        }

        dispatch(addProduct(data))

        setFormValues({
            name: '',
            price: '',
            quantity: ''
        })
    }

  return (
    <div className='container border border-5 shadow-sm p-3'>
        <form className="row container-fild">
            <div className="col-12">
                <div className='input-group mb-3'>
                    <span className='input-group-text'>
                        <i className="fa-solid fa-cart-plus"></i>
                    </span>
                    <input 
                        type="text" 
                        className="form-control" 
                        autoComplete='off' 
                        placeholder="Product name" 
                        name="name" 
                        value={formValues.name} 
                        onChange={handleChangeFromValues}
                    />
                </div>
            </div>
            <div className="col-6 fild">
                <div className='input-group mb-3'>
                    <span className="input-group-text">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </span>
                    <input
                        name='price' 
                        type="text" 
                        className="form-control" 
                        placeholder="Product price" 
                        value={formValues.price} 
                        onChange={handleChangeFromValues}
                    />
                    <span className="input-group-text">.00</span>
                </div>
            </div>
            <div className="col-6 fild">
                <div className='input-group mb-3'>
                    <span className="input-group-text">
                        <i className="fa-solid fa-box-open"></i>
                    </span>
                    <input 
                        type="text" 
                        className="form-control" 
                        autoComplete='off' 
                        placeholder="Product quantity" 
                        name='quantity' 
                        value={formValues.quantity} 
                        onChange={handleChangeFromValues}
                    />
                </div>
            </div>
            {
                (product) && 
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-danger" onClick={handleCancelEdit} >Cancel edit product</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSaveEditProduct}>Save edit producto</button>
                    </div>
            }{
                (!product) && 
                <div className="mb-3 d-grid gap-2">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmitNewProduct}>Add new producto</button>
                </div>
            }
        </form>
    </div>
  )
}
