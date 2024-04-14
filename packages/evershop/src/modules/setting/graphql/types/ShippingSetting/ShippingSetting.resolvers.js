const { getConfig } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/getConfig');

module.exports = {
  Setting: {
    allowedCountries: (setting) => {
      const allowedCountries = setting.find(
        (s) => s.name === 'allowedCountries'
      );
      if (allowedCountries && allowedCountries.value) {
        return JSON.parse(allowedCountries.value);
      } else {
        return ['US'];
      }
    },
    weightUnit: () => getConfig('shop.weightUnit', 'kg')
  }
};
