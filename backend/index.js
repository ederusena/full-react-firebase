const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cool = require('cool-ascii-faces');

var firebaseKey = path.join(__dirname, 'assets/serviceAccountKey.json')
var admin = require("firebase-admin");

var serviceAccount = require(firebaseKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://icarrosujo-default-rtdb.firebaseio.com/"
});

admin
  .database()
  .ref('usuarios')
  .on('child_added', snapShot => {
    snapShot.ref.update({ atualizado: true });
});

admin.firestore().collection('usuarios').onSnapshot(snapshot => {
  
});

express()
  .use(express.static(path.join(__dirname, 'assets')))
  .get('/users', async (req, res) => {
  const users = await admin.database().ref('usuarios').once('value');
  res.send(users.val());
})
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
