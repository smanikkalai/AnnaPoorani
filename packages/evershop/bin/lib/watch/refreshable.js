const chokidar = require('chokidar');
const { resolve } = require('path');
const { CONSTANTS } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/helpers');
const { broadcash } = require('./broadcash');

function refreshable() {
  const watcher = chokidar.watch('./packages/ANNAPOORANI/src/lib/response/*', {
    ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });
  watcher.add('./packages/ANNAPOORANI/src/lib/util/*');
  watcher.on('all', (event, path) => {
    delete require.cache[require.resolve(resolve(CONSTANTS.ROOTPATH, path))];
    broadcash();
  });
}

module.exports.refreshable = refreshable;
