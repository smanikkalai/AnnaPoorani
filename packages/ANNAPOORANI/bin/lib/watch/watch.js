const chokidar = require('chokidar');
const { resolve } = require('path');
const { CONSTANTS } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/helpers');
const { existsSync } = require('fs');
const { getConfig } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/getConfig');

function watch(calbacks = []) {
  const watcher = chokidar.watch(resolve(CONSTANTS.ROOTPATH, 'extensions/**'), {
    // ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });

  if (existsSync(resolve(CONSTANTS.ROOTPATH, 'packages'))) {
    watcher.add(resolve(CONSTANTS.ROOTPATH, 'packages/ANNAPOORANI/src/**'));
  }

  // Watch themes folder
  const theme = getConfig('system.theme');
  if (theme && existsSync(resolve(CONSTANTS.ROOTPATH, 'themes', theme))) {
    watcher.add(resolve(CONSTANTS.ROOTPATH, 'themes', theme, '**'));
  }

  watcher.on('all', (event, path) => {
    calbacks.forEach((callback) => {
      callback(event, path);
    });
  });
}

module.exports.watch = watch;