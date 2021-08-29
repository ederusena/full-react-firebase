import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid } from '@material-ui/core';
import propTypes from 'prop-types';
import AdminSideBar from '../../components/adminSidebarUI';
import { getAllMessages } from '../../services/requestAPI';
import CardMessage from '../../components/CardMessages';

const two = 2;
const useStyles = makeStyles((theme) => ({
  root: {
    background: '#f3f6cf',
    height: '100vh',
    padding: theme.spacing(two),
    backgroundColor: theme.palette.background.dark,
  },
  listItemText: {
    fontSize: 14,
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  subheader: {
    textTransform: 'uppercase',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const [allMessages, setAllMessages] = useState([]);
  const token = localStorage.getItem('token');
  const { history } = props;

  // const allMessages = [
  //   {email: 'zambelli@zambs.com', time: '17:20'},
  //   {email: 'hugao@hugos.com', time: '16:20'},
  // ];

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
    async function fetchMessages() {
      try {
        const { data } = await getAllMessages(localStorage.getItem('token'));
        setAllMessages(data);
        // console.log('ADMIN ALL CHATS ===>', data);
      } catch (error) {
        console.log(error);
      }
      return 'true';
    }
    fetchMessages();
  }, [token, history]); // tinha comentado as coisas do array
  const zero = 0;
  return (
    <div className={ classes.root }>
      <Box display="flex">
        <AdminSideBar title="Conversas" icon="inbox" history={ history } />
        <Box p={ 4 } mt={ 14 }>
          {(!allMessages || !allMessages.length)
            && <h1 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h1>}
          <Grid container spacing={ 4 }>
            {allMessages.length > zero && allMessages.map((msg, index) => (
              <CardMessage key={ msg.name } msg={ msg } index={ index } />
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;

Home.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};
