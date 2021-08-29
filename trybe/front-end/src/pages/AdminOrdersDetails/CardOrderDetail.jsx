import React from 'react';
import propTypes from 'prop-types';
import span from '@material-ui/core/Typography';

export default function CardOrderDetails(props) {
  const { item, index } = props;

  const two = 2;
  return (
    <div key={ item.name }>
      <span data-testid={ `${index}-product-qtd` } style={ { marginRight: 4, fontWeight: 'bold' } }>
        { `${item.quantity} x`}
      </span>
      <span data-testid={ `${index}-product-name` } style={ { marginRight: 4 } }>
        { item.name }
      </span>
      <span data-testid={ `${index}-order-unit-price` } style={ { marginRight: 4 } }>
        { `(R$ ${item.price.toString().replace('.', ',')})` }
      </span>
      <span data-testid={ `${index}-product-total-value` } style={ { marginRight: 4 } }>
        { `R$ ${(item.price * item.quantity).toFixed(two).replace('.', ',')}` }
      </span>
    </div>
  );
}

CardOrderDetails.propTypes = {
  item: propTypes.instanceOf(Object).isRequired,
  index: propTypes.number.isRequired,
};
