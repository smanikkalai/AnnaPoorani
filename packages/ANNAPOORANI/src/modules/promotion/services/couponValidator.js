const { select } = require('@ANNAPOORANI/postgres-query-builder');
const { pool } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/postgres/connection');
const { getValueSync } = require('@ANNAPOORANI/ANNAPOORANI/src/lib/util/registry');

/**
 * This method validate a coupon.
 * @param {Cart} cart
 * @param {String} couponCode
 * @returns {Boolean}
 */
async function validateCoupon(cart, couponCode) {
  const validatorFunctions = getValueSync('couponValidatorFunctions', []);
  let flag = true;
  const coupon = await select()
    .from('coupon')
    .where('coupon', '=', couponCode)
    .load(pool);
  if (!coupon) {
    return false;
  }
  // Loop an object
  await Promise.all(
    validatorFunctions.map(async (func) => {
      try {
        const check = await func(cart, coupon);
        if (!check) {
          flag = false;
        }
      } catch (e) {
        flag = false;
      }
    })
  );

  return flag;
}

module.exports = {
  validateCoupon
};
