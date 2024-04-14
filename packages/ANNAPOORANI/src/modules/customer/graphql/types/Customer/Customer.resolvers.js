const { camelCase } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/camelCase');

module.exports = {
  Query: {
    currentCustomer: async (root, args, { customer }) =>
      customer ? camelCase(customer) : null
  }
};
