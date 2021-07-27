import gql from 'graphql-tag';


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

export const CREATE_BOX = gql`
  mutation createBox($boxSize: String!, $sendToCustomer: Boolean!, $getFromCustomer: Boolean!) {
   createBox(boxSize: $boxSize, sendToCustomer: $sendToCustomer, getFromCustomer: $getFromCustomer) {
       _id
       boxSize
       sendToCustomer
       getFromCustomer
     }
    }
  `

export const ADD_BOX_TO_CUSTOMER = gql`
mutation addBoxToCustomer($customerId: String!, $boxId: String!) {
  addBoxToCustomer(customerId: $customerId, boxId: $boxId) {
    Customer {
        _id
        boxes {
          _id
          boxSize
          sendToCustomer
          getFromCustomer
        }
      }
    }
  }
  `

  export const REMOVE_BOX_FROM_CUSTOMER = gql`
  mutation removeBoxFromCustomer($customerId: String!, $boxId: String!) {
    removeBoxFromCustomer(customerId: $customerId, boxId: $boxId) {
      Customer {
        _id
        boxes {
          _id
          boxSize
          sendToCustomer
          getFromCustomer
        }
      }
    }
  }
  `

  export const REMOVE_BOX = gql`
  mutation removeBox($boxId: String!) {
    removeBox(boxId: $boxId) {
      Box {
        _id
        boxSize
        sendToCustomer
        getFromCustomer
      }
    }
  }
  `
 export const SEND_TO_CUSTOMER = gql`
 mutation sendToCustomer($customerId: String!, $boxId: String!, $sendToCustomer: Boolean!) {
    sendToCustomer(customerId: $customerId, boxId: $boxId, sendToCustomer: $sendToCustomer) {
        Customer {
            _id
        boxes {
            _id
            boxSize
            sendToCustomer
            getFromCustomer
        }
      }
    }
 }
 `
 export const GET_FROM_CUSTOMER = gql`
 mutation getFromCustomer($customerId: String!, $boxId: String!, $getFromCustomer: Boolean!) {
    getFromCustomer(customerId: $customerId, boxId: $boxId, getFromCustomer: $getFromCustomer) {
        Customer {
            _id
        boxes {
            _id
            boxSize
            sendToCustomer
            getFromCustomer
        }
      }
    }
 }
 `