const touch = require('touch');
const { resolve } = require('path');
const { CONSTANTS } = require('@AnnaPoorani/AnnaPoorani/src/lib/helpers');

module.exports.watchPage = function (event) {
  if (event === 'add') {
    // TODO: Touching this file will trigger a rebuild of all pages. This is not optimized
    touch(
      resolve(
        CONSTANTS.MOLDULESPATH,
        '../components/common/react/client/Index.jsx'
      )
    );
  }
};
