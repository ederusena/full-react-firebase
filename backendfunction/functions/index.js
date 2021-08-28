const functions = require("firebase-functions");
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");

admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyC9rR2A65DoGS9II3rtNKiK9kRXSDbwRhM",
  authDomain: "icarrosujo.firebaseapp.com",
  databaseURL: "https://icarrosujo-default-rtdb.firebaseio.com",
  projectId: "icarrosujo",
  storageBucket: "icarrosujo.appspot.com",
  messagingSenderId: "1053429207595",
  appId: "1:1053429207595:web:af5f2fdd3cd15eba55506e",
  measurementId: "G-B49H3Z627G"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const express = require("express");
const app = express();

app.get("/screams", (req, res) => {
  admin.firestore()
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});

// Signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  // TODO: validate data
  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      return res.status(201).json({ message: `user ${data.user.uid} signed up successfully` });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

    

// https://baseurl.com/api/
exports.api = functions.region('us-central1').https.onRequest(app);