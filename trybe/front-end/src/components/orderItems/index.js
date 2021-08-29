import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const OrderItem = (props) => {
  const { item, index } = props;
  const two = 2;
  return (
    <tr className="cartItem" key={ item.name }>
      <td className="qty" data-testid={ `${index}-product-qtd` }>{ item.quantity }</td>
      <td className="name" data-testid={ `${index}-product-name` }>{ item.name }</td>
      <td className="unit-price" data-testid={ `${index}-product-unit-price` }>
        {`(R$ ${item.price.toString().replace('.', ',')} un)`}
      </td>
      <td className="total-product" data-testid={ `${index}-product-total-value` }>
        { `R$ ${(item.price * item.quantity).toFixed(two).replace('.', ',')}` }
      </td>
    </tr>
  );
};

export default OrderItem;

OrderItem.propTypes = {
  item: PropTypes.shape({
    // id: PropTypes.number,
    quantity: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    total_price: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
