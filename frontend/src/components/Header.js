import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout());
  }

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <header>
      <Navbar className='bg_nav' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                alt='logo'
                src='/images/cart_n.svg'
                width='27'
                height='25'
                className='d-inline-block align-top colorLogo'
              />{' '}
              Mern FS
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <LinkContainer to='/'>
              <Nav.Link>
                Tienda
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link>
                Sobre mi
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/contact'>
              <Nav.Link>
                Contacto
              </Nav.Link>
            </LinkContainer>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Mi perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                  Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Iniciar sesión
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Usuarios</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Productos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Pedidos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <LinkContainer to='/cart'>
              <Nav.Link>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                <i className='fas fa-shopping-cart'></i> 
              </Nav.Link>
            </LinkContainer>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;