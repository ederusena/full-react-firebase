import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import propTypes from 'prop-types';
import dateFormat from 'dateformat';
import './index.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
// import { Link } from 'react-router-dom';
import OrderItem from '../../components/orderItems';
import { postGetTheOrder } from '../../services/requestAPI';
import AppContext from '../../context/AppContext';

export default function OrderDetails(props) {
  const [orderHere, setOrder] = useState([]);
  const { globalData } = useContext(AppContext);
  // const theToken = localStorage.getItem('token');
  const { id } = useParams();

  const zero = 0;
  const dois = 2;
  const cartSum = orderHere
    .reduce((acc, cv) => acc + cv.price * cv.quantity, zero)
    .toFixed(dois);

  useEffect(() => {
    const { history } = props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    }
    async function fetchOrder() {
      const temp = await postGetTheOrder(token, id);
      const { data } = temp;
      setOrder(data);
    }
    fetchOrder();
  }, [props, id]);

  const status = orderHere.length ? orderHere[0].status : '-';
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
    <div className="orderDetailsPage">
      <Header>Detalhes de Pedido</Header>
      <div className="details-main-content">
        <div className="detailsHeader">
          <div className="details-header-status">
            <h4 className="orderTitle">
              Status:
              <span className={ selectColor() }>{`${status}`}</span>
            </h4>
            <h4 data-testid="order-date" className="orderTitle">
              { dateFormat(globalData[id], 'dd/mm') }
            </h4>
          </div>
          <h4 data-testid="order-number" className="orderTitle">
            { `Pedido ${id}` }
          </h4>
        </div>
        <div className="pedido">
          <table className="cartItems">
            <tr className="legenda cartItem">
              <th className="qty">QUANTIDADE</th>
              <th className="name">PRODUTO</th>
              <th className="unit-price">PREÇO</th>
              <th className="total-product">TOTAL</th>
            </tr>
            <tr className="legenda-small cartItem">
              <th className="qty">QTD</th>
              <th className="name">PROD</th>
              <th className="unit-price">R$/Un</th>
              <th className="total-product">R$</th>
            </tr>
            {/* <div className="cartItems"> */}
            {
            orderHere
              .map((item, index) => <OrderItem key={ item.id } item={ item } index={ index } />)
            }
            {/* </div> */}
          </table>
          <p data-testid="order-total-value" className="total">
            { `TOTAL: R$ ${cartSum.toString().replace('.', ',')}` }
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

OrderDetails.propTypes = { history: propTypes.instanceOf(Object).isRequired };
// OrderDetails.propTypes = {
//   order: propTypes.instanceOf(Object).isRequired,
//   index: propTypes.number.isRequired,
// };
