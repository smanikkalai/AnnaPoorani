const { execute } = require('graphql');
const { validate } = require('graphql/validation');
const { parse } = require('graphql');
const { OK } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');
const { getContext } = require('./contextHelper');

module.exports.graphqlMiddleware = (schema) =>
  async function graphqlMiddleware(request, response, delegate, next) {
    const { body } = request;
    const { query, variables } = body;
    try {
      const promises = [];
      Object.keys(delegate).forEach((id) => {
        // Check if middleware is async
        if (delegate[id] instanceof Promise) {
          promises.push(delegate[id]);
        }
      });

      if (!query) {
        response.status(OK).json({
          data: {}
        });
        return;
      }

      const document = parse(query);
      // Validate the query
      const validationErrors = validate(schema, document);
      if (validationErrors.length > 0) {
        next(new Error(validationErrors[0].message));
      } else {
        const data = await execute({
          schema,
          contextValue: getContext(request),
          document,
          variableValues: variables
        });
        if (data.errors) {
          // Create an Error instance with message and stack trace
          next(new Error(data.errors[0].message));
        } else {
          response.status(OK).json({
            data: data.data
          });
        }
      }
    } catch (error) {
      next(error);
    }
  };
