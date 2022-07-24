import React from 'react'
import { useSelector } from 'react-redux'
import { Product } from './Product'

export const MenuItems = () => {

  const {products} = useSelector(state => state.product)

    return (
      <div className='container'>
        <div className='row mt-5 mb-5'>
             {
              products.map((item) => (
                <Product key={item.id} data={item} />
              ))
            }
        </div>
      </div> 
    )
}
