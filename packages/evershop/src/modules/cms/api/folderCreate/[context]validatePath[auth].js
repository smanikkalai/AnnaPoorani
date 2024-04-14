const {
  INVALID_PAYLOAD
} = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');
const { CONSTANTS } = require('@AnnaPoorani/AnnaPoorani/src/lib/helpers');
const { validatePath } = require('../../services/validatePath');

module.exports = (request, response, delegate, next) => {
  const { path } = request.body || '';
  // Validate the path to avoid Relative Path Traversal attack
  if (validatePath(CONSTANTS.MEDIAPATH, path) === false) {
    response.status(INVALID_PAYLOAD).json({
      error: {
        status: INVALID_PAYLOAD,
        message: 'Invalid path'
      }
    });
  } else {
    next();
  }
};
