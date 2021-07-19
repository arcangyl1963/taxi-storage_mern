const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Customer {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    address: String
    city: String
    state: String
    zip: String
    phone: String
  }

  # Set up an Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    customer: Customer
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
    customers: [Customer]!
    customer(customerId: ID!): Customer
  }

  type Mutation {
    addCustomer(
      firstName: String!, lastName: String!, email: String!, 
      password: String!, address: String!, city: String!, 
      state: String!, zip: String!, phone: String!): Customer
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
