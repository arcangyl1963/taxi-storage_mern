import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <Navbar expand="lg">
  <Container fluid>
    <Navbar.Collapse id="basic-navbar-nav" fixed="top">
      <Nav className="me-auto">
        <Nav.Link as={Link} to='/'>Home</Nav.Link>
        <Nav.Link as={Link} to='/boxes'>Boxes</Nav.Link>
        {/* if user is logged in show their account info and logout option*/}
        {Auth.loggedIn() ? (
            <>
                 <Nav.Link as={Link} to='/myaccount'>My Account</Nav.Link>
                 <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
            </>     
        ) : (
            <Nav.Link onClick={() => setShowModal(true)}>Sign Up/Login</Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
{/* if user is logged in show their account info and logout option*/}
<Modal
    size='lg'
    show={showModal}
    onHide={() => setShowModal(false)}
    aria-labelledby='signup-modal'>
    {/* container for either sighnup or login form */}
    <Tab.Container defaultActiveKey='login'>
        <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
                <Nav variant='pills'>
                    <Nav.Item>
                        <Nav.Link eventKey='login'>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Tab.Content>
                <Tab.Pane eventKey='login'>
                    <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey='signup'>
                    <SignUpForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
            </Tab.Content>
        </Modal.Body>
    </Tab.Container>
</Modal>
    </>
  );
};

export default AppNavbar;
