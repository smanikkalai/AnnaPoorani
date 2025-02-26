const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');
const deleteCategory = require('../../services/category/deleteCategory');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const { id } = request.params;
    const category = await deleteCategory(id, {
      routeId: request.currentRoute.id
    });
    response.status(OK);
    response.json({
      data: category
    });
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
