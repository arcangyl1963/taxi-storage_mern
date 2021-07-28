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
    boxes: [Box]
  }

  # Set up an Auth type to handle returning data from a profile creating or user login
  type Auth {
    token: ID!
    customer: Customer
  
  }

  type Box {
    _id: ID!
    boxSize: String!
    sendToCustomer: Boolean!
    getFromCustomer: Boolean!
    customers: [Customer]!
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
    boxes: [Box]!
    me: Customer
  }

  type Mutation {
    addCustomer(
      firstName: String!, 
      lastName: String!, 
      email: String!, 
      password: String!, 
      address: String!, 
      city: String!, 
      state: String!, 
      zip: String!, 
      phone: String!
      ): Auth
   
    login(email: String!, password: String!): Auth

    createBox(boxSize: String!, sendToCustomer: Boolean!, getFromCustomer: Boolean!): Box

    addBoxToCustomer(customerId: ID!, boxId: ID!): Customer

    addCustomerToBox(customerId: ID!, boxId: ID!): Box

    removeBoxFromCustomer(customerId: ID!, boxId: ID!): Customer

    removeBox(boxId: ID!): Box
  }

    

`;

module.exports = typeDefs;
