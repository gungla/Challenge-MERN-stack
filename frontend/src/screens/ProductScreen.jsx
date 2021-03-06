import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
} from '../actions/productActions';


const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <br />
      <div className='center-text'>
        <h1>{product.name}</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={7} className='descp'>
              <span className={product.countInStock > 0 ? 'stock-on' : 'stock-off'}>
                {product.countInStock > 0 ? 'En Stock' : 'Sin Stock'}
              </span>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup className='sinborde' variant='flush'>
                <ListGroup.Item className='sinborde'>
                  <h3>Catacteristicas</h3>
                </ListGroup.Item>
                <ListGroup.Item className='sinborde'>
                  {product.description}
                </ListGroup.Item>
                <ListGroup.Item className='sinborde'>
                  <strong className='preciodet'>$ {product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item className='sinborde' variant='flush'>
                  {product.countInStock > 0 && (
                    <>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </>
                  )}
                </ListGroup.Item>
                
                
        
                {userInfo ? (
                  <ListGroup.Item className='sinborde'>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block botones'
                      typr='button'
                      disabled={product.countInStock === 0}>
                      A??ADIR AL CARRITO
                    </Button>
                  </ListGroup.Item>
                  ) : (
                  <ListGroup.Item className='sinborde'>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block opacidad'
                      typr='button'
                      disabled>
                      A??ADIR AL CARRITO
                    </Button>
                    <p className='acceder_on mt-4'>
                      Por favor <Link to='/login'>Inicie sesi??n aqu??</Link> para realizar compra
                    </p>
                  </ListGroup.Item>
                  )}
              </ListGroup>
            </Col>
           
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen;
