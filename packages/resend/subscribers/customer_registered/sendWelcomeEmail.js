const path = require('path');
const fs = require('fs').promises;
const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');
const { Resend } = require('resend');
const Handlebars = require('handlebars');
const { select } = require('@AnnaPoorani/postgres-query-builder');
const { error } = require('@AnnaPoorani/AnnaPoorani/src/lib/log/logger');
const { getEnv } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getEnv');
const { getValue } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/registry');

module.exports = async function sendOrderConfirmationEmail(data) {
  try {
    // Check if the API key is set
    const apiKey = getEnv('RESEND_API_KEY', '');
    const from = getConfig('resend.from', '');

    if (!apiKey || !from) {
      return;
    }
    const resend = new Resend(apiKey);
    const customerRegistered = getConfig(
      'resend.events.customer_registered',
      {}
    );

    // Check if the we need to send the email on order placed event
    if (customerRegistered.enabled !== true) {
      return;
    }

    // Build the email data
    const customerId = data.customer_id;
    const customer = await select()
      .from('customer')
      .where('customer_id', '=', customerId)
      .load(pool);

    if (!customer) {
      return;
    }

    // Remove the password
    delete customer.password;

    const emailDataFinal = await getValue(
      'resend_customer_welcome_email_data',
      customer,
      {}
    );
    // Send the email
    const msg = {
      to: emailDataFinal.email,
      subject: customerRegistered.subject || `Welcome to AnnaPoorani`,
      from
    };

    // Read the template if it's set
    if (customerRegistered.templatePath) {
      // So we need to get the full path to the file
      const filePath = path.join(
        process.cwd(),
        customerRegistered.templatePath
      );
      const templateContent = await fs.readFile(filePath, 'utf8');
      msg.html = Handlebars.compile(templateContent)(emailDataFinal);
    } else {
      msg.text = `Hello ${emailDataFinal.full_name}. Welcome to our store!`;
    }

    await resend.emails.send(msg);
  } catch (e) {
    error(e);
  }
};
