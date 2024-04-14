const { getConfig } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/getConfig');

module.exports = {
  Query: {
    themeConfig: () => getConfig('themeConfig')
  }
};
