const { buildUrl } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/router/buildUrl');
const {
  translate
} = require('@ANNAPOORANI/ANNAPOORANI/src/lib/locale/translate/translate');
const {
  setContextValue
} = require('../../../../graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  // Check if the customer is logged in
  if (request.isCustomerLoggedIn()) {
    // Redirect to homepage
    response.redirect(buildUrl('homepage'));
  } else {
    setContextValue(request, 'pageInfo', {
      title: translate('Reset password'),
      description: translate('Reset password')
    });
    next();
  }
};