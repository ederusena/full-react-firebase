const model = require('../model/chatModel');

const getConversation = async (userId) => {
  if (!userId) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Informe um usuário válido.',
      statusCode: 401,
    };
  }
  return model.getConversation(userId);
};

const insertMessage = async (userId, conversation) => {
  if (!userId) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Id inválido.',
      statusCode: 401,
    };
  }
  if (!conversation.nome) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Usuário não identificado.',
      statusCode: 401,
    };
  }
  if (!conversation.time) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Hora inválida.',
      statusCode: 401,
    };
  }
  if (!conversation.message) {
    return {
      error: true,
      code: 'Invalid_value',
      message: 'Mensagem inválida.',
      statusCode: 401,
    };
  }
  // console.log('conversation ===>', conversation);
  return model.insertMessage(userId, conversation);
};

const getAllConversations = async () => {
  const teste = await model.getAllConversations();
  const mapArr = teste.map((e) => model.lastConversation(e.name));
  const results = await Promise.all(mapArr);
  return results.map((e, i) => {
    e[0].email = teste[i].name;
    return e[0];
  });
};

module.exports = {
  getConversation,
  insertMessage,
  getAllConversations,
};
