// https://github.com/node-config/node-config/issues/578
process.env.ALLOW_CONFIG_MUTATIONS = true;
require('dotenv').config();
const { start } = require('@ANNAPOORANI/ANNAPOORANI/bin/lib/startUp');

(async () => {
  await start();
})();
