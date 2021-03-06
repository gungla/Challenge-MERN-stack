import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
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

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setSurname(user.surname)
        setAge(user.age)
        setEmail(user.email)
        setTelefono(user.telefono)
        setCi(user.ci)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Las contrase??as no coinciden')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, surname, age, email, telefono, ci, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h1>Perfil de usuario</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Perfil actualizado</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='name'
              placeholder='Ingrese su nombre'
              value={name}
              disabled
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
              placeholder='Ingrese su direcci??n de correo'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='telefono'>
            <Form.Label>Tel??fono</Form.Label>
            <Form.Control
              type='telefono'
              placeholder='Ingrese su tel??fono'
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='ci'>
            <Form.Label>Cedula de identidad</Form.Label>
            <Form.Control
              type='ci'
              placeholder='Ingrese su cedula de identidad'
              value={ci}
              onChange={(e) => setCi(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Contrase??a</Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingrese su contrase??a'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirmar contrase??a</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirmar contrase??a'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type='submit' className='btn-block botones'>
            Actualizar
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mis ordenes</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TOTAL</th>
                <th>ENTREGADA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Detalles
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen;
