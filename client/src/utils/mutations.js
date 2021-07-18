import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      customer {
        _id
        email
      }
    }
  }
`;
export const ADD_CUSTOMER = gql`
  mutation addCustomer($firstName: String!, $lastName: String!, $email: String!, $password: String!, $address: String!, $city: String!, $state: String!, $zip: String!, $phone: String!) {
    addCustomer(firstName: $firstName, lastName: $lastName, email: $email, password: $password, address: $address, city: $city, state: $state, zip: $zip, phone: $phone) {
      token
      customer {
        _id
        email
      }
    }
  }
`;


