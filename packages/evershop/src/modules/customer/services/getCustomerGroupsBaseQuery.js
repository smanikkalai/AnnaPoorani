const { select } = require('@ANNAPOORANI/postgres-query-builder');

module.exports.getCustomerGroupsBaseQuery = () => {
  const query = select().from('customer_group');

  return query;
};
