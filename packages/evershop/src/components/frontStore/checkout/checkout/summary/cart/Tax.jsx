import React from 'react';
import PropTypes from 'prop-types';
import { _ } from '@ANNAPOORANI/ANNAPOORANI/src/lib/locale/translate';

export function Tax({ amount }) {
  return (
    <div className="summary-row flex justify-between">
      <span>{_('Tax')}</span>
      <div>
        <div />
        <div>{amount}</div>
      </div>
    </div>
  );
}

Tax.propTypes = {
  amount: PropTypes.string
};

Tax.defaultProps = {
  amount: undefined
};
