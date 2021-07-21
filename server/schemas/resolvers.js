const { Customer, Box } = require('../models');
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
      addCustomer: async (parent, { firstName, lastName, email, password, address, city, state, zip, phone, }) => {
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

      createBox: async (parent, { customerId, boxSize, sendToCustomer, getFromCustomer }) => {
        const box = await Box.create({ customerId, boxSize, sendToCustomer, getFromCustomer  });
        return box;
      },


          // Add a third argument to the resolver to access data in our `context`
    addBoxToCustomer: async (parent, { customerId, boxId }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      
      if (context.email) {
        return Customer.findOneAndUpdate(
          { _id: customerId },
          { $push: { boxes: boxId } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
  

        // Make it so a logged in user can only remove a box from their own profile
        removeBoxFromCustomer: async (parent, { customerId, boxId }, context) => {
          if (context.email) {
            return Customer.findOneAndUpdate(
              { _id: customerId },
              { $pull: { boxes: boxId } },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      },
  }


module.exports = resolvers;

