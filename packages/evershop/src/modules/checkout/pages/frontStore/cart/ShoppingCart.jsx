import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { get } from '@AnnaPoorani/AnnaPoorani/src/lib/util/get';
import { useAppState } from '@components/common/context/app';
import Items from '@components/frontStore/checkout/cart/items/Items';
import { Empty } from '@components/frontStore/checkout/cart/Empty';
import { _ } from '@AnnaPoorani/AnnaPoorani/src/lib/locale/translate';

function Title({ title }) {
  const items = get(useAppState(), 'cart.items', []);
  if (items.length <= 0) return null;

  return (
    <div className="mb-3 text-center shopping-cart-heading">
      <h1 className="shopping-cart-title mb-05">{title}</h1>
      <a href="/" className="underline">
        {_('Continue Shopping')}
      </a>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default function ShoppingCart({ cart, setting, removeUrl }) {
  const { totalQty = 0, items = [] } = cart || {};
  if (totalQty <= 0) {
    return <Empty />;
  } else {
    return (
      <div>
        <div className="cart page-width">
          <Area
            id="shoppingCartTop"
            className="cart-page-top"
            coreComponents={[
              {
                component: { default: Title },
                props: { title: 'Shopping cart' },
                sortOrder: 10,
                id: 'shoppingCartTitle'
              }
            ]}
          />
          <div className="cart-page-middle">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
              <Area
                id="shoppingCartLeft"
                className="col-span-1 md:col-span-3"
                coreComponents={[
                  {
                    component: { default: Items },
                    props: { items, setting, cartId: cart.uuid, removeUrl },
                    sortOrder: 10,
                    id: 'shoppingCartTitle'
                  }
                ]}
              />
              <Area
                id="shoppingCartRight"
                className="col-span-1 md:col-span-1"
              />
            </div>
          </div>
          <Area id="shoppingCartBottom" className="cart-page-bottom" />
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cart: PropTypes.shape({
    uuid: PropTypes.string.isRequired
  }).isRequired,
  setting: PropTypes.shape({
    displayCheckoutPriceIncludeTax: PropTypes.bool
  }).isRequired,
  removeUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 1
};

export const query = `
  query Query {
    cart {
      totalQty
      uuid
      items {
        cartItemId
        thumbnail
        qty
        productName
        productSku
        variantOptions
        productUrl
        productPrice {
          value
          text
        }
        productPriceInclTax {
          value
          text
        }
        finalPrice {
          value
          text
        }
        finalPriceInclTax {
          value
          text
        }
        subTotal {
          value
          text
        }
        total {
          value
          text
        }
        removeApi
        errors
      }
    }
    setting {
      displayCheckoutPriceIncludeTax
    }
  }
`;
