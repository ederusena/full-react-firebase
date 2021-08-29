import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:3001'; // mesma do server!

const useChat = (ID) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();
  const setHistory = (arr) => setMessages([...arr, ...messages]);
  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { ID },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages(() => [...messages, incomingMessage]); // não precisa de (messages)?
    });
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [ID, messages]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody.message,
      senderId: socketRef.current.id,
      ...messageBody,
    });
  };

  return { messages, sendMessage, setHistory };
};

export default useChat;
