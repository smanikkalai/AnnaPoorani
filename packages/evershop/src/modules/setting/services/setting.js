const { select } = require('@AnnaPoorani/postgres-query-builder');
const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');

let setting;

module.exports.getSetting = async (name, defaultValue) => {
  if (!setting) {
    setting = await select().from('setting').execute(pool);
  }
  const row = setting.find((s) => s.name === name);
  if (row) {
    return row.value;
  } else {
    return defaultValue;
  }
};

module.exports.refreshSetting = async () => {
  setting = await select().from('setting').execute(pool);
};
