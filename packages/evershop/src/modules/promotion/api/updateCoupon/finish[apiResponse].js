const { buildUrl } = require('@AnnaPoorani/AnnaPoorani/src/lib/router/buildUrl');
const { OK } = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const coupon = await delegate.updateCoupon;
  response.status(OK);
  response.json({
    data: {
      ...coupon,
      links: [
        {
          rel: 'couponGrid',
          href: buildUrl('couponGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('couponEdit', { id: coupon.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
