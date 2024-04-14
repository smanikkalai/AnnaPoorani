const { existsSync, rmSync, mkdirSync } = require('fs');
const path = require('path');
const { CONSTANTS } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/helpers');
const {
  loadModuleRoutes
} = require('@ANNAPOORANI/ANNAPOORANI/src/lib/router/loadModuleRoutes');
const { getRoutes } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/router/Router');
const {
  isBuildRequired
} = require('@ANNAPOORANI/ANNAPOORANI/src/lib/webpack/isBuildRequired');
const { buildEntry } = require('@ANNAPOORANI/ANNAPOORANI/bin/lib/buildEntry');
const { getCoreModules } = require('@ANNAPOORANI/ANNAPOORANI/bin/lib/loadModules');
const { error } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/log/logger');
const { compile } = require('./complie');
const { getEnabledExtensions } = require('../extension');
require('dotenv').config();
/* Loading modules and initilize routes, components */
const modules = [...getCoreModules(), ...getEnabledExtensions()];

/** Loading routes  */
modules.forEach((module) => {
  try {
    // Load routes
    loadModuleRoutes(module.path);
  } catch (e) {
    error(e);
    process.exit(0);
  }
});

/** Clean up the build directory */
if (existsSync(path.resolve(CONSTANTS.BUILDPATH))) {
  // Delete directory recursively
  rmSync(path.resolve(CONSTANTS.BUILDPATH), { recursive: true });
  mkdirSync(path.resolve(CONSTANTS.BUILDPATH));
} else {
  mkdirSync(path.resolve(CONSTANTS.BUILDPATH), { recursive: true });
}

(async () => {
  const routes = getRoutes();
  await buildEntry(routes.filter((r) => isBuildRequired(r)));

  /** Build  */
  await compile(routes);
})();
