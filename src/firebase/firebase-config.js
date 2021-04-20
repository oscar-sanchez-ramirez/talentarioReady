import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAisjDV13v9bA_P1XOS4QVnwylx5vnAFGw",
    authDomain: "talentario-a3d9a.firebaseapp.com",
    databaseURL: "https://talentario-a3d9a-default-rtdb.firebaseio.com",
    projectId: "talentario-a3d9a",
    storageBucket: "talentario-a3d9a.appspot.com",
    messagingSenderId: "461959008150",
    appId: "1:461959008150:web:1a8d562542e9115394d7b7",
    measurementId: "G-75NXCEKZZF"
};



firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}