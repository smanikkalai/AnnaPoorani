const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const { buildUrl } = require('@AnnaPoorani/AnnaPoorani/src/lib/router/buildUrl');
const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');
const {
  getGoogleAuthToken
} = require('@AnnaPoorani/google_login/services/getGoogleAuthToken');
const {
  getGoogleUserInfo
} = require('@AnnaPoorani/google_login/services/getGoogleUserInfo');
const { select, insert } = require('@AnnaPoorani/postgres-query-builder');
const { error } = require('@AnnaPoorani/AnnaPoorani/src/lib/log/logger');

/* eslint-disable-next-line no-unused-vars */
module.exports = async (request, response, delegate, next) => {
  const { code } = request.query;
  const client_id = getConfig('google_login.client_id');
  const client_secret = getConfig('google_login.client_secret');
  const homeUrl = getConfig('shop.homeUrl', 'http://localhost:3000');
  const redirect_uri = `${homeUrl}${buildUrl('gcallback')}`;
  const successUrl = getConfig('google_login.success_redirect_url', homeUrl);
  const failureUrl = getConfig(
    'google_login.failure_redirect_url',
    `${homeUrl}${buildUrl('login')}`
  );

  try {
    // Get the access token from google using the code
    const { id_token, access_token } = await getGoogleAuthToken(
      code,
      client_id,
      client_secret,
      redirect_uri
    );

    // Get the user info from google using the access token
    const userInfo = await getGoogleUserInfo(access_token, id_token);

    // Check if the email exists in the database
    let customer = await select()
      .from('customer')
      .where('email', '=', userInfo.email)
      .load(pool);

    if (customer && customer.is_google_login === false) {
      throw new Error('This email is already registered');
    }
    if (customer && customer.status !== 1) {
      throw new Error('This account is disabled');
    }

    if (!customer) {
      // If the email does not exist, create a new customer
      customer = await insert('customer')
        .given({
          email: userInfo.email,
          full_name: userInfo.name,
          status: 1,
          is_google_login: true,
          password: ''
        })
        .execute(pool);
    }
    // Login the customer
    request.session.customerID = customer.customer_id;
    // Delete the password field
    delete customer.password;
    // Save the customer in the request
    request.locals.customer = customer;
    request.session.save((e) => {
      if (e) {
        error(e);
        response.redirect(failureUrl);
      } else {
        response.redirect(successUrl);
      }
    });
  } catch (err) {
    error(err);
    response.redirect(failureUrl);
  }
};
