/* eslint-disable camelcase */
const {
  rollback,
  insert,
  commit,
  startTransaction
} = require('@AnnaPoorani/postgres-query-builder');
const {
  getConnection
} = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, deledate, next) => {
  const connection = await getConnection();
  await startTransaction(connection);
  const { name, country, provinces = [] } = request.body;
  try {
    const zone = await insert('shipping_zone')
      .given({
        name,
        country
      })
      .execute(connection);

    const zoneId = zone.insertId;
    const provincePromises = provinces
      .filter((p) => !!p)
      .map((province) => insert('shipping_zone_province')
          .given({
            zone_id: zoneId,
            province
          })
          .execute(connection));
    await Promise.all(provincePromises);
    await commit(connection);

    response.status(OK);
    response.json({
      data: zone
    });
  } catch (e) {
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
