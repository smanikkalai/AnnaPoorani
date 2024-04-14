const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');

module.exports = {
  Query: {
    themeConfig: () => getConfig('themeConfig')
  }
};
