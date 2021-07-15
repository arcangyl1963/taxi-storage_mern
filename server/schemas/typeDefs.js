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
