const connection = require('./connection');

const collection = 'messages';

const getConversation = async (email) => {
  const saidaBruta = await connection()
    .then((db) => db.collection(collection).find({ email })
      .toArray());
  return saidaBruta.map((element) => element.message);
};

const getAllConversations = async () => {
  const saidaBruta = await connection().then((db) => db.collection(collection).find()
    .toArray());
  return [...new Set(saidaBruta.map((element) => element.email))].map((e) => ({ name: e }));
};

const insertMessage = async (email, conversation) => {
  const { nome, time, message } = conversation;
  return connection().then((db) => db.collection(collection)
    .insertOne({ message: { nome, time, message }, email }));
  // .collection(idUser).insertOne({ nome, time, message }));
};

const lastConversation = async (email) => {
  const saidaBruta = await connection()
    .then((db) => db.collection(collection).find({ email })
      .sort({ _id: -1 })
      .limit(1)
      .toArray());
  return saidaBruta.map((e) => ({ ...e.message, email: e.email }));
};

module.exports = {
  getConversation,
  insertMessage,
  getAllConversations,
  lastConversation,
};
