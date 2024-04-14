const { getConfig } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/getConfig');

module.exports = {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
