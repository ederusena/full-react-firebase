import React from 'react'; // { useContext }
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import AppContext from '../../context/AppContext';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  links: {
    textDecoration: 'none',
  },
});

export default function SimpleCard(props) {
  // const { setOrderDetails } = useContext(AppContext);
  const classes = useStyles();
  const {
    msg,
  } = props;

  const {
    email, time,
  } = msg;

  // setOrderDetails(order);
  if (!msg) return <h1 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h1>;

  return (
    <Grid item lg={ 6 } md={ 6 } sm={ 12 } xs={ 12 }>
      <Card className={ classes.root } elevation={ 3 } data-testid="containerChat">
        <CardContent>
          <Link to={ `/admin/chat/${email}` } className={ classes.links }>
            <Typography
              style={ { fontWeight: 600 } }
              data-testid="profile-name"
              gutterBottom
              variant="h5"
              color="textPrimary"
            >
              { email }
            </Typography>
            <Typography data-testid="last-message" display="block" variant="body2" color="textSecondary">
              { `Última mensagem às ${time}` }
            </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
}

SimpleCard.propTypes = {
  msg: propTypes.instanceOf(Object).isRequired,
};
