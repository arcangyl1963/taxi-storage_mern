import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import BoxForm from './BoxForm';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [showModalBoxes, setShowModalBoxes] = useState(false);

  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Collapse id="basic-navbar-nav" sticky="top">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" id="custom-navlink">
                Home
              </Nav.Link>

              {/* if user is logged in show their account info and logout option*/}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    onClick={() => setShowModalBoxes(true)}
                    id="custom-navlink"
                  >
                    Boxes
                  </Nav.Link>
                  <Nav.Link as={Link} to="/myaccount" id="custom-navlink">
                    My Account
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} id="custom-navlink" >Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link
                  onClick={() => setShowModal(true)}
                  id="custom-navlink"
                >
                  Sign Up/Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* if user is logged in show their account info and logout option*/}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* container for either sighnup or login form */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link id="form-navlink" eventKey="login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link id="form-navlink" eventKey="signup">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <>
        <Modal
          size="lg"
          show={showModalBoxes}
          onHide={() => setShowModalBoxes(false)}
          aria-labelledby="box-form"
        >
          <Modal.Header closeButton>
            <Modal.Title id="box-form">Boxes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BoxForm handleModalClose={() => setShowModal(false)} />
          </Modal.Body>
        </Modal>
      </>
    </>
  );
};

export default AppNavbar;
