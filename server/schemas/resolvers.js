const { Customer } = require('../models');

const resolvers = {
    Query: {
      user: async () => {
        return Customer.find();
      },  
    },
  };

module.exports = resolvers;
