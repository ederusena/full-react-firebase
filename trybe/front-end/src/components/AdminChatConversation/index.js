import React, { useCallback, useEffect, useState } from 'react'; // useContext
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMessagesById } from '../../services/requestAPI';
// import { verifyToken } from '../../services/webTokenMiddleware';
// import AppContext from '../../context/AppContext';
// import Header from '../../components/header';
// import Footer from '../../components/footer';
import useChat from '../useChat';

import './index.css';

const dateFormat = require('dateformat');

const AdminChatConversation = (props) => {
  const { email } = props;
  // const { email } = useContext(AppContext);
  // const token = localStorage.getItem('token');
  // const payload = verifyToken(token);
  // const { email, id } = payload;
  // console.log('payload=====>', payload);
  // console.log('email===>', email);
  // const { Id } = props; // pega id do link/requisição/jwt
  const { messages, sendMessage, setHistory } = useChat(email);
  // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  // =>const [theOrders, setOrders] = useState([]);
  const setHistoryCallback = useCallback(setHistory, []);
  useEffect(() => {
    const { history } = props;
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
    async function fetchOldMessages() {
      const { data } = await getMessagesById(localStorage.getItem('token'), email);
      if (data.code) return false;
      setHistoryCallback(data.map(({ time, nome, message }) => ({ time, nome, message })));
      setNewMessage(data);
      return true;
    }
    fetchOldMessages();
  }, [props, email, setHistoryCallback]);

  const handleNewMessageChange = (event) => {
    const now = new Date();
    // não precisa const date = dateFormat(now, 'dd-mm-yyyy');
    const time = dateFormat(now, 'HH:MM');
    setNewMessage({ message: event.target.value, time, nome: 'Loja' });
    // precisa colocar a const time e o email além da msg ou faz isso pelo "server?"
  };

  useEffect(() => {
    const conteudo = document.getElementsByClassName('messages-container');
    conteudo[0].scrollTop = conteudo[0].scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(newMessage);
    // setNewMessage('');
    newMessage.message = '';
  };
  const handleEnter = (e) => {
    const enterKey = 13;
    if (e.keyCode === enterKey) {
      handleSendMessage();
    }
  };
  return (
    <div className="chat-admin-list-message">
      <h1 className="" data-testid="profile-name">{`Conversa com: ${email}`}</h1>
      <Link to="/admin/chats" data-testid="back-button">Voltar</Link>
      <div className="messages-container">
        <ul className="messages-list">
          {messages.map((message) => (
            <li
              key={ `${message.time}-${message.message}` }
              className={ `message-item ${
                message.nome === 'Loja' ? 'my-message' : 'received-message' // CSS!
              }` }
            >
              <p data-testid="nickname" className="message-name">{message.nome}</p>
              <p data-testid="message-time" className="message-time">{message.time}</p>
              <h2 data-testid="text-message" className="message-body">{message.message}</h2>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        data-testid="message-input"
        value={ newMessage.message }
        onChange={ handleNewMessageChange }
        onKeyUp={ handleEnter }
        placeholder="Digite..."
        className="new-message-input-field"
      />
      <button
        type="button"
        onClick={ handleSendMessage }
        className="send-message-button admin-send-btn"
        data-testid="send-message"
      >
        ENVIAR
      </button>
    </div>
  );
};

export default AdminChatConversation;

AdminChatConversation.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
  email: propTypes.string.isRequired,
};
