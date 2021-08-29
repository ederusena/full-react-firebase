const express = require('express');

const http = require('http');
// const socketIO = require('socket.io');
// https://www.npmjs.com/package/dateformat, um oferecimento de Paulo D'Andrea
// const dateFormat = require('dateformat');

const app = express();
const server = http.createServer(app);
// const io = socketIO(server);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const path = require('path');

const cors = require('cors');

const bodyParser = require('body-parser');

const loginController = require('./Controllers/loginController');

const registerController = require('./Controllers/userController');

const profileController = require('./Controllers/profileControllers');

const checkToken = require('./Middlewares/checkToken');

const productsController = require('./Controllers/productsController');

const checkoutController = require('./Controllers/checkoutController');

const ordersController = require('./Controllers/ordersController');

const adminOrdersController = require('./Controllers/adminOrdersController');

const admProfileController = require('./Controllers/admProfileController');

const admDetailController = require('./Controllers/admDetailController');

const chatController = require('./Chat/controller/chatController');

const service = require('./Chat/service/chatService');

/*
  ENDPOINTS
*/
app.use(cors());

app.use(bodyParser.json());
// teste login done
app.use('/login', loginController);

// teste register done
app.use('/register', registerController);

app.use('/profile', checkToken, profileController);

app.use('/products', checkToken, productsController);

app.use('/checkout', checkToken, checkoutController);

app.use('/orders', checkToken, ordersController);

app.use('/admin/orders', checkToken, adminOrdersController);

app.use('/admin/profile', checkToken, admProfileController);

app.use('/admin/orders', checkToken, admDetailController);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', checkToken, chatController);

const PORT = 3001;
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
io.on('connection', (socket) => {
  // Join a conversation
  const { ID } = socket.handshake.query;
  socket.join(ID);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    // console.log('data back===>', data);
    service.insertMessage(ID, data);
    // service.updateChats(ID, data).then(console.log);
    // service.updateChats(ID,data)
    io.in(ID).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  // socket.on("disconnect", () => {
  // socket.leave(roomId);
  // });
});

server.listen(PORT, () => {
  console.log(`O pai tá ON no projeto e na porta ${PORT}`);
});

// testando o chat pelo postman com o banco no mongodb

/* const meuChat = express();
meuChat.use(bodyParser.json());
const model = require('./Chat/model/chatModel');

meuChat.get('/', async (req, res) => {
  const teste = await model.getAllConversations();
  res.status(200).json(teste);
});
meuChat.post('/', async (req, res) => {
  try {
    // console.log('req.body.p===>', req.body.p);
    const teste = await model.insertMessage(req.body.collection, {...req.body.p});
    res.status(200).json(teste);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

meuChat.listen(3002, () => {
  console.log('chat na 3002');
}); */
