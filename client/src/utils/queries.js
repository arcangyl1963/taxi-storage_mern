import { gql } from '@apollo/client';

export const QUERY_CUSTOMER = gql`
    query  {
        customer($customerId: ID!) {
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
        }
    }
            `;

export const QUERY_ME = gql`
  {
    me {
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
    }
  }
`;
export const QUERY_BOXES = gql`
  {
    boxes {
      _id
      boxSize
      sendToCustomer
      getFromCustomer
    }
  }
`;
