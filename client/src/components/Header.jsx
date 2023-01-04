import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FTL_PAGE, LOGIN_PAGE, LTL_PAGE, MAIN_PAGE, POOLING_PAGE, REGISTER_PAGE } from '../constants'

const Header = ({logout, isAuth}) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link className="me-5 navbar-brand" to={MAIN_PAGE}>Agreenerator</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          {
            isAuth &&
            <Nav className="me-auto">
              <Link className="nav-link" to={LTL_PAGE}>LTL</Link>
              <Link className="nav-link" to={FTL_PAGE}>FTL</Link>
              <Link className="nav-link" to={POOLING_PAGE}>Pooling</Link>
            </Nav>
          }
          <Nav className="ms-auto">
            {isAuth && <nav className="nav-link" style={{cursor: 'pointer'}} onClick={logout}>Выйти</nav>}
            {!isAuth && <Link className="nav-link" to={REGISTER_PAGE}>Зарегистрироваться</Link>}
            {!isAuth && <Link className="nav-link" to={LOGIN_PAGE}>Войти</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;