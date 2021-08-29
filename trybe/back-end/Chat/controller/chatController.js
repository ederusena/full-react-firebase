const { Router } = require('express');

const service = require('../service/chatService');

const chatController = Router();

chatController.get('/chat', async (req, res) => {
  try {
    const { email } = req.headers;
    const { role, email: emailToken } = req.payload;
    const collection = role === 'client' ? emailToken : email;
    // console.log('Back===>',role, emailToken, email);
    const conversation = await service.getConversation(collection);
    // console.log('conversation =====>', conversation);
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
    // res.status(500).json({ message: error });
  }
});

chatController.get('/admin/chats', async (_req, res) => {
  try {
    const conversation = await service.getAllConversations();
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
    // res.status(500).json({ message: error });
  }
});

chatController.get('/admin/chat', async (req, res) => {
  try {
    const { id } = req.headers;
    // console.log('id =====>', id);
    const conversation = await service.getConversation(id);
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
    // res.status(500).json({ message: error });
  }
});

/* chatController.put('/admin/chat', async (req, res) => {
  try {
    const { id } = req.headers;
    // console.log('id =====>', id);
    const conversation = await service.insertMessage(id);
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
    // res.status(500).json({ message: error });
  }
}); */

/* chatController.post('/chat', async (req, res) => {
  try {
    const { id } = req.payload;
    // console.log('id =====>', id);
    const conversation = await service.insertMessage(id, {});
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
    // res.status(500).json({ message: error });
  }
}); */

chatController.put('/chats/index', async (req, res) => {
  try {
    const { id } = req.payload;
    // console.log('id =====>', id);
    const conversation = await service.updateChats(id);
    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado.' });
    // res.status(500).json({ message: error });
  }
});

module.exports = chatController;
