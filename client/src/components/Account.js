import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {  QUERY_BOXES, QUERY_ME } from '../utils/queries';
import { Container, Row, Col, Image } from 'react-bootstrap';


const MyAccountPage = () => {
    const [customerFormData, setCustomerFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
      })
    //   boxes {
        // boxSize: ''
    // }
};

const MyBoxes = () => {
    const [Box, SetBox] = useState({
        boxSize: '',
        boxId: '',
    })
};

const { loading, data } = useQuery(QUERY_ME);
const [customerData, setCustomerData] = useState(loading ? null : data.me);
const custId = data.me._id;

return (
    <Container>
        <Row>
            <Col xs={3} md={6} lg={12}>
                <Image src={ IMG } id="customer-image" alt="customer image" />
                
                
            </Col>

        </Row>
    </Container>
)



