import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import AdminSideBar from '../../components/adminSidebarUI';
import { getProfileInfo } from '../../services/requestAPI';

const two = 2;
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    marginTop: 90,
    marginLeft: 270,
  },
  root: {
    background: '#f3f6cf',
    height: '100vh',
    padding: theme.spacing(two),
    backgroundColor: theme.palette.background.dark,
  },
  media: {
    height: 0,
    paddingTop: '76.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const PerfilAdmin = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const { history } = props;
  useEffect(() => {
    async function asyncMe() {
      const token = localStorage.getItem('token');
      const {
        data: { user },
      } = await getProfileInfo(token);
      setName(user.name);
      setEmail(user.email);
    }
    asyncMe();
  }, []);

  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={ classes.root }>
      <AdminSideBar title="Perfil" icon="face" history={ history } />
      <Card className={ classes.card } elevation={ 3 }>
        <CardHeader
          avatar={
            <Avatar data-testid="profile-name" aria-label="recipe" className={ classes.avatar }>
              { name[0] }
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={ name }
          subheader="September 14, 2016"
        />
        <CardMedia
          className={ classes.media }
          image="https://www.thispersondoesnotexist.com/image"
          title="Paella dish"
        />
        <CardContent>
          <Typography data-testid="profile-email" variant="h5" color="textSecondary" component="p">
            Email:
            { email }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerfilAdmin;

PerfilAdmin.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};
