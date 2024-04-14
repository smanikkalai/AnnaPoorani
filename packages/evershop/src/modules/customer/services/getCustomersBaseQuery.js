const { select } = require('@ANNAPOORANI/postgres-query-builder');

module.exports.getCustomersBaseQuery = () => {
  const query = select().from('customer');

  return query;
};
