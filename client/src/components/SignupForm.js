import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { ADD_CUSTOMER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [customerFormData, setCustomerFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
});
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // set addCustomer with useMutation
  const [addCustomer] = useMutation(ADD_CUSTOMER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerFormData({ ...customerFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      const { data } = await addCustomer({
        variables: { ...customerFormData }
      });
      // console.log(data);
      Auth.login(data.addCustomer.token);
    } catch (err) {
      // console.error("try block error" + err);
      setShowAlert(true);
    }

    setCustomerFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='firstName'>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your first name'
            name='firstName'
            onChange={handleInputChange}
            value={customerFormData.firstName}
            required
          />
          <Form.Control.Feedback type='invalid'>First Name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='lastName'>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Last name'
            name='lastName'
            onChange={handleInputChange}
            value={customerFormData.lastName}
            required
          />
          <Form.Control.Feedback type='invalid'>Last Name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={customerFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={customerFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='address'>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Street number and name'
            name='address'
            onChange={handleInputChange}
            value={customerFormData.address}
            required
          />
          <Form.Control.Feedback type='invalid'>Street number is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='city'>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your city'
            name='city'
            onChange={handleInputChange}
            value={customerFormData.city}
            required
          />
          <Form.Control.Feedback type='invalid'>City is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='state'>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your state'
            name='state'
            onChange={handleInputChange}
            value={customerFormData.state}
            required
          />
          <Form.Control.Feedback type='invalid'>State is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='zip'>Zip Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your zip code'
            name='zip'
            onChange={handleInputChange}
            value={customerFormData.zip}
            required
          />
          <Form.Control.Feedback type='invalid'>Zip code is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='phone'>Phone</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your phone number'
            name='phone'
            onChange={handleInputChange}
            value={customerFormData.phone}
            required
          />
          <Form.Control.Feedback type='invalid'>Phone number is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(customerFormData.firstName && customerFormData.lastName && customerFormData.email && customerFormData.password && customerFormData.address && customerFormData.city && customerFormData.state && customerFormData.zip && customerFormData.phone)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;