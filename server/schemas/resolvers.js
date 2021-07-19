const { Customer } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      customers: async () => {
        return Customer.find();
      }, 
      
      customer: async (parent, { customerId }) => {
        return Customer.findOne({ _id: customerId });
      },
    },

    Mutation: {
      addCustomer: async (parent, { firstName, lastName, email, password, address, city, state, zip, phone }) => {
        const customer = await Customer.create({ firstName, lastName, email, password, address, city, state, zip, phone });
        const token = signToken(customer);

        return { token, customer };
      },
      login: async (parent, { email, password }) => {
        const customer = await Customer.findOne({ email });
  
        if (!customer) {
          throw new AuthenticationError('No customer with this email found!');
        }
  
        const correctPw = await customer.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(customer);
        return { token, customer };
      },
  }
};

module.exports = resolvers;

