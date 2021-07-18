const { Customer } = require('../models');

const resolvers = {
    Query: {
      customer: async () => {
        return Customer.find();
      },  
    },

    Mutation: {
      addCustomer: async (parent, { firstName, lastName, email, password, address, apartment, city, state, zip, phone }) => {
        return Customer.create({ firstName, lastName, email, password, address, apartment, city, state, zip, phone });
      },
  }
};

module.exports = resolvers;

