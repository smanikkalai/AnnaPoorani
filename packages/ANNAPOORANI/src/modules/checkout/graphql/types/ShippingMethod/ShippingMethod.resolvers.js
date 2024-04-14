const { select } = require('@ANNAPOORANI/postgres-query-builder');
const { pool } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/postgres/connection');
const { camelCase } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/camelCase');

module.exports = {
  Query: {
    shippingMethods: async () => {
      const shippingMethods = await select()
        .from('shipping_method')
        .orderBy('shipping_method_id', 'DESC')
        .execute(pool);
      return shippingMethods.map((row) => camelCase(row));
    }
  }
};
