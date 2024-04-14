const {
  buildFilterFromUrl
} = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Coupons',
    description: 'Coupons'
  });
  const { query } = request;
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(query));
};
