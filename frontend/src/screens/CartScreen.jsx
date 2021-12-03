import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Loader from '../components/Loader';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
    <br />
    <div className='center-text'>
      <h1>Catalogo de productos</h1>
    </div>
    {loading && <Loader/>}
    {!loading && ( 
    <Row> 
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Tu carro esta vacio <Link to='/'>Volver</Link>
          </Message>
        ) : (
          <ListGroup variant='flush' className='sinborde'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} className='sinborde'>
                <Row className="cec">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={1}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush' className='sinborde'>
            <ListGroup.Item className='sinborde'>
              <h2>
                Productos ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className='sinborde'>
              <Button
                type='button'
                className='btn-block botones'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                >
                Realizar compra
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    )}
    </>
  )
}

export default CartScreen;
