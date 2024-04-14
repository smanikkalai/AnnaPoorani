const { getConfig } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/getConfig');

module.exports = {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
