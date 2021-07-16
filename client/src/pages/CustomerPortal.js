import React from 'react';
import background from '../images/ts_background_1860.png'
import { Nav, Navbar, Container  } from 'react-bootstrap';

const CustomerPortal = () => {
 
  return (
    <main className="container-center-horizontal" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Collapse id="basic-navbar-nav" fixed="top">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#boxes">Boxes</Nav.Link>
        <Nav.Link href="#signup-login">Signup/Login</Nav.Link>
        <Nav.Link href="#contact">Contact Us</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </main>
  );
};

export default CustomerPortal;
