const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    address: String
    street: String
    city: String
    state: String
    zip: String
    phone: String
  }

  type Query {
    user: [User]!
  }
`;

module.exports = typeDefs;
