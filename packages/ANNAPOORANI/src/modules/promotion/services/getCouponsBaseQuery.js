const { select } = require('@ANNAPOORANI/postgres-query-builder');

module.exports.getCouponsBaseQuery = () => {
  const query = select().from('coupon');

  return query;
};
