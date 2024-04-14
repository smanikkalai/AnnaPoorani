const { update } = require('@ANNAPOORANI/postgres-query-builder');
const {
  getConnection
} = require('@ANNAPOORANI/ANNAPOORANI/src/lib/postgres/connection');
const {
  INTERNAL_SERVER_ERROR,
  OK
} = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const connection = await getConnection();
  try {
    await update('product')
      .given({ variant_group_id: null, visibility: null })
      .where('product_id', '=', parseInt(`0${request.body.id}`, 10))
      .execute(connection);
    response.status(OK).json({
      data: {}
    });
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR).json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
