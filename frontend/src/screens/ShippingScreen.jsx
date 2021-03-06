import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import Loader from '../components/Loader';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/placeorder')
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])

  return (
    <>
    {loading && <Loader/>}
    {!loading && ( 
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Envio</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese su dirección'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese su ciudad'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Código postal</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese su código postal'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>País</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese su país'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='warning'>
          Continuar
        </Button>
      </Form>
    </FormContainer>
    )}
    </>
  )
}

export default ShippingScreen;
