const { select } = require('@ANNAPOORANI/postgres-query-builder');

module.exports.getOrdersBaseQuery = () => {
  const query = select().from('order');

  return query;
};
