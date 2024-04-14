const staticMiddleware = require('@ANNAPOORANI/ANNAPOORANI/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
