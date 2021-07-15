const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Customer {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    address: String
    apartment: String
    city: String
    state: String
    zip: String
    phone: String
  }

  type Boxes {
    _id: ID
    customer: ID
    withCustomer: Boolean
    inStorage: Boolean
    inTransitCustomer: Boolean
    inTransitStorage: Boolean
  }

  type Operator {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    user: [Customer]!
  }
`;

module.exports = typeDefs;
