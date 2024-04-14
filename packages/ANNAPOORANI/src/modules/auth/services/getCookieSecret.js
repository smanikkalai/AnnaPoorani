const { getConfig } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/getConfig');

module.exports.getCookieSecret = () => getConfig('system.session.cookieSecret', 'keyboard cat');
