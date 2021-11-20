import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded card'>
      <Link to={`/product/${product._id}`}>
        <div className='cardSize thumb-container'>
          <Card.Img src={product.image} variant='top' className='acathumb' />
          <div className='hoverText'>
            <div className='caption'>
              <i className='fa fa-eye' aria-hidden='true'></i>
              <p>Categoría: <small>{product.category}</small></p>
              <p>Marca: <small>{product.brand}</small></p>
            </div>
          </div>
        </div>
      </Link>
      <Card.Body>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>$ {product.price}</Card.Text>

        <Link to={`/product/${product._id}`} className='btn botones w-100'>Detalle del producto</Link>

      </Card.Body>
    </Card>
  )
}

export default Product
