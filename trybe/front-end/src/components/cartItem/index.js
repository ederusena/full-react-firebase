import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import './index.css';

const CartItem = (props) => {
  const { cart, setCart } = useContext(AppContext);

  const { item, index } = props;

  const exists = cart.find((produto) => produto.id === item.id);

  const zero = 0;
  const two = 2;
  if (!exists || exists.quantity === zero) {
    return null;
  }

  const exclude = () => {
    const itemZero = (e) => ({ ...e, quantity: zero });
    if (exists) {
      setCart(cart.map((e) => (e.id === item.id ? itemZero(e) : e)));
    }
    return null;
  };

  return (
    <tr className="cartItem" key={ item.name }>
      <td className="qty" data-testid={ `${index}-product-qtd-input` }>{ exists.quantity ? exists.quantity : zero }</td>
      <td className="name" data-testid={ `${index}-product-name` }>{ item.name }</td>
      <td className="unit-price" data-testid={ `${index}-product-unit-price` }>
        <span className="legenda">(R$ </span>
        {`${item.price.toFixed(two).replace('.', ',')}`}
        <span className="legenda">un)</span>
      </td>
      <td className="total-product" data-testid={ `${index}-product-total-value` }>
        <span className="legenda">R$ </span>
        {`${(item.price * item.quantity).toFixed(two).replace('.', ',')}` }
      </td>
      <td className="button">
        <button
          type="button"
          data-testid={ `${index}-removal-button` }
          onClick={ () => exclude() }
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
};
