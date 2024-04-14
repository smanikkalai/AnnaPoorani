const { getConfig } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/getConfig');

module.exports.getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
