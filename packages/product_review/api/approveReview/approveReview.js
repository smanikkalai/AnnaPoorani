const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const { select, update } = require('@AnnaPoorani/postgres-query-builder');

module.exports = async function graphql(request, response, delegate, next) {
  try {
    const { id } = request.params;

    const review = await select()
      .from('product_review')
      .where('uuid', '=', id)
      .load(pool);
    if (!review) {
      throw new Error('Review not found');
    }
    await update('product_review')
      .given({
        approved: true
      })
      .where('uuid', '=', id)
      .execute(pool);
    response.$body = {
      data: review
    };
    next();
  } catch (error) {
    next(error);
  }
};
