import { gql } from '@apollo/client';

export const QUERY_CUSTOMER = gql`
    query customer($customerId: ID!) {
        customer(customerId: $customerId) {
            _id 
            firstName
            lastName
            email
            password
            phone
            address 
            city
            state
            zip
            phone
            boxes {
                _id
                boxSize
                sendToCustomer
                getFromCustomer
            }
            `
            

export const QUERY_ME = gql`
            _id 
            firstName
            lastName
            email
            password
            phone
            address 
            city
            state
            zip
            phone
            boxes {
                _id
                boxSize
                sendToCustomer
                getFromCustomer
            }
          `;