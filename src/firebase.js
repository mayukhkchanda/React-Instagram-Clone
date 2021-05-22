import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDOe95gD-xIW7vsmQypZux1OlwLfmVmmqc",
  authDomain: "react-instagram-clone-bb315.firebaseapp.com",
  projectId: "react-instagram-clone-bb315",
  storageBucket: "react-instagram-clone-bb315.appspot.com",
  messagingSenderId: "1037858489227",
  appId: "1:1037858489227:web:060963856218ebfd30a58e",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const authenticator = firebaseApp.auth();

export { db, authenticator };
