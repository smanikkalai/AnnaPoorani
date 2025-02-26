/* eslint-disable camelcase */
const { select } = require('@AnnaPoorani/postgres-query-builder');
const { pool } = require('@AnnaPoorani/AnnaPoorani/src/lib/postgres/connection');
const { buildUrl } = require('@AnnaPoorani/AnnaPoorani/src/lib/router/buildUrl');
const {
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR,
  OK
} = require('@AnnaPoorani/AnnaPoorani/src/lib/util/httpStatus');
const { getCartByUUID } = require('../../services/getCartByUUID');
const { createOrder } = require('../../services/orderCreator');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const { cart_id } = request.body;
    // Verify cart
    const cart = await getCartByUUID(cart_id);
    if (!cart) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          message: 'Invalid cart',
          status: INVALID_PAYLOAD
        }
      });
      return;
    } else if (cart.hasError()) {
      const errors = cart.getErrors();
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          message: Object.values(errors)[0],
          status: INVALID_PAYLOAD
        }
      });
      return;
    }

    const orderId = await createOrder(cart);

    // Load created order
    const order = await select()
      .from('order')
      .where('uuid', '=', orderId)
      .load(pool);

    order.items = await select()
      .from('order_item')
      .where('order_item_order_id', '=', order.order_id)
      .execute(pool);

    order.shipping_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.shipping_address_id)
      .load(pool);

    order.billing_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.billing_address_id)
      .load(pool);

    response.status(OK);
    response.$body = {
      data: {
        ...order,
        links: [
          {
            rel: 'edit',
            href: buildUrl('orderEdit', { id: order.uuid }),
            action: 'GET',
            types: ['text/xml']
          }
        ]
      }
    };
    next();
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        message: e.message,
        status: INTERNAL_SERVER_ERROR
      }
    });
  }
};
