const { insert } = require('@ANNAPOORANI/postgres-query-builder');
const { pool } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/postgres/connection');

module.exports.emit = async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
};
