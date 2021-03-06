import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [ci, setCi] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden')
    } else {
      dispatch(register(name, surname, age, email, telefono, ci, password))
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center'>Registrarse</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

      <Row>
        <Col md={6}>
           
          <Form.Group controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='name'
              placeholder='Ingrese su nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='surname'>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type='surname'
              placeholder='Ingrese su apellido'
              value={surname}
              onChange={(e) => setSurname(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='age'>
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type='age'
              placeholder='Ingrese su edad'
              value={age}
              onChange={(e) => setAge(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Ingrese su email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

        </Col>
        <Col md={6}>
          
          <Form.Group controlId='telefono'>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type='telefono'
              placeholder='Ingrese su teléfono'
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='ci'>
            <Form.Label>Cédula de identidad</Form.Label>
            <Form.Control
              type='ci'
              placeholder='Ingrese su cedula de identidad'
              value={ci}
              onChange={(e) => setCi(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingrese su contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirmar contraseña'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

        </Col>
      </Row>  

        <Button type='submit' className='btn-block botones'>
          Registrarse
        </Button>
      </Form>

      <Row className='py-3 text-center'>
        <Col>
          Tiene una cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Iniciar sesión
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen;
