import { useAppState } from '@components/common/context/app';
import { get } from '@AnnaPoorani/AnnaPoorani/src/lib/util/get';

/* eslint-disable global-require */
const { resolve } = require('path');
const { CONSTANTS } = require('@AnnaPoorani/AnnaPoorani/src/lib/helpers');

export function getComponents() {
  const componentsPath = get(useAppState(), 'componentsPath');
  if (!componentsPath) {
    return {};
  } else {
    return require(resolve(
      CONSTANTS.ROOTPATH,
      '.AnnaPoorani/build/',
      componentsPath
    ));
  }
}
