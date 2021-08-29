import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
// import AppContext from '../../context/AppContext';
import './index.css';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const OrderCard = (props) => {
  const { order, index } = props;
  const dois = 2;
  const { id, sale_date: saleDate, status } = order;
  const { setGlobalData } = useContext(AppContext);
  useEffect(() => {
    setGlobalData((state) => ({ ...state, [id]: saleDate }));
  }, [id, saleDate, setGlobalData]);
  const selectColor = () => {
    switch (status) {
      case 'Preparando':
        return 'preparando';
      case 'Entregue':
        return 'entregue';
      default:
        return 'pendente';
    }
  };
  return (
    <div className="oCard">
      <Link
        to={ `/orders/${id}` }
        className="cardz orderLink"
        key={ id }
        data-testid={ `${index}-order-card-container"` }
      >
        <p data-testid={ `${index}-order-number` } className="orderCardTitle">
          { `Pedido ${id}` }
        </p>
        <p data-testid={ `${index}-order-date` }>
          { dateFormat(saleDate, 'dd/mm') }
        </p>
        <p data-testid={ `${index}-order-total-value` }>
          { `R$ ${order.total_price.toFixed(dois).replace('.', ',')}` }
        </p>
        <p className={ selectColor() }>
          { status }
        </p>
      </Link>
    </div>
  );
};

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
