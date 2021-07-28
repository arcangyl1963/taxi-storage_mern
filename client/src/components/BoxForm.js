/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation, useQuery, Mutation } from '@apollo/client';
import { CREATE_BOX, ADD_BOX_TO_CUSTOMER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import Img from '../images/box_size_graphic_700.png'

const BoxForm = () => {
  const [box, setBox] = useState({ boxSize: '', sendToCustomer: false, getFromCustomer: false });
 
  // set state for form validation - box size is selected
  const [validated] = useState(false);
  // set addBox with useMutation
  const [addBox] = useMutation(CREATE_BOX);
  const [addBoxToCust] = useMutation(ADD_BOX_TO_CUSTOMER);
  // get user's data for customerId
  const { loading, data } = useQuery(QUERY_ME);
  // const [userData, setUserData ] = useState(loading ? null : data.me);
  // set add the box to customer with useMutation
  const [addBoxToCustomer] = useMutation(ADD_BOX_TO_CUSTOMER);
  const handleFormInput = (event) => {
    const { boxsize, value } = event.target;
    setBox({ ...box, [boxsize]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const data = await addBox({
        variables: { ...box, boxSize: 'large' },
        })
      console.log(data);
      setBox({
        boxSize: '',
      });
    } catch (err) {
      console.error(err);
    }
   };
   
  // const handleAddBoxToCustomer = async (customerId) => {
  //   try {
  //     const data =  await addBoxToCustomer({
  //       variables: { customerId },
  //     });
  //     setUserData(() => {
  //       return{
  //         ...userData,
  //         customerId: data.data.addBoxToCustomer.customerId
  //       }
  //     })
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } 

  return (
    <>
<Container>
  <Row>
    <Col xs={3} md={3}>
      <Image src={ Img } id="box-size-image" alt="box size graphic" />
    </Col>
  </Row>
</Container>
      <Form noValidate validated={validated} onSubmit={ handleFormSubmit }>
        <Form.Group>
          <Form.Label>Select a Box Size</Form.Label>
          <Form.Control
            as="select"
            name='boxsize'
            onChange={handleFormInput}
            // value=''
          >
            <option>Choose a box size...</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">A selection is required</Form.Control.Feedback>
        </Form.Group>
        <Button
        type="submit"
        variant="success"
        // onClick={ handleAddBoxToCustomer }
        >
            Purchase Box
        </Button>
      </Form>
    </>
  );
};

export default BoxForm;
