import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Category = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded card'>
      <Link to={`/products/${product._id}`}>
        <span className={product.countInStock > 0 ? 'stock-on' : 'stock-off'}>
          {product.countInStock > 0 ? 'En Stock' : 'Sin Stock'}
        </span>
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
        <Card.Text as='h3'>$ {product.price}</Card.Text>
        <Link to={`/product/${product._id}`} className='btn botones w-100'>Detalle del producto</Link>
      </Card.Body>
    </Card>
  )
}

export default Category;