import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_CUSTOMER = gql`
  mutation addCustomer($firstName: String!, $lastName: String!, $email: String!, $password: String!, $address: String!, $apartment: String, $city: String!, $state: String!, $zip: String!, $phone: String!) {
    addCustomer(firstName: $firstName, lastName: $lastName, email: $email, password: $password, address: $address, apartment: $apartment, city: $city, state: $state, zip: $zip, phone: $phone) {
      token
      user {
        _id
        username
      }
    }
  }
`;


