import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../slices/cart/cartSlice';
import { buyProducts } from '../slices/product/productSlice';

export const ModalComponent = ({show, setShow}) => {

  const {cartList, total} = useSelector(state => state.cart)
  const dispatch = useDispatch();

  const handlePurchase = () => {
     

    if(cartList.length <= 0){
      return
    }

    //* Eliminar la cantidad de productos del stok
    dispatch(buyProducts(cartList))


    //* Limpiar el carrito
    dispatch(cleanCart())

    setShow(false)
  }

  return (
      <Modal 
        centered
        backdrop="static"
        size="lg"
        show={show} 
        onHide={() => setShow(false)}
      >
        <Modal.Header className='bg-dark text-white' closeButton>
          <Modal.Title>
            <div className='modal__title-cart'>
              <i className="fa-solid fa-cart-plus"></i>
              <h3 className='ms-3'>Your cart</h3>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Prince</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                cartList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantityInCart}</td>
                      <td>{ item.price * item.quantityInCart }</td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
                <tr className="bg-primary text-white">
                  <td colSpan={4}></td>
                  <td>{total}</td>
                </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button onClick={handlePurchase}
              variant={'btn btn-success'}>
              confirm <i className="fa-solid fa-circle-check ms-1"></i>
          </Button>
        </Modal.Footer>
    </Modal>
  )
}
