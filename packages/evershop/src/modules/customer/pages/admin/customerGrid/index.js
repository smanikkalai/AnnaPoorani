const {
  buildFilterFromUrl
} = require('@AnnaPoorani/AnnaPoorani/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Customers',
    description: 'Customers'
  });
  const { query } = request;
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(query));
};
