import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Revisión enviada')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Meta />
      <br />
      <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={5} className='descp'>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup className='sinborde' variant='flush'>
                <ListGroup.Item className='sinborde'>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className='sinborde'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reseñas`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='sinborde'>
                  Descripción : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='sinborde' variant='dark'>
                    <Row>
                      <Col>Precio :</Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className='sinborde'>
                    <Row>
                      <Col>Estado :</Col>
                      <Col className={product.countInStock > 0 ? 'stock-on' : 'stock-off'}>
                        {product.countInStock > 0 ? 'En Stock' : 'Sin Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item className='sinborde'>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
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
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {userInfo ? (
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block botones'
                      typr='button'
                      disabled={product.countInStock === 0}>
                      AÑADIR AL CARRITO
                    </Button>
                  </ListGroup.Item>
                  ) : (
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block opacidad'
                      typr='button'
                      disabled>
                      AÑADIR AL CARRITO
                    </Button>
                    <p className='acceder_on mt-4'>
                      Por favor <Link to='/login'>Inicie sesión aquí</Link> para realizar compra
                    </p>
                  </ListGroup.Item>
                  )}

                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <ListGroup.Item className='sinborde'>
                <h2>Escribe una reseña</h2>
                {errorProductReview && (
                  <Message variant='danger'>{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Clasificación</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Seleccionar...</option>
                        <option value='1'>1 - Pobre</option>
                        <option value='2'>2 - Normal</option>
                        <option value='3'>3 - Buena</option>
                        <option value='4'>4 - Muy buena</option>
                        <option value='5'>5 - Excelente</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comentario</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) =>
                          setComment(e.target.value)
                        }></Form.Control>
                    </Form.Group>
                    <Button
                      className='btn-block botones'
                      type='submit'
                      >
                      Enviar reseña
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Por favor <Link to='/login'>Inicie sesión</Link> para escribir una reseña
                  </Message>
                )}
              </ListGroup.Item>
            </Col>
            <Col md={4} className='mt-2'>
              {product.reviews.length === 0 && <Message>Sin reseñas</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen;
