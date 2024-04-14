const path = require('path');
const fs = require('fs').promises;
const {
  INTERNAL_SERVER_ERROR
} = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');
const { buildUrl } = require('@AnnaPoorani/AnnaPoorani/src/lib/router/buildUrl');
const { error } = require('@AnnaPoorani/AnnaPoorani/src/lib/log/logger');
const {
  getContextValue
} = require('@AnnaPoorani/AnnaPoorani/src/modules/graphql/services/contextHelper');
const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');
const { Resend } = require('resend');
const Handlebars = require('handlebars');
const { getEnv } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getEnv');
const { getValue } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/registry');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const {
      $body: { email, token }
    } = response;

    // Check if the API key is set
    const apiKey = getEnv('RESEND_API_KEY', '');
    const from = getConfig('resend.from', '');

    if (!apiKey || !from) {
      return;
    }
    const resend = new Resend(apiKey);
    const resetPassword = getConfig('resend.events.reset_password', {});

    // Check if the we need to send the email on order placed event
    if (resetPassword.enabled === false) {
      return;
    }

    // Generate the url to reset password page
    const url = buildUrl('updatePasswordPage');
    // Add the token to the url
    const resetPasswordUrl = `${getContextValue(
      request,
      'homeUrl'
    )}${url}?token=${token}`;

    // Build the email data
    const emailDataFinal = await getValue(
      'resend_reset_password_email_data',
      {
        resetPasswordUrl
      },
      {}
    );

    // Send email to customer
    const msg = {
      name: 'Reset Password',
      to: email,
      subject: resetPassword.subject || 'Reset Password',
      from
    };

    // Read the template if it's set
    if (resetPassword.templatePath) {
      // So we need to get the full path to the file
      const filePath = path.join(process.cwd(), resetPassword.templatePath);
      const templateContent = await fs.readFile(filePath, 'utf8');
      msg.html = Handlebars.compile(templateContent)(emailDataFinal);
    } else {
      msg.text = `This is your reset password link: ${resetPasswordUrl}`;
    }

    await resend.emails.send(msg);
    next();
  } catch (e) {
    error(e);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
