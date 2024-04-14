const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');

module.exports.getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
