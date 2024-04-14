const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');

module.exports.getFrontStoreSessionCookieName = () =>
  getConfig('system.session.cookieName', 'sid');
