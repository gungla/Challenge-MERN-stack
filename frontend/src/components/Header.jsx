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

  // const productList = useSelector((state) => state.productList)
  // const { products } = productList

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
              />
              <span className='ml-1'>Mern FS</span> 
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <LinkContainer to='/'>
              <Nav.Link>
                Tienda
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/chat'>
              <Nav.Link>
                Chat
              </Nav.Link>
            </LinkContainer>
            <NavDropdown title='Categorias'>
              {/* {products.map((product) => (
              <span key={product._id}>  
                <LinkContainer to={/products/ + product.category}>
                  <Nav.Link>
                  {product.category}
                  </Nav.Link>
                </LinkContainer>
              </span>
              ))} */}
              <LinkContainer to='/products/accesorios'>
                <Nav.Link>
                  Accesorios
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/bolsas'>
                <Nav.Link>
                  Bolsas
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/cajas'>
                <Nav.Link>
                  Cajas
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/comida'>
                <Nav.Link>
                  Comida
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/madera'>
                <Nav.Link>
                  Maderas
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/libros'>
                <Nav.Link>
                  Libros
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/juegos'>
                <Nav.Link>
                  Juegos
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/papeleria'>
                <Nav.Link>
                  Papeleria
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/ropa'>
                <Nav.Link>
                  Ropa
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/products/tecnologia'>
                <Nav.Link>
                  Tecnologia
                </Nav.Link>
              </LinkContainer>
            </NavDropdown>
            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Mi perfil</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.isAdmin && (
                  <span title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist' className='btnAdmin'>
                      <NavDropdown.Item>
                        Usuarios
                        <small> - solo admin</small>
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist' className='btnAdmin'>
                      <NavDropdown.Item>
                        Productos
                        <small> - solo admin</small>
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist' className='btnAdmin'>
                      <NavDropdown.Item>
                        Pedidos
                        <small> - solo admin</small>
                      </NavDropdown.Item>
                    </LinkContainer>
                  </span>
                  )}
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