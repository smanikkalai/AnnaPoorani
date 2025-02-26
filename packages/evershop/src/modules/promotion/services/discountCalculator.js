const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const { getValueSync } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/registry');
const { select } = require('@AnnaPoorani/postgres-query-builder');

exports.calculateDiscount = async function calculateDiscount(
  cart,
  couponCode = null
) {
  const calculatorFunctions = getValueSync('discountCalculatorFunctions', []);
  const coupon = await select()
    .from('coupon')
    .where('coupon', '=', couponCode)
    .load(pool);

  // Calling calculator functions
  for (let i = 0; i < calculatorFunctions.length; i += 1) {
    await calculatorFunctions[i](cart, coupon);
  }
};
