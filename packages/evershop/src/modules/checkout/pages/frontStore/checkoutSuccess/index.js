const { select } = require('@AnnaPoorani/postgres-query-builder');
const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const { buildUrl } = require('@AnnaPoorani/AnnaPoorani/src/lib/router/buildUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = async (request, response, stack, next) => {
  const { orderId } = request.params;
  const query = select().from('order');
  query.where('uuid', '=', orderId);
  const order = await query.load(pool);
  if (!order) {
    response.redirect(302, buildUrl('homepage'));
  } else {
    setContextValue(request, 'orderId', orderId);
    setContextValue(request, 'pageInfo', {
      title: 'Checkout success',
      description: 'Checkout success'
    });
    next();
  }
};
