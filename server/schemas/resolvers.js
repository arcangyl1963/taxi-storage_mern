const { Customer, Box } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { isTypeSystemDefinitionNode } = require("graphql");

const resolvers = {
  Query: {
    customers: async () => {
      return Customer.find();
    },

    customer: async (parent, { customerId }) => {
      return Customer.findOne({ _id: customerId });
    },

    boxes: async () => {  
      return Box.find();
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Customer.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addCustomer: async (
      parent,
      { firstName, lastName, email, password, address, city, state, zip, phone }
    ) => {
      const customer = await Customer.create({
        firstName,
        lastName,
        email,
        password,
        address,
        city,
        state,
        zip,
        phone,
      });
      const token = signToken(customer);

      return { token, customer };
    },

    login: async (parent, { email, password }) => {
      const customer = await Customer.findOne({ email });

      if (!customer) {
        throw new AuthenticationError("No customer with this email found!");
      }

      const correctPw = await customer.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(customer);
      
      return { token, customer };

    },

    createBox: async (
      parent,
      { customerId, boxSize, sendToCustomer, getFromCustomer }
    ) => {
      const box = await Box.create({
        customerId,
        boxSize,
        sendToCustomer,
        getFromCustomer,
      });
      return box;
    },

    removeBox: async (parent, { boxId }) => {
      return Box.findOneAndDelete({ _id: boxId });
    
    },

    // needs to be tested
    // Add a third argument to the resolver to access data in our `context`
    addBoxToCustomer: async (parent, { customerId, boxId }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Customer.findOneAndUpdate(
          { _id: customerId },
          { $addToSet: { boxes: boxId } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    // add customer ID to the box
    addCustomerToBox: async (parent, { boxId, customerId }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Box.findOneAndUpdate(
          { _id: boxId },
          { $addToSet: { customers: customerId } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },


    //needs to be tested
    // Make it so a logged in user can only remove a box from their own profile
    removeBoxFromCustomer: async (parent, { customerId, boxId }, context) => {
      if (context.user) {
        return Customer.findOneAndUpdate(
          { _id: customerId },
          { $pull: { boxes: boxId } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
