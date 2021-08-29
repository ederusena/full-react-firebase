import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';

import React, { useEffect, useState, useCallback } from 'react';
import propTypes from 'prop-types';
import { Redirect, useParams } from 'react-router-dom';

import CardOrderDetail from './CardOrderDetail';
import AdminSideBar from '../../components/adminSidebarUI';
import { getSaleDetail, postStatusDelivered } from '../../services/requestAPI';

const two = 2;
const zero = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#f3f6cf',
    height: '100vh',
    padding: theme.spacing(two),
    backgroundColor: theme.palette.background.dark,
  },
  card: {
    maxWidth: 500,
    marginTop: 90,
    marginLeft: 270,
  },
  span: {
    margin: 10,
  },
}));

const HomeAdminOrderDetail = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const [delivered, setDelivered] = useState(false);
  const [sale, setsale] = useState([]);
  const [falha, setFalha] = useState('');

  const token = localStorage.getItem('token');
  const { history } = props;
  async function fetchSale() {
    try {
      const { data } = await getSaleDetail(token, id, sale.length ? sale[0].status : '');
      setsale(data);
      if (data.length > zero) {
        setDelivered(data[0].status);
      }
    } catch (error) {
      console.error(error);
    }
    return 'true';
  }

  const memoFetch = useCallback(fetchSale, [token, id]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
    console.log('HomeAdminOrderDetail');
    memoFetch();
  }, [history, memoFetch]);

  const handleSubmit = async (statusAtual) => {
    const ok = await postStatusDelivered(token, id, statusAtual);
    if (!ok.data.message) {
      return fetchSale();
    }
    return setFalha('Algo deu errado!');
  };

  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={ classes.root }>
      <AdminSideBar title="Ordem Detalhada" icon="inbox" history={ history } />
      <Card className={ classes.card } elevation={ 3 }>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={ `Pedido ${id}` }
          data-testid="order-number"
          subheader="September 14, 2016"
        />
        <CardContent>
          {falha}
          <Typography data-testid="order-status" variant="h5" color="primary" component="p">
            { `${sale.length ? delivered : ''}` }
          </Typography>
          <Typography className={ classes.span }>
            {sale.map((item, index) => (
              <CardOrderDetail key={ item.name } item={ item } index={ index } />
            ))}
          </Typography>
          <Typography data-testid="order-total-value" variant="h5" color="primary" component="p">
            {`Total: R$ ${sale
              .reduce((acc, cur) => acc + cur.quantity * cur.price, zero)
              .toFixed(two)
              .replace('.', ',')}`}
          </Typography>
          {delivered === 'Pendente' && (
            <Button
              data-testid="mark-as-prepared-btn"
              onClick={ () => handleSubmit('Pendente') }
              variant="contained"
              startIcon={ <SaveIcon /> }
              color="secondary"
            >
              Preparar pedido
            </Button>
          )}
          {(delivered === 'Preparando' || delivered === 'Pendente') && (
            <Button
              data-testid="mark-as-delivered-btn"
              onClick={ () => handleSubmit('Preparando') }
              variant="contained"
              startIcon={ <SaveIcon /> }
              color="secondary"
            >
              Marcar como entregue
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeAdminOrderDetail;

HomeAdminOrderDetail.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};
